/**
 * Central index for Rock River VT media under /public/media/.
 * When adding files: use lowercase, hyphens, no special characters (see scripts/import-rock-river-media.sh).
 *
 * Optional flags:
 * - `featured` — surfaced first in the gallery grid
 * - `homepage` — included in homepage helpers (see `getHomepageMedia()`), ordered by `order`
 * - `order` — lower values first (gallery after featured sort; homepage picks)
 * - `poster` — static image for `<video poster>` (usually a thumbnail path)
 */

export type MediaKind = "image" | "video";

export type MediaItem = {
  src: string;
  alt: string;
  title: string;
  type: MediaKind;
  tags: string[];
  width?: number;
  height?: number;
  thumbnailSrc?: string;
  /** When true, listed before other items in the gallery (then sorted by `order`). */
  featured?: boolean;
  /** When true, eligible for homepage sections; position among those uses `order`. */
  homepage?: boolean;
  /** Lower numbers appear earlier (after featured grouping in the gallery). */
  order?: number;
  /** Optional poster frame for video elements. */
  poster?: string;
};

const BASE_TAGS = [
  "rock river",
  "newfane",
  "vermont",
  "swimming hole",
  "trail",
  "preserve",
  "outdoors",
] as const;

/** Pixel dimensions for each full-size JPG (order matches outdoors-001 … 035). */
const IMAGE_DIMENSIONS: readonly [number, number][] = [
  [16348, 3896],
  [3392, 3882],
  [2962, 3948],
  ...Array.from({ length: 32 }, () => [4032, 3024] as [number, number]),
];

/** Per-image index (0-based) optional flags. Unlisted indices only get a default `order`. */
const IMAGE_FLAGS: Record<
  number,
  Partial<Pick<MediaItem, "featured" | "homepage" | "order" | "poster">>
> = {
  0: { featured: true, order: 8 },
  4: { homepage: true, order: 10, featured: true },
  5: { homepage: true, order: 11, featured: true },
  6: { homepage: true, order: 12, featured: true },
  8: { homepage: true, order: 20 },
  11: { homepage: true, order: 30 },
};

/** Per-video index: 0 = river-video-02 (video 01 is omitted site-wide). */
const VIDEO_FLAGS: Record<
  number,
  Partial<Pick<MediaItem, "featured" | "homepage" | "order" | "poster">>
> = {};

function buildImageItems(): MediaItem[] {
  return IMAGE_DIMENSIONS.map(([width, height], i) => {
    const n = String(i + 1).padStart(3, "0");
    const base = `rock-river-newfane-vermont-outdoors-${n}.jpg`;
    const flags = IMAGE_FLAGS[i] ?? {};
    return {
      src: `/media/images/${base}`,
      thumbnailSrc: `/media/thumbnails/${base}`,
      alt:
        i === 0
          ? "Wide panoramic view of Rock River near Newfane Vermont — swimming holes, trails, and river preserve"
          : `Rock River near Newfane Vermont — swimming holes, trails, and river preserve (photo ${i + 1})`,
      title: `Rock River Vermont Newfane — photo ${i + 1}`,
      type: "image",
      tags: [...BASE_TAGS],
      width,
      height,
      ...flags,
      order: flags.order ?? 100 + i,
    };
  });
}

function buildVideoItems(): MediaItem[] {
  /** Omit `river-video-01` — not used on the site. */
  return [2, 3, 4, 5].map((i) => {
    const n = String(i).padStart(2, "0");
    const idx = i - 2;
    const flags = VIDEO_FLAGS[idx] ?? {};
    return {
      src: `/media/videos/rock-river-newfane-vermont-river-video-${n}.mp4`,
      alt: `Rock River near Newfane, Vermont — short river and trail video (clip ${i})`,
      title: `Rock River Vermont — river video ${i}`,
      type: "video",
      tags: [...BASE_TAGS, "video"],
      ...flags,
      order: flags.order ?? 500 + idx,
    };
  });
}

export const media: MediaItem[] = [...buildImageItems(), ...buildVideoItems()];

function sortByOrder(a: MediaItem, b: MediaItem): number {
  return (a.order ?? 9999) - (b.order ?? 9999);
}

/** Featured items first, then by `order`, then by `src` for a stable tie-break. */
export function getGalleryMediaSorted(): MediaItem[] {
  return [...media].sort((a, b) => {
    const af = a.featured ? 0 : 1;
    const bf = b.featured ? 0 : 1;
    if (af !== bf) return af - bf;
    const byOrder = sortByOrder(a, b);
    if (byOrder !== 0) return byOrder;
    return a.src.localeCompare(b.src);
  });
}

/** All items flagged for the homepage, sorted by `order` (images and videos mixed). */
export function getHomepageMedia(): MediaItem[] {
  return media.filter((m) => m.homepage).sort(sortByOrder);
}

/** Image-only entries with known dimensions (excludes video). */
export function getSiteImages(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  return media.filter(
    (m): m is MediaItem & { type: "image"; width: number; height: number } =>
      m.type === "image" &&
      typeof m.width === "number" &&
      typeof m.height === "number",
  );
}

function homepageImagesSorted(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  return getHomepageMedia().filter(
    (m): m is MediaItem & { type: "image"; width: number; height: number } =>
      m.type === "image" &&
      typeof m.width === "number" &&
      typeof m.height === "number",
  );
}

/** Legacy index fallback when fewer than five homepage images are configured. */
function pickSiteImage(preferredIndex: number, ...fallbacks: number[]) {
  const imgs = getSiteImages();
  for (const i of [preferredIndex, ...fallbacks]) {
    const item = imgs[i];
    if (item) return item;
  }
  return imgs[0];
}

/** Three images for the “River photos” homepage strip (first three homepage images by `order`). */
export function getHomeRiverStripePhotos() {
  const imgs = homepageImagesSorted();
  if (imgs.length >= 3) return imgs.slice(0, 3);
  return [
    pickSiteImage(4, 5, 3),
    pickSiteImage(5, 6, 4),
    pickSiteImage(6, 7, 5),
  ];
}

/** “Vermont view” band — fourth homepage image by `order`, when configured. */
export function getHomeVermontBandPhoto() {
  const imgs = homepageImagesSorted();
  if (imgs.length >= 4) return imgs[3];
  return pickSiteImage(8, 9, 7, 4);
}

/** Closing homepage figure — fifth homepage image by `order`, when configured. */
export function getHomeClosingPhoto() {
  const imgs = homepageImagesSorted();
  if (imgs.length >= 5) return imgs[4];
  return pickSiteImage(11, 10, 9, 4);
}

