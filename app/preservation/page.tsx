import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River Preservation in Newfane, Vermont—volunteer stewardship, conservation easements, management plans, and how about 25 acres along Rock River stay protected and open in Windham County.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Preserve & Conservation Stewardship",
  description: pageDesc,
  path: "/preservation",
  keywords: [
    "Rock River preserve",
    "Rock River Preservation",
    "Newfane conservation",
    "Windham County VT trails",
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
      <SiteHeader />
      <main className="rr-body text-[#e8f4ef]">
        <Container className="py-10">
          <article className="rr-glass-strong mx-auto max-w-3xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Stewardship & protection
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Rock River preservation
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
              Rock River Preservation, Inc. is a{" "}
              <strong className="font-medium text-[var(--rr-mint)]">
                volunteer-run nonprofit
              </strong>{" "}
              formed in 2005 to keep publicly accessible recreation along Rock River
              intact as southern Vermont faces development pressure, pollution, and
              erosion. Conserved land is both an ecological refuge and a shared cultural
              space—<strong className="font-medium text-[var(--rr-mint)]">all are welcome</strong>{" "}
              when use stays lawful, respectful, and nature-first.
            </p>

            <h2
              id="mission-in-practice"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Mission in practice
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              The organization collaborates with adjacent landowners and the towns of
              Newfane and Dummerston, through which the river passes. Volunteers maintain
              trails and swimming areas, post rules for responsible use, and coordinate a
              steward program so expectations stay clear. Conservation plans also guide
              invasive-plant work, fragile habitat protection, and careful trail repair.
              The group is proud to support local first responders who help keep the
              community safe.
            </p>

            <h2
              id="land-ownership"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Land ownership & legal framework
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-white/70">
              <li>
                <strong className="text-[var(--rr-mint)]">2007 purchase (~4.5 acres)</strong> —
                Riverfront parcel acquired with conservation commitments; a{" "}
                <strong className="font-medium text-[var(--rr-mint)]">
                  conservation easement held by the Vermont Land Trust
                </strong>{" "}
                helps ensure long-term protection and public access under an updated
                management plan (2021).
              </li>
              <li>
                <strong className="text-[var(--rr-mint)]">2018 purchase (~21.32 acres)</strong> —
                Hillside and river lands that expanded total stewarded area to about{" "}
                <strong className="font-medium text-[var(--rr-mint)]">25.82 acres</strong>. A{" "}
                <strong className="font-medium text-[var(--rr-mint)]">
                  50-year deed restriction
                </strong>{" "}
                limits development on that parcel. The board extended management planning
                across the full property; an additional conservation management plan was
                adopted in 2023.
              </li>
            </ul>

            <h2
              id="management-plan"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              What the management plan emphasizes
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              The management plan is both a conservation document and an access document.
              In plain terms, it aims to keep the land largely natural, limit permanent
              structures on the conserved portion to what supports access and erosion
              control, and monitor litter, dumping, trail damage, and water-quality risks.
              Public access should be known and available within what the land can
              sustain; designated trails may be reinforced while informal paths that
              worsen erosion may be closed or restored.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-white/70">
              <li>
                Parking is constrained—historic patterns near the south end of the
                original parcel shifted after barriers placed by the Town of Newfane;
                public parking is associated with Route 30 near Depot Road in Dummerston.
              </li>
              <li>
                Motorized use is tightly limited (management, emergencies, narrow
                exceptions such as certain snowmobile discretion and accessibility needs).
              </li>
              <li>
                Camping is restricted; overnight use is only allowed on portions not under
                the conservation easement and not in the riparian zone below mean annual
                high water.
              </li>
              <li>
                Rock River Preservation is not a public safety agency—law enforcement,
                fire, and search-and-rescue remain public responsibilities—but stewards
                and volunteers help educate visitors and coordinate with partners.
              </li>
            </ul>

            <h2
              id="stewards-volunteers"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Stewards & volunteers
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Stewards welcome newcomers, answer questions, and gently align behavior with
              community standards so the shoreline stays calm and safe. Trail crews and
              cleanup volunteers handle the physical work that keeps access open after
              storms and heavy seasons. That spirit—showing up, sharing knowledge, carrying
              out trash—is how this place endures.
            </p>

            <h2
              id="how-to-help"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              How to plug in
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              If you would like to help with stewardship—trail days, invasive plant work,
              or steward orientation—reach out through official Rock River Preservation
              channels. This community guide (RockRiverVT) is unofficial; authoritative
              policies and volunteer onboarding live with the nonprofit.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Rock River Preservation, Inc. · P.O. Box 1095, Brattleboro, VT 05302 ·{" "}
              <a
                href="mailto:rockriverpreservation@gmail.com"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                rockriverpreservation@gmail.com
              </a>
              {" · "}
              <a
                href="https://www.rockriverpreservation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                rockriverpreservation.org
              </a>
            </p>

            <p className="mt-8 text-sm leading-7 text-white/70">
              For visitor expectations day to day, read{" "}
              <Link
                href="/guidelines"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Guidelines
              </Link>
              ; for chronology, see{" "}
              <Link
                href="/history"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                History
              </Link>
              . Planning links:{" "}
              <Link
                href="/map"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Map
              </Link>
              ,{" "}
              <Link
                href="/resources"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Resources
              </Link>
              .
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
