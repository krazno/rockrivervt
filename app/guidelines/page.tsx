import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River visitor guidelines for Newfane & Windham County VT: respectful use, safety, parking, trail etiquette, LGBTQ-friendly and clothing-optional norms, and southern Vermont river stewardship.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Visitor Guidelines & Etiquette",
  description: pageDesc,
  path: "/guidelines",
  keywords: [
    "Rock River guidelines",
    "Rock River etiquette",
    "Newfane river rules",
    "Rock River LGBTQ friendly Vermont",
    "Rock River nudist beach etiquette",
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
      <BreadcrumbJsonLd path="/guidelines" />
      <SiteHeader />
      <main className="rr-body text-slate-800">
        <Container className="py-10">
          <article className="rr-glass-strong mx-auto max-w-3xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Living best practices
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Rock River visitor guidelines
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              Land stewarded by Rock River Preservation is open to the public for lawful
              use and must follow posted rules. Above all, visit in a spirit of respect—for
              neighbors, for the river corridor, and for everyone sharing the trail and the
              water. <strong className="font-medium text-[var(--rr-mint)]">All are welcome</strong>{" "}
              when we choose kindness, discretion, and care.
            </p>

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
              Honor the privacy of adjacent landowners and local norms. Act in ways that
              strengthen public regard for the river and help protect access for the
              future. Outside marked clothing-optional areas, wear clothing as you would
              in any shared outdoor space in town.
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
              shoreline safer and calmer for families, longtime regulars, LGBTQ+
              visitors, and everyone in between.
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
                The public parking associated with access is along{" "}
                <strong className="font-medium text-[var(--rr-mint)]">Route 30 in Dummerston</strong>{" "}
                (near the Depot Road area). Respect limitations shown by signs or paint.
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
