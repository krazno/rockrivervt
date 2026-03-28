import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { Container } from "@/components/shared/container";
import { getAllDailyNotesSorted } from "@/lib/daily-pulse";
import {
  formatNoteDateForDisplay,
  getDailyPulsePayload,
} from "@/lib/daily-pulse";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const pageDesc =
  "Rock River field notes from Newfane and Windham County Vermont—short, honest updates between swims. Live weather and conditions stay on the home page.";

export const metadata: Metadata = buildPageMetadata({
  title: "Daily updates",
  description: pageDesc,
  path: "/daily-updates",
  keywords: ["Rock River updates", "Newfane trail journal", "Rock River field notes"],
});

export default function DailyUpdatesPage() {
  const notes = getAllDailyNotesSorted();
  const pulse = getDailyPulsePayload();
  const featured = pulse.note;

  return (
    <>
      <WebPageJsonLd
        name="Rock River daily updates — Newfane, Vermont"
        description={pageDesc}
        path="/daily-updates"
      />
      <BreadcrumbJsonLd path="/daily-updates" />
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] rr-body py-10 text-[var(--rr-text)]">
        <Container className="max-w-3xl">
          <header className="rr-glass-strong overflow-hidden p-6 sm:p-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--rr-mint)]">
              Journal
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--rr-ink)] sm:text-4xl">
              Daily updates
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--rr-text-muted)] sm:text-lg">
              Short field notes—mud on the trail, a calm morning on the pools, or a heads-up after
              heavy rain. Not a newsroom: we post when there is something worth saying. For numbers,
              start with{" "}
              <Link href="/#plan-today" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
                live conditions on the home page
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#plan-today" className="rr-btn-primary inline-flex px-5 py-2.5 text-sm">
                Home — Right now
              </Link>
              <Link href="/conditions" className="rr-btn-ghost px-5 py-2.5 text-sm">
                Conditions
              </Link>
              <Link href="/map" className="rr-btn-ghost px-5 py-2.5 text-sm">
                Map
              </Link>
              <Link href="/visit" className="rr-btn-ghost px-5 py-2.5 text-sm">
                Visit
              </Link>
            </div>
          </header>

          <section
            className="mt-8 rounded-2xl border border-[#E2E0D8] bg-white/90 p-6 shadow-sm sm:p-7"
            aria-labelledby="featured-note-heading"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6F68]">
              On the home page now
            </p>
            <h2
              id="featured-note-heading"
              className="font-heading mt-2 text-xl font-bold text-[#1F2A24] sm:text-2xl"
            >
              {featured.headline}
            </h2>
            <p className="mt-1 text-[13px] text-[#8a918c]">
              <time dateTime={featured.date}>{formatNoteDateForDisplay(featured.date)}</time>
            </p>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#3f4840]">
              {featured.body.split(/\n\n+/).map((p, i) => (
                <p key={i}>{p.trim()}</p>
              ))}
            </div>
          </section>

          <section className="mt-10" aria-labelledby="archive-heading">
            <h2
              id="archive-heading"
              className="font-heading text-lg font-semibold text-[var(--rr-ink)] sm:text-xl"
            >
              Recent entries
            </h2>
            <ol className="mt-5 space-y-4 border-t border-[#E8E4DC] pt-5">
              {notes.map((n) => (
                <li
                  key={n.date}
                  className="border-b border-[#EFECE6] pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a918c]">
                    <time dateTime={n.date}>{formatNoteDateForDisplay(n.date)}</time>
                  </p>
                  <p className="font-heading mt-1 text-base font-semibold text-[#1F2A24]">
                    {n.headline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--rr-text-muted)]">
                    {n.body.split(/\n\n+/)[0]?.trim()}
                  </p>
                </li>
              ))}
            </ol>
            {notes.length === 0 ?
              <p className="mt-4 text-sm text-[var(--rr-text-muted)]">
                No entries yet—edit <code className="rounded bg-[#f0ebe4] px-1 text-[13px]">content/daily-notes.ts</code>{" "}
                to add the first note.
              </p>
            : null}
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
