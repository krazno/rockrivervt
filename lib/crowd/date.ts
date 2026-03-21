/**
 * "Today" for crowd reporting uses UTC calendar date so server behavior is consistent
 * across regions. Swap to `America/New_York` later if product should key on local VT day.
 */
export function utcReportDateString(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}
