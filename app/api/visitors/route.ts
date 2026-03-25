import { NextResponse } from "next/server";

import {
  getServerSupabase,
  getSupabaseEnvIssues,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "lifetime_visits";

const isDev = process.env.NODE_ENV === "development";

export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        configured: false,
        count: null,
        ...(isDev ? { envIssues: getSupabaseEnvIssues() } : {}),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const { data, error } = await supabase
    .from("site_counters")
    .select("value")
    .eq("key", COUNTER_KEY)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        configured: true,
        count: null,
        error: "Could not load counter",
        ...(isDev ? { detail: error.message } : {}),
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  const count = typeof data?.value === "number" ? Number(data.value) : 0;

  return NextResponse.json(
    { configured: true, count },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: "Counter is not configured.",
        ...(isDev ? { envIssues: getSupabaseEnvIssues() } : {}),
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.rpc("increment_site_counter", {
    p_key: COUNTER_KEY,
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not update counter",
        ...(isDev ? { detail: error.message } : {}),
      },
      { status: 502 },
    );
  }

  const count = typeof data === "number" ? data : Number(data);

  return NextResponse.json({
    ok: true,
    count: Number.isFinite(count) ? count : null,
  });
}
