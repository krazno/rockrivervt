import {
  CROWD_AREA_KEYS,
  CROWD_LEVELS,
  type CrowdAreaKey,
  type CrowdLevel,
} from "@/lib/crowd/constants";
import type { CrowdReportPostBody } from "@/lib/crowd/types";

const AREA_SET = new Set<string>(CROWD_AREA_KEYS);
const LEVEL_SET = new Set<string>(CROWD_LEVELS);

export function isCrowdAreaKey(v: unknown): v is CrowdAreaKey {
  return typeof v === "string" && AREA_SET.has(v);
}

export function isCrowdLevel(v: unknown): v is CrowdLevel {
  return typeof v === "string" && LEVEL_SET.has(v);
}

const DEVICE_ID_RE = /^[a-zA-Z0-9_-]{8,128}$/;

export function isValidDeviceId(v: unknown): v is string {
  return typeof v === "string" && DEVICE_ID_RE.test(v);
}

/**
 * Parse and validate POST JSON. Returns `null` if invalid.
 */
export function parseCrowdReportBody(
  body: unknown,
): { ok: true; value: CrowdReportPostBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid JSON body" };
  }

  const o = body as Record<string, unknown>;
  const deviceId = o.deviceId;

  if (!isValidDeviceId(deviceId)) {
    return {
      ok: false,
      error:
        "deviceId is required (8–128 chars: letters, numbers, underscore, hyphen)",
    };
  }

  const areasRaw = o.areas;
  if (!areasRaw || typeof areasRaw !== "object" || Array.isArray(areasRaw)) {
    return { ok: false, error: "areas must be a non-empty object" };
  }

  const areas: Partial<Record<CrowdAreaKey, CrowdLevel>> = {};
  for (const [k, v] of Object.entries(areasRaw)) {
    if (!isCrowdAreaKey(k)) {
      return { ok: false, error: `Unknown area key: ${k}` };
    }
    if (!isCrowdLevel(v)) {
      return { ok: false, error: `Invalid level for ${k}` };
    }
    areas[k] = v;
  }

  if (Object.keys(areas).length === 0) {
    return { ok: false, error: "Submit at least one area rating" };
  }

  let displayName: string | null | undefined = undefined;
  if ("displayName" in o) {
    const dn = o.displayName;
    if (dn === null || dn === undefined) {
      displayName = null;
    } else if (typeof dn === "string") {
      const t = dn.trim();
      displayName = t.length === 0 ? null : t.slice(0, 64);
    } else {
      return { ok: false, error: "displayName must be a string or null" };
    }
  }

  return {
    ok: true,
    value: {
      deviceId,
      displayName,
      areas,
    },
  };
}
