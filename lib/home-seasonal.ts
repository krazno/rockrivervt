/** Calendar month in America/New_York (1–12). */
export function vermontCalendarMonth(now = new Date()): number {
  const m = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "numeric",
  }).format(now);
  return parseInt(m, 10);
}

export type HomeSeasonKind = "spring" | "summer" | "fall" | "winter";

export function homeSeasonFromMonth(m: number): HomeSeasonKind {
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "fall";
  return "winter";
}

/** Short line for the “today” strip. */
export const HOME_SEASON_STRIP: Record<HomeSeasonKind, string> = {
  spring: "Spring flows change quickly—check the river before you wade.",
  summer: "Best swimming window—still read the river first.",
  fall: "Lower water, leaves underfoot—foliage is worth the slower pace.",
  winter: "Limited access—ice, short days, and quiet woods.",
};

/** Slightly longer note near conditions. */
export const HOME_SEASON_NOTE: Record<HomeSeasonKind, string> = {
  spring:
    "Spring can bring stronger flow after rain and snowmelt. Wading carefully and saving big jumps for calmer days is the usual move here.",
  summer:
    "Summer is when swimming here feels most natural—warm air, cold pockets in the pools. Check flow and clarity like any other river day.",
  fall:
    "Fall often brings lower water and great color. Rocks stay slick; take your time on the trail.",
  winter:
    "Winter is thin for river use—short light, ice at the edges, and most folks stick to quick walks or wait for spring.",
};
