import { youtubeThumbnailUrl } from "@/lib/youtube-embed";

/** Community favorite: light character-in-the-river Short (muted loops on site). */
export const RIVER_CHARACTER_SHORT_YOUTUBE_ID = "XMedjRErWEA";

/**
 * Central index for Rock River VT media under /public/media/.
 * Only files that exist on disk are listed — run `ls public/media/images` when adding photos.
 * Numbered `rock-river-newfane-vermont-outdoors-NNN.jpg` set, `buildAdditionalGalleryImages()`, and `buildIngestedCommunityImages()` (visitor/scenic PNGs).
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
  /** YouTube video id (Shorts use the same id as /watch). When set, gallery uses embed + thumb from YouTube. */
  youtubeId?: string;
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

/**
 * Additional stills (descriptive filenames, PNG/JPG). Sync filenames with files on disk under
 * `public/media/images/`. Rich alt text for gallery SEO and accessibility.
 */
function buildAdditionalGalleryImages(): MediaItem[] {
  const summerTags = [
    ...BASE_TAGS,
    "Windham County",
    "southern Vermont",
    "summer",
    "river beach",
    "nature",
  ] as const;

  return [
    {
      src: "/media/images/rock-river-vermont-clear-turquoise-water-beach-chairs.png",
      alt:
        "Clear turquoise water of Rock River in Newfane, Vermont, winding past a small sandy beach with chairs, lush green forest on a bright summer day — Windham County swimming hole",
      title: "Rock River — clear pools and beach, summer",
      type: "image" as const,
      tags: [...summerTags],
      width: 1024,
      height: 768,
      featured: true,
      homepage: true,
      order: 22,
    },
    {
      src: "/media/images/rock-river-vermont-serene-river-sandy-beach-summer.png",
      alt:
        "Serene summer view of Rock River, Vermont — clear green-tinted water, sandy beach with chairs, rocky shore and forest under a blue sky, Windham County outdoors",
      title: "Rock River — sandy beach and calm water",
      type: "image" as const,
      tags: [...summerTags],
      width: 1024,
      height: 768,
      featured: true,
      homepage: true,
      order: 23,
    },
    {
      src: "/media/images/rock-river-vermont-clear-water-rocky-pools-forest.png",
      alt:
        "Clear water flowing over a smooth rocky riverbed at Rock River, Vermont, surrounded by dense summer forest and ferns — southern Vermont river recreation",
      title: "Rock River — rocky pools and forest",
      type: "image" as const,
      tags: [...summerTags],
      width: 1024,
      height: 768,
      featured: true,
      homepage: true,
      order: 24,
    },
  ];
}

const INGEST_P = [
  "rock river",
  "newfane",
  "vermont",
  "Windham County",
  "southern Vermont",
] as const;
const INGEST_VIS = [...INGEST_P, "visitors", "community"] as const;
const INGEST_SCENIC = [...INGEST_P, "summer", "swimming hole", "nature"] as const;
const INGEST_TRAIL = [...INGEST_P, "trail", "hiking"] as const;

/** March 2026 community photo batch (SEO filenames under /public/media/images/). */
function buildIngestedCommunityImages(): MediaItem[] {
  return [
    {
      src: "/media/images/rock-river-vermont-group-five-visitors-river-stones-selfie.png",
      alt:
        "Five visitors smiling together on sun-warmed river stones at Rock River, Vermont — shirts off, summer forest behind, friendly group moment in Windham County",
      title: "Rock River — group selfie on the stones",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "group", "summer", "river stones"],
      width: 1024,
      height: 768,
      featured: true,
      homepage: true,
      order: 35,
    },
    {
      src: "/media/images/rock-river-vermont-three-friends-river-rocks-summer.png",
      alt:
        "Three friends on smooth river rocks beside clear water at Rock River, Vermont — sunglasses, summer day, green forest along the bank",
      title: "Rock River — friends by the water",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "group", "summer"],
      width: 1024,
      height: 768,
      featured: true,
      homepage: true,
      order: 36,
    },
    {
      src: "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png",
      alt:
        "Two visitors smiling on a rocky bar in the shallow Rock River, Newfane, Vermont — clear water, lush green forest, relaxed summer outing",
      title: "Rock River — two visitors in the river",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "swimming hole"],
      width: 1024,
      height: 769,
      featured: true,
      homepage: true,
      order: 37,
    },
    {
      src: "/media/images/rock-river-vermont-visitor-smiling-selfie-square.png",
      alt:
        "Visitor smiling in a selfie beside a sunlit rocky Rock River in Vermont — backwards cap, aviator sunglasses, clear shallow water and summer trees",
      title: "Rock River — summer river selfie",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "selfie", "summer"],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: true,
      order: 38,
    },
    {
      src: "/media/images/rock-river-vermont-visitors-hiking-mossy-rocks-selfie.png",
      alt:
        "Two visitors on a mossy rocky trail at Rock River, Vermont — hiking selfie, bright forest, shirts and packs, genuine smiles",
      title: "Rock River — trail selfie on the rocks",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", ...INGEST_TRAIL],
      width: 819,
      height: 1024,
      featured: true,
      homepage: true,
      order: 39,
    },
    {
      src: "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png",
      alt:
        "Instant-film style photo of a smiling visitor waist-deep in clear green water at a Rock River swimming hole, Vermont — rocky bank and ferns behind",
      title: "Rock River — polaroid-style swim moment",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "swimming hole"],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: true,
      order: 40,
    },
    {
      src: "/media/images/rock-river-vermont-visitor-meditation-river-boulder.png",
      alt:
        "Visitor meditating on a large boulder in a rocky Rock River bed, Vermont — hands at heart, small stone cairns and green forest in the background",
      title: "Rock River — quiet moment on the river",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "wellness", "river stones"],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: true,
      order: 41,
    },
    {
      src: "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png",
      alt:
        "Smiling hiker with a pack beside a small clear stream on a leafy trail at Rock River, Vermont — green woods, summer day",
      title: "Rock River — hiker by a side stream",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", ...INGEST_TRAIL],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: true,
      order: 42,
    },
    {
      src: "/media/images/rock-river-vermont-two-visitors-tanktops-forest-selfie.png",
      alt:
        "Two visitors in caps and tank tops smiling together in the woods at Rock River, Vermont — mossy boulders and dense green trees behind",
      title: "Rock River — forest selfie",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", ...INGEST_TRAIL],
      width: 1024,
      height: 768,
      featured: true,
      homepage: true,
      order: 43,
    },
    {
      src: "/media/images/rock-river-vermont-two-visitors-relaxing-riverbank.png",
      alt:
        "Two visitors relaxing shirtless on towels at the riverbank, Rock River, Vermont — warm smiles, soft-focus summer forest behind",
      title: "Rock River — relaxing on the bank",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "summer"],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: true,
      order: 44,
    },
    {
      src: "/media/images/rock-river-vermont-visitor-in-river-open-shirt-square.png",
      alt:
        "Visitor standing in shallow clear water at Rock River, Vermont — bright swimwear, open shirt, sneakers in hand, rocky bottom and green forest",
      title: "Rock River — wading in the shallows",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "summer", "swimming hole"],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: true,
      order: 45,
    },
    {
      src: "/media/images/rock-river-vermont-visitor-picnic-table-arms-wide.png",
      alt:
        "Visitor with arms wide on a wet wooden picnic table, misty forested hills behind — celebratory outdoor moment, Rock River area, southern Vermont",
      title: "Rock River area — picnic clearing moment",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "outdoors"],
      width: 881,
      height: 1024,
      featured: false,
      homepage: false,
      order: 120,
    },
    {
      src: "/media/images/rock-river-vermont-scenic-river-golden-hour-sunburst.png",
      alt:
        "Golden-hour sunburst over a calm bend of Rock River, Vermont — dark pool reflecting sky, rocky shallows, sandy beach and dense green forest",
      title: "Rock River — evening light on the bend",
      type: "image" as const,
      tags: [...INGEST_SCENIC, "atmospheric"],
      width: 1024,
      height: 769,
      featured: true,
      homepage: true,
      order: 47,
    },
    {
      src: "/media/images/rock-river-vermont-scenic-river-bend-sandy-beach-chairs.png",
      alt:
        "Wide view of clear green Rock River curving past a sandy beach with two empty chairs, Vermont — rocky left bank with ferns, bright summer forest",
      title: "Rock River — bend and beach chairs",
      type: "image" as const,
      tags: [...INGEST_SCENIC, "river beach"],
      width: 1024,
      height: 768,
      featured: true,
      homepage: true,
      order: 48,
    },
    {
      src: "/media/images/rock-river-vermont-scenic-clear-river-framed-by-leaves-vertical.png",
      alt:
        "Vertical view of clear Rock River, Vermont, framed by overhanging leaves — pebble bar, rocky right bank with ferns, lush green corridor",
      title: "Rock River — framed river view",
      type: "image" as const,
      tags: [...INGEST_SCENIC],
      width: 819,
      height: 1024,
      featured: true,
      homepage: true,
      order: 49,
    },
    {
      src: "/media/images/rock-river-vermont-scenic-river-through-shaded-trees-vertical.png",
      alt:
        "Sunlit rocky Rock River seen through dark tree trunks from a shaded trail, Vermont — high contrast, peaceful swimming-hole atmosphere",
      title: "Rock River — river through the trees",
      type: "image" as const,
      tags: [...INGEST_SCENIC, "trail"],
      width: 768,
      height: 1024,
      featured: true,
      homepage: true,
      order: 50,
    },
    {
      src: "/media/images/rock-river-vermont-scenic-sunny-riverbed-vertical.png",
      alt:
        "Sunny vertical view down a rocky Rock River bed, Vermont — sparkling water, lens flare, stone cairn in the shallows, green forest walls and blue sky",
      title: "Rock River — sun on the stones",
      type: "image" as const,
      tags: [...INGEST_SCENIC, "atmospheric"],
      width: 768,
      height: 1024,
      featured: true,
      homepage: true,
      order: 51,
    },
    {
      src: "/media/images/rock-river-vermont-scenic-clear-river-sky-vertical.png",
      alt:
        "Clear shallow Rock River flowing over stones toward a forested ridge, Vermont — bright blue sky with clouds, sunlit and shaded banks",
      title: "Rock River — summer sky over the corridor",
      type: "image" as const,
      tags: [...INGEST_SCENIC],
      width: 768,
      height: 1024,
      featured: true,
      homepage: true,
      order: 52,
    },
    {
      src: "/media/images/rock-river-vermont-scenic-split-waterline-underwater.png",
      alt:
        "Split-level photo at the waterline — sunlit ferns and trees above, emerald water with sun rays and rocky bottom below, Rock River, Vermont",
      title: "Rock River — above and below the surface",
      type: "image" as const,
      tags: [...INGEST_SCENIC, "water texture"],
      width: 819,
      height: 1024,
      featured: true,
      homepage: true,
      order: 53,
    },
    {
      src: "/media/images/rock-river-vermont-trail-friends-gather-here-sign.png",
      alt:
        "Wooden stairs of sand and stone leading into the woods at Rock River, Vermont — hand-painted sign on a tree reads Friends Gather Here",
      title: "Rock River trail — Friends Gather Here",
      type: "image" as const,
      tags: [...INGEST_TRAIL, "community", "signage"],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: true,
      order: 54,
    },
    {
      src: "/media/images/rock-river-vermont-clothing-optional-sign-trail-vertical.png",
      alt:
        "Shaded dirt trail at Rock River, Vermont, with a tree-mounted sign reading Clothing Optional From Here — rocky river visible through the trees",
      title: "Rock River trail — clothing-optional section sign",
      type: "image" as const,
      tags: [...INGEST_TRAIL, "signage", "etiquette"],
      width: 768,
      height: 1024,
      featured: true,
      homepage: false,
      order: 72,
    },
    {
      src: "/media/images/rock-river-vermont-clothing-optional-sign-trail-square.png",
      alt:
        "Brown trail sign on a tree at Rock River, Vermont, reading Clothing Optional From Here — pine-needle path and sunlit hemlock forest",
      title: "Rock River — trail signage (square)",
      type: "image" as const,
      tags: [...INGEST_TRAIL, "signage", "etiquette"],
      width: 1024,
      height: 1024,
      featured: true,
      homepage: false,
      order: 73,
    },
    {
      src: "/media/images/rock-river-vermont-visitor-playful-river-stone-pose.png",
      alt:
        "Playful visitor on the rocky Rock River bank, Vermont, smiling and holding a smooth flat stone in front — forested river scene, lighthearted river day",
      title: "Rock River — playful moment on the stones",
      type: "image" as const,
      tags: [...INGEST_VIS, "people", "humor", "river stones"],
      width: 1024,
      height: 1024,
      featured: false,
      homepage: false,
      order: 95,
    },
  ];
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
  const shortThumb = youtubeThumbnailUrl(RIVER_CHARACTER_SHORT_YOUTUBE_ID, "hq");
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
    {
      src: `https://www.youtube.com/shorts/${RIVER_CHARACTER_SHORT_YOUTUBE_ID}`,
      alt:
        "Short YouTube clip — playful cartoon-style character cooling off in a shallow river, comic and family-friendly. Rock River, Vermont context; hosted on YouTube.",
      title: "River pause — YouTube Short",
      type: "video",
      tags: [...BASE_TAGS, "youtube", "short", "clip", "humor"],
      youtubeId: RIVER_CHARACTER_SHORT_YOUTUBE_ID,
      thumbnailSrc: shortThumb,
      poster: shortThumb,
      featured: true,
      homepage: true,
      order: 3,
    },
  ];
}

export const media: MediaItem[] = [
  ...buildImageItems(),
  ...buildAdditionalGalleryImages(),
  ...buildIngestedCommunityImages(),
  ...buildVideoItems(),
];

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

/** Curated file numbers for the hero circle slideshow (mix of trail, water, shore). */
const HERO_CIRCLE_GALLERY_ORDER: readonly number[] = [
  10, 22, 7, 12, 19, 3, 15, 21, 17, 24, 5, 8, 14, 11, 16,
];

/** New summer stills (by `src`) surfaced early in the hero circle rotation. */
const HERO_CIRCLE_PRIORITY_SRC: readonly string[] = [
  "/media/images/rock-river-vermont-clear-turquoise-water-beach-chairs.png",
  "/media/images/rock-river-vermont-serene-river-sandy-beach-summer.png",
  "/media/images/rock-river-vermont-clear-water-rocky-pools-forest.png",
];

/** Visitor + standout scenic stills mixed into the hero circle after branded summer shots. */
const HERO_CIRCLE_COMMUNITY_PRIORITY_SRC: readonly string[] = [
  "/media/images/rock-river-vermont-group-five-visitors-river-stones-selfie.png",
  "/media/images/rock-river-vermont-scenic-river-golden-hour-sunburst.png",
  "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png",
  "/media/images/rock-river-vermont-scenic-clear-river-framed-by-leaves-vertical.png",
  "/media/images/rock-river-vermont-visitor-smiling-selfie-square.png",
  "/media/images/rock-river-vermont-scenic-split-waterline-underwater.png",
];

/** Five strong, non-redundant faces for the homepage strip (see `lib/people-media` for full catalog). */
const VISITOR_MOMENT_SRC: readonly string[] = [
  "/media/images/rock-river-vermont-group-five-visitors-river-stones-selfie.png",
  "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png",
  "/media/images/rock-river-vermont-visitor-smiling-selfie-square.png",
  "/media/images/rock-river-vermont-three-friends-river-rocks-summer.png",
  "/media/images/rock-river-vermont-visitors-hiking-mossy-rocks-selfie.png",
];

/**
 * Homepage carousel should not repeat shots already used in the hero circle, visitor row,
 * people splash, today’s feel primary, river intel, or local teaser — keep in sync with
 * `lib/people-media.ts` curated picks (`HOME_PEOPLE_SPLASH_*`, accent).
 */
const HOME_PHOTO_CAROUSEL_EXCLUDED_SRC = new Set<string>([
  ...VISITOR_MOMENT_SRC,
  ...HERO_CIRCLE_PRIORITY_SRC,
  ...HERO_CIRCLE_COMMUNITY_PRIORITY_SRC,
  "/media/images/rock-river-vermont-two-visitors-tanktops-forest-selfie.png",
  "/media/images/rock-river-vermont-visitor-playful-river-stone-pose.png",
  "/media/images/rock-river-vermont-visitor-picnic-table-arms-wide.png",
  "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png",
  "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png",
  "/media/images/rock-river-vermont-visitor-in-river-open-shirt-square.png",
]);

/**
 * Shots already used in hero circle, people splash, visitor row, accents, etc.
 * Reuse for homepage `PhotoAccentRow` so decorative strips don’t repeat those faces.
 */
export function getHomepageDecorativeExcludeSrcs(): ReadonlySet<string> {
  return HOME_PHOTO_CAROUSEL_EXCLUDED_SRC;
}

/** Horizontal carousel on the homepage — varied scenes, stable order; skips home-slot duplicates. */
export function getHomePhotoCarouselPhotos(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  const imgs = getSiteImages();
  const filtered = imgs.filter((m) => !HOME_PHOTO_CAROUSEL_EXCLUDED_SRC.has(m.src));
  const list = filtered.length >= 6 ? filtered : imgs;
  return [...list].sort(sortByOrder);
}

/** At least 10 images when assets exist; fills from the rest of the catalog if needed. */
export function getHeroCircleGalleryPhotos(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  const imgs = getSiteImages();
  const out: (MediaItem & { type: "image"; width: number; height: number })[] =
    [];
  const seen = new Set<string>();

  for (const src of HERO_CIRCLE_PRIORITY_SRC) {
    const item = imgs.find((m) => m.src === src);
    if (
      item &&
      item.type === "image" &&
      typeof item.width === "number" &&
      typeof item.height === "number" &&
      !seen.has(item.src)
    ) {
      out.push(item);
      seen.add(item.src);
    }
  }

  for (const src of HERO_CIRCLE_COMMUNITY_PRIORITY_SRC) {
    const item = imgs.find((m) => m.src === src);
    if (
      item &&
      item.type === "image" &&
      typeof item.width === "number" &&
      typeof item.height === "number" &&
      !seen.has(item.src)
    ) {
      out.push(item);
      seen.add(item.src);
    }
  }

  for (const n of HERO_CIRCLE_GALLERY_ORDER) {
    const pad = String(n).padStart(3, "0");
    const src = `/media/images/rock-river-newfane-vermont-outdoors-${pad}.jpg`;
    const item = imgs.find((m) => m.src === src);
    if (
      item &&
      item.type === "image" &&
      typeof item.width === "number" &&
      typeof item.height === "number" &&
      !seen.has(item.src)
    ) {
      out.push(item);
      seen.add(item.src);
    }
    if (out.length >= 13) break;
  }

  const rest = [...imgs].sort(sortByOrder);
  for (const m of rest) {
    if (out.length >= 10) break;
    if (
      m.type !== "image" ||
      typeof m.width !== "number" ||
      typeof m.height !== "number" ||
      seen.has(m.src)
    ) {
      continue;
    }
    out.push(m);
    seen.add(m.src);
  }

  return out;
}

/** Featured trail tour MP4 for homepage hero section. */
export function getTrailTourVideo(): MediaItem | null {
  const v = media.find(
    (m) => m.type === "video" && m.src.includes("rock-river-trail-tour"),
  );
  return v ?? null;
}

export function getRiverCharacterShort(): (MediaItem & { youtubeId: string }) | null {
  const v = media.find(
    (m): m is MediaItem & { youtubeId: string } =>
      m.type === "video" && m.youtubeId === RIVER_CHARACTER_SHORT_YOUTUBE_ID,
  );
  return v ?? null;
}

/** People-forward stills for the homepage “visitor moments” strip. */
export function getVisitorMomentPhotos(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  const out: (MediaItem & { type: "image"; width: number; height: number })[] =
    [];
  for (const src of VISITOR_MOMENT_SRC) {
    const m = media.find((x) => x.src === src);
    if (
      m &&
      m.type === "image" &&
      typeof m.width === "number" &&
      typeof m.height === "number"
    ) {
      out.push(
        m as MediaItem & { type: "image"; width: number; height: number },
      );
    }
  }
  return out;
}
