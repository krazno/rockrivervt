import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

const ogDescription =
  "How Rock River’s conservation framework balances ecology, access, and community care.";

export const metadata: Metadata = {
  title: "Preservation",
  description:
    "Rock River Preservation—volunteer stewardship, conservation easements, management plans, and how about 25 acres along Rock River stay protected and open.",
  alternates: { canonical: "/preservation" },
  openGraph: {
    title: "Preservation & Stewardship | Rock River VT",
    description: ogDescription,
    url: "https://rockrivervt.com/preservation",
    type: "website",
    siteName: "Rock River VT",
    images: [
      {
        url: "/rock-river-hero.png",
        width: 1200,
        height: 630,
        alt: "Rock River near Newfane, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preservation & Stewardship | Rock River VT",
    description: ogDescription,
    images: ["/rock-river-hero.png"],
  },
};

export default function PreservationPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] text-[#20342c]">
        <Container className="py-10">
          <article className="mx-auto max-w-3xl rounded-3xl border border-[#c8d6cb] bg-white/65 p-6 shadow-[0_18px_55px_-25px_rgba(24,49,43,0.42)] ring-1 ring-black/5 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
              Stewardship & protection
            </p>
            <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
              Preservation
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#38594f] sm:text-lg">
              Rock River Preservation, Inc. is a{" "}
              <strong className="font-medium text-[#2a453c]">
                volunteer-run nonprofit
              </strong>{" "}
              formed in 2005 to keep publicly accessible recreation along Rock River
              intact as southern Vermont faces development pressure, pollution, and
              erosion. Conserved land is both an ecological refuge and a shared cultural
              space—<strong className="font-medium text-[#2a453c]">all are welcome</strong>{" "}
              when use stays lawful, respectful, and nature-first.
            </p>

            <h2
              id="mission-in-practice"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              Mission in practice
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#38594f]">
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
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              Land ownership & legal framework
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#38594f]">
              <li>
                <strong className="text-[#2a453c]">2007 purchase (~4.5 acres)</strong> —
                Riverfront parcel acquired with conservation commitments; a{" "}
                <strong className="font-medium text-[#2a453c]">
                  conservation easement held by the Vermont Land Trust
                </strong>{" "}
                helps ensure long-term protection and public access under an updated
                management plan (2021).
              </li>
              <li>
                <strong className="text-[#2a453c]">2018 purchase (~21.32 acres)</strong> —
                Hillside and river lands that expanded total stewarded area to about{" "}
                <strong className="font-medium text-[#2a453c]">25.82 acres</strong>. A{" "}
                <strong className="font-medium text-[#2a453c]">
                  50-year deed restriction
                </strong>{" "}
                limits development on that parcel. The board extended management planning
                across the full property; an additional conservation management plan was
                adopted in 2023.
              </li>
            </ul>

            <h2
              id="management-plan"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              What the management plan emphasizes
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#38594f]">
              The management plan is both a conservation document and an access document.
              In plain terms, it aims to keep the land largely natural, limit permanent
              structures on the conserved portion to what supports access and erosion
              control, and monitor litter, dumping, trail damage, and water-quality risks.
              Public access should be known and available within what the land can
              sustain; designated trails may be reinforced while informal paths that
              worsen erosion may be closed or restored.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#38594f]">
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
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              Stewards & volunteers
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#38594f]">
              Stewards welcome newcomers, answer questions, and gently align behavior with
              community standards so the shoreline stays calm and safe. Trail crews and
              cleanup volunteers handle the physical work that keeps access open after
              storms and heavy seasons. That spirit—showing up, sharing knowledge, carrying
              out trash—is how this place endures.
            </p>

            <h2
              id="how-to-help"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              How to plug in
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#38594f]">
              If you would like to help with stewardship—trail days, invasive plant work,
              or steward orientation—reach out through official Rock River Preservation
              channels. This community guide (RockRiverVT) is unofficial; authoritative
              policies and volunteer onboarding live with the nonprofit.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#38594f]">
              Rock River Preservation, Inc. · P.O. Box 1095, Brattleboro, VT 05302 ·{" "}
              <a
                href="mailto:rockriverpreservation@gmail.com"
                className="font-medium text-[#31584b] underline-offset-2 hover:underline"
              >
                rockriverpreservation@gmail.com
              </a>
              {" · "}
              <a
                href="https://www.rockriverpreservation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#31584b] underline-offset-2 hover:underline"
              >
                rockriverpreservation.org
              </a>
            </p>

            <p className="mt-8 text-sm leading-7 text-[#38594f]">
              For visitor expectations day to day, read{" "}
              <Link
                href="/guidelines"
                className="font-medium text-[#31584b] underline-offset-2 hover:underline"
              >
                Guidelines
              </Link>
              ; for chronology, see{" "}
              <Link
                href="/history"
                className="font-medium text-[#31584b] underline-offset-2 hover:underline"
              >
                History
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
