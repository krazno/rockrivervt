/**
 * Field notes for /daily-updates and the home “Today at Rock River” pulse.
 *
 * How to update:
 * - Add a new object at the **top** of the array (newest first is fine; we sort by date).
 * - Use Vermont calendar date `YYYY-MM-DD` (America/New_York), same as crowd reporting.
 * - Keep headlines short; body is one or two calm sentences. Plain text only (use two sentences instead of markdown).
 * - Optional `photoSrc` / `photoAlt` override the automatic “photo for that day” pick.
 */

export type DailyNoteRecord = {
  date: string;
  headline: string;
  body: string;
  photoSrc?: string;
  photoAlt?: string;
};

export const DAILY_NOTES: DailyNoteRecord[] = [
  {
    date: "2026-03-27",
    headline: "Cool and clear",
    body:
      "Late March still feels like shoulder season at the pools—cold water, quieter banks. If you go, dress for wind in the corridor and read the river before you wade.",
  },
  {
    date: "2026-03-22",
    headline: "After the rain",
    body:
      "Any stretch of heavy rain can push the river up fast here. If flows look beefy or the water’s tan, it’s fine to walk the trail and skip the swim.",
  },
  {
    date: "2026-03-15",
    headline: "Mud season manners",
    body:
      "Soft trail edges are normal—stay centered where you can, pass slow, and let wet spots recover instead of cutting a new line around them.",
  },
];
