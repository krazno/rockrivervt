type WeatherResponse = {
  temperature: number;
  shortForecast: string;
  icon: string;
  detailedForecast: string;
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
  };
};

type NwsPeriod = {
  startTime?: string;
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

  const period = forecastJson.properties?.periods?.[0];
  const hourlyPeriods = forecastHourlyJson.properties?.periods ?? [];

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
    nextFourHours,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

