import type { CrowdAreaKey, CrowdLevel } from "@/lib/crowd/constants";

/** One row in `crowd_daily_baselines` (manual per-day override). */
export type CrowdDailyBaselineRow = {
  id: string;
  report_date: string;
  area_key: CrowdAreaKey;
  level: CrowdLevel;
  created_at?: string;
};

/**
 * One row in `crowd_reports` — one submission per device per day, areas stored as JSON.
 */
export type CrowdReportRow = {
  id: string;
  created_at: string;
  report_date: string;
  device_id: string;
  display_name: string | null;
  /** Keys are `CrowdAreaKey`, values are `CrowdLevel`. */
  areas: Partial<Record<CrowdAreaKey, CrowdLevel>>;
};

export type CrowdBlendSource = "baseline_only" | "blended";

/** Per-area payload for GET /api/crowd */
export type CrowdAreaSummary = {
  areaKey: CrowdAreaKey;
  label: string;
  displayedLevel: CrowdLevel;
  baselineLevel: CrowdLevel;
  reportCount: number;
  blendSource: CrowdBlendSource;
};

export type CrowdSummaryResponse = {
  /** UTC calendar date used for this summary (YYYY-MM-DD). */
  reportDate: string;
  /** Hint for clients; “today” is computed in UTC in the API for consistency. */
  dateScope: "utc_day";
  areas: CrowdAreaSummary[];
};

/** POST body for /api/crowd */
export type CrowdReportPostBody = {
  /** Opaque client id (e.g. UUID stored in localStorage). Required. */
  deviceId: string;
  displayName?: string | null;
  /** One or more area → level ratings. */
  areas: Partial<Record<CrowdAreaKey, CrowdLevel>>;
};

export type CrowdReportPostResult = {
  ok: true;
  submissionId: string;
  reportDate: string;
};
