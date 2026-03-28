import Link from "next/link";
import type { Metadata } from "next";

import { PageEngagementBeacon } from "@/components/analytics/page-engagement-beacon";
import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { PlanItinerariesClient } from "@/components/plan/plan-itineraries-client";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { PLAN_ITINERARIES } from "@/content/plan-itineraries";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Plan your Rock River day: short itineraries pairing the swim, after-the-river picks, and nearby towns—Brattleboro, Newfane, and first-visit basics.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Plan your day",
  description: pageDesc,
  path: "/plan-your-day",
  titleAbsolute: "Plan your Rock River day | Itineraries — Vermont swimming & towns",
  keywords: [
    "Rock River day trip Vermont",
    "Brattleboro after swimming",
    "Newfane river afternoon",
  ],
});

export default function PlanYourDayPage() {
  return (
    <>
      <PageEngagementBeacon category="navigation" label="plan_your_day_page" />
      <WebPageJsonLd
        name="Plan your Rock River day — itineraries"
        description={pageDesc}
        path="/plan-your-day"
      />
      <BreadcrumbJsonLd path="/plan-your-day" />
      <GuidePageFrame
        eyebrow="Full day"
        title="Plan your day"
        lead="Three short arcs: river time, then food or a town loop—written for real driving distances and the way people actually use this guide."
        peopleAccentPage="plan-your-day"
      >
        <GuideSection eyebrow="How to use this" title="Templates, not bookings">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            Swap steps as you like. Check{" "}
            <Link href="/conditions" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              conditions
            </Link>{" "}
            before you leave; use the{" "}
            <Link href="/map" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              map
            </Link>{" "}
            for parking. After the swim,{" "}
            <Link
              href="/after-the-river"
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              After the river
            </Link>{" "}
            has the full pick list these samples pull from.
          </p>
        </GuideSection>

        <PlanItinerariesClient itineraries={PLAN_ITINERARIES} />

        <GuideSection eyebrow="Local layer" title="Businesses & partners">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            Spots that want to show up beside the guide can start at{" "}
            <Link href="/get-featured" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Get featured
            </Link>{" "}
            or{" "}
            <Link
              href="/local-business"
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              Area partners
            </Link>
            .
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
