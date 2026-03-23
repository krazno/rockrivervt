import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { InteractiveMap } from "@/components/map/interactive-map";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Interactive Rock River map for Newfane & Windham County VT: parking on Route 30 near Dummerston, trails, beaches, swimming holes, and river landmarks—near Brattleboro.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Map & Directions",
  description: pageDesc,
  path: "/map",
  keywords: [
    "Rock River map",
    "Rock River directions",
    "Newfane VT map",
    "Rock River parking",
    "Rock River trail map",
  ],
});

export default function MapPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River map & directions — Newfane, Vermont"
        description={pageDesc}
        path="/map"
      />
      <BreadcrumbJsonLd path="/map" />
      <SiteHeader />
      <main className="rr-body pb-20 text-[var(--rr-text)]">
        <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-[var(--rr-text-muted)]">
              <li>
                <Link
                  href="/"
                  className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-[var(--rr-widget-border)]">
                /
              </li>
              <li className="text-[var(--rr-ink)]">Map</li>
            </ol>
          </nav>
          <Link
            href="/"
            className="mt-5 inline-block text-sm font-medium text-[var(--rr-link)] underline-offset-4 hover:underline"
          >
            ← Back to home
          </Link>

          <article>
            <header className="mt-8">
              <h1 className="font-heading text-[clamp(1.5rem,2vw+1rem,2.25rem)] font-semibold tracking-tight text-[var(--rr-ink)]">
                Rock River map & directions
              </h1>
              <p className="rr-lead mt-4 max-w-xl">
                Pan, zoom, and tap features—same GeoJSON as the home preview. Scroll wheel
                zooms on this full-page map of the Rock River corridor in southern Vermont.
              </p>
            </header>

            <section className="mt-10" aria-labelledby="map-embed-heading">
              <h2 id="map-embed-heading" className="sr-only">
                Interactive Rock River map
              </h2>
              <div className="overflow-hidden rounded-[var(--rr-radius-xl)] border border-[var(--rr-widget-border)] bg-[#f0ebe6]/70 p-4 shadow-[var(--rr-shadow-card)] sm:p-6">
                <InteractiveMap
                  mode="full"
                  height={500}
                  showLegend
                  showControls
                  geoJsonUrl="/geo/map.geojson"
                  tone="light"
                  ariaLabel="Rock River full map — Newfane and Windham County Vermont"
                />
              </div>
            </section>

            <section className="mt-12" aria-labelledby="map-context-heading">
              <h2
                id="map-context-heading"
                className="font-heading text-lg font-semibold tracking-tight text-[var(--rr-ink)] sm:text-xl"
              >
                Parking, beaches & trail context
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--rr-text-muted)]">
                Labels orient you to beaches and landmarks along Rock River. For driving and
                access notes, see{" "}
                <Link
                  href="/visit"
                  className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  Visiting Rock River Vermont
                </Link>
                ,{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  conditions & weather
                </Link>
                , and{" "}
                <Link
                  href="/land-river"
                  className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  Land &amp; River
                </Link>
                . Stewardship and etiquette:{" "}
                <Link
                  href="/guidelines"
                  className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  Guidelines
                </Link>
                ,{" "}
                <Link
                  href="/resources"
                  className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  Resources
                </Link>
                .
              </p>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
