/**
 * Homepage “Meet a Rock River Local” spotlight.
 * Replace fields (or add `image`) when rotating features—no CMS yet.
 */
export type FeaturedLocalImage = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
};

export type FeaturedLocalSpotlight = {
  /** Section eyebrow above the main heading */
  sectionEyebrow: string;
  /** Main section title */
  sectionTitle: string;
  /** Small ribbon on the card */
  cardRibbon: string;
  /** Category pill next to the name */
  categoryBadge: string;
  displayName: string;
  /** Exactly two short sentences */
  bioSentences: readonly [string, string];
  /**
   * When set, the card shows a real photo via `MediaImage`.
   * When null, the UI uses a calm placeholder block (easy swap later).
   */
  image: FeaturedLocalImage | null;
};

export const featuredLocalSpotlight: FeaturedLocalSpotlight = {
  sectionEyebrow: "Community & place",
  sectionTitle: "Meet a Rock River Local",
  cardRibbon: "Featured local spotlight",
  categoryBadge: "Wild Neighbor",
  displayName: "Somkin",
  bioSentences: [
    "Somkin is one of Rock River’s wild neighbors and a reminder that the woods around the river are living habitat too.",
    "Give bears room, keep food and scents tucked away, and enjoy the river knowing we share this corridor with wildlife.",
  ],
  image: null,
};
