import Link from "next/link";
import type { Metadata } from "next";

import { HomeTrailTour } from "@/components/home/home-trail-tour";
import { RockRiverTrailYoutubeEmbed } from "@/components/home/rock-river-trail-youtube";
import { AuthorityLanding } from "@/components/seo/authority-landing";
import { trailTourVideoFileExists } from "@/lib/media-server";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

const path = "/rock-river-trail-vermont";

const pageDesc =
  "Rock River trail: riverside footpath in Newfane, parking via map, mud-season cautions, and how the path ties to swimming pockets—Windham County VT.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River trail Vermont",
  description: pageDesc,
  path,
  titleAbsolute: "Rock River trail Vermont | Newfane hiking & river access",
  keywords: ["rock river trail vermont", "rock river trail", "newfane vt hiking", "windham county trail"],
});

export default function RockRiverTrailVermontPage() {
  const hasTrailVideo = trailTourVideoFileExists();

  const trailVideoJsonLd =
    hasTrailVideo ?
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Rock River Trail Tour — full hike",
        description:
          "Trail tour of the Rock River recreation area—Newfane, Windham County, Vermont.",
        thumbnailUrl: `${SITE_URL}/media/images/rock-river-newfane-vermont-outdoors-010.jpg`,
        contentUrl: `${SITE_URL}/media/videos/rock-river-trail-tour-full-hike.mp4`,
        uploadDate: "2026-03-19",
        publisher: {
          "@type": "Organization",
          name: "Rock River Vermont",
          url: SITE_URL,
        },
      }
    : null;

  return (
    <>
      {trailVideoJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(trailVideoJsonLd) }}
        />
      ) : null}
      <AuthorityLanding
        path={path}
        jsonName="Rock River trail Vermont — access & map"
        jsonDescription={pageDesc}
        breadcrumbLabel="Trail"
        h1="Rock River trail Vermont"
        intro={
          <>
            <p>
              <strong>Role:</strong> trail character, film, and foot-travel context—not the live map
              tool. This is a modest riverside path in the Newfane corridor: parking pockets to beaches
              and pools, roots and stone underfoot, short climbs. Mud season softens tread in spring.
              Anglers, families, and swimmers share the same tread.
            </p>
            <p>
              Open the{" "}
              <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
                interactive map
              </Link>{" "}
              before signal fades; the{" "}
              <Link href="/rock-river-map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
                map landing page
              </Link>{" "}
              explains how layers match the ground. For swim-focused norms, see{" "}
              <Link href="/rock-river-swimming-hole" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
                swimming hole notes
              </Link>
              .
            </p>
          </>
        }
      >
        <p>
          Side brooks feed from the hills; after high water, crossings and social paths shift. What felt
          obvious last season may not match this year—walk in prepared to turn back.
        </p>
        <p>
          Check{" "}
          <Link href="/rock-river-conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
            conditions
          </Link>{" "}
          before you leave; pair with{" "}
          <Link href="/visit" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
            visit
          </Link>{" "}
          for parking wording (Route 30 / Dummerston pins).
        </p>
        <section
          id="trail-film"
          className="scroll-mt-28 mt-10 space-y-4"
          aria-labelledby="trail-film-heading"
        >
          <div>
            <h2
              id="trail-film-heading"
              className="font-heading text-xl font-semibold tracking-tight text-[var(--rr-ink)]"
            >
              Short trail film
            </h2>
            <p className="mt-1 text-sm text-[var(--rr-text-muted)]">
              YouTube — one continuous pass along the path (same clip as on the home page).
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--rr-widget-border)] bg-white shadow-sm">
            <RockRiverTrailYoutubeEmbed autoplay={false} />
          </div>
        </section>
        <div className="mt-10">
          <HomeTrailTour videoAvailable={hasTrailVideo} />
        </div>
        <p>
          <Link href="/" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
            ← Rock River Vermont home
          </Link>
        </p>
      </AuthorityLanding>
    </>
  );
}
