import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://rockrivervt.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://rockrivervt.com/daily-updates",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
