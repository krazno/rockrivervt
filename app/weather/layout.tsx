import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Weather & Forecast",
  description:
    "Local weather for Rock River, Newfane VT and southern Vermont—pair with conditions and the map before you swim or hike Windham County.",
  path: "/weather",
  keywords: [
    "Rock River weather",
    "Newfane VT weather",
    "southern Vermont weather",
    "Windham County forecast",
  ],
});

export default function WeatherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
