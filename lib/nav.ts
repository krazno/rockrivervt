/** Primary navigation — header (top-level IA). */
export const primaryNav = [
  { href: "/visit", label: "Visit" },
  { href: "/conditions", label: "Conditions" },
  { href: "/map", label: "Map" },
  { href: "/discoveries", label: "Discoveries" },
  { href: "/community", label: "Community" },
  { href: "/preservation", label: "Preservation" },
  { href: "/gallery", label: "Photos" },
  { href: "/resources", label: "Resources" },
] as const;

/** Secondary links — footer, mobile “also,” internal discovery. */
export const secondaryNav = [
  { href: "/local", label: "Local · LGBTQ-friendly" },
  { href: "/land-river", label: "Land & River" },
  { href: "/history", label: "History" },
  { href: "/guidelines", label: "Guidelines" },
] as const;

export type PrimaryNavItem = (typeof primaryNav)[number];
export type SecondaryNavItem = (typeof secondaryNav)[number];
