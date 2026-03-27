/**
 * Site-wide contact & social — set `href` when profiles go live; omitted links are not rendered as anchors.
 */
/** Primary inbox for mailto links (CrowdStone Design). */
export const CONTACT_FORM_EMAIL = "kraznodesign@gmail.com";

/** Public studio name for sign-offs and partner pages. */
export const SITE_STUDIO_BRAND = "CrowdStone Design";

function withSignoff(lines: string[]): string {
  return [...lines, "", `— ${SITE_STUDIO_BRAND}`].join("\n");
}

/** Share photos for the gallery (manual review; no upload pipeline on-site yet). */
export function mailtoPhotoSubmission(): string {
  const subject = encodeURIComponent("Rock River VT — photo for gallery");
  const body = encodeURIComponent(
    withSignoff([
      "Hi — I’d like to share a photo for the Rock River gallery.",
      "",
      "When & where (approx. is fine):",
      "How to credit you (or “anonymous”):",
      "",
      "Attach your image(s). Landscape or 4:3 works well.",
      "",
      "Thanks!",
    ]),
  );
  return `mailto:${CONTACT_FORM_EMAIL}?subject=${subject}&body=${body}`;
}

/** Area partners / listings / sponsorship inquiries. */
export function mailtoBusinessPartners(): string {
  const subject = encodeURIComponent("Rock River VT — area partner listing");
  const body = encodeURIComponent(
    withSignoff([
      "Hi CrowdStone Design —",
      "",
      "Business or organization:",
      "Town:",
      "What should visitors know before/after the river?",
      "Website or social (optional):",
      "",
      "Interested in: basic listing / visitor perk / sponsor conversation (say what fits):",
      "",
      "Thanks!",
    ]),
  );
  return `mailto:${CONTACT_FORM_EMAIL}?subject=${subject}&body=${body}`;
}

/** Instagram location page for Rock River VT (public grid opens in app/browser.) */
export const INSTAGRAM_ROCK_RIVER_LOCATION_URL =
  "https://www.instagram.com/explore/locations/880409681/rock-river-vt/recent/";

export type SocialProfile = {
  label: string;
  /** Full URL when the profile exists */
  href: string | null;
  /** For JSON-LD sameAs and footer icon */
  key: "instagram" | "reddit" | "facebook" | "youtube";
};

/** Scaffold: add real URLs in production. Used for footer + schema sameAs. */
export const socialProfiles: SocialProfile[] = [
  {
    key: "instagram",
    label: "Instagram — Rock River VT",
    href: INSTAGRAM_ROCK_RIVER_LOCATION_URL,
  },
  { key: "reddit", label: "Reddit", href: null },
  { key: "facebook", label: "Facebook", href: null },
  { key: "youtube", label: "YouTube", href: null },
];

export function socialSameAsUrls(): string[] {
  return socialProfiles
    .map((s) => s.href)
    .filter((h): h is string => typeof h === "string" && h.startsWith("http"));
}
