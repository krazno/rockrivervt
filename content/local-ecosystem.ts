/**
 * Curated local layer — editorial picks, not a directory. Update copy here; no CMS.
 * Prefer honest “near the river” context over generic travel filler.
 */

export type LocalPickCategory =
  | "food"
  | "coffee"
  | "town"
  | "scenic"
  | "culture"
  | "evening"
  | "practical";

/** Multiple kinds let one entry appear in “featured” teasers and on /after-the-river. */
export type LocalPickKind = "featured" | "after_visit" | "nearby";

export type LocalPickEntry = {
  id: string;
  kinds: LocalPickKind[];
  category: LocalPickCategory;
  title: string;
  description: string;
  /** e.g. “Brattleboro · 15 min” */
  area: string;
  /** Optional extra line (hours vibe, parking tip). */
  hint?: string;
  mapsUrl?: string;
  extUrl?: string;
};

export const LOCAL_PICKS: LocalPickEntry[] = [
  {
    id: "brattleboro-downtown-stroll",
    kinds: ["featured", "after_visit", "nearby"],
    category: "town",
    title: "Downtown Brattleboro stroll",
    description:
      "Walkable blocks for a post-swim reset—bookstores, galleries, and people-watching. Easy to pair with dinner without a second long drive.",
    area: "Brattleboro · ~15–20 min",
    hint: "Main Street strip; parallel parking fills on summer Saturdays.",
    mapsUrl: "https://www.google.com/maps/search/Brattleboro+VT+downtown",
  },
  {
    id: "co-op-lunch",
    kinds: ["featured", "after_visit"],
    category: "food",
    title: "Grocery & hot bar stop",
    description:
      "Windham County’s food co-op is a reliable place to stock sandwiches, salad, and drinks before you head home—especially if you skipped packing lunch.",
    area: "Brattleboro · near downtown",
    mapsUrl: "https://www.google.com/maps/search/Brattleboro+food+coop",
  },
  {
    id: "morning-espresso",
    kinds: ["featured", "after_visit"],
    category: "coffee",
    title: "Coffee before the trail",
    description:
      "Grab something warm on a Main Street corner before you aim for the pull-offs—most summer mornings, a short line beats showing up hungry at the trailhead.",
    area: "Brattleboro",
    hint: "Several indie cafés within a few blocks—pick one with outdoor seating if you want sun.",
    mapsUrl: "https://www.google.com/maps/search/Brattleboro+VT+coffee",
  },
  {
    id: "newfane-village",
    kinds: ["nearby", "after_visit"],
    category: "town",
    title: "Newfane village pass-through",
    description:
      "The town green and courthouse hill are a quiet contrast to the river corridor—good for a slow loop if you want Vermont village texture without Brattleboro crowds.",
    area: "Newfane · short drive",
    mapsUrl: "https://www.google.com/maps/search/Newfane+VT+town+green",
  },
  {
    id: "route-30-scenic",
    kinds: ["featured", "nearby", "after_visit"],
    category: "scenic",
    title: "Route 30 river approach",
    description:
      "The drive you already use to reach Rock River is part of the day—fields, barns, and sudden river glimpses. Worth rolling windows down between Newfane and the pull-offs.",
    area: "Windham County",
  },
  {
    id: "guilford-williamsville",
    kinds: ["after_visit", "nearby"],
    category: "scenic",
    title: "Guilford & Williamsville loop",
    description:
      "Low-traffic roads south of Brattleboro—stone walls, farm views, and a calmer pace if you want a scenic return instead of the highway.",
    area: "15–25 min from river",
    mapsUrl: "https://www.google.com/maps/search/Williamsville+VT",
  },
  {
    id: "west-river-drive",
    kinds: ["after_visit"],
    category: "scenic",
    title: "Along the West River",
    description:
      "If you still want water after Rock River, the West River corridor offers different bends and picnic pulls—pair with a map check so you’re not guessing gates or parking.",
    area: "Southern Windham County",
    hint: "Treat as exploration, not a promise of swim spots.",
  },
  {
    id: "evening-music",
    kinds: ["after_visit", "nearby"],
    category: "evening",
    title: "Evening music & patios",
    description:
      "Brattleboro often has small-stage music and early patios in season—nice cap if you’re staying overnight or heading home late.",
    area: "Brattleboro downtown",
    mapsUrl: "https://www.google.com/maps/search/Brattleboro+VT+live+music",
  },
  {
    id: "gas-supplies",
    kinds: ["nearby", "after_visit"],
    category: "practical",
    title: "Fuel & ice",
    description:
      "Fill the tank and grab ice in town before the last leg—cell service can thin along the corridor, and the pull-offs don’t run a concession stand.",
    area: "Brattleboro / Newfane",
  },
  {
    id: "area-partners",
    kinds: ["featured", "nearby", "after_visit"],
    category: "culture",
    title: "Area partners (when listed)",
    description:
      "Businesses that explicitly want to welcome river visitors will live on the Area partners page—clear perks, no junk mail.",
    area: "Windham County",
    extUrl: "/local-business",
  },
];

/** Editorial week window — Vermont calendar dates inclusive. */
export type WeeklyRiverNote = {
  validFrom: string;
  validTo: string;
  headline: string;
  body: string;
};

export const WEEKLY_RIVER_NOTES: WeeklyRiverNote[] = [
  {
    validFrom: "2026-03-24",
    validTo: "2026-04-06",
    headline: "Shoulder season honesty",
    body:
      "Water is still cold; mud shows up after rain. Weekends are thinner than July, but the trail can feel busy on the first warm Saturday. Pack layers, check the forecast tile, and don’t expect summer parking drama yet—still worth a careful visit.",
  },
  {
    validFrom: "2026-04-07",
    validTo: "2026-05-31",
    headline: "Spring on the corridor",
    body:
      "Runoff and blackflies take turns being the story. Mornings are often calmer; afternoons can buzz. If the river looks tan or fast, walking the rim beats wading.",
  },
];
