import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
};

/**
 * Next.js serves this at /sitemap.xml (production: rockrivervt.com/sitemap.xml).
 *
 * Keep in sync with app marketing routes: one entry per page.tsx under app/ (path "" = home).
 * Omit API routes. robots.ts should list the same SITE_URL + /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: RouteConfig[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/conditions", changeFrequency: "daily", priority: 0.95 },
    { path: "/map", changeFrequency: "weekly", priority: 0.95 },
    { path: "/visit", changeFrequency: "monthly", priority: 0.9 },
    { path: "/weather", changeFrequency: "daily", priority: 0.85 },
    { path: "/gallery", changeFrequency: "weekly", priority: 0.85 },
    { path: "/guidelines", changeFrequency: "monthly", priority: 0.85 },
    { path: "/daily-updates", changeFrequency: "weekly", priority: 0.8 },
    { path: "/land-river", changeFrequency: "monthly", priority: 0.8 },
    { path: "/preservation", changeFrequency: "monthly", priority: 0.8 },
    { path: "/resources", changeFrequency: "monthly", priority: 0.8 },
    { path: "/community", changeFrequency: "monthly", priority: 0.75 },
    { path: "/discoveries", changeFrequency: "monthly", priority: 0.75 },
    { path: "/history", changeFrequency: "monthly", priority: 0.75 },
    { path: "/local", changeFrequency: "monthly", priority: 0.75 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified,
    changeFrequency,
    priority,
  }));
}
