/**
 * Central index for Rock River VT media under /public/media/.
 * Only files that exist on disk are listed — run `ls public/media/images` when adding photos.
 *
 * Thumbnails: optional; when missing, UI falls back to full `src` (see MediaImage / gallery).
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
  featured?: boolean;
  homepage?: boolean;
  order?: number;
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

/**
 * Outdoor JPGs currently in public/media/images/ (sync when you add/remove files).
 * Numbers are the NNN in rock-river-newfane-vermont-outdoors-NNN.jpg
 */
const EXISTING_OUTDOORS_NUMBERS: readonly number[] = [
  1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 24,
];

/** Known pixel sizes; anything else defaults to a typical phone-camera frame. */
const PHOTO_DIMS: Partial<Record<number, [number, number]>> = {
  1: [16348, 3896],
  2: [3392, 3882],
  3: [2962, 3948],
};

const PHOTO_FLAGS: Record<
  number,
  Partial<Pick<MediaItem, "featured" | "homepage" | "order" | "poster">>
> = {
  1: { featured: true, order: 8 },
  5: { homepage: true, order: 10, featured: true },
  7: { homepage: true, order: 11, featured: true },
  8: { homepage: true, order: 12, featured: true },
  9: { homepage: true, order: 20 },
  12: { homepage: true, order: 30 },
};

function dimFor(photoNum: number): [number, number] {
  return PHOTO_DIMS[photoNum] ?? [4032, 3024];
}

function buildImageItems(): MediaItem[] {
  return EXISTING_OUTDOORS_NUMBERS.map((photoNum) => {
    const n = String(photoNum).padStart(3, "0");
    const base = `rock-river-newfane-vermont-outdoors-${n}.jpg`;
    const [width, height] = dimFor(photoNum);
    const flags = PHOTO_FLAGS[photoNum] ?? {};
    return {
      src: `/media/images/${base}`,
      alt:
        photoNum === 1
          ? "Wide panoramic view of Rock River near Newfane Vermont — swimming holes, trails, and river preserve"
          : `Rock River near Newfane Vermont — swimming holes, trails, and river preserve (photo ${photoNum})`,
      title: `Rock River Vermont Newfane — photo ${photoNum}`,
      type: "image" as const,
      tags: [...BASE_TAGS],
      width,
      height,
      ...flags,
      order: flags.order ?? 100 + photoNum,
    };
  });
}

/** No video files in repo right now — add MP4s under public/media/videos/ and extend this. */
function buildVideoItems(): MediaItem[] {
  return [];
}

export const media: MediaItem[] = [...buildImageItems(), ...buildVideoItems()];

function sortByOrder(a: MediaItem, b: MediaItem): number {
  return (a.order ?? 9999) - (b.order ?? 9999);
}

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

export function getHomepageMedia(): MediaItem[] {
  return media.filter((m) => m.homepage).sort(sortByOrder);
}

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

function pickSiteImage(preferredIndex: number, ...fallbacks: number[]) {
  const imgs = getSiteImages();
  for (const i of [preferredIndex, ...fallbacks]) {
    const item = imgs[i];
    if (item) return item;
  }
  return imgs[0];
}

export function getHomeRiverStripePhotos() {
  const imgs = homepageImagesSorted();
  if (imgs.length >= 3) return imgs.slice(0, 3);
  return [
    pickSiteImage(4, 5, 3),
    pickSiteImage(5, 6, 4),
    pickSiteImage(6, 7, 5),
  ];
}

export function getHomeVermontBandPhoto() {
  const imgs = homepageImagesSorted();
  if (imgs.length >= 4) return imgs[3];
  return pickSiteImage(8, 9, 7, 4);
}

export function getHomeClosingPhoto() {
  const imgs = homepageImagesSorted();
  if (imgs.length >= 5) return imgs[4];
  return pickSiteImage(11, 10, 9, 4);
}

/** First image for hero / OG-style moments (panoramic when available). */
export function getHeroBackdropImage(): MediaItem | null {
  const sorted = getSiteImages();
  const pano = sorted.find((m) => m.src.includes("outdoors-001"));
  return pano ?? sorted[0] ?? null;
}
