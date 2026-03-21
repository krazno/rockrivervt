import {
  CROWD_AREA_KEYS,
  CROWD_AREA_LABEL,
  DEFAULT_BASELINE_LEVEL_BY_AREA,
  type CrowdAreaKey,
  type CrowdLevel,
} from "@/lib/crowd/constants";
import type { CrowdBlendSource, CrowdAreaSummary } from "@/lib/crowd/types";
import { crowdLevelToNumeric, blendedCrowdLevel } from "@/lib/crowd/levels";

export function resolveBaselineLevel(
  areaKey: CrowdAreaKey,
  baselineByArea: Partial<Record<CrowdAreaKey, CrowdLevel>>,
): CrowdLevel {
  const fromDb = baselineByArea[areaKey];
  if (fromDb) return fromDb;
  return DEFAULT_BASELINE_LEVEL_BY_AREA[areaKey];
}

/**
 * Build per-area summaries from baseline map + today’s report area ratings.
 */
export function buildCrowdSummaries(
  baselineByArea: Partial<Record<CrowdAreaKey, CrowdLevel>>,
  /** For each area, list of crowd levels reported today (one per contributing submission for that area). */
  reportLevelsByArea: Record<CrowdAreaKey, CrowdLevel[]>,
): CrowdAreaSummary[] {
  return CROWD_AREA_KEYS.map((areaKey) => {
    const baselineLevel = resolveBaselineLevel(areaKey, baselineByArea);
    const reports = reportLevelsByArea[areaKey] ?? [];
    const reportCount = reports.length;

    const baselineN = crowdLevelToNumeric(baselineLevel);
    const reportNs = reports.map((l) => crowdLevelToNumeric(l));

    let displayedLevel: CrowdLevel;
    let blendSource: CrowdBlendSource;

    if (reportCount === 0) {
      displayedLevel = baselineLevel;
      blendSource = "baseline_only";
    } else {
      displayedLevel = blendedCrowdLevel(baselineN, reportNs);
      blendSource = "blended";
    }

    return {
      areaKey,
      label: CROWD_AREA_LABEL[areaKey],
      displayedLevel,
      baselineLevel,
      reportCount,
      blendSource,
    };
  });
}
