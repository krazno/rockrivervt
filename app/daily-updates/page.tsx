import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River daily notes from Newfane and Windham County Vermont: trail and river updates when posted. Use live conditions and weather on the home page anytime.";

export const metadata: Metadata = buildPageMetadata({
  title: "Daily updates",
  description: pageDesc,
  path: "/daily-updates",
  keywords: ["Rock River updates", "Newfane trail conditions", "Rock River journal"],
});

export default function DailyUpdatesPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River daily updates — Newfane, Vermont"
        description={pageDesc}
        path="/daily-updates"
      />
      <BreadcrumbJsonLd path="/daily-updates" />
      <SiteHeader />
      <main className="rr-body py-10 text-[var(--rr-text)]">
        <Container className="max-w-3xl">
          <div className="rr-glass-strong overflow-hidden p-6 sm:p-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--rr-mint)]">
              Journal
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--rr-ink)] sm:text-4xl">
              Daily updates
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--rr-text-muted)] sm:text-lg">
              Short field notes—mud on the trail, a calm morning on the pools, or a heads-up
              after heavy rain—appear here when they are published. For live weather, river
              context, and crowd feel, use the tools on the home page first.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#today-at-rock-river"
                className="rr-btn-primary inline-flex px-5 py-2.5 text-sm"
              >
                Live conditions
              </Link>
              <Link href="/conditions" className="rr-btn-ghost px-5 py-2.5 text-sm">
                Conditions page
              </Link>
              <Link href="/map" className="rr-btn-ghost px-5 py-2.5 text-sm">
                Map
              </Link>
              <Link href="/visit" className="rr-btn-ghost px-5 py-2.5 text-sm">
                Visit
              </Link>
              <Link href="/weather" className="rr-btn-ghost px-5 py-2.5 text-sm">
                Weather
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
