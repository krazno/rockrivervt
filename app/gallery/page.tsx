import type { Metadata } from "next";

import { GalleryPageContent } from "@/components/gallery/gallery-page-content";

export const metadata: Metadata = {
  title: { absolute: "Rock River Vermont Photos and Videos" },
  description:
    "Photos and videos from Rock River in Newfane Vermont swimming holes trail and preserve",
  openGraph: {
    title: "Rock River Vermont Photos and Videos",
    description:
      "Photos and videos from Rock River in Newfane Vermont swimming holes trail and preserve",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock River Vermont Photos and Videos",
    description:
      "Photos and videos from Rock River in Newfane Vermont swimming holes trail and preserve",
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
