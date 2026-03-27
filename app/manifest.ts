import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rock River Vermont — welcoming LGBTQ-friendly guide",
    short_name: "Rock River VT",
    description:
      "LGBTQ-welcoming, community-run guide to Rock River—map, conditions, swimming holes, trail, Newfane & Windham County VT.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef2ea",
    theme_color: "#31584b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
