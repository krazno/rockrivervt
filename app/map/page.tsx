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
      <main className="rr-body pb-16 text-[#e8f4ef]">
        <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-white/45">
              <li>
                <Link
                  href="/"
                  className="font-medium text-[var(--rr-mint)] underline-offset-4 hover:text-white hover:underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/25">
                /
              </li>
              <li className="text-white/70">Map</li>
            </ol>
          </nav>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-[var(--rr-mint)] underline-offset-4 hover:text-white hover:underline"
          >
            ← Back to home
          </Link>

          <article>
            <header className="mt-6">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Rock River map & directions
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/60">
                Pan, zoom, and tap features—same GeoJSON as the home preview. Scroll wheel
                zooms on this full-page map of the Rock River corridor in southern Vermont.
              </p>
            </header>

            <section className="mt-8" aria-labelledby="map-embed-heading">
              <h2 id="map-embed-heading" className="sr-only">
                Interactive Rock River map
              </h2>
              <div className="overflow-hidden rounded-[var(--rr-radius-xl)] border border-white/12 bg-[#070f0d] p-3 shadow-[var(--rr-shadow-card)] sm:p-5">
                <InteractiveMap
                  mode="full"
                  height={500}
                  showLegend
                  showControls
                  geoJsonUrl="/geo/map.geojson"
                  tone="dark"
                  ariaLabel="Rock River full map — Newfane and Windham County Vermont"
                />
              </div>
            </section>

            <section className="mt-10" aria-labelledby="map-context-heading">
              <h2
                id="map-context-heading"
                className="font-heading text-lg font-semibold tracking-tight text-white sm:text-xl"
              >
                Parking, beaches & trail context
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
                Labels orient you to beaches and landmarks along Rock River. For driving and
                access notes, see{" "}
                <Link
                  href="/visit"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Visiting Rock River Vermont
                </Link>
                ,{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  conditions & weather
                </Link>
                , and{" "}
                <Link
                  href="/land-river"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Land &amp; River
                </Link>
                . Stewardship and etiquette:{" "}
                <Link
                  href="/guidelines"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Guidelines
                </Link>
                ,{" "}
                <Link
                  href="/resources"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
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
