/**
 * Editable site status defaults for the Rock River guide (not sensor data).
 * Change these values to reflect trail reports, steward notes, or seasonality.
 */
import type { CleanlinessStatus, ClarityStatus } from "@/lib/river-types";

export const RIVER_CLARITY_DEFAULT: ClarityStatus = "clear";
export const RIVER_CLEANLINESS_DEFAULT: CleanlinessStatus = "good";

export const CLARITY_DISPLAY: Record<ClarityStatus, string> = {
  clear: "Clear",
  slightly_murky: "Slightly murky",
  murky: "Murky",
};

export const CLEANLINESS_DISPLAY: Record<CleanlinessStatus, string> = {
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};
