import {
  HOME_PAGE_TITLE_ABSOLUTE,
  SITE_URL,
  absoluteUrl,
  breadcrumbListJsonLd,
} from "@/lib/seo";

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
    name: HOME_PAGE_TITLE_ABSOLUTE,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": placeId },
    primaryImageOfPage: { "@id": `${SITE_URL}/#default-og-image` },
    image: absoluteUrl("/opengraph-image"),
    inLanguage: "en-US",
  };

  const article = {
    "@type": "Article",
    "@id": `${SITE_URL}/#homepage-article`,
    headline: HOME_PAGE_TITLE_ABSOLUTE,
    name: "Rock River Vermont — welcoming visitor guide",
    description,
    url: SITE_URL,
    inLanguage: "en-US",
    author: { "@type": "Organization", "@id": orgId },
    publisher: { "@type": "Organization", "@id": orgId },
    mainEntityOfPage: { "@id": webPageId },
    about: { "@id": placeId },
    image: absoluteUrl("/opengraph-image"),
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
