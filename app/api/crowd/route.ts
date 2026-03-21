import { NextResponse } from "next/server";

import {
  CROWD_AREA_KEYS,
  type CrowdAreaKey,
  type CrowdLevel,
} from "@/lib/crowd/constants";
import { utcReportDateString } from "@/lib/crowd/date";
import { buildCrowdSummaries } from "@/lib/crowd/summary";
import type { CrowdSummaryResponse } from "@/lib/crowd/types";
import { isCrowdLevel, parseCrowdReportBody } from "@/lib/crowd/validate";
import {
  getServerSupabase,
  getSupabaseEnvIssues,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const isDev = process.env.NODE_ENV === "development";

function crowdDebugPayload() {
  if (!isDev) return {};
  return { envIssues: getSupabaseEnvIssues() };
}

function logCrowd(event: string, data: Record<string, unknown> = {}) {
  if (!isDev) return;
  console.error(`[crowd] ${event}`, data);
}

type BaselineRow = {
  area_key: string;
  level: string;
};

type ReportRow = {
  areas: Record<string, unknown>;
};

function aggregateReportLevels(
  rows: ReportRow[],
): Record<CrowdAreaKey, CrowdLevel[]> {
  const out: Record<CrowdAreaKey, CrowdLevel[]> = {
    parking: [],
    trails: [],
    family_beach: [],
    third_beach: [],
    fifth_beach: [],
  };

  for (const row of rows) {
    const a = row.areas;
    if (!a || typeof a !== "object") continue;
    for (const key of CROWD_AREA_KEYS) {
      const v = a[key];
      if (isCrowdLevel(v)) {
        out[key].push(v);
      }
    }
  }

  return out;
}

export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) {
    logCrowd("GET: supabase_unavailable", { ...crowdDebugPayload() });
    return NextResponse.json(
      {
        error:
          "Crowd data is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (service role, server-only).",
        ...(isDev ? crowdDebugPayload() : {}),
      },
      { status: 503 },
    );
  }

  const reportDate = utcReportDateString();

  const [baselineRes, reportsRes] = await Promise.all([
    supabase
      .from("crowd_daily_baselines")
      .select("area_key, level")
      .eq("report_date", reportDate),
    supabase.from("crowd_reports").select("areas").eq("report_date", reportDate),
  ]);

  if (baselineRes.error) {
    logCrowd("GET: baseline_query_failed", {
      code: baselineRes.error.code,
      message: baselineRes.error.message,
    });
    return NextResponse.json(
      {
        error: "Failed to load baselines",
        ...(isDev ? { detail: baselineRes.error.message } : {}),
      },
      { status: 502 },
    );
  }
  if (reportsRes.error) {
    logCrowd("GET: reports_query_failed", {
      code: reportsRes.error.code,
      message: reportsRes.error.message,
    });
    return NextResponse.json(
      {
        error: "Failed to load reports",
        ...(isDev ? { detail: reportsRes.error.message } : {}),
      },
      { status: 502 },
    );
  }

  const baselineByArea: Partial<Record<CrowdAreaKey, CrowdLevel>> = {};
  for (const row of (baselineRes.data ?? []) as BaselineRow[]) {
    if (
      CROWD_AREA_KEYS.includes(row.area_key as CrowdAreaKey) &&
      isCrowdLevel(row.level)
    ) {
      baselineByArea[row.area_key as CrowdAreaKey] = row.level;
    }
  }

  const reportLevelsByArea = aggregateReportLevels(
    (reportsRes.data ?? []) as ReportRow[],
  );

  const areas = buildCrowdSummaries(baselineByArea, reportLevelsByArea);

  const payload: CrowdSummaryResponse = {
    reportDate,
    dateScope: "utc_day",
    areas,
  };

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const supabase = getServerSupabase();
  if (!supabase) {
    logCrowd("POST: supabase_unavailable", { ...crowdDebugPayload() });
    return NextResponse.json(
      {
        error:
          "Crowd reporting is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (service role, server-only).",
        ...(isDev ? crowdDebugPayload() : {}),
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseCrowdReportBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { deviceId, displayName, areas } = parsed.value;
  const reportDate = utcReportDateString();

  const { data: existing, error: exErr } = await supabase
    .from("crowd_reports")
    .select("id")
    .eq("report_date", reportDate)
    .eq("device_id", deviceId)
    .maybeSingle();

  if (exErr) {
    logCrowd("POST: existing_check_failed", {
      code: exErr.code,
      message: exErr.message,
    });
    return NextResponse.json(
      {
        error: "Could not verify existing submission",
        ...(isDev ? { detail: exErr.message } : {}),
      },
      { status: 502 },
    );
  }
  if (existing?.id) {
    return NextResponse.json(
      { error: "Already submitted today for this device", reportDate },
      { status: 409 },
    );
  }

  const { data: inserted, error: insErr } = await supabase
    .from("crowd_reports")
    .insert({
      report_date: reportDate,
      device_id: deviceId,
      display_name: displayName ?? null,
      areas,
    })
    .select("id")
    .single();

  if (insErr) {
    logCrowd("POST: insert_failed", {
      code: insErr.code,
      message: insErr.message,
    });
    // Race: two submits same device/day — unique (report_date, device_id)
    if (insErr.code === "23505") {
      return NextResponse.json(
        {
          error: "Already submitted today for this device",
          reportDate,
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      {
        error: "Failed to save report",
        ...(isDev ? { detail: insErr.message } : {}),
      },
      { status: 502 },
    );
  }

  if (!inserted?.id) {
    logCrowd("POST: insert_no_row", {});
    return NextResponse.json(
      {
        error: "Failed to save report",
        ...(isDev ? { detail: "Insert returned no row" } : {}),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    submissionId: inserted.id,
    reportDate,
  });
}
