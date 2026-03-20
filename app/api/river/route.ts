import type { RiverApiResponse } from "@/lib/river-types";
import { estimateWaterTempFromAirF } from "@/lib/estimate-water-temp";
import { fetchNwsAirTemperature } from "@/lib/nws-air-temperature";
import {
  RIVER_CLEANLINESS_DEFAULT,
  RIVER_CLARITY_DEFAULT,
} from "@/lib/river-config";

type UsgsPoint = {
  value?: string;
  dateTime?: string;
};

type UsgsVariableCode = {
  value?: string;
};

type UsgsTimeSeries = {
  sourceInfo?: {
    siteName?: string;
  };
  variable?: {
    variableCode?: UsgsVariableCode[] | string;
  };
  values?: Array<{
    value?: UsgsPoint[];
  }>;
};

type UsgsValueBlock = {
  queryInfo?: unknown;
  timeSeries?: UsgsTimeSeries[];
};

type UsgsResponse = {
  value?: UsgsValueBlock | UsgsValueBlock[];
};

const SITE_ID = "01156000";
const USGS_URL_BASE = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${SITE_ID}&parameterCd=00060,00065`;

const DEFAULT_SITE_NAME = "West River near Newfane, VT";

const TRANSPARENCY_NOTE =
  "West River (USGS) flow and gage height are nearby watershed proxy readings for Rock River — not a Rock River gauge. Water temperature is estimated from NWS air temperature at the forecast grid and is not measured in the river. Clarity and cleanliness are site status labels for this guide (community context), not laboratory water quality tests.";

function userAgent() {
  return "rockrivervt.com (unofficial community guide)";
}

function unwrapValue(json: UsgsResponse): UsgsValueBlock | undefined {
  const v = json.value;
  if (!v) return undefined;
  if (Array.isArray(v)) return v[0];
  return v;
}

function seriesParameterCode(series: UsgsTimeSeries): string | undefined {
  const vc = series.variable?.variableCode;
  if (typeof vc === "string") return vc;
  if (Array.isArray(vc)) return vc[0]?.value;
  return undefined;
}

function seriesPoints(series: UsgsTimeSeries | undefined): UsgsPoint[] | undefined {
  const first = series?.values?.[0];
  return first?.value;
}

function latestPoint(points: UsgsPoint[] | undefined) {
  if (!points || points.length === 0) return undefined;

  let best: UsgsPoint | undefined;
  let bestTimeMs: number | undefined;

  for (const p of points) {
    const t = p.dateTime ? Date.parse(p.dateTime) : NaN;
    if (Number.isNaN(t)) continue;

    if (bestTimeMs === undefined || t > bestTimeMs) {
      best = p;
      bestTimeMs = t;
    }
  }

  return best ?? points[points.length - 1];
}

function parseNumber(s: string | undefined): number | null {
  if (s === undefined) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

type UsgsParseResult = {
  siteName: string | null;
  flowCfs: number | null;
  gageHeightFt: number | null;
  timestampIso: string | null;
  error?: string;
};

async function fetchUsgsJson(url: string): Promise<UsgsResponse | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": userAgent(), Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as UsgsResponse;
  } catch {
    return null;
  }
}

function parseUsgsResponse(json: UsgsResponse | null): UsgsParseResult {
  if (!json) {
    return {
      siteName: null,
      flowCfs: null,
      gageHeightFt: null,
      timestampIso: null,
      error: "usgs_fetch_failed",
    };
  }

  const block = unwrapValue(json);
  const timeSeries = block?.timeSeries?.filter(Boolean) ?? [];

  if (timeSeries.length === 0) {
    return {
      siteName: DEFAULT_SITE_NAME,
      flowCfs: null,
      gageHeightFt: null,
      timestampIso: null,
      error: "no_time_series",
    };
  }

  const siteName = timeSeries[0]?.sourceInfo?.siteName ?? DEFAULT_SITE_NAME;

  const flowSeries = timeSeries.find((s) => seriesParameterCode(s) === "00060");
  const gageSeries = timeSeries.find((s) => seriesParameterCode(s) === "00065");

  const flowPoint = latestPoint(seriesPoints(flowSeries));
  const gagePoint = latestPoint(seriesPoints(gageSeries));

  const flow = parseNumber(flowPoint?.value);
  const gageHeight = parseNumber(gagePoint?.value);

  const flowTime = flowPoint?.dateTime ? Date.parse(flowPoint.dateTime) : NaN;
  const gageTime = gagePoint?.dateTime ? Date.parse(gagePoint.dateTime) : NaN;

  let timestampIso: string | null = null;
  if (!Number.isNaN(flowTime) && !Number.isNaN(gageTime)) {
    timestampIso =
      flowTime >= gageTime ? flowPoint!.dateTime! : gagePoint!.dateTime!;
  } else if (!Number.isNaN(flowTime)) {
    timestampIso = flowPoint!.dateTime!;
  } else if (!Number.isNaN(gageTime)) {
    timestampIso = gagePoint!.dateTime!;
  }

  if (flow === null && gageHeight === null) {
    return {
      siteName,
      flowCfs: null,
      gageHeightFt: null,
      timestampIso,
      error: "missing_values",
    };
  }

  return {
    siteName,
    flowCfs: flow,
    gageHeightFt: gageHeight,
    timestampIso,
  };
}

async function loadUsgsData(): Promise<UsgsParseResult> {
  const primary = await fetchUsgsJson(USGS_URL_BASE);
  let parsed = parseUsgsResponse(primary);
  if (parsed.flowCfs !== null || parsed.gageHeightFt !== null) {
    return parsed;
  }

  const fallback = await fetchUsgsJson(`${USGS_URL_BASE}&period=P7D`);
  parsed = parseUsgsResponse(fallback);
  if (parsed.flowCfs !== null || parsed.gageHeightFt !== null) {
    return parsed;
  }

  return parseUsgsResponse(primary);
}

function buildPayload(partial: Partial<RiverApiResponse>): RiverApiResponse {
  const proxyGaugeAvailable =
    typeof partial.flowCfs === "number" ||
    typeof partial.gageHeightFt === "number";

  return {
    ok: partial.ok ?? true,
    error: partial.error,
    siteId: SITE_ID,
    siteName: partial.siteName ?? null,
    dataLabel:
      partial.dataLabel ??
      `Proxy gauge — West River near Newfane (USGS ${SITE_ID})`,
    transparencyNote: partial.transparencyNote ?? TRANSPARENCY_NOTE,
    proxyGaugeAvailable,
    flowCfs: partial.flowCfs ?? null,
    gageHeightFt: partial.gageHeightFt ?? null,
    timestampIso: partial.timestampIso ?? null,
    airTemperatureUsedF: partial.airTemperatureUsedF ?? null,
    estimatedWaterTempF: partial.estimatedWaterTempF ?? null,
    estimatedWaterTempSummary: partial.estimatedWaterTempSummary ?? null,
    estimatesAsOfIso: partial.estimatesAsOfIso ?? null,
    clarityStatus: partial.clarityStatus ?? RIVER_CLARITY_DEFAULT,
    cleanlinessStatus: partial.cleanlinessStatus ?? RIVER_CLEANLINESS_DEFAULT,
  };
}

export async function GET(): Promise<Response> {
  const [usgs, air] = await Promise.all([loadUsgsData(), fetchNwsAirTemperature()]);

  let estimatedWaterTempF: number | null = null;
  let estimatedWaterTempSummary: string | null = null;
  let airTemperatureUsedF: number | null = null;
  let estimatesAsOfIso: string | null = null;

  if (air) {
    airTemperatureUsedF = air.airTempF;
    const est = estimateWaterTempFromAirF(air.airTempF);
    estimatedWaterTempF = est.estimatedF;
    estimatedWaterTempSummary = est.summary;
    estimatesAsOfIso = new Date().toISOString();
  }

  const payload = buildPayload({
    ok: true,
    error: usgs.error,
    siteName: usgs.siteName,
    flowCfs: usgs.flowCfs,
    gageHeightFt: usgs.gageHeightFt,
    timestampIso: usgs.timestampIso,
    airTemperatureUsedF,
    estimatedWaterTempF,
    estimatedWaterTempSummary,
    estimatesAsOfIso,
    clarityStatus: RIVER_CLARITY_DEFAULT,
    cleanlinessStatus: RIVER_CLEANLINESS_DEFAULT,
  });

  return Response.json(payload, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
