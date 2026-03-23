import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River daily updates: short local notes on trail footing, river flow, and season shifts in Newfane and Windham County VT—pair with live conditions on the home page.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Daily Updates & Trail Notes",
  description: pageDesc,
  path: "/daily-updates",
  keywords: ["Rock River updates", "Newfane trail conditions", "Rock River journal"],
});

export default function DailyUpdatesPage() {
  const subCard =
    "rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm";

  return (
    <>
      <WebPageJsonLd
        name="Rock River daily updates — Newfane, Vermont"
        description={pageDesc}
        path="/daily-updates"
      />
      <BreadcrumbJsonLd path="/daily-updates" />
      <SiteHeader />
      <main className="rr-body py-10 text-slate-800">
        <Container className="max-w-3xl">
          <div className="rr-glass-strong overflow-hidden p-6 sm:p-8">
            <p className="mb-3 inline-flex rounded-full border border-[var(--rr-glow)]/35 bg-[var(--rr-glow)]/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[var(--rr-mint)] uppercase">
              Conditions journal
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Rock River daily updates
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
              We’re building a light rhythm of local notes—mud on the lower switchbacks,
              a calm morning on the pools, a heads-up after heavy rain. Posts will appear
              here as neighbors and regulars share what’s safe and kind to expect.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              For right now, pair this page with live tools on the home page and the{" "}
              <Link
                href="/conditions"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>{" "}
              hub.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#today-at-rock-river"
                className="rounded-full bg-[var(--rr-glow)] px-5 py-2.5 text-sm font-semibold text-[#04120e] shadow-lg shadow-[var(--rr-glow)]/25 transition hover:brightness-110"
              >
                Live weather &amp; river
              </Link>
              <Link
                href="/conditions"
                className="rounded-full border border-slate-200 bg-sky-50 px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-sky-100/90"
              >
                Conditions hub
              </Link>
              <Link
                href="/weather"
                className="rounded-full border border-slate-200 bg-sky-50 px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-sky-100/90"
              >
                Weather only
              </Link>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <article className={subCard}>
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                What to expect
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Short, factual blurbs from people who walked the trail that day—not
                forecasts, just ground truth.
              </p>
            </article>
            <article className={subCard}>
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                Cadence
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                More frequent in swim season; extra notes around storms and spring melt.
              </p>
            </article>
            <article className={subCard}>
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                Safety first
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Always confirm conditions on site—no post replaces your own judgment
                near moving water.
              </p>
            </article>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
