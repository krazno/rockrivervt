import Link from "next/link";
import type { Metadata } from "next";

import { PageEngagementBeacon } from "@/components/analytics/page-engagement-beacon";
import { GetFeaturedForm } from "@/components/partners/get-featured-form";
import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import {
  buildPageMetadata,
  truncateMetaDescription,
  META_DESC_MAX,
} from "@/lib/seo";
import { CONTACT_FORM_EMAIL, SITE_STUDIO_BRAND, mailtoBusinessPartners } from "@/lib/site";

const pageDesc = truncateMetaDescription(
  "Get featured on Rock River VT: criteria for Windham County businesses, editorial listings, and a simple request path. No junk mail—partner tone stays honest.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Get featured",
  description: pageDesc,
  path: "/get-featured",
  titleAbsolute: "Get featured on Rock River VT | Local business & partner listings",
  keywords: [
    "Rock River Vermont local business",
    "Windham County partner listing",
    "Brattleboro Newfane visitor guide",
  ],
});

export default function GetFeaturedPage() {
  return (
    <>
      <PageEngagementBeacon category="partner" label="get_featured_page" />
      <WebPageJsonLd
        name="Get featured — Rock River Vermont local partners"
        description={pageDesc}
        path="/get-featured"
      />
      <BreadcrumbJsonLd path="/get-featured" />
      <GuidePageFrame
        eyebrow="Local platform"
        title="Get featured"
        lead="A calm on-ramp for cafés, shops, lodging, and organizations that genuinely help river visitors. Listings stay editorial first—if paid placement ever exists, it will be obvious on the page."
        photoAccentSeed="get-featured"
      >
        <GuideSection eyebrow="Fit" title="Who this is for">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#3f4840]">
            <li>You serve people who are already in southern Vermont—or about to be—for a river day.</li>
            <li>You’re OK with short, accurate blurbs instead of hard-sell copy.</li>
            <li>You welcome a mixed crowd, including LGBTQ+ visitors, without making it a gimmick.</li>
            <li>You can keep hours and links roughly current when we check in.</li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Not for" title="What we skip">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            Multi-level pitches, bait-and-switch discounts, or anything that would erode trust in the
            guide. We’d rather send fewer clicks to the right places than flood the site with noise.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Later" title="Room to grow">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            Today everything is editorial and labeled. The structure is intentionally simple so{" "}
            <strong className="font-semibold text-[#1F2A24]">featured tiers</strong> or{" "}
            <strong className="font-semibold text-[#1F2A24]">small sponsor blocks</strong> could plug in
            later—always disclosed, never disguised as news.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Request" title="Send a note">
          <GetFeaturedForm />
          <p className="mt-6 text-sm text-[#6B6F68]">
            Prefer a free-form email?{" "}
            <a
              href={mailtoBusinessPartners()}
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              Same inbox
            </a>{" "}
            ({CONTACT_FORM_EMAIL}) — or read the full{" "}
            <Link
              href="/local-business"
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              Area partners
            </Link>{" "}
            page ({SITE_STUDIO_BRAND}).
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
