import type { Metadata } from "next";

import { ResearchTestSplash } from "@/components/research/research-test-splash";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { buildPageMetadata, META_DESC_MAX, truncateMetaDescription } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Internal lab page: prototype UI for future deep research (planning, evidence, synthesis). Not indexed; no AI backend yet.",
  META_DESC_MAX,
);

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Research lab (test)",
    description: pageDesc,
    path: "/research",
    titleAbsolute: "Research lab (test) | Rock River Vermont",
    keywords: [],
  }),
  robots: { index: false, follow: false },
};

export default function ResearchTestPage() {
  return (
    <>
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] flex min-h-screen flex-col bg-[#F6F4EF]/95 pb-8 text-[#1F2A24] antialiased backdrop-blur-[1px]">
        <ResearchTestSplash />
      </main>
      <SiteFooter />
    </>
  );
}
