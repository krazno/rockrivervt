import Link from "next/link";
import type { Metadata } from "next";

import { HomeTrailTour } from "@/components/home/home-trail-tour";
import { RockRiverTrailYoutubeEmbed } from "@/components/home/rock-river-trail-youtube";
import { AuthorityLanding } from "@/components/seo/authority-landing";
import { trailTourVideoFileExists } from "@/lib/media-server";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

const path = "/rock-river-trail-vermont";

const pageDesc =
  "Rock River trail Vermont: footpath along the river in Newfane, parking links, and how the corridor connects swimming holes in Windham County.";

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
            The <strong>Rock River trail</strong> in <strong>Vermont</strong> is a modest riverside
            path—not a long summit hike. It links parking pockets to beaches and pools along{" "}
            <strong>Rock River</strong> in <strong>Newfane</strong>, <strong>Windham County</strong>.
            If you are visiting from <strong>Brattleboro</strong> or elsewhere in{" "}
            <strong>southern Vermont</strong>, expect roots, stone, and short climbs; mud season
            softens tread in spring. The same tread supports anglers, families, and swimmers heading
            to popular <strong>Vermont swimming hole</strong> pockets in summer.
          </p>
          <p>
            Use the{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              full map
            </Link>{" "}
            to orient before cell signal drops, and skim{" "}
            <Link href="/rock-river-map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              Rock River map notes
            </Link>{" "}
            for how the map layers line up with what you will see on the ground.
          </p>
        </>
      }
    >
      <p>
        The corridor parallels the main stem while side brooks feed in from the hills above the{" "}
        <strong>West River</strong> basin. After high water, crossings and social trails shift—what
        felt obvious last season may not match this year.
      </p>
      <p>
        Trail film and full walkthrough: watch below after you read{" "}
        <Link href="/rock-river-conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River conditions
        </Link>
        . For swim-focused planning, jump to{" "}
        <Link href="/rock-river-swimming-hole" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River swimming hole
        </Link>
        .
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
            YouTube · one continuous pass along the path (same embed as the former homepage block).
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
