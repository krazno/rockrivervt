/**
 * Reviewable source registry for guide copy.
 *
 * Before treating any entry as a “citation” in UI, confirm URLs and wording
 * against the live source. Comments here are for editors—not end-user display.
 */

export type SourceRegistryEntry = {
  id: string;
  /** Short label for a “Further reading” line (optional use in UI). */
  label: string;
  /** Stable URL when known; omit if the pointer is “search the agency site.” */
  url?: string;
  /** Visitor-safe one-line context (shown on site). */
  publicBlurb: string;
  /** Internal note for reviewers. */
  reviewerNote: string;
};

export const SOURCE_REGISTRY: SourceRegistryEntry[] = [
  {
    id: "rrp-official",
    label: "Rock River Preservation",
    url: "https://www.rockriverpreservation.org",
    publicBlurb: "Nonprofit land stewardship and public access along Rock River.",
    reviewerNote:
      "Management-plan themes on this site echo their public framing—verify against current PDFs/pages before quoting numbers.",
  },
  {
    id: "vt-anr",
    label: "Vermont Agency of Natural Resources",
    url: "https://anr.vermont.gov/",
    publicBlurb: "State conservation programs and public lands context for Vermont.",
    reviewerNote: "Not site-specific to Rock River; use for regional outdoor ethics context.",
  },
  {
    id: "vt-geological-survey",
    label: "Vermont Geological Survey",
    url: "https://anr.vermont.gov/geological-survey",
    publicBlurb: "Regional geology publications and maps—use for background, not on-site collecting advice.",
    reviewerNote:
      "Northern Appalachians context only; do not imply specific mineral collecting at Rock River.",
  },
  {
    id: "usgs",
    label: "USGS",
    url: "https://www.usgs.gov/",
    publicBlurb: "National streamgage and map products; pair with this site’s live river widget for flow context.",
    reviewerNote:
      "River tool in code documents the gage used—do not invent discharge or flood claims in copy.",
  },
];
