import { OG_IMAGE, SITE_URL, absoluteUrl } from "@/lib/seo";
import { socialSameAsUrls } from "@/lib/site";

/**
 * Global structured data: WebSite, Organization, Place/TouristAttraction, ImageObject (OG).
 */
export function SiteWideJsonLd() {
  const sameAs = socialSameAsUrls();

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Rock River Vermont",
      alternateName: ["Rock River VT", "Rock River Newfane Vermont"],
      url: SITE_URL,
      description:
        "Rock River Vermont—unofficial guide to Newfane swimming holes, trail, map, live conditions, and preserve access near Brattleboro, Windham County.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rock River Vermont",
      url: SITE_URL,
      description:
        "Independent guide to Rock River recreation in Newfane and southern Vermont.",
      areaServed: [
        {
          "@type": "City",
          name: "Newfane",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Windham County",
            containedInPlace: {
              "@type": "State",
              name: "Vermont",
              containedInPlace: { "@type": "Country", name: "United States" },
            },
          },
        },
        { "@type": "City", name: "Brattleboro" },
      ],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": ["Place", "TouristAttraction"],
      "@id": `${SITE_URL}/#rock-river-place`,
      name: "Rock River recreation area — Newfane, Vermont",
      isAccessibleForFree: true,
      description:
        "Rock River swimming holes, trail, and river pools in Windham County, southern Vermont, near Brattleboro. Includes Rock River Preserve access.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Newfane",
        addressRegion: "VT",
        postalCode: "05345",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.0967,
        longitude: -72.6578,
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Windham County",
        containedInPlace: { "@type": "State", name: "Vermont" },
      },
    },
    {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#default-og-image`,
      url: absoluteUrl(OG_IMAGE.url),
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      caption: OG_IMAGE.alt,
    },
  ];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
