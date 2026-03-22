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
  sectionEyebrow: "Habitat & heart",
  sectionTitle: "A wild neighbor",
  cardRibbon: "Featured spotlight",
  categoryBadge: "Wild Neighbor",
  displayName: "Somkin",
  bioSentences: [
    "Somkin represents the bears and other wildlife whose home wraps the same hills and hollows we visit—quiet, powerful, and easy to forget when we’re focused on the water.",
    "Give them distance, stash food and scents out of reach, and treat the forest as shared ground: we’re guests in their corridor too.",
  ],
  image: null,
};
