import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

import { WeatherPageClient } from "./weather-client";

const pageDesc =
  "Rock River weather for Newfane Vermont: same local forecast as the home page. Use with conditions and map for Windham County and southern Vermont.";

export const metadata: Metadata = buildPageMetadata({
  title: "Weather",
  description: pageDesc,
  path: "/weather",
  keywords: ["Rock River weather", "Newfane VT weather", "Windham County forecast"],
});

export default function WeatherPage() {
  return <WeatherPageClient />;
}
