import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

/**
 * Allow crawling of public marketing routes. Indexing is still controlled per-page
 * (e.g. `robots: { index: false }` on internal routes). Sitemap lists canonical URLs to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
