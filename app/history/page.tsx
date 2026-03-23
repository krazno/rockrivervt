import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

const ogDescription =
  "How neighbors and visitors organized to protect access and ecology along Rock River.";

export const metadata: Metadata = {
  title: "History",
  description:
    "Timeline of Rock River Preservation—from early volunteer stewardship through land purchases, Irene recovery, and expanded conservation in Newfane, Vermont.",
  alternates: { canonical: "/history" },
  openGraph: {
    title: "History | Rock River VT",
    description: ogDescription,
    url: "https://rockrivervt.com/history",
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
    title: "History | Rock River VT",
    description: ogDescription,
    images: ["/rock-river-hero.png"],
  },
};

export default function HistoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="rr-body text-[#e8f4ef]">
        <Container className="py-10">
          <article className="rr-glass-strong mx-auto max-w-3xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Story over time
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              History
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
              Rock River’s story is part natural history and part community effort: people
              who loved the water and the trails enough to organize, fundraise, and keep
              showing up—through storms, negotiations, and the slow work of stewardship.
            </p>

            <h2
              id="volunteer-preservation-path"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              A volunteer-led preservation path
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              In the early 2000s, concern grew that development, erosion, and shifting
              access could narrow what had long been a shared river experience. Swimmers
              and walkers began coordinating cleanups, watching for pollution, and
              thinking seriously about land protection. That grassroots energy became a
              structured nonprofit—still entirely volunteer-run today—working beside
              neighbors, the Vermont Land Trust, and agencies to hold conservation
              promises in writing while keeping the place welcoming for public use.
            </p>

            <h2
              id="timeline"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Timeline
            </h2>
            <ul className="mt-4 space-y-4 border-l-2 border-white/20 pl-5 text-sm leading-7 text-white/70">
              <li>
                <strong className="text-[var(--rr-mint)]">Summer 2000</strong> — Users of Rock
                River swimming holes establish The Rock River Preservation Society to
                support ecological health, public access, and on-the-ground care through
                cleanups, alerts, and land preservation. The society gains nonprofit
                registration the following year.
              </li>
              <li>
                <strong className="text-[var(--rr-mint)]">2003–2006</strong> — The Connecticut
                River Watershed Council (now Connecticut River Conservancy), concerned it
                could not steward the land adequately alone, approaches the society about
                a purchase. A widening circle of river users helps reorganize; Rock River
                Preservation, Inc. emerges with IRS 501(c)(3) status and a management plan
                focused on erosion, access, and responsible use.
              </li>
              <li>
                <strong className="text-[var(--rr-mint)]">March 16, 2007</strong> — Rock River
                Preservation purchases approximately 4.5 acres of riverfront land from
                the watershed council, with conservation protections held by the Vermont
                Land Trust.
              </li>
              <li>
                <strong className="text-[var(--rr-mint)]">August 27–28, 2011</strong> — Tropical
                Storm Irene reshapes river landscapes across the Northeast, including Rock
                River. Volunteers help reopen trails and clear debris.
              </li>
              <li>
                <strong className="text-[var(--rr-mint)]">2014</strong> — Rock River
                Preservation begins conversation with Robert Swartz and his daughter
                Jennifer, owners of highly used swimming areas across the river from the
                far end of organization-owned land.
              </li>
              <li>
                <strong className="text-[var(--rr-mint)]">Summer–fall 2018</strong> — The
                Swartzes offer about 21.32 acres for sale. More than two hundred river
                users respond to a community fundraising effort, contributing more than
                $90,000; the purchase closes November 20, 2018. Access and
                parking patterns stay as they were; the goal is to conserve the
                experience people have valued for generations, not to add camping or
                re-route public use overnight.
              </li>
            </ul>

            <p className="mt-8 text-sm leading-7 text-white/70">
              Today’s framework—easements, deed terms, and updated management plans—is
              summarized on the{" "}
              <Link
                href="/preservation"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Preservation
              </Link>{" "}
              page. For geography and named reaches of the river, see{" "}
              <Link
                href="/land-river"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Land & River
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
