import {
  LOCAL_PICKS,
  WEEKLY_RIVER_NOTES,
  type LocalPickEntry,
  type LocalPickKind,
  type WeeklyRiverNote,
} from "@/content/local-ecosystem";
import { crowdReportDateString } from "@/lib/crowd/date";

export function picksByKind(kind: LocalPickKind): LocalPickEntry[] {
  return LOCAL_PICKS.filter((p) => p.kinds.includes(kind));
}

export function picksForAfterRiver(): LocalPickEntry[] {
  const ids = new Set(
    LOCAL_PICKS.filter((p) => p.kinds.includes("after_visit")).map((p) => p.id),
  );
  return LOCAL_PICKS.filter((p) => ids.has(p.id));
}

/** Teaser: featured + diverse categories (max n). */
export function getHomeFeaturedPicks(n = 3): LocalPickEntry[] {
  const featured = picksByKind("featured");
  const out: LocalPickEntry[] = [];
  const seen = new Set<string>();
  const order: LocalPickEntry["category"][] = [
    "town",
    "food",
    "scenic",
    "coffee",
    "culture",
  ];
  for (const cat of order) {
    const hit = featured.find((p) => p.category === cat && !seen.has(p.id));
    if (hit) {
      out.push(hit);
      seen.add(hit.id);
    }
    if (out.length >= n) break;
  }
  for (const p of featured) {
    if (out.length >= n) break;
    if (!seen.has(p.id)) {
      out.push(p);
      seen.add(p.id);
    }
  }
  return out.slice(0, n);
}

/**
 * Active weekly note: Vermont `today` inside [validFrom, validTo], else most recent past window, else first.
 */
export function getWeeklyRiverNote(now = new Date()): WeeklyRiverNote {
  const today = crowdReportDateString(now);
  const inWindow = WEEKLY_RIVER_NOTES.filter(
    (w) => w.validFrom <= today && today <= w.validTo,
  );
  if (inWindow.length > 0) {
    return inWindow.sort((a, b) => b.validFrom.localeCompare(a.validFrom))[0]!;
  }
  const past = WEEKLY_RIVER_NOTES.filter((w) => w.validTo < today).sort(
    (a, b) => b.validTo.localeCompare(a.validTo),
  );
  if (past.length > 0) return past[0]!;
  return WEEKLY_RIVER_NOTES[0]!;
}

export function formatWeekWindow(note: WeeklyRiverNote): string {
  const fmt = (s: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    }).format(new Date(`${s}T12:00:00`));
  return `${fmt(note.validFrom)}–${fmt(note.validTo)}`;
}

/** Serializable for the home “This week” + intelligence strip (client). */
export type WeeklyRiverClientPayload = {
  headline: string;
  body: string;
  windowLabel: string;
};

export function weeklyRiverClientPayload(now = new Date()): WeeklyRiverClientPayload {
  const w = getWeeklyRiverNote(now);
  return {
    headline: w.headline,
    body: w.body,
    windowLabel: formatWeekWindow(w),
  };
}
