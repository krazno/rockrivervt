import type { Metadata } from "next";

import { GalleryPageContent } from "@/components/gallery/gallery-page-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River Vermont photos & video: trail, river pools, and shoreline scenes grouped for planning—Newfane, Windham County. Pair with map, visit, and guidelines.";

export const metadata: Metadata = buildPageMetadata({
  title: "Photos & gallery",
  description: pageDesc,
  path: "/gallery",
  titleAbsolute:
    "Rock River Vermont photos | Gallery — Newfane swimming holes & trail",
  keywords: [
    "Rock River photos",
    "Rock River Vermont pictures",
    "Newfane swimming hole photos",
    "southern Vermont river photos",
    "Rock River trail photos",
  ],
});

export default function GalleryPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River Vermont photos & gallery — Newfane, Windham County"
        description={pageDesc}
        path="/gallery"
      />
      <BreadcrumbJsonLd path="/gallery" />
      <GalleryPageContent />
    </>
  );
}
