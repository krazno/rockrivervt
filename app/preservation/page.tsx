import Link from "next/link";
import type { Metadata } from "next";

import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Rock River Preservation: nonprofit land protection in Newfane VT, conservation easements, management plan themes, public access, and how stewardship works on the ground—Windham County.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Preservation",
  description: pageDesc,
  path: "/preservation",
  titleAbsolute:
    "Rock River Preservation | Land protection & access — Newfane VT, Windham County",
  keywords: [
    "Rock River preserve",
    "Rock River Preservation",
    "Newfane conservation",
    "Windham County VT trails",
    "Rock River conservation easement",
  ],
});

export default function PreservationPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River preservation & stewardship — Newfane, Vermont"
        description={pageDesc}
        path="/preservation"
      />
      <BreadcrumbJsonLd path="/preservation" />
      <GuidePageFrame
        eyebrow="Stewardship & protection"
        title="Rock River preservation"
        lead="Rock River Preservation, Inc. is a volunteer-run nonprofit formed in 2005 to keep publicly accessible recreation along Rock River intact as southern Vermont faces development pressure, pollution, and erosion. Conserved land is both an ecological refuge and a shared cultural space when use stays lawful, respectful, and nature-first."
      >
        <GuideSection eyebrow="Mission" title="Why land protection matters here">
          <p>
            The organization collaborates with adjacent landowners and the towns of Newfane and
            Dummerston, through which the river passes. Volunteers maintain trails and swimming
            areas, post rules for responsible use, and coordinate a steward program so expectations
            stay clear. Conservation plans also guide invasive-plant work, fragile habitat
            protection, and careful trail repair. The group is proud to support local first
            responders who help keep the community safe.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Tenure" title="Land ownership and legal framework">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-[#1F2A24]">2007 purchase (~4.5 acres)</strong> —
              Riverfront parcel acquired with conservation commitments; a{" "}
              <strong className="font-semibold text-[#1F2A24]">
                conservation easement held by the Vermont Land Trust
              </strong>{" "}
              helps ensure long-term protection and public access under an updated management plan
              (2021).
            </li>
            <li>
              <strong className="font-semibold text-[#1F2A24]">2018 purchase (~21.32 acres)</strong>{" "}
              — Hillside and river lands that expanded total stewarded area to about{" "}
              <strong className="font-semibold text-[#1F2A24]">25.82 acres</strong>. A{" "}
              <strong className="font-semibold text-[#1F2A24]">50-year deed restriction</strong>{" "}
              limits development on that parcel. The board extended management planning across the
              full property; an additional conservation management plan was adopted in 2023.
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Planning" title="Management plan in plain language">
          <p>
            The management plan is both a conservation document and an access document. In plain
            terms, it aims to keep the land largely natural, limit permanent structures on the
            conserved portion to what supports access and erosion control, and monitor litter,
            dumping, trail damage, and water-quality risks. Public access should be known and
            available within what the land can sustain; designated trails may be reinforced while
            informal paths that worsen erosion may be closed or restored.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Parking is constrained—historic patterns near the south end of the original parcel
              shifted after barriers placed by the Town of Newfane; public parking is associated with
              Route 30 near Depot Road in Dummerston.
            </li>
            <li>
              Motorized use is tightly limited (management, emergencies, narrow exceptions such
              as certain snowmobile discretion and accessibility needs).
            </li>
            <li>
              Camping is restricted; overnight use is only allowed on portions not under the
              conservation easement and not in the riparian zone below mean annual high water.
            </li>
            <li>
              Rock River Preservation is not a public safety agency—law enforcement, fire, and
              search-and-rescue remain public responsibilities—but stewards and volunteers help
              educate visitors and coordinate with partners.
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Access" title="What public access means in practice">
          <p>
            Access is a privilege carried by many visitors at once. That means following posted
            rules, staying off private yards, carrying out trash, and treating stewards as allies.
            When access feels crowded, the land is telling you its social limit—slow down, shorten
            your stay, or come back another day.
          </p>
        </GuideSection>

        <GuideSection eyebrow="People" title="Stewards and volunteers">
          <p>
            Stewards welcome newcomers, answer questions, and gently align behavior with community
            standards so the shoreline stays calm. Trail crews and cleanup volunteers handle the
            physical work that keeps access open after storms and heavy seasons. Showing up,
            sharing knowledge, and carrying out trash is how this place endures.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Help" title="How to plug in">
          <p>
            If you would like to help with stewardship—trail days, invasive plant work, or steward
            orientation—reach out through official Rock River Preservation channels. RockRiverVT is a
            volunteer site, not the nonprofit; formal policies and volunteer onboarding live with
            Rock River Preservation.
          </p>
          <p>
            Rock River Preservation, Inc. · P.O. Box 1095, Brattleboro, VT 05302 ·{" "}
            <a
              href="mailto:rockriverpreservation@gmail.com"
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              rockriverpreservation@gmail.com
            </a>
            {" · "}
            <a
              href="https://www.rockriverpreservation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              rockriverpreservation.org
            </a>
          </p>
        </GuideSection>

        <GuideSection eyebrow="Visitors" title="Related on this guide">
          <p>
            <Link href="/guidelines">Guidelines</Link>
            {" · "}
            <Link href="/history">History</Link>
            {" · "}
            <Link href="/map">Map</Link>
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
