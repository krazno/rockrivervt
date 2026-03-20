/**
 * Fetches NWS grid air temperature for the same point used by /api/weather
 * (Rock River / Newfane area). Used for conservative water-temperature estimates only.
 */

const POINTS_URL = "https://api.weather.gov/points/42.98,-72.66";

function userAgent() {
  return "rockrivervt.com (unofficial community guide)";
}

type NwsPointsResponse = {
  properties?: {
    forecast?: string;
    timezone?: string;
  };
};

type NwsForecastResponse = {
  properties?: {
    periods?: Array<{ temperature?: number }>;
  };
};

export type NwsAirTemperatureResult = {
  airTempF: number;
  timezone: string;
};

export async function fetchNwsAirTemperature(): Promise<NwsAirTemperatureResult | null> {
  try {
    const pointsRes = await fetch(POINTS_URL, {
      headers: { "User-Agent": userAgent(), Accept: "application/json" },
      cache: "no-store",
    });
    if (!pointsRes.ok) return null;

    const pointsJson = (await pointsRes.json()) as NwsPointsResponse;
    const forecastUrl = pointsJson.properties?.forecast;
    const timezone = pointsJson.properties?.timezone ?? "America/New_York";
    if (!forecastUrl) return null;

    const forecastRes = await fetch(forecastUrl, {
      headers: { "User-Agent": userAgent(), Accept: "application/json" },
      cache: "no-store",
    });
    if (!forecastRes.ok) return null;

    const forecastJson = (await forecastRes.json()) as NwsForecastResponse;
    const air = forecastJson.properties?.periods?.[0]?.temperature;
    if (typeof air !== "number" || Number.isNaN(air)) return null;

    return { airTempF: air, timezone };
  } catch {
    return null;
  }
}
