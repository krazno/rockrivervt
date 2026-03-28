import { DAILY_NOTES, type DailyNoteRecord } from "@/content/daily-notes";
import { crowdReportDateString } from "@/lib/crowd/date";
import { getSiteImages } from "@/data/media";
import {
  HOME_SEASON_NOTE,
  homeSeasonFromMonth,
  vermontCalendarMonth,
} from "@/lib/home-seasonal";

export type DailyPulseKind = "today" | "latest_since" | "archive_only";

export type DailyPulsePhoto = {
  src: string;
  alt: string;
};

export type DailyPulsePayload = {
  /** Vermont calendar date string for “today” when the payload was built. */
  vermontToday: string;
  note: DailyNoteRecord;
  kind: DailyPulseKind;
  photo: DailyPulsePhoto;
  /** Seasonal honesty line (derived from month in Vermont). */
  seasonalLine: string;
};

function sortNotesDesc(a: DailyNoteRecord, b: DailyNoteRecord): number {
  return b.date.localeCompare(a.date);
}

export function getAllDailyNotesSorted(): DailyNoteRecord[] {
  return [...DAILY_NOTES].sort(sortNotesDesc);
}

function pickPhotoForNote(note: DailyNoteRecord): DailyPulsePhoto {
  if (note.photoSrc) {
    return {
      src: note.photoSrc,
      alt: note.photoAlt ?? "Rock River — Newfane, Vermont",
    };
  }
  const images = getSiteImages();
  if (images.length === 0) {
    return {
      src: "/media/images/rock-river-newfane-vermont-outdoors-010.jpg",
      alt: "Rock River trail and river — Windham County, Vermont",
    };
  }
  let h = 5381;
  for (let i = 0; i < note.date.length; i++) {
    h = (h * 33) ^ note.date.charCodeAt(i);
  }
  const idx = Math.abs(h) % images.length;
  const img = images[idx];
  return { src: img.src, alt: img.alt };
}

/**
 * Choose the note to show: today’s entry if present, else the newest on or before today, else newest in file.
 */
export function resolvePulseNote(vermontToday: string): {
  note: DailyNoteRecord;
  kind: DailyPulseKind;
} {
  const sorted = getAllDailyNotesSorted();
  if (sorted.length === 0) {
    return {
      note: {
        date: vermontToday,
        headline: "Quiet on the journal",
        body:
          "No field note is filed for today yet—use the live weather, river, and map tools above, and check back after the next update.",
      },
      kind: "archive_only",
    };
  }

  const todayHit = sorted.find((n) => n.date === vermontToday);
  if (todayHit) {
    return { note: todayHit, kind: "today" };
  }

  const onOrBefore = sorted.filter((n) => n.date <= vermontToday);
  if (onOrBefore.length > 0) {
    return { note: onOrBefore[0], kind: "latest_since" };
  }

  return { note: sorted[0], kind: "archive_only" };
}

export function getDailyPulsePayload(now = new Date()): DailyPulsePayload {
  const vermontToday = crowdReportDateString(now);
  const { note, kind } = resolvePulseNote(vermontToday);
  const month = vermontCalendarMonth(now);
  const seasonalLine = HOME_SEASON_NOTE[homeSeasonFromMonth(month)];

  return {
    vermontToday,
    note,
    kind,
    photo: pickPhotoForNote(note),
    seasonalLine,
  };
}

export function formatNoteDateForDisplay(
  dateStr: string,
  timeZone = "America/New_York",
): string {
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function pulseKindLabel(kind: DailyPulseKind): string {
  if (kind === "today") return "Today’s note";
  if (kind === "latest_since") return "Latest field note";
  return "From the journal";
}
