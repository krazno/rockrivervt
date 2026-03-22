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
      url: "https://rockrivervt.com/conditions",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://rockrivervt.com/daily-updates",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://rockrivervt.com/map",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://rockrivervt.com/land-river",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://rockrivervt.com/history",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://rockrivervt.com/guidelines",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://rockrivervt.com/preservation",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://rockrivervt.com/visit",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://rockrivervt.com/weather",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: "https://rockrivervt.com/gallery",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];
}
