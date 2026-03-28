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
  { href: "/daily-updates", label: "Daily updates" },
  { href: "/plan-your-day", label: "Plan your day" },
  { href: "/after-the-river", label: "After the river" },
  { href: "/get-featured", label: "Get featured" },
  { href: "/local-business", label: "Area partners" },
  { href: "/local", label: "Local · LGBTQ-friendly" },
  { href: "/land-river", label: "Land & River" },
  { href: "/history", label: "History" },
  { href: "/guidelines", label: "Guidelines" },
] as const;

export type PrimaryNavItem = (typeof primaryNav)[number];
export type SecondaryNavItem = (typeof secondaryNav)[number];

/** Header-only IA — editorial top bar (footer still uses primaryNav / secondaryNav). */
export type HeaderNavLink = {
  href: string;
  label: string;
  match: (pathname: string) => boolean;
  /** Mobile drawer section label */
  group: "explore" | "visit" | "about";
};

export const HEADER_PRIMARY_NAV: HeaderNavLink[] = [
  {
    href: "/map",
    label: "Map",
    group: "explore",
    match: (p) => p === "/map" || p.startsWith("/rock-river-map"),
  },
  {
    href: "/conditions",
    label: "Conditions",
    group: "explore",
    match: (p) => p === "/conditions" || p.startsWith("/rock-river-conditions"),
  },
  {
    href: "/daily-updates",
    label: "Updates",
    group: "explore",
    match: (p) => p === "/daily-updates",
  },
  {
    href: "/after-the-river",
    label: "After river",
    group: "visit",
    match: (p) => p === "/after-the-river",
  },
  {
    href: "/plan-your-day",
    label: "Plan day",
    group: "visit",
    match: (p) => p === "/plan-your-day",
  },
  {
    href: "/visit",
    label: "Visit",
    group: "visit",
    match: (p) => p === "/visit",
  },
  {
    href: "/gallery",
    label: "Photos",
    group: "explore",
    match: (p) => p.startsWith("/gallery"),
  },
  {
    href: "/history",
    label: "History",
    group: "about",
    match: (p) => p === "/history",
  },
  {
    href: "/guidelines",
    label: "Guidelines",
    group: "about",
    match: (p) => p.startsWith("/guidelines"),
  },
];

export const HEADER_COMMUNITY: HeaderNavLink = {
  href: "/community",
  label: "Community",
  group: "about",
  match: (p) => p === "/community",
};

const HEADER_GROUP_LABEL: Record<HeaderNavLink["group"], string> = {
  explore: "Explore",
  visit: "Visit",
  about: "About",
};

/** Mobile drawer order: section headers + links in visual order. */
export function headerNavByGroup(): {
  group: HeaderNavLink["group"];
  label: string;
  items: HeaderNavLink[];
}[] {
  const all = [...HEADER_PRIMARY_NAV, HEADER_COMMUNITY];
  const order: HeaderNavLink["group"][] = ["explore", "visit", "about"];
  return order.map((group) => ({
    group,
    label: HEADER_GROUP_LABEL[group],
    items: all.filter((i) => i.group === group),
  }));
}
