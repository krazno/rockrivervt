import type { MediaItem } from "@/data/media";
import { getHomepageDecorativeExcludeSrcs, getSiteImages } from "@/data/media";

/**
 * Deterministic subset of site images for decorative rows on interior pages (no layout shift vs SSR).
 * `excludeSrcs` skips known homepage/hero faces so strips don’t repeat splash or circle shots.
 */
export function getAccentImages(
  seed: string,
  count: number,
  excludeSrcs?: ReadonlySet<string>,
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
  while (out.length < count && step < imgs.length * 3) {
    const idx = Math.abs(h + step * 1103515245) % imgs.length;
    const item = imgs[idx];
    if (
      item &&
      !seen.has(item.src) &&
      !(excludeSrcs && excludeSrcs.has(item.src))
    ) {
      out.push(item);
      seen.add(item.src);
    }
    step++;
  }
  return out;
}

/** “Where to next” strip — no hero/splash/visitor-row duplicates. */
export function getHomeExploreAccentImages(
  count = 3,
): (MediaItem & { type: "image"; width: number; height: number })[] {
  return getAccentImages("home-explore-strip", count, getHomepageDecorativeExcludeSrcs());
}

/** Cafés / partners strip — disjoint from explore row + same homepage exclusions. */
export function getHomePartnersAccentImages(
  count = 3,
): (MediaItem & { type: "image"; width: number; height: number })[] {
  const explore = getHomeExploreAccentImages(count);
  const exclude = new Set<string>([
    ...getHomepageDecorativeExcludeSrcs(),
    ...explore.map((m) => m.src),
  ]);
  return getAccentImages("home-windham-partners", count, exclude);
}
