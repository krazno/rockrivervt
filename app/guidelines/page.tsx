import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

const ogDescription =
  "How to visit Rock River respectfully: community, land, privacy, and safety.";

export const metadata: Metadata = {
  title: "Guidelines",
  description:
    "Respectful visiting, safety, parking, trail etiquette, and river stewardship for Rock River, Vermont—living best practices for a shared place.",
  alternates: { canonical: "/guidelines" },
  openGraph: {
    title: "Visitor Guidelines | Rock River VT",
    description: ogDescription,
    url: "https://rockrivervt.com/guidelines",
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
    title: "Visitor Guidelines | Rock River VT",
    description: ogDescription,
    images: ["/rock-river-hero.png"],
  },
};

export default function GuidelinesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] text-[#20342c]">
        <Container className="py-10">
          <article className="mx-auto max-w-3xl rounded-3xl border border-[#c8d6cb] bg-white/65 p-6 shadow-[0_18px_55px_-25px_rgba(24,49,43,0.42)] ring-1 ring-black/5 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
              Living best practices
            </p>
            <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
              Guidelines
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#38594f] sm:text-lg">
              Land stewarded by Rock River Preservation is open to the public for lawful
              use and must follow posted rules. Above all, visit in a spirit of respect—for
              neighbors, for the river corridor, and for everyone sharing the trail and the
              water. <strong className="font-medium text-[#2a453c]">All are welcome</strong>{" "}
              when we choose kindness, discretion, and care.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#c9b896]/60 bg-[#faf6ed] p-5 sm:p-6">
              <h2
                id="spring-caution"
                className="scroll-mt-28 text-sm font-semibold tracking-tight text-[#5a4a1a]"
              >
                Spring trail & river caution
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4a4538]">
                In spring, sun and warmer afternoon temperatures melt snow and ice
                upriver; levels can rise and currents can become very swift. An easy
                morning crossing may be difficult later the same day. Consider staying on
                the southern bank so you are not caught on the far side. Wear sturdy
                footwear, keep hands free on steep or slippery parts of the access trail,
                and turn back if anything feels uncertain. More context:{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                >
                  Conditions
                </Link>
                .
              </p>
            </div>

            <h2
              id="respect-community"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              Respect our community
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#38594f]">
              Honor the privacy of adjacent landowners and local norms. Act in ways that
              strengthen public regard for the river and help protect access for the
              future. Outside marked clothing-optional areas, wear clothing as you would
              in any shared outdoor space in town.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#38594f]">
              <li>
                <span className="font-medium text-[#2a453c]">Do</span> keep voices low,
                greet people politely, and follow signage and road paint.
              </li>
              <li>
                <span className="font-medium text-[#2a453c]">Don’t</span> cut through
                private property, peer into homes, or leave gear where it blocks access.
              </li>
            </ul>

            <h2
              id="respect-land"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              Respect the land
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#38594f]">
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
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              Respect other visitors
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#38594f]">
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
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              River stewards
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#38594f]">
              Stewards designated by the Rock River Preservation board help visitors align
              with these guidelines. Their direction should be honored—it keeps the
              shoreline safer and calmer for families, longtime regulars, LGBTQ+
              visitors, and everyone in between.
            </p>

            <h2
              id="practical-checklist"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase"
            >
              Before you go—practical checklist
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#38594f]">
              <li>You use the land at your own risk.</li>
              <li>
                Trails are unpaved and uneven; expect slippery rock, roots, and steep
                pitches.
              </li>
              <li>Wear footwear with grip; use poles only if they help you stay stable.</li>
              <li>
                The public parking associated with access is along{" "}
                <strong className="font-medium text-[#2a453c]">Route 30 in Dummerston</strong>{" "}
                (near the Depot Road area). Respect limitations shown by signs or paint.
              </li>
              <li>Use extra care when walking or crossing Route 30.</li>
              <li>
                Check{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                >
                  Conditions
                </Link>
                , the{" "}
                <Link
                  href="/map"
                  className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                >
                  map
                </Link>
                , and{" "}
                <Link
                  href="/visit"
                  className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                >
                  Visit
                </Link>{" "}
                for step-by-step context.
              </li>
            </ul>

            <p className="mt-8 text-sm leading-7 text-[#38594f]">
              Want to help care for trails and shoreline? Stewardship and volunteer work
              are at the heart of this place—see{" "}
              <Link
                href="/preservation"
                className="font-medium text-[#31584b] underline-offset-2 hover:underline"
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
