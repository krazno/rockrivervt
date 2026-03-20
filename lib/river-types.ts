export type ClarityStatus = "clear" | "slightly_murky" | "murky";
export type CleanlinessStatus = "good" | "fair" | "poor";

export type RiverApiResponse = {
  ok: boolean;
  error?: string;
  /** USGS site used for proxy gauge readings */
  siteId: string;
  /** Human-readable site name from USGS when available */
  siteName: string | null;
  /** Short label for UI — not a Rock River sensor */
  dataLabel: string;
  /** Longer transparency copy for the widget */
  transparencyNote: string;
  /** True when at least one USGS proxy value (flow or gage) is available */
  proxyGaugeAvailable: boolean;
  flowCfs: number | null;
  gageHeightFt: number | null;
  /** ISO timestamp of the latest USGS proxy measurement when available */
  timestampIso: string | null;
  /** NWS air temperature (°F) used for the estimate, when available */
  airTemperatureUsedF: number | null;
  /** Conservative estimate — never presented as in-river measurement */
  estimatedWaterTempF: number | null;
  estimatedWaterTempSummary: string | null;
  /** When estimates were computed on the server (ISO), for transparency */
  estimatesAsOfIso: string | null;
  /** Editable site status — not laboratory or sensor data */
  clarityStatus: ClarityStatus;
  cleanlinessStatus: CleanlinessStatus;
};
