import type { MediaItem } from "@/data/media";
import { getSiteImages } from "@/data/media";

/**
 * Canonical people-forward stills (faces / clear human presence). Signs-only and pure
 * scenics are excluded. Used for curated accents and homepage presence.
 */
export const PEOPLE_IMAGE_SRC = [
  "/media/images/rock-river-vermont-group-five-visitors-river-stones-selfie.png",
  "/media/images/rock-river-vermont-three-friends-river-rocks-summer.png",
  "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png",
  "/media/images/rock-river-vermont-visitor-smiling-selfie-square.png",
  "/media/images/rock-river-vermont-visitors-hiking-mossy-rocks-selfie.png",
  "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png",
  "/media/images/rock-river-vermont-visitor-meditation-river-boulder.png",
  "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png",
  "/media/images/rock-river-vermont-two-visitors-tanktops-forest-selfie.png",
  "/media/images/rock-river-vermont-two-visitors-relaxing-riverbank.png",
  "/media/images/rock-river-vermont-visitor-in-river-open-shirt-square.png",
  "/media/images/rock-river-vermont-visitor-playful-river-stone-pose.png",
] as const;

export type PeopleStrength = "high" | "medium" | "low";

export type PeopleEmotion = "joy" | "calm" | "social" | "quiet";

export type PeopleUsage = "hero" | "supporting" | "accent";

export type PeopleProfile = {
  strength: PeopleStrength;
  usage: PeopleUsage;
  emotion: PeopleEmotion;
  note: string;
};

/** Editorial scoring — guides placement, not automated vision. */
export const PEOPLE_PROFILES: Record<(typeof PEOPLE_IMAGE_SRC)[number], PeopleProfile> = {
  "/media/images/rock-river-vermont-group-five-visitors-river-stones-selfie.png": {
    strength: "high",
    usage: "hero",
    emotion: "social",
    note: "Clear group joy; flagship social proof.",
  },
  "/media/images/rock-river-vermont-three-friends-river-rocks-summer.png": {
    strength: "high",
    usage: "hero",
    emotion: "social",
    note: "Strong trio, river context.",
  },
  "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png": {
    strength: "high",
    usage: "hero",
    emotion: "joy",
    note: "Classic in-water smile; very readable.",
  },
  "/media/images/rock-river-vermont-visitor-smiling-selfie-square.png": {
    strength: "high",
    usage: "supporting",
    emotion: "joy",
    note: "Tight selfie; friendly energy.",
  },
  "/media/images/rock-river-vermont-visitors-hiking-mossy-rocks-selfie.png": {
    strength: "high",
    usage: "supporting",
    emotion: "social",
    note: "Trail + faces; great for planning pages.",
  },
  "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png": {
    strength: "medium",
    usage: "supporting",
    emotion: "joy",
    note: "Stylized but warm; use beside editorial copy.",
  },
  "/media/images/rock-river-vermont-visitor-meditation-river-boulder.png": {
    strength: "medium",
    usage: "accent",
    emotion: "quiet",
    note: "Calm presence; not face-forward—supporting only.",
  },
  "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png": {
    strength: "medium",
    usage: "supporting",
    emotion: "joy",
    note: "Single hiker; trail-day credibility.",
  },
  "/media/images/rock-river-vermont-two-visitors-tanktops-forest-selfie.png": {
    strength: "medium",
    usage: "supporting",
    emotion: "social",
    note: "Woods context; casual social.",
  },
  "/media/images/rock-river-vermont-two-visitors-relaxing-riverbank.png": {
    strength: "high",
    usage: "supporting",
    emotion: "calm",
    note: "Relaxed bank moment; welcoming tone.",
  },
  "/media/images/rock-river-vermont-visitor-in-river-open-shirt-square.png": {
    strength: "medium",
    usage: "supporting",
    emotion: "calm",
    note: "Swim-day candid; good for visit/local.",
  },
  "/media/images/rock-river-vermont-visitor-playful-river-stone-pose.png": {
    strength: "low",
    usage: "accent",
    emotion: "joy",
    note: "Playful; use sparingly—accent only.",
  },
};

export type PeopleAccentPageKey =
  | "after-the-river"
  | "plan-your-day"
  | "local"
  | "community"
  | "visit"
  | "why-rock-river"
  | "conditions"
  | "map"
  | "weather";

/**
 * Three images per interior page — deterministic, people-forward, no duplicate src within a row.
 */
export const PEOPLE_ACCENT_TRIPLES: Record<
  PeopleAccentPageKey,
  readonly [string, string, string]
> = {
  "after-the-river": [
    "/media/images/rock-river-vermont-two-visitors-relaxing-riverbank.png",
    "/media/images/rock-river-vermont-three-friends-river-rocks-summer.png",
    "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png",
  ],
  "plan-your-day": [
    "/media/images/rock-river-vermont-group-five-visitors-river-stones-selfie.png",
    "/media/images/rock-river-vermont-visitors-hiking-mossy-rocks-selfie.png",
    "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png",
  ],
  local: [
    "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png",
    "/media/images/rock-river-vermont-visitor-smiling-selfie-square.png",
    "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png",
  ],
  community: [
    "/media/images/rock-river-vermont-group-five-visitors-river-stones-selfie.png",
    "/media/images/rock-river-vermont-two-visitors-relaxing-riverbank.png",
    "/media/images/rock-river-vermont-visitor-meditation-river-boulder.png",
  ],
  visit: [
    "/media/images/rock-river-vermont-visitor-in-river-open-shirt-square.png",
    "/media/images/rock-river-vermont-visitors-hiking-mossy-rocks-selfie.png",
    "/media/images/rock-river-vermont-two-visitors-smiling-in-river.png",
  ],
  "why-rock-river": [
    "/media/images/rock-river-vermont-three-friends-river-rocks-summer.png",
    "/media/images/rock-river-vermont-two-visitors-tanktops-forest-selfie.png",
    "/media/images/rock-river-vermont-visitor-smiling-selfie-square.png",
  ],
  conditions: [
    "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png",
    "/media/images/rock-river-vermont-visitor-meditation-river-boulder.png",
    "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png",
  ],
  map: [
    "/media/images/rock-river-vermont-visitors-hiking-mossy-rocks-selfie.png",
    "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png",
    "/media/images/rock-river-vermont-two-visitors-tanktops-forest-selfie.png",
  ],
  weather: [
    "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png",
    "/media/images/rock-river-vermont-visitor-meditation-river-boulder.png",
    "/media/images/rock-river-vermont-two-visitors-relaxing-riverbank.png",
  ],
};

export function getPeopleSiteImages(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  const set = new Set(PEOPLE_IMAGE_SRC);
  return getSiteImages().filter(
    (m): m is MediaItem & { type: "image"; width: number; height: number } =>
      set.has(m.src as (typeof PEOPLE_IMAGE_SRC)[number]),
  );
}

export function resolvePeopleImagesBySrc(
  srcs: readonly string[],
): (MediaItem & { type: "image"; width: number; height: number })[] {
  const imgs = getSiteImages();
  const out: (MediaItem & { type: "image"; width: number; height: number })[] = [];
  for (const src of srcs) {
    const m = imgs.find((x) => x.src === src);
    if (
      m &&
      m.type === "image" &&
      typeof m.width === "number" &&
      typeof m.height === "number"
    ) {
      out.push(m);
    }
  }
  return out;
}

export function getPeopleAccentImagesForPage(
  page: PeopleAccentPageKey,
): (MediaItem & { type: "image"; width: number; height: number })[] {
  return resolvePeopleImagesBySrc(PEOPLE_ACCENT_TRIPLES[page]);
}

export function mediaHasPeopleTag(m: MediaItem): boolean {
  return m.tags.includes("people");
}

/**
 * Single warm accent for “Today’s feel” — keeps the hero + splash cluster from feeling stacked
 * with a second face column; meditation / other stills stay available elsewhere on the page.
 */
export function getHomeTodaysFeelPeoplePrimary(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
}) | null {
  const [img] = resolvePeopleImagesBySrc([
    "/media/images/rock-river-vermont-visitor-polaroid-swimming-hole.png",
  ]);
  return img ?? null;
}

export function getHomeRiverIntelPeopleAccent(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
}) | null {
  const [img] = resolvePeopleImagesBySrc([
    "/media/images/rock-river-vermont-hiker-smiling-by-forest-stream.png",
  ]);
  return img ?? null;
}

/** One face by the local picks header — balances the visitor-moments row without a heavy pair. */
export function getHomeLocalTeaserPeopleCluster(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  return resolvePeopleImagesBySrc([
    "/media/images/rock-river-vermont-visitor-in-river-open-shirt-square.png",
  ]);
}

/**
 * Hero-adjacent splash row only — disjoint from visitor moments, today’s feel accent, local
 * teaser circle, and river-intel accent (no duplicate faces in those slots).
 */
const HOME_PEOPLE_SPLASH_SRC = [
  "/media/images/rock-river-vermont-two-visitors-tanktops-forest-selfie.png",
  "/media/images/rock-river-vermont-visitor-playful-river-stone-pose.png",
  "/media/images/rock-river-vermont-visitor-picnic-table-arms-wide.png",
] as const;

export function getHomePeopleSplashImages(): (MediaItem & {
  type: "image";
  width: number;
  height: number;
})[] {
  return resolvePeopleImagesBySrc([...HOME_PEOPLE_SPLASH_SRC]);
}
