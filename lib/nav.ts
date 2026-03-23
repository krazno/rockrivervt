/** Primary navigation — single source for header & footer. */
export const primaryNav = [
  { href: "/map", label: "Map" },
  { href: "/conditions", label: "Conditions" },
  { href: "/land-river", label: "Land & River" },
  { href: "/history", label: "History" },
  { href: "/guidelines", label: "Guidelines" },
  { href: "/preservation", label: "Preservation" },
  { href: "/gallery", label: "Photos" },
] as const;

export type PrimaryNavItem = (typeof primaryNav)[number];
