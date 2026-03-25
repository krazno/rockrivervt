import { absoluteUrl, OG_IMAGE, SITE_URL } from "@/lib/seo";

const HOME_PAGE_NAME = "Rock River Vermont | Newfane VT Swimming Hole Guide";

type HomePageJsonLdProps = {
  description: string;
};

/**
 * Extra WebPage + publisher hints for Google (pair with global WebSite / Organization graph).
 */
export function HomePageJsonLd({ description }: HomePageJsonLdProps) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: HOME_PAGE_NAME,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#rock-river-place` },
    primaryImageOfPage: { "@id": `${SITE_URL}/#default-og-image` },
    image: absoluteUrl(OG_IMAGE.url),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
