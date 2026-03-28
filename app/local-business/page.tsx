import Link from "next/link";
import type { Metadata } from "next";

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
  `Windham County area partners for Rock River visitors: cafés, shops, lodging near Newfane & Brattleboro. LGBTQ-friendly guide—list your business, optional perks & sponsors. Email ${SITE_STUDIO_BRAND}.`,
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Area partners",
  description: pageDesc,
  path: "/local-business",
  titleAbsolute:
    "Rock River area partners | LGBTQ-friendly local directory — Newfane & Brattleboro VT",
  keywords: [
    "Brattleboro cafes near Rock River",
    "Newfane Vermont lodging",
    "Windham County LGBTQ friendly businesses",
    "Rock River visitors shops",
    "southern Vermont local partners",
  ],
});

export default function LocalBusinessPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River area partners — local businesses"
        description={pageDesc}
        path="/local-business"
      />
      <BreadcrumbJsonLd path="/local-business" />
      <GuidePageFrame
        eyebrow="Windham County"
        title="Area partners"
        lead="The river pulls a friendly, mixed crowd—families, hikers, swimmers, and plenty of LGBTQ+ folks who already treat southern Vermont as home for the weekend. This page is where local spots can show up next to the map and conditions: helpful, clearly labeled, never a junky coupon wall."
        photoAccentSeed="area-partners"
      >
        <GuideSection eyebrow="Featured pathway" title="Want a clearer on-ramp?">
          <p className="text-sm leading-relaxed text-[#3f4840]">
            Criteria, tone, and a short form live on{" "}
            <Link href="/get-featured" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Get featured
            </Link>
            —same inbox and standards as this page, just easier to scan before you write.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Why list here" title="Meet people at the right moment">
          <p>
            Visitors aren’t flipping a phone book—they’re checking{" "}
            <Link href="/conditions">conditions</Link>, the <Link href="/map">map</Link>, and{" "}
            <Link href="/visit">how to visit</Link> first. A tight listing answers “coffee before the
            trail,” “sandwich after the swim,” or “somewhere to stay without driving back to Boston
            tonight.” We keep tone warm and practical—the same vibe as the rest of this guide.
          </p>
        </GuideSection>

        <GuideSection eyebrow="How to get listed" title="Three easy steps" id="list">
          <ol className="list-decimal space-y-3 pl-5 marker:font-semibold marker:text-[#4F6B52]">
            <li>
              <strong className="font-semibold text-[#1F2A24]">Say hello.</strong> Email{" "}
              <strong className="font-semibold text-[#1F2A24]">{SITE_STUDIO_BRAND}</strong> with your
              business name, town, and what visitors should know.
            </li>
            <li>
              <strong className="font-semibold text-[#1F2A24]">We shape the card.</strong> Short blurb,
              link, maybe hours—kept honest and scannable. Optional: a seasonal note or a simple visitor
              perk when you want one (we label it clearly).
            </li>
            <li>
              <strong className="font-semibold text-[#1F2A24]">Go live with the guide.</strong> When the
              directory block rolls out, you’re already in the queue—sponsor or section tie-ins stay
              obvious, never disguised as editorial.
            </li>
          </ol>
          <p className="pt-2">
            <a
              href={mailtoBusinessPartners()}
              className="inline-flex items-center gap-1 font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              Email {SITE_STUDIO_BRAND} — get on the list
            </a>{" "}
            <span className="text-[#6B6F68]">({CONTACT_FORM_EMAIL})</span>
          </p>
        </GuideSection>

        <GuideSection eyebrow="Later" title="Perks & sponsors (optional)">
          <p>
            Some businesses like a small shout-out next to conditions or the map—we can talk about what
            feels fair and visible. Discount codes only when you want them; we’d rather send real
            people your way than blast generic ads.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Who’s looking" title="The crowd we share">
          <p>
            Day-trippers, weekenders, and locals who already know Rock River’s reputation as a{" "}
            <Link href="/local">welcoming</Link>, mixed-use river. Listings here should feel like a nod
            from a neighbor—not a billboard. Analytics stay aggregated; we use them to see which pages
            people use before they drive, not to chase anyone around the internet.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Elsewhere" title="Related">
          <p>
            <Link href="/local">Local area</Link>
            {" · "}
            <Link href="/visit">Visit</Link>
            {" · "}
            <Link href="/resources">Resources</Link>
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
