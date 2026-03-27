import Link from "next/link";
import type { Metadata } from "next";

import { GuideFaqSection } from "@/components/guide/guide-faq-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { GUIDELINES_PAGE_FAQ } from "@/content/visitor-faq";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { Container } from "@/components/shared/container";
import { PhotoAccentRow } from "@/components/shared/photo-accent-row";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River visitor guidelines for Newfane Vermont: safety, parking, trail etiquette, respectful use, and clothing-optional areas in Windham County near Brattleboro.";

export const metadata: Metadata = buildPageMetadata({
  title: "Guidelines",
  description: pageDesc,
  path: "/guidelines",
  keywords: [
    "Rock River guidelines",
    "Rock River etiquette",
    "Newfane river rules",
    "Rock River LGBTQ friendly Vermont",
    "Rock River clothing optional etiquette",
  ],
});

export default function GuidelinesPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River visitor guidelines — Newfane, Vermont"
        description={pageDesc}
        path="/guidelines"
      />
      <FaqJsonLd items={GUIDELINES_PAGE_FAQ} />
      <BreadcrumbJsonLd path="/guidelines" />
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] rr-body text-slate-800">
        <Container className="py-10">
          <article className="rr-glass-strong mx-auto max-w-3xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              What usually works here
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Rock River visitor guidelines
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              New to the river? Skim the{" "}
              <Link
                href="/visit"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                visit
              </Link>{" "}
              page for parking and timing, check the{" "}
              <Link
                href="/map"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                map
              </Link>{" "}
              and{" "}
              <Link
                href="/conditions"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                conditions
              </Link>
              , then use this list for day-of behavior. Land stewarded by Rock River Preservation is
              open for lawful use and must follow posted rules. Most days go smoothly when people treat
              neighbors, the corridor, and everyone on the trail and in the water with ordinary
              courtesy—quiet voices, patience, and care.
            </p>

            <PhotoAccentRow seed="page-guidelines" className="mt-8" />

            <div className="mt-8 overflow-hidden rounded-2xl border border-amber-200/80 bg-amber-50 p-5 sm:p-6">
              <h2
                id="spring-caution"
                className="scroll-mt-28 text-sm font-semibold tracking-tight text-amber-900"
              >
                Spring trail & river caution
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-amber-950/90">
                In spring, sun and warmer afternoon temperatures melt snow and ice
                upriver; levels can rise and currents can become very swift. An easy
                morning crossing may be difficult later the same day. Consider staying on
                the southern bank so you are not caught on the far side. Wear sturdy
                footwear, keep hands free on steep or slippery parts of the access trail,
                and turn back if anything feels uncertain. More context:{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Conditions
                </Link>
                .
              </p>
            </div>

            <h2
              id="respect-community"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Respect our community
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Honor the privacy of adjacent landowners and what people here usually expect.
              Small courtesies—picking up after yourself, not cutting through yards—help keep
              access open. Outside signed clothing-optional areas, dress as you would in any
              shared outdoor space in town.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
              <li>
                <span className="font-medium text-[var(--rr-mint)]">Do</span> keep voices low,
                greet people politely, and follow signage and road paint.
              </li>
              <li>
                <span className="font-medium text-[var(--rr-mint)]">Don’t</span> cut through
                private property, peer into homes, or leave gear where it blocks access.
              </li>
            </ul>

            <h2
              id="respect-land"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Respect the land
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
              <li>Pack out everything you bring in; pick up stray litter when you can.</li>
              <li>
                Do not harm live plants except as part of organized invasive-species work.
              </li>
              <li>
                Fires only on rocky or sandy riverbanks, fully extinguished before you
                leave.
              </li>
              <li>Keep dogs leashed and pick up after them.</li>
              <li>No soap or suds in the river—plan ahead; there are no restrooms on site.</li>
              <li>
                Camping is limited and subject to steward guidance and conservation
                restrictions; when in doubt, plan a day visit.
              </li>
            </ul>

            <h2
              id="respect-visitors"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Respect other visitors
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
              <li>Give people space; don’t photograph anyone without clear permission.</li>
              <li>If someone signals they want privacy, move along without debate.</li>
              <li>No radios or amplified music.</li>
              <li>
                If someone seems new to the etiquette here, explain kindly and plainly—
                we all learn this place together.
              </li>
            </ul>

            <h2
              id="river-stewards"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              River stewards
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Stewards designated by the Rock River Preservation board help visitors align
              with these guidelines. Their direction should be honored—it keeps the
              shoreline calmer for families, long-time visitors, queer folks, and everyone
              else sharing the mixed crowd.
            </p>

            <h2
              id="practical-checklist"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Before you go—practical checklist
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
              <li>You use the land at your own risk.</li>
              <li>
                Trails are unpaved and uneven; expect slippery rock, roots, and steep
                pitches.
              </li>
              <li>Wear footwear with grip; use poles only if they help you stay stable.</li>
              <li>
                Parking for the recreation area is along{" "}
                <strong className="font-medium text-[var(--rr-mint)]">Route 30 in Dummerston</strong>{" "}
                (near Depot Road)—the usual access people mean when they say “Rock River” and Newfane,
                even though the pull-offs sit just across the town line. Respect limitations shown by signs
                or paint.
              </li>
              <li>Use extra care when walking or crossing Route 30.</li>
              <li>
                Check{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Conditions
                </Link>
                , the{" "}
                <Link
                  href="/map"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  map
                </Link>
                , and{" "}
                <Link
                  href="/visit"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Visit
                </Link>{" "}
                for step-by-step context.
              </li>
            </ul>

            <div className="mt-10">
              <GuideFaqSection
                id="guidelines-faq"
                eyebrow="Etiquette questions"
                title="Short answers"
                items={GUIDELINES_PAGE_FAQ}
                className="border-slate-200/90 bg-white/70"
              />
            </div>

            <p className="mt-8 text-sm leading-7 text-slate-600">
              Want to help care for trails and shoreline? Stewardship and volunteer work
              are at the heart of this place—see{" "}
              <Link
                href="/preservation"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Preservation
              </Link>{" "}
              for how the organization thinks about long-term protection.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
