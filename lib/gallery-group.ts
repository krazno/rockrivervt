import type { MediaItem } from "@/data/media";

export type GalleryGroup = "trail" | "water" | "other";

/**
 * Group stills for display headings — derived from existing alt text only (no new claims).
 */
export function galleryGroupForItem(item: MediaItem): GalleryGroup {
  if (item.type !== "image") return "other";
  const a = item.alt.toLowerCase();
  const trailHints =
    a.includes("trail") ||
    a.includes("woods") ||
    a.includes("forest") ||
    a.includes("path") ||
    a.includes("hike") ||
    a.includes("hiker") ||
    a.includes("sign") && a.includes("trail");
  const waterHints =
    a.includes("pool") ||
    a.includes("swim") ||
    a.includes("swimming") ||
    a.includes("water") ||
    a.includes("shore") ||
    a.includes("stream") ||
    a.includes("river bank") ||
    a.includes("river corridor") ||
    a.includes("river,") ||
    a.includes("river in") ||
    a.includes("river bed") ||
    a.includes("riverbed") ||
    a.includes("shallows") ||
    a.includes("wading") ||
    a.includes("rock river");
  if (a.includes("sign") && trailHints) return "trail";
  if (trailHints && !waterHints) return "trail";
  if (waterHints) return "water";
  return "other";
}

export const GALLERY_GROUP_LABEL: Record<GalleryGroup, string> = {
  trail: "Trail & woods",
  water: "River, pools & stone",
  other: "Corridor scenes",
};
