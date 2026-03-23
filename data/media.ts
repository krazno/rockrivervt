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

/** Short UI label — avoid file numbers in visible captions. */
const PLACE_LABEL = "Rock River · Newfane VT";

/** Varied, place-accurate alts for SEO & screen readers (no “photo N”). */
const SCENE_ALTS: readonly string[] = [
  "Rock River trail and river corridor — smooth stone, pools, Windham County VT (near Brattleboro)",
  "Rock River streambed — rounded cobbles and clear water, southern Vermont",
  "Rock River recreation area — trail through northern hardwoods beside the river",
  "Rock River banks — woods and swimming holes, Newfane, Vermont",
  "Rock River trail and river corridor — Windham County, VT",
  "Rock River outdoors — rocky pools and swimming area near Newfane",
  "Rock River shoreline — water and stone, southern Vermont",
  "Rock River path — river bank and trail, Newfane, VT",
];

function altForOutdoorPhoto(photoNum: number): string {
  if (photoNum === 1) {
    return "Rock River swimming hole in Newfane Vermont — wide view of forest, trail, and river recreation in Windham County near Brattleboro";
  }
  const i = photoNum % SCENE_ALTS.length;
  return SCENE_ALTS[i] ?? SCENE_ALTS[0];
}

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
      alt: altForOutdoorPhoto(photoNum),
      title: PLACE_LABEL,
      type: "image" as const,
      tags: [...BASE_TAGS],
      width,
      height,
      ...flags,
      order: flags.order ?? 100 + photoNum,
    };
  });
}

const TRAIL_TOUR_POSTER = "/media/images/rock-river-newfane-vermont-outdoors-010.jpg";

function buildVideoItems(): MediaItem[] {
  return [
    {
      src: "/media/videos/rock-river-trail-tour-full-hike.mp4",
      alt: "Full trail tour video — Rock River recreation area hike in Newfane, Vermont (Windham County, near Brattleboro). Unofficial community guide.",
      title: "Rock River Trail Tour — full hike",
      type: "video",
      tags: [...BASE_TAGS, "trail tour", "hike", "video"],
      featured: true,
      homepage: true,
      order: 2,
      poster: TRAIL_TOUR_POSTER,
    },
  ];
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

/** Curated pair — fewer, stronger images on the home stripe. */
export function getHomeRiverStripePhotos() {
  const imgs = homepageImagesSorted();
  if (imgs.length >= 2) return imgs.slice(0, 2);
  return [pickSiteImage(4, 5, 3), pickSiteImage(5, 6, 4)];
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

/** Featured trail tour MP4 for homepage hero section. */
export function getTrailTourVideo(): MediaItem | null {
  const v = media.find(
    (m) => m.type === "video" && m.src.includes("rock-river-trail-tour"),
  );
  return v ?? null;
}
