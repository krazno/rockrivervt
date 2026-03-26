import Link from "next/link";
import type { Metadata } from "next";

import { GuideSection } from "@/components/guide/guide-section";
import { InteractiveMap } from "@/components/map/interactive-map";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Interactive Rock River Vermont map: parking, trail, beaches, and swimming holes in Newfane and Windham County—how to use the layers, read labels, and plan with visit & conditions.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Map",
  description: pageDesc,
  path: "/map",
  titleAbsolute:
    "Rock River VT map | Newfane parking, trail & swimming holes — Windham County",
  keywords: [
    "Rock River map",
    "Rock River directions",
    "Newfane VT map",
    "Rock River parking",
    "Rock River trail map",
    "Windham County Vermont map",
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
      <main className="rr-body pb-20 text-[#1F2A24]">
        <Container className="py-10 sm:py-12">
          <header className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#6B6F68]">
              Wayfinding
            </p>
            <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Rock River map & directions
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#3f4840] sm:text-lg">
              Same GeoJSON layers as the home preview—full width here so you can pan, zoom, and
              read the legend before you lose signal near the river. Pair the map with{" "}
              <Link
                href="/visit"
                className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
              >
                visit planning
              </Link>{" "}
              and{" "}
              <Link
                href="/conditions"
                className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
              >
                live conditions
              </Link>
              .
            </p>
          </header>

          <div className="mx-auto mt-10 max-w-6xl space-y-8 sm:space-y-10">
            <section aria-labelledby="map-embed-heading">
              <h2 id="map-embed-heading" className="sr-only">
                Interactive Rock River map
              </h2>
              <div className="overflow-hidden rounded-2xl border border-[#E2E0D8] bg-white p-4 shadow-sm sm:p-6">
                <InteractiveMap
                  mode="full"
                  height={520}
                  showLegend
                  showControls
                  geoJsonUrl="/geo/map.geojson"
                  tone="light"
                  ariaLabel="Rock River full map — Newfane and Windham County Vermont"
                />
              </div>
            </section>

            <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:gap-8">
              <GuideSection eyebrow="Controls" title="How to use this map">
                <p>
                  Scroll or pinch to zoom; drag to pan. Toggle layers from the legend so parking,
                  trails, and shoreline labels match what you expect on the ground. On phones,
                  landscape often makes it easier to tap small icons.
                </p>
              </GuideSection>

              <GuideSection eyebrow="Arrival" title="Parking orientation">
                <p>
                  Public parking associated with access sits along{" "}
                  <strong className="font-semibold text-[#1F2A24]">Route 30 in Dummerston</strong>{" "}
                  near the Depot Road area—see the pinned markers and respect road paint. If the
                  map looks different after a storm, assume crossings and informal paths may have
                  shifted; walk in cautiously.
                </p>
              </GuideSection>

              <GuideSection eyebrow="On the ground" title="Trail route notes">
                <p>
                  The trail follows the corridor in segments—some stretches are smooth, others are
                  rooty or steep. The map orients you to named beaches and reference points; it
                  does not replace watching your footing. Trail context:{" "}
                  <Link href="/rock-river-trail-vermont">Rock River trail Vermont</Link>.
                </p>
              </GuideSection>

              <GuideSection eyebrow="Labels" title="How areas are labeled">
                <p>
                  Beach and shoreline names on the map match long-time local usage; signage on
                  site can be light. When in doubt, follow posted rules, stay on marked trails,
                  and treat ambiguous junctions as a cue to slow down.
                </p>
              </GuideSection>

              <GuideSection eyebrow="Related" title="Plan the rest of the day">
                <p>
                  <Link href="/visit">Visit</Link>
                  {" · "}
                  <Link href="/conditions">Conditions</Link>
                  {" · "}
                  <Link href="/guidelines">Guidelines</Link>
                  {" · "}
                  <Link href="/gallery">Photos</Link>
                  {" · "}
                  <Link href="/resources">Resources</Link>
                </p>
              </GuideSection>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
