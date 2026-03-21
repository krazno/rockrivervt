/**
 * Defensive labels for inconsistent Mapbox-exported GeoJSON properties.
 */

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getFeatureTitle(
  props: Record<string, unknown> | null | undefined,
): string {
  if (!props || typeof props !== "object") return "Feature";
  const direct = ["name", "title", "Name", "Title", "label", "Label"];
  for (const k of direct) {
    const v = props[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  for (const [k, v] of Object.entries(props)) {
    if (
      k.startsWith("marker-") ||
      k.startsWith("stroke") ||
      k.startsWith("fill")
    ) {
      continue;
    }
    if (v === "" || v === null || v === undefined) {
      const label = k.trim();
      if (label) return label;
    }
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "Feature";
}

export function getCategory(
  props: Record<string, unknown>,
  geometryType: string,
): string | null {
  const c = props.category ?? props.type ?? props.Type;
  if (typeof c === "string" && c.trim()) return c.trim();
  const g = geometryType.toLowerCase();
  if (g === "point" || g === "multipoint") return "Point";
  if (g === "linestring" || g === "multilinestring") return "Path";
  if (g === "polygon" || g === "multipolygon") return "Area";
  return null;
}

export function getDescription(props: Record<string, unknown>): string | null {
  const d =
    props.description ?? props.desc ?? props.Description ?? props.notes;
  if (typeof d === "string" && d.trim()) return d.trim();
  return null;
}
