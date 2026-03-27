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
 * One row in `crowd_reports` — anonymous submission; multiple per device per calendar day allowed
 * (day = America/New_York). Requires migration `0002_crowd_multiple_reports_per_device.sql` applied.
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
  /** Present on successful GET; false only when `/api/crowd` returns 503 (missing Supabase env). */
  configured: true;
  /** Eastern (America/New_York) calendar date for this summary (YYYY-MM-DD). */
  reportDate: string;
  /** “Today” follows Vermont-local calendar date, not UTC midnight. */
  dateScope: "America/New_York";
  /** Rows in `crowd_reports` for this calendar day (each row is one check-in). */
  totalReportsToday: number;
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
  configured: true;
  submissionId: string;
  reportDate: string;
  /** Count of rows for `reportDate` after insert; omitted if the follow-up count query failed. */
  totalReportsToday?: number;
};
