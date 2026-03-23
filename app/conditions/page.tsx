import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River conditions for Newfane VT: weather, river, and how busy it feels—plus links to the map and daily notes.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Conditions & Live Weather",
  description: pageDesc,
  path: "/conditions",
  keywords: [
    "Rock River conditions",
    "Rock River VT water level",
    "Newfane river conditions",
    "southern Vermont river safety",
  ],
});

const cardClass =
  "group rounded-2xl border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] p-5 shadow-[var(--rr-shadow-card)] backdrop-blur-sm transition hover:border-[var(--rr-glow)]/35 hover:shadow-[var(--rr-shadow-card-hover)]";

export default function ConditionsPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River conditions & live weather — Newfane, Vermont"
        description={pageDesc}
        path="/conditions"
      />
      <BreadcrumbJsonLd path="/conditions" />
      <SiteHeader />
      <main className="rr-body text-[var(--rr-text)]">
        <Container className="py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Plan
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-semibold tracking-tight text-[var(--rr-ink)] sm:text-4xl">
              Conditions &amp; weather
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--rr-text-muted)] sm:text-lg">
              Weather, river, and crowd feel live on the{" "}
              <Link href="/#today-at-rock-river" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
                home page
              </Link>
              . Use this page for quick links.
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-[#d4c9a8]/70 bg-[#f5f0e4]/90 p-5 sm:p-6">
            <h2 className="text-sm font-semibold tracking-tight text-[#4a4030]">
              Spring
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5c5344]">
              Snowmelt can raise flow fast—crossings and banks change. If it feels off, turn back.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/#today-at-rock-river" className={cardClass}>
              <h2 className="text-sm font-semibold text-[var(--rr-ink)]">Live weather & river</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--rr-text-muted)]">
                Today’s widgets.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-link)] transition group-hover:translate-x-0.5">
                Open →
              </span>
            </Link>
            <Link href="/daily-updates" className={cardClass}>
              <h2 className="text-sm font-semibold text-[var(--rr-ink)]">Daily updates</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--rr-text-muted)]">
                Short notes when we post them.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-link)] transition group-hover:translate-x-0.5">
                View →
              </span>
            </Link>
            <Link href="/map" className={cardClass}>
              <h2 className="text-sm font-semibold text-[var(--rr-ink)]">Map</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--rr-text-muted)]">
                Parking, trail, river.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-link)] transition group-hover:translate-x-0.5">
                Open →
              </span>
            </Link>
            <Link href="/guidelines" className={cardClass}>
              <h2 className="text-sm font-semibold text-[var(--rr-ink)]">Guidelines</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--rr-text-muted)]">
                Before you go.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-link)] transition group-hover:translate-x-0.5">
                Read →
              </span>
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-[var(--rr-text-muted)] sm:text-left">
            <Link href="/weather" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
              Weather only
            </Link>
            {" · "}
            <Link href="/visit" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
              Visiting
            </Link>
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
