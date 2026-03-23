import type { Metadata } from "next";

import { GalleryPageContent } from "@/components/gallery/gallery-page-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River photos and trail video from Newfane and Windham County VT—rocky swimming holes, southern Vermont river scenes, and the full trail tour near Brattleboro.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Photos, Gallery & Trail Video",
  description: pageDesc,
  path: "/gallery",
  keywords: [
    "Rock River photos",
    "Rock River Vermont pictures",
    "Newfane swimming hole photos",
    "southern Vermont river photos",
  ],
});

export default function GalleryPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River photos & gallery — Newfane, Vermont"
        description={pageDesc}
        path="/gallery"
      />
      <BreadcrumbJsonLd path="/gallery" />
      <GalleryPageContent />
    </>
  );
}
