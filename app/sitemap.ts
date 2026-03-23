import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
};

/**
 * Sitemap for indexing. Next serves /sitemap.xml from this file.
 * Update RouteConfig when adding marketing routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: RouteConfig[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/conditions", changeFrequency: "daily", priority: 0.95 },
    { path: "/map", changeFrequency: "weekly", priority: 0.95 },
    { path: "/visit", changeFrequency: "monthly", priority: 0.9 },
    { path: "/weather", changeFrequency: "daily", priority: 0.85 },
    { path: "/daily-updates", changeFrequency: "weekly", priority: 0.8 },
    { path: "/gallery", changeFrequency: "weekly", priority: 0.85 },
    { path: "/land-river", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guidelines", changeFrequency: "monthly", priority: 0.85 },
    { path: "/preservation", changeFrequency: "monthly", priority: 0.8 },
    { path: "/history", changeFrequency: "monthly", priority: 0.75 },
    { path: "/discoveries", changeFrequency: "monthly", priority: 0.75 },
    { path: "/local", changeFrequency: "monthly", priority: 0.75 },
    { path: "/resources", changeFrequency: "monthly", priority: 0.8 },
    { path: "/community", changeFrequency: "monthly", priority: 0.75 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
