type ForecastDaySlice = {
  shortForecast: string;
  high: number | null;
  low: number | null;
};

type WeatherResponse = {
  temperature: number;
  shortForecast: string;
  icon: string;
  detailedForecast: string;
  hourlyForecastUrl: string;
  /** IANA timezone for the forecast point (e.g. America/New_York). */
  timezone: string;
  /** Today, tomorrow, and the following calendar day in `timezone`, in order. */
  threeDayForecast: [ForecastDaySlice, ForecastDaySlice, ForecastDaySlice];
  nextFourHours: Array<{
    startTime: string;
    temperature: number;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    icon: string;
    probabilityOfPrecipitation: number | null;
  }>;
};

type NwsPointsResponse = {
  properties?: {
    forecast?: string;
    forecastHourly?: string;
    /** IANA timezone for the grid point. */
    timezone?: string;
  };
};

type NwsPeriod = {
  startTime?: string;
  isDaytime?: boolean;
  temperature?: number;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
  icon?: string;
  detailedForecast?: string;
  probabilityOfPrecipitation?: {
    value?: number | null;
  };
};

type NwsForecastResponse = {
  properties?: {
    periods?: NwsPeriod[];
  };
};

function userAgent() {
  // NWS requires a descriptive User-Agent for higher reliability.
  return "rockrivervt.com (unofficial community guide)";
}

function dateKeyInTimeZone(iso: string, timeZone: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-CA", { timeZone });
}

function emptyForecastDay(): ForecastDaySlice {
  return { shortForecast: "—", high: null, low: null };
}

function buildThreeDayForecast(
  periods: NwsPeriod[],
  timeZone: string,
): [ForecastDaySlice, ForecastDaySlice, ForecastDaySlice] {
  /** Calendar days in `timeZone` starting from “now” (today + next two). */
  const dayKeys = [0, 1, 2].map((offset) => {
    const t = new Date(Date.now() + offset * 86400000);
    return t.toLocaleDateString("en-CA", { timeZone });
  });

  const byDay = new Map<
    string,
    { temps: number[]; dayForecast?: string; anyForecast?: string }
  >();

  for (const p of periods) {
    if (
      !p.startTime ||
      typeof p.temperature !== "number" ||
      typeof p.shortForecast !== "string"
    ) {
      continue;
    }
    const key = dateKeyInTimeZone(p.startTime, timeZone);
    if (!key) continue;

    const bucket = byDay.get(key) ?? { temps: [] };
    bucket.temps.push(p.temperature);
    if (p.isDaytime === true && !bucket.dayForecast) {
      bucket.dayForecast = p.shortForecast;
    }
    if (!bucket.anyForecast) {
      bucket.anyForecast = p.shortForecast;
    }
    byDay.set(key, bucket);
  }

  const sliceForKey = (key: string): ForecastDaySlice => {
    const bucket = byDay.get(key);
    if (!bucket || bucket.temps.length === 0) {
      return emptyForecastDay();
    }
    const high = Math.max(...bucket.temps);
    const low = Math.min(...bucket.temps);
    const shortForecast =
      bucket.dayForecast ?? bucket.anyForecast ?? "—";
    return {
      shortForecast,
      high,
      low,
    };
  };

  return [
    sliceForKey(dayKeys[0]),
    sliceForKey(dayKeys[1]),
    sliceForKey(dayKeys[2]),
  ];
}

export async function GET(): Promise<Response> {
  const pointsUrl = "https://api.weather.gov/points/42.98,-72.66";

  const pointsRes = await fetch(pointsUrl, {
    headers: { "User-Agent": userAgent(), Accept: "application/json" },
    cache: "no-store",
  });

  if (!pointsRes.ok) {
    return Response.json(
      { error: "Failed to fetch NWS points" },
      { status: 502 },
    );
  }

  const pointsJson = (await pointsRes.json()) as NwsPointsResponse;
  const forecastUrl: string | undefined = pointsJson.properties?.forecast;
  const forecastHourlyUrl: string | undefined =
    pointsJson.properties?.forecastHourly;

  if (!forecastUrl || !forecastHourlyUrl) {
    return Response.json(
      { error: "Missing NWS forecast URLs" },
      { status: 502 },
    );
  }

  const [forecastRes, forecastHourlyRes] = await Promise.all([
    fetch(forecastUrl, {
      headers: { "User-Agent": userAgent(), Accept: "application/json" },
      cache: "no-store",
    }),
    fetch(forecastHourlyUrl, {
      headers: { "User-Agent": userAgent(), Accept: "application/json" },
      cache: "no-store",
    }),
  ]);

  if (!forecastRes.ok || !forecastHourlyRes.ok) {
    return Response.json(
      { error: "Failed to fetch NWS forecast data" },
      { status: 502 },
    );
  }

  const [forecastJson, forecastHourlyJson] = (await Promise.all([
    forecastRes.json(),
    forecastHourlyRes.json(),
  ])) as [NwsForecastResponse, NwsForecastResponse];

  const dailyPeriods = forecastJson.properties?.periods ?? [];
  const period = dailyPeriods[0];
  const hourlyPeriods = forecastHourlyJson.properties?.periods ?? [];
  const timeZone = pointsJson.properties?.timezone ?? "America/New_York";

  if (!period) {
    return Response.json(
      { error: "Missing NWS forecast period" },
      { status: 502 },
    );
  }

  if (
    typeof period.temperature !== "number" ||
    typeof period.shortForecast !== "string" ||
    typeof period.icon !== "string" ||
    typeof period.detailedForecast !== "string"
  ) {
    return Response.json(
      { error: "Missing NWS forecast fields" },
      { status: 502 },
    );
  }

  const threeDayForecast = buildThreeDayForecast(dailyPeriods, timeZone);

  const nextFourHours = hourlyPeriods
    .slice(0, 4)
    .filter(
      (p): p is NwsPeriod =>
        typeof p.startTime === "string" &&
        typeof p.temperature === "number" &&
        typeof p.windSpeed === "string" &&
        typeof p.windDirection === "string" &&
        typeof p.shortForecast === "string" &&
        typeof p.icon === "string",
    )
    .map((p) => ({
      startTime: p.startTime!,
      temperature: p.temperature!,
      windSpeed: p.windSpeed!,
      windDirection: p.windDirection!,
      shortForecast: p.shortForecast!,
      icon: p.icon!,
      probabilityOfPrecipitation:
        typeof p.probabilityOfPrecipitation?.value === "number"
          ? p.probabilityOfPrecipitation.value
          : null,
    }));

  const payload: WeatherResponse = {
    temperature: period.temperature,
    shortForecast: period.shortForecast,
    icon: period.icon,
    detailedForecast: period.detailedForecast,
    hourlyForecastUrl: forecastHourlyUrl,
    timezone: timeZone,
    threeDayForecast,
    nextFourHours,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

