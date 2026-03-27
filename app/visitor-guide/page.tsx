import type { Metadata } from "next";

import { HomeGuide } from "@/components/home/home-guide";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { buildPageMetadata, META_DESC_MAX, truncateMetaDescription } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Long-form Rock River Vermont visitor guide: swimming holes, trail access, Newfane & Windham County context, safety, seasons, and local culture—volunteer-maintained.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Visitor guide",
  description: pageDesc,
  path: "/visitor-guide",
  titleAbsolute: "Rock River visitor guide | Newfane VT swimming hole, trail & preserve",
  keywords: [
    "Rock River Vermont guide",
    "Rock River Newfane swimming hole",
    "Rock River trail Vermont",
    "Windham County river guide",
  ],
});

export default function VisitorGuidePage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River Vermont visitor guide"
        description={pageDesc}
        path="/visitor-guide"
      />
      <BreadcrumbJsonLd path="/visitor-guide" />
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] flex min-h-screen flex-col bg-[#F6F4EF]/95 pb-16 text-[#1F2A24] antialiased backdrop-blur-[1px]">
        <HomeGuide />
      </main>
      <SiteFooter />
    </>
  );
}
