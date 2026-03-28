import Link from "next/link";
import type { Metadata } from "next";

import { PageEngagementBeacon } from "@/components/analytics/page-engagement-beacon";
import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Why Rock River matters: a calm read on what draws people back, how the place fits southern Vermont, and why the guide stays neighbor-run—not a brochure.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Why Rock River",
  description: pageDesc,
  path: "/why-rock-river",
  titleAbsolute: "Why Rock River matters | Vermont river place & community",
  keywords: [
    "Rock River Vermont swimming",
    "Newfane river community",
    "southern Vermont outdoor culture",
  ],
});

export default function WhyRockRiverPage() {
  return (
    <>
      <PageEngagementBeacon category="navigation" label="why_rock_river_page" />
      <WebPageJsonLd
        name="Why Rock River matters"
        description={pageDesc}
        path="/why-rock-river"
      />
      <BreadcrumbJsonLd path="/why-rock-river" />
      <GuidePageFrame
        eyebrow="Place"
        title="Why this river matters"
        lead="Not poetry—just the reasons people keep coming back and why a field guide like this exists."
        peopleAccentPage="why-rock-river"
      >
        <GuideSection eyebrow="Water & stone" title="What people actually experience">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            On a fair day you get cold, clear pockets of water, sun-warmed ledges, and woods that
            sound like normal Vermont forest—not a theme park. The walk from the car is short enough
            that families and day-trippers can do it without an expedition mindset.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#3f4840]">
            That combination is rarer than it sounds: reachable, swimmable, and still mostly
            self-regulated by courtesy. People return because the place feels{" "}
            <em className="not-italic font-medium text-[#1F2A24]">earned</em>, not packaged.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Crowd" title="Why the mix sticks">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            Rock River has a long reputation as welcoming to LGBTQ+ visitors alongside locals and
            weekenders. Most folks just want space, a dip, and an uneventful afternoon. The guide
            pushes safety and respect because that’s what keeps the corridor pleasant for everyone.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Stewardship" title="Why we talk about preservation">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            Heavy use plus weather means trash, erosion, and parking friction add up fast. Calling
            that out isn’t scolding—it’s the same instinct as packing out what you pack in. When
            people understand the place, they tend to treat it better.
          </p>
        </GuideSection>

        <GuideSection eyebrow="This site" title="Neighbor-run, on purpose">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            The map, conditions, and weekly notes exist so you can decide before you drive—not to
            replace reading the river in person. As the local layer grows (businesses, itineraries,
            community mail), the through-line stays the same: useful, honest, and calm.
          </p>
          <p className="mt-4 text-sm font-medium text-[#1F2A24]">
            <Link href="/visit" className="text-[#4F6B52] underline-offset-2 hover:underline">
              Plan a visit
            </Link>
            {" · "}
            <Link href="/plan-your-day" className="text-[#4F6B52] underline-offset-2 hover:underline">
              Plan your day
            </Link>
            {" · "}
            <Link href="/preservation" className="text-[#4F6B52] underline-offset-2 hover:underline">
              Preservation
            </Link>
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
