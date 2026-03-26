import {
  OG_IMAGE,
  SITE_URL,
  absoluteUrl,
  breadcrumbListJsonLd,
} from "@/lib/seo";

const HOME_PAGE_TITLE =
  "Rock River Vermont | Map, Conditions, Swimming Hole, Trail | Newfane VT Guide";

type HomePageJsonLdProps = {
  description: string;
};

/**
 * Homepage `@graph`: WebPage, Article, BreadcrumbList.
 * `SiteWideJsonLd` (root layout) already publishes WebSite, Organization, Place + TouristAttraction
 * (`#rock-river-place`), and ImageObject — same `@id` targets are referenced here via `about` / `isPartOf`.
 */
export function HomePageJsonLd({ description }: HomePageJsonLdProps) {
  const webPageId = `${SITE_URL}/#webpage`;
  const orgId = `${SITE_URL}/#organization`;
  const placeId = `${SITE_URL}/#rock-river-place`;

  const webPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url: SITE_URL,
    name: HOME_PAGE_TITLE,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": placeId },
    primaryImageOfPage: { "@id": `${SITE_URL}/#default-og-image` },
    image: absoluteUrl(OG_IMAGE.url),
    inLanguage: "en-US",
  };

  const article = {
    "@type": "Article",
    "@id": `${SITE_URL}/#homepage-article`,
    headline: "Rock River Vermont Visitor Guide",
    name: "Rock River Vermont Visitor Guide",
    description,
    url: SITE_URL,
    inLanguage: "en-US",
    author: { "@type": "Organization", "@id": orgId },
    publisher: { "@type": "Organization", "@id": orgId },
    mainEntityOfPage: { "@id": webPageId },
    about: { "@id": placeId },
    image: absoluteUrl(OG_IMAGE.url),
  };

  const breadcrumbs = breadcrumbListJsonLd([{ name: "Home", path: "/" }]);

  const payload = {
    "@context": "https://schema.org",
    "@graph": [webPage, article, breadcrumbs],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
