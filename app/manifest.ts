import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RockRiverVT",
    short_name: "RockRiverVT",
    description:
      "An unofficial community guide to Rock River near Newfane, Vermont.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef2ea",
    theme_color: "#31584b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
