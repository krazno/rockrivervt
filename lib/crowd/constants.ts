/**
 * Fixed areas and crowd levels for Rock River crowd reporting.
 * Baseline defaults are used when no row exists in `crowd_daily_baselines` for that date.
 */

export const CROWD_AREA_KEYS = [
  "parking",
  "trails",
  "family_beach",
  "third_beach",
  "fifth_beach",
] as const;

export type CrowdAreaKey = (typeof CROWD_AREA_KEYS)[number];

export const CROWD_LEVELS = [
  "calm",
  "light",
  "steady",
  "active",
  "busy",
] as const;

export type CrowdLevel = (typeof CROWD_LEVELS)[number];

/** Low → high; used for numeric blend and round-trip mapping. */
export const CROWD_LEVEL_ORDER: readonly CrowdLevel[] = CROWD_LEVELS;

/** Human-readable labels for UI (title case). */
export const CROWD_AREA_LABEL: Record<CrowdAreaKey, string> = {
  parking: "Parking",
  trails: "Trails",
  family_beach: "Family beach",
  third_beach: "Third beach",
  fifth_beach: "Fifth beach",
};

/** Homepage / widget copy (API summaries still use `CROWD_AREA_LABEL`). */
export const CROWD_WIDGET_AREA_LABEL: Record<CrowdAreaKey, string> = {
  parking: "Parking",
  trails: "Trails",
  family_beach: "Family Beach",
  third_beach: "Clothing Optional Beach (3rd)",
  fifth_beach: "Clothing Optional Beach (5th)",
};

/** Default baseline when no DB row exists for (date, area). */
export const DEFAULT_BASELINE_LEVEL_BY_AREA: Record<CrowdAreaKey, CrowdLevel> = {
  parking: "steady",
  trails: "steady",
  family_beach: "steady",
  third_beach: "steady",
  fifth_beach: "steady",
};

export const CROWD_LEVEL_LABEL: Record<CrowdLevel, string> = {
  calm: "Calm",
  light: "Light",
  steady: "Steady",
  active: "Active",
  busy: "Busy",
};

/** Optional UI tokens (Tailwind-friendly) — safe to adjust for the widget later. */
export const CROWD_LEVEL_TONE: Record<
  CrowdLevel,
  { text: string; bg: string; border: string }
> = {
  calm: {
    text: "text-[#2d4f5c]",
    bg: "bg-[#e8f4f2]",
    border: "border-[#b8d4ce]",
  },
  light: {
    text: "text-[#2f5238]",
    bg: "bg-[#e8f2e6]",
    border: "border-[#b8cbb8]",
  },
  steady: {
    text: "text-[#3d4f2d]",
    bg: "bg-[#eef3e4]",
    border: "border-[#c2cbb8]",
  },
  active: {
    text: "text-[#5a4a1a]",
    bg: "bg-[#f5f0e0]",
    border: "border-[#d4c89a]",
  },
  busy: {
    text: "text-[#6b2f24]",
    bg: "bg-[#f7ece8]",
    border: "border-[#d4b4a8]",
  },
};
