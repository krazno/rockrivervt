import { OG_IMAGE, SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * Global structured data: WebSite, Organization, Place/TouristAttraction, ImageObject (OG).
 * Rendered once from the root layout (server component).
 */
export function SiteWideJsonLd() {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Rock River Vermont",
      alternateName: ["Rock River VT", "Rock River Newfane"],
      url: SITE_URL,
      description:
        "Unofficial guide to Rock River in Newfane, Windham County VT—rocky swimming holes, trails, map, conditions, and stewardship near Brattleboro.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rock River Vermont",
      url: SITE_URL,
      description:
        "Community-maintained field guide and resource site for Rock River recreation in southern Vermont.",
      areaServed: [
        {
          "@type": "City",
          name: "Newfane",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Windham County",
            containedInPlace: { "@type": "State", name: "Vermont", containedInPlace: { "@type": "Country", name: "United States" } },
          },
        },
        { "@type": "City", name: "Brattleboro" },
      ],
    },
    {
      "@type": ["Place", "TouristAttraction"],
      "@id": `${SITE_URL}/#rock-river-place`,
      name: "Rock River recreation area",
      description:
        "Rocky river swimming holes, trails, and river pools along Rock River in southern Vermont (Newfane / Windham County), near Brattleboro.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Newfane",
        addressRegion: "VT",
        addressCountry: "US",
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Windham County",
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
