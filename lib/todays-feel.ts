import type { ClarityStatus } from "@/lib/river-types";

export type TodaysFeelInput = {
  loading: boolean;
  /** America/New_York “now” */
  month: number;
  airTempF: number | null;
  shortForecast: string | null;
  waterLine: string;
  beachLine: string;
  visitWindowSummary: string | null;
  flowCfs: number | null;
  clarityStatus: ClarityStatus | null;
};

export type TodaysFeel = {
  /** Primary honest read */
  line: string;
  /** Optional quieter second line */
  aside?: string;
};

/**
 * One calm synthesis from live-ish snapshot data — not a safety oracle.
 * Copy stays modest: screens ≠ standing on the bank.
 */
export function buildTodaysFeel(input: TodaysFeelInput): TodaysFeel {
  if (input.loading) {
    return {
      line: "Today’s honest read lands in a moment—forecast, proxy river, and check-ins still catching up.",
    };
  }

  const f = (input.shortForecast ?? "").toLowerCase();

  if (f.includes("thunder") || f.includes("tornado")) {
    return {
      line: "Storms in the sky mean extra patience at the water—this isn’t a swim recommendation from a distance.",
      aside: "If it’s electric nearby, wait it out on shore.",
    };
  }

  if (f.includes("snow") || f.includes("sleet") || f.includes("blizzard")) {
    return {
      line: "Wintery sky in the forecast—river margins get slick fast; treat any visit as a careful walk, not a splash day.",
    };
  }

  const water = input.waterLine.toLowerCase();
  if (water.includes("very cold") || water.includes("cold")) {
    return {
      line: "Water’s still bluntly cold next to whatever the air feels like—plan for a short dip or wading, not a long float.",
      aside: input.visitWindowSummary ?
        `Calmer window on paper: ${input.visitWindowSummary.toLowerCase()}.`
      : undefined,
    };
  }

  const beach = input.beachLine.toLowerCase();
  if (beach.includes("unknown") || beach.includes("check-ins will") || beach.includes("loading")) {
    return {
      line: "Shoreline mood is thin on check-ins today—assume a friendly mix and leave extra room in the parking pull-offs.",
      aside: "Crowd check-ins help the next car; they’re optional and anonymous.",
    };
  }

  if (beach.includes("very high") || beach.includes("busy at beaches")) {
    return {
      line: "Check-ins suggest a fuller shoreline—slower parking and a little extra courtesy go a long way.",
      aside: "Still your read when you arrive; people come and go.",
    };
  }

  if (input.clarityStatus === "murky" || input.clarityStatus === "slightly_murky") {
    return {
      line: "Clarity at our upstream proxy isn’t glassy—worth eyeballing the pool yourself before you commit.",
    };
  }

  if (typeof input.flowCfs === "number" && input.flowCfs >= 900) {
    return {
      line: "Flow is elevated at the proxy gauge—expect livelier water and sober footing on slick rocks.",
    };
  }

  const m = input.month;
  if ((m === 6 || m === 7 || m === 8) && typeof input.airTempF === "number" && input.airTempF >= 78) {
    return {
      line: "Classic summer air on the forecast—still cold water and real rocks underneath; the fun is honest, not cushioned.",
      aside: input.visitWindowSummary ? `Gentler window: ${input.visitWindowSummary}.` : undefined,
    };
  }

  if ((m === 10 || m === 11) && typeof input.airTempF === "number" && input.airTempF <= 52) {
    return {
      line: "Late-season chill—shorter days and colder water reward a lighter pack and a quicker pace back to the car.",
    };
  }

  if (input.visitWindowSummary) {
    return {
      line: `On paper, ${input.visitWindowSummary.toLowerCase()}—use it as a nudge, not a promise.`,
      aside: "The river only answers to what you see at the bank.",
    };
  }

  return {
    line: "Snapshot’s steady; the honest read still happens when your boots hit the gravel and you look upstream.",
    aside: "No substitute for standing there.",
  };
}

export function vermontMonth(now: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      timeZone: "America/New_York",
    }).format(now),
  );
}
