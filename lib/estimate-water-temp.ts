/**
 * Conservative stream-surface estimate from air temperature (not measured in-water).
 * Warmer air → apply a slightly larger offset so we do not overstate cold water risk.
 */

export function estimateWaterTempFromAirF(airTempF: number): {
  estimatedF: number;
  offsetF: number;
  summary: string;
} {
  const offsetF = airTempF >= 72 ? 7 : airTempF >= 55 ? 5 : airTempF >= 40 ? 4 : 3;
  const raw = airTempF - offsetF;
  const estimatedF = Math.round(Math.max(32, Math.min(90, raw)));

  return {
    estimatedF,
    offsetF,
    summary: `Estimated from NWS grid air temperature (${airTempF}°F) near Newfane, minus ${offsetF}°F as a conservative offset for shallow moving water. Not measured in Rock River.`,
  };
}
