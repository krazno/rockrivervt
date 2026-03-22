import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Planning a visit to Rock River, Vermont: parking on Route 30 in Dummerston, woodland trails, spring safety, and links to guidelines and conditions.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit | Rock River VT",
    description:
      "Practical notes for a calm, respectful day at Rock River near Newfane.",
    url: "https://rockrivervt.com/visit",
    type: "website",
  },
};

export default function VisitPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] text-[#20342c]">
        <Container className="py-10">
          <section className="rounded-3xl border border-[#c8d6cb] bg-white/65 p-6 shadow-[0_18px_55px_-25px_rgba(24,49,43,0.42)] ring-1 ring-black/5 sm:p-8">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
                Plan with care
              </p>
              <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
                Visiting Rock River
              </h1>
              <p className="mt-3 text-base leading-7 text-[#38594f] sm:text-lg">
                Rock River is best met at a walking pace—woodland trails, uneven stone,
                and water that changes with the season.{" "}
                <strong className="font-medium text-[#2a453c]">All are welcome</strong>{" "}
                when we move gently, watch our footing, and leave room for neighbors,
                wildlife, and each other.
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#c9b896]/60 bg-[#faf6ed] p-5 sm:p-6">
              <h2 className="text-sm font-semibold tracking-tight text-[#5a4a1a]">
                Spring river note
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4a4538]">
                Snowmelt and warm afternoons can raise flows and strengthen currents
                through the day. Consider staying on one bank, wear sturdy shoes, and
                read the full spring guidance on{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                >
                  Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/guidelines"
                  className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                >
                  Guidelines
                </Link>
                .
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5">
              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Parking & access
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  The public parking associated with river access is along{" "}
                  <strong className="font-medium text-[#2a453c]">
                    Route 30 in Dummerston
                  </strong>{" "}
                  (near the Depot Road area). Respect signage, road paint, and
                  neighbors’ driveways. From there, woodland trails connect to the
                  shoreline—allow extra time and patience on busy days.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Walking to the river
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Paths are unpaved and can be steep or slick after rain. Keep hands free
                  on rocky pitches, choose footwear with grip, and pause where you need
                  to. If water or trail conditions feel beyond your comfort, enjoy a
                  shorter outing or return another day—that’s part of caring for yourself
                  and the place.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Respectful visiting
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Pack out what you pack in, keep sound human-scale, ask before
                  photographing anyone, and honor clothing-optional boundaries marked on
                  site. Full etiquette, steward expectations, and safety notes live on
                  the{" "}
                  <Link
                    href="/guidelines"
                    className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                  >
                    Guidelines
                  </Link>{" "}
                  page.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Map & live tools
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Open the{" "}
                  <Link
                    href="/map"
                    className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                  >
                    interactive map
                  </Link>{" "}
                  for parking and trail context, and the{" "}
                  <Link
                    href="/#today-at-rock-river"
                    className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                  >
                    home page widgets
                  </Link>{" "}
                  for weather, river notes, and gentle crowd check-ins.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Stewardship
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  The shoreline many of us love is cared for by volunteers through Rock
                  River Preservation. Understanding that history helps explain why rules
                  exist and why kindness to stewards matters. Read{" "}
                  <Link
                    href="/preservation"
                    className="font-medium text-[#31584b] underline-offset-2 hover:underline"
                  >
                    Preservation
                  </Link>{" "}
                  for land tenure, easements, and how to volunteer.
                </p>
              </section>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
