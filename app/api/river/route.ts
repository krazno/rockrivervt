type UsgsPoint = {
  value?: string;
  dateTime?: string;
};

type UsgsTimeSeries = {
  variable?: {
    variableCode?: string;
  };
  values?: {
    value?: UsgsPoint[];
  };
};

type UsgsValueContainer = {
  timeSeries?: UsgsTimeSeries[];
};

type UsgsResponse = {
  value?: UsgsValueContainer[];
};

type RiverResponse = {
  flow: number;
  gageHeight: number;
  timestamp: string;
};

function userAgent() {
  // NWS explicitly recommends this; USGS is more reliable with a descriptive UA as well.
  return "rockrivervt.com (unofficial community guide)";
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

  // Fallback: if no parseable dates, take the last element.
  return best ?? points[points.length - 1];
}

export async function GET(): Promise<Response> {
  const url =
    "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01156000&parameterCd=00060,00065";

  const res = await fetch(url, {
    headers: { "User-Agent": userAgent(), Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    return Response.json(
      { error: "Failed to fetch USGS river data" },
      { status: 502 },
    );
  }

  const json = (await res.json()) as UsgsResponse;

  const timeSeries =
    json.value?.[0]?.timeSeries?.filter(Boolean) ??
    ([] as UsgsTimeSeries[]);

  const flowSeries = timeSeries.find((s) =>
    s.variable?.variableCode?.endsWith("00060"),
  );
  const gageSeries = timeSeries.find((s) =>
    s.variable?.variableCode?.endsWith("00065"),
  );

  const flowPoint = latestPoint(flowSeries?.values?.value);
  const gagePoint = latestPoint(gageSeries?.values?.value);

  if (
    !flowPoint?.value ||
    !gagePoint?.value ||
    !flowPoint.dateTime ||
    !gagePoint.dateTime
  ) {
    return Response.json(
      { error: "Missing USGS river fields" },
      { status: 502 },
    );
  }

  const flow = Number(flowPoint.value);
  const gageHeight = Number(gagePoint.value);

  if (Number.isNaN(flow) || Number.isNaN(gageHeight)) {
    return Response.json(
      { error: "Invalid USGS numeric values" },
      { status: 502 },
    );
  }

  const flowTimeMs = Date.parse(flowPoint.dateTime);
  const gageTimeMs = Date.parse(gagePoint.dateTime);
  const timestamp =
    Number.isNaN(flowTimeMs) || flowTimeMs < gageTimeMs
      ? gagePoint.dateTime
      : flowPoint.dateTime;

  const payload: RiverResponse = {
    flow,
    gageHeight,
    timestamp,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

