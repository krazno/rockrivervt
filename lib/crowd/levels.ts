import {
  CROWD_LEVEL_ORDER,
  type CrowdLevel,
} from "@/lib/crowd/constants";

const MAX = CROWD_LEVEL_ORDER.length - 1;

export function crowdLevelToNumeric(level: CrowdLevel): number {
  const i = CROWD_LEVEL_ORDER.indexOf(level);
  if (i === -1) {
    throw new Error(`Invalid crowd level: ${String(level)}`);
  }
  return i;
}

export function numericToCrowdLevel(n: number): CrowdLevel {
  const rounded = Math.round(n);
  const clamped = Math.max(0, Math.min(MAX, rounded));
  return CROWD_LEVEL_ORDER[clamped]!;
}

/**
 * Baseline counts as weight 2; each user report counts as weight 1.
 * Returns a fractional index before rounding to the nearest `CrowdLevel`.
 */
export function blendCrowdNumeric(
  baselineNumeric: number,
  reportNumerics: number[],
): number {
  const n = reportNumerics.length;
  if (n === 0) return baselineNumeric;

  const weightBaseline = 2;
  const weightEach = 1;
  let sum = weightBaseline * baselineNumeric;
  for (const r of reportNumerics) {
    sum += weightEach * r;
  }
  const denom = weightBaseline + n * weightEach;
  return sum / denom;
}

export function blendedCrowdLevel(
  baselineNumeric: number,
  reportNumerics: number[],
): CrowdLevel {
  const v = blendCrowdNumeric(baselineNumeric, reportNumerics);
  return numericToCrowdLevel(v);
}
