import type { Metadata } from "next";

/** Production site origin — keep in sync with metadataBase in app/layout.tsx */
export const SITE_URL = "https://rockrivervt.com" as const;

export const SITE_NAME_LONG = "Rock River Vermont";
export const SITE_NAME_SHORT = "Rock River VT";

/** Root template segment — keep page titles short so full title stays under ~60 chars with template. */
export const TITLE_TEMPLATE = "%s | Rock River Vermont";

/** Default share image alt (inner pages still use OG_IMAGE url when present) */
export const DEFAULT_OG_ALT =
  "Rock River Vermont—LGBTQ-welcoming guide to the river, trail, and swimming area in Newfane & Windham County";

export const OG_IMAGE = {
  url: "/rock-river-hero.png",
  width: 1200,
  height: 630,
  alt: DEFAULT_OG_ALT,
} as const;

/** Google’s recommended max meta description length */
export const META_DESC_MAX = 150;

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** Truncate at word boundary when possible */
export function truncateMetaDescription(text: string, max = META_DESC_MAX): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

/** Homepage `<title>` / SERP — keep near ~60 characters for Google display */
export const HOME_PAGE_TITLE_ABSOLUTE =
  "Rock River Vermont | Welcoming LGBTQ-friendly river guide · Newfane";

const HOME_META_RAW =
  "Neighbor-run guide to Rock River in Newfane VT—map, live snapshot, conditions, trail, and pools. LGBTQ-welcoming. Not a government site.";

/** Homepage meta description (Google snippet) */
export const HOME_PAGE_DESCRIPTION = truncateMetaDescription(HOME_META_RAW, META_DESC_MAX);

/** Dynamic Open Graph image (`app/opengraph-image.tsx`) */
export const HOME_OG_ALT =
  "Rock River Vermont — LGBTQ-welcoming visitor guide: river, trail, and swimming holes in Newfane & Windham County VT";

export const HOME_OG_TITLE_LINE = "Rock River Vermont";
export const HOME_OG_DESCRIPTION_LINE =
  "LGBTQ-welcoming guide · map, live conditions, swimming holes & trail · Windham County VT";

export type BuildPageMetaArgs = {
  /** Title segment (used with root `title.template`) unless `absoluteTitle` is set */
  title: string;
  description: string;
  /** URL path starting with / (e.g. "/map") */
  path: string;
  titleAbsolute?: string;
  keywords?: string[];
};

/**
 * Consistent metadata: canonical, Open Graph, Twitter Card.
 * Root layout sets `metadataBase` and `title.template`.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  titleAbsolute,
  keywords,
}: BuildPageMetaArgs): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = absoluteUrl(canonicalPath);
  const desc = truncateMetaDescription(description);
  const ogTitle = titleAbsolute ?? `${title} | ${SITE_NAME_LONG}`;

  return {
    ...(titleAbsolute
      ? { title: { absolute: titleAbsolute } }
      : { title }),
    description: desc,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: ogTitle,
      description: desc,
      url,
      type: "website",
      siteName: SITE_NAME_LONG,
      locale: "en_US",
      images: [{ ...OG_IMAGE, alt: DEFAULT_OG_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [{ url: OG_IMAGE.url, alt: DEFAULT_OG_ALT }],
    },
  };
}

/** BreadcrumbList JSON-LD — use on key landing pages */
export function breadcrumbListJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Human-readable labels for common paths (breadcrumbs) */
export const PATH_LABELS: Record<string, string> = {
  "": "Home",
  conditions: "Conditions",
  "daily-updates": "Daily updates",
  map: "Map",
  "land-river": "Land & river",
  history: "History",
  guidelines: "Guidelines",
  preservation: "Preservation",
  visit: "Visit",
  "visitor-guide": "Visitor guide",
  weather: "Weather",
  gallery: "Photos",
  discoveries: "Discoveries",
  local: "Local",
  "local-business": "Area partners",
  resources: "Resources",
  community: "Community",
  "rock-river-vermont": "Rock River Vermont",
  "rock-river-swimming-hole": "Swimming hole",
  "rock-river-trail-vermont": "Trail",
  "rock-river-conditions": "Conditions",
  "rock-river-map": "Map guide",
};

export function defaultBreadcrumbItems(path: string): { name: string; path: string }[] {
  const items: { name: string; path: string }[] = [
    { name: PATH_LABELS[""] ?? "Home", path: "/" },
  ];
  const segments = path.split("/").filter(Boolean);
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    items.push({
      name: PATH_LABELS[seg] ?? seg.replace(/-/g, " "),
      path: acc,
    });
  }
  return items;
}

/** WebPage JSON-LD — pair with BreadcrumbList on key URLs */
export function webPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#rock-river-place` },
  };
}
