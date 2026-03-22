import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather",
  description:
    "Local weather context for planning a visit to Rock River near Newfane and Dummerston, Vermont.",
  alternates: { canonical: "/weather" },
  openGraph: {
    title: "Weather | Rock River VT",
    description: "Neighborhood weather for Rock River, Vermont.",
    url: "https://rockrivervt.com/weather",
    type: "website",
  },
};

export default function WeatherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
