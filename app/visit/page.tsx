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
      <main className="rr-body text-[#e8f4ef]">
        <Container className="py-10">
          <section className="rr-glass-strong p-6 sm:p-8">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
                Plan with care
              </p>
              <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Visiting Rock River
              </h1>
              <p className="mt-3 text-base leading-7 text-white/70 sm:text-lg">
                Rock River is best met at a walking pace—woodland trails, uneven stone,
                and water that changes with the season.{" "}
                <strong className="font-medium text-[var(--rr-mint)]">All are welcome</strong>{" "}
                when we move gently, watch our footing, and leave room for neighbors,
                wildlife, and each other.
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-amber-400/25 bg-amber-500/10 p-5 sm:p-6">
              <h2 className="text-sm font-semibold tracking-tight text-amber-100">
                Spring river note
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-amber-50/85">
                Snowmelt and warm afternoons can raise flows and strengthen currents
                through the day. Consider staying on one bank, wear sturdy shoes, and
                read the full spring guidance on{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/guidelines"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Guidelines
                </Link>
                .
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5">
              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                  Parking & access
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  The public parking associated with river access is along{" "}
                  <strong className="font-medium text-[var(--rr-mint)]">
                    Route 30 in Dummerston
                  </strong>{" "}
                  (near the Depot Road area). Respect signage, road paint, and
                  neighbors’ driveways. From there, woodland trails connect to the
                  shoreline—allow extra time and patience on busy days.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                  Walking to the river
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Paths are unpaved and can be steep or slick after rain. Keep hands free
                  on rocky pitches, choose footwear with grip, and pause where you need
                  to. If water or trail conditions feel beyond your comfort, enjoy a
                  shorter outing or return another day—that’s part of caring for yourself
                  and the place.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                  Respectful visiting
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Pack out what you pack in, keep sound human-scale, ask before
                  photographing anyone, and honor clothing-optional boundaries marked on
                  site. Full etiquette, steward expectations, and safety notes live on
                  the{" "}
                  <Link
                    href="/guidelines"
                    className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                  >
                    Guidelines
                  </Link>{" "}
                  page.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                  Map & live tools
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Open the{" "}
                  <Link
                    href="/map"
                    className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                  >
                    interactive map
                  </Link>{" "}
                  for parking and trail context, and the{" "}
                  <Link
                    href="/#today-at-rock-river"
                    className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                  >
                    home page widgets
                  </Link>{" "}
                  for weather, river notes, and gentle crowd check-ins.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                  Stewardship
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  The shoreline many of us love is cared for by volunteers through Rock
                  River Preservation. Understanding that history helps explain why rules
                  exist and why kindness to stewards matters. Read{" "}
                  <Link
                    href="/preservation"
                    className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
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
