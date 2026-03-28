import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { Container } from "@/components/shared/container";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata, SITE_NAME_SHORT } from "@/lib/seo";

const pageDesc =
  "Disclaimers and limitations for the unofficial Rock River Vermont visitor guide—not legal advice, not a government site, and how community photos are used.";

export const metadata: Metadata = buildPageMetadata({
  title: "Legal & disclaimers",
  description: pageDesc,
  path: "/legal",
  keywords: [
    "Rock River Vermont disclaimer",
    "Rock River VT site terms",
    "unofficial river guide",
  ],
});

export default function LegalPage() {
  return (
    <>
      <WebPageJsonLd
        name={`${SITE_NAME_SHORT} — legal & disclaimers`}
        description={pageDesc}
        path="/legal"
      />
      <BreadcrumbJsonLd path="/legal" />
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] rr-body text-slate-800">
        <Container className="py-10 sm:py-12">
          <article className="rr-glass-strong mx-auto max-w-3xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Fine print
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Legal &amp; disclaimers
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[var(--rr-text-muted)] sm:text-[15px]">
              {SITE_NAME_SHORT} is an independent, neighbor-run field guide. This page summarizes how to read
              the site—not a substitute for professional legal, safety, or medical advice.
            </p>

            <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
              <h2 className="font-heading text-lg font-semibold text-slate-900">Not official</h2>
              <p>
                This site is not operated by the Town of Newfane, Windham County, the State of Vermont, or
                any government agency. Maps, conditions summaries, and visitor tips are for general planning
                only and may be incomplete or out of date.
              </p>
            </section>

            <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
              <h2 className="font-heading text-lg font-semibold text-slate-900">Safety &amp; conditions</h2>
              <p>
                Rivers change hour by hour. Nothing here replaces your own judgment, reading posted signage,
                and following applicable laws. You are responsible for your choices in and around the water,
                trail, and parking areas.
              </p>
            </section>

            <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
              <h2 className="font-heading text-lg font-semibold text-slate-900">Photos &amp; people</h2>
              <p>
                Gallery and homepage images are meant to celebrate the place and community vibe. If you
                appear in a photo and prefer it taken down,{" "}
                <Link
                  href="/get-featured"
                  className="font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  contact the maintainer
                </Link>{" "}
                or use the email in the footer. Submissions should be yours to share or cleared with
                everyone pictured.
              </p>
            </section>

            <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
              <h2 className="font-heading text-lg font-semibold text-slate-900">Privacy &amp; analytics</h2>
              <p>
                Informal counters and optional geo hints on the homepage are for a friendly tone, not
                certified analytics. Review your browser settings and any third-party embeds (for example
                maps or video players) for their own policies.
              </p>
            </section>

            <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
              <h2 className="font-heading text-lg font-semibold text-slate-900">No warranties</h2>
              <p>
                The site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent
                permitted by law, operators and contributors are not liable for damages arising from use of
                this site or reliance on its content.
              </p>
            </section>

            <p className="mt-10 text-sm text-[var(--rr-text-muted)]">
              <Link href="/" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
                ← Back to home
              </Link>
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
