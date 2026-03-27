import { getSiteImages } from "@/data/media";

/**
 * Deterministic gallery image per URL path — stable across SSR/client for backgrounds.
 */
export function getStableGalleryImageForPath(path: string): {
  src: string;
  alt: string;
} | null {
  const images = getSiteImages();
  if (images.length === 0) return null;

  const normalized = path === "" ? "/" : path;

  // Home: calmer scene so it doesn’t fight the hero carousel
  if (normalized === "/") {
    const i = Math.min(6, images.length - 1);
    const item = images[i];
    return item ? { src: item.src, alt: item.alt } : null;
  }

  let hash = 5381;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 33) ^ normalized.charCodeAt(i);
  }
  const idx = Math.abs(hash) % images.length;
  const item = images[idx];
  return item ? { src: item.src, alt: item.alt } : null;
}
