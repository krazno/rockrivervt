import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/map",
        "/conditions",
        "/gallery",
        "/visit",
        "/rock-river-vermont",
        "/rock-river-swimming-hole",
        "/rock-river-trail-vermont",
        "/rock-river-conditions",
        "/rock-river-map",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
