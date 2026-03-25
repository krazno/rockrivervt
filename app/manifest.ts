import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rock River Vermont — Newfane & Windham County guide",
    short_name: "Rock River VT",
    description:
      "Rock River Vermont—map, swimming holes, live conditions, trail, and visitor guide for Newfane & Windham County.",
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
