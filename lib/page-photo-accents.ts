import type { MediaItem } from "@/data/media";
import { getSiteImages } from "@/data/media";

/**
 * Deterministic subset of site images for decorative rows on interior pages (no layout shift vs SSR).
 */
export function getAccentImages(
  seed: string,
  count: number,
): (MediaItem & { type: "image"; width: number; height: number })[] {
  const imgs = getSiteImages();
  if (imgs.length === 0) return [];

  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  const out: (MediaItem & { type: "image"; width: number; height: number })[] = [];
  const seen = new Set<string>();
  let step = 0;
  while (out.length < count && step < imgs.length * 2) {
    const idx = Math.abs(h + step * 1103515245) % imgs.length;
    const item = imgs[idx];
    if (item && !seen.has(item.src)) {
      out.push(item);
      seen.add(item.src);
    }
    step++;
  }
  return out;
}
