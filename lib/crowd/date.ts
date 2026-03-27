/**
 * Calendar "today" for crowd reporting uses America/New_York so it matches how
 * most visitors think about a Vermont river day (not UTC midnight).
 */
const CROWD_REPORT_TZ = "America/New_York";

export function crowdReportDateString(d = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CROWD_REPORT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);

  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  if (!y || !m || !day) {
    return d.toISOString().slice(0, 10);
  }
  return `${y}-${m}-${day}`;
}

/** @deprecated Use crowdReportDateString — kept for any external imports. */
export function utcReportDateString(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}
