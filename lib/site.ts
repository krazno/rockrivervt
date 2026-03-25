/**
 * Site-wide contact & social — set `href` when profiles go live; omitted links are not rendered as anchors.
 */
/** Primary inbox for mailto links */
export const CONTACT_FORM_EMAIL = "kraznodesign@gmail.com";

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
