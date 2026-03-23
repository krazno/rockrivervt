import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River history in Newfane and Windham County: volunteer care, land protection, floods, and conservation along this southern Vermont river near Brattleboro.";

export const metadata: Metadata = buildPageMetadata({
  title: "History",
  description: pageDesc,
  path: "/history",
  keywords: ["Rock River history", "Newfane conservation history", "Rock River Preservation timeline"],
});

export default function HistoryPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River history — Newfane, Vermont"
        description={pageDesc}
        path="/history"
      />
      <BreadcrumbJsonLd path="/history" />
      <SiteHeader />
      <main className="rr-body text-slate-800">
        <Container className="py-10">
          <article className="rr-glass-strong mx-auto max-w-3xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Story over time
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Rock River history
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
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
            <p className="mt-3 text-sm leading-7 text-slate-600">
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
            <ul className="mt-4 space-y-4 border-l-2 border-slate-200 pl-5 text-sm leading-7 text-slate-600">
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

            <p className="mt-8 text-sm leading-7 text-slate-600">
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
