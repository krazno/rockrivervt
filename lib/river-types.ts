export type ClarityStatus = "clear" | "slightly_murky" | "murky";
export type CleanlinessStatus = "good" | "fair" | "poor";

export type RiverApiResponse = {
  ok: boolean;
  error?: string;
  siteId: string;
  siteName: string | null;
  dataLabel: string;
  transparencyNote: string;
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
