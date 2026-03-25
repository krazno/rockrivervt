import type { CrowdAreaKey, CrowdLevel } from "@/lib/crowd/constants";
import type { CrowdAreaSummary } from "@/lib/crowd/types";
import { crowdLevelToNumeric } from "@/lib/crowd/levels";

export type ParkingDifficulty = "easy" | "moderate" | "hard" | "full";

export type WeatherHourSlice = {
  startTime: string;
  temperature: number;
  shortForecast: string;
  probabilityOfPrecipitation: number | null;
};

/** Map crowd “feel” for parking to a four-step parking hint (crowdsourced blend). */
export function parkingFromCrowdLevel(level: CrowdLevel): ParkingDifficulty {
  switch (level) {
    case "calm":
    case "light":
      return "easy";
    case "steady":
      return "moderate";
    case "active":
      return "hard";
    case "busy":
      return "full";
    default:
      return "moderate";
  }
}

function scoreHour(h: WeatherHourSlice): number {
  let s = 48;
  const f = h.shortForecast.toLowerCase();
  if (f.includes("thunder") || f.includes("tornado")) return -1000;
  if (f.includes("rain") || f.includes("drizzle")) s -= 28;
  if (f.includes("shower")) s -= 22;
  if (f.includes("snow") || f.includes("sleet")) s -= 45;
  if (f.includes("fog")) s -= 8;

  if (typeof h.probabilityOfPrecipitation === "number") {
    s -= Math.min(35, h.probabilityOfPrecipitation * 0.35);
  }

  const t = h.temperature;
  if (t >= 68 && t <= 88) s += 14;
  else if (t >= 60 && t < 68) s += 6;
  else if (t >= 45 && t < 60) s += 0;
  else if (t < 40) s -= 12;
  else if (t > 92) s -= 8;

  if (
    f.includes("clear") ||
    f.includes("sunny") ||
    f.includes("fair")
  ) {
    s += 8;
  }

  return s;
}

/** Best contiguous 2–4 hour window in `hours` (NWS order). */
export function bestVisitWindow(
  hours: WeatherHourSlice[],
  timeZone: string,
):
  | {
      startLabel: string;
      endLabel: string;
      summary: string;
      periodPhrase: string;
    }
  | null {
  const n = hours.length;
  if (n < 2) return null;

  let bestScore = -Infinity;
  let bestLen = 2;
  let bestI = 0;

  for (let len = 2; len <= Math.min(4, n); len++) {
    for (let i = 0; i + len <= n; i++) {
      let sum = 0;
      for (let k = 0; k < len; k++) {
        sum += scoreHour(hours[i + k]!);
      }
      if (sum > bestScore) {
        bestScore = sum;
        bestLen = len;
        bestI = i;
      }
    }
  }

  if (bestScore < -500) return null;

  const first = hours[bestI]!;
  const last = hours[bestI + bestLen - 1]!;
  const startD = new Date(first.startTime);
  const endD = new Date(new Date(last.startTime).getTime() + 60 * 60 * 1000);

  const hm: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: startD.getMinutes() !== 0 ? "numeric" : undefined,
    timeZone,
  };
  const startLabel = startD.toLocaleTimeString("en-US", {
    ...hm,
    hour12: true,
  });
  const endLabel = endD.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: endD.getMinutes() !== 0 ? "numeric" : undefined,
    hour12: true,
    timeZone,
  });

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    }).format(startD),
  );

  let periodPhrase = "Midday";
  if (hour < 12) periodPhrase = "Morning";
  else if (hour >= 17) periodPhrase = "Evening";

  const calm =
    !first.shortForecast.toLowerCase().includes("storm") &&
    bestScore > 55;
  const summary =
    calm && periodPhrase === "Morning"
      ? "Morning calm"
      : calm
        ? `${periodPhrase} looks gentle`
        : `${periodPhrase} window`;

  return {
    startLabel,
    endLabel,
    summary,
    periodPhrase,
  };
}

export function waterComfortPhrase(estimatedF: number | null): string {
  if (estimatedF === null || Number.isNaN(estimatedF)) {
    return "Water temp — estimate loading or unavailable";
  }
  if (estimatedF < 58) return "Water very cold";
  if (estimatedF < 65) return "Water cold";
  if (estimatedF < 72) return "Water brisk";
  if (estimatedF < 78) return "Water comfortable for a dip";
  return "Water warm";
}

const BEACH_KEYS: CrowdAreaKey[] = [
  "family_beach",
  "third_beach",
  "fifth_beach",
];

export function beachCrowdPhrase(summaries: CrowdAreaSummary[]): string {
  const rows = summaries.filter((s) => BEACH_KEYS.includes(s.areaKey));
  if (rows.length === 0) return "Beaches unknown—check-ins will refine this";

  let sum = 0;
  for (const r of rows) {
    sum += crowdLevelToNumeric(r.displayedLevel);
  }
  const avg = sum / rows.length;

  if (avg < 1.4) return "Crowd low at beaches";
  if (avg < 2.4) return "Crowd moderate at beaches";
  if (avg < 3.4) return "Crowd busy at beaches";
  return "Crowd very high at beaches";
}

export function findParkingSummary(
  summaries: CrowdAreaSummary[],
): CrowdAreaSummary | undefined {
  return summaries.find((s) => s.areaKey === "parking");
}
