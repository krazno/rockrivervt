import Link from "next/link";
import type { Metadata } from "next";

import { ConditionsLiveWidgets } from "@/components/conditions/conditions-live-widgets";
import { VisitInsightsStandalone } from "@/components/conditions/visit-insights-standalone";
import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Rock River conditions: live weather, river flow context, crowd check-ins, how to read the water, and seasonal cautions for Newfane VT and Windham County.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Conditions",
  description: pageDesc,
  path: "/conditions",
  titleAbsolute:
    "Rock River conditions & weather | Newfane VT river flow & swim planning",
  keywords: [
    "Rock River conditions",
    "Rock River VT water level",
    "Newfane river conditions",
    "southern Vermont river safety",
    "Rock River weather",
  ],
});

export default function ConditionsPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River conditions — live weather & river context"
        description={pageDesc}
        path="/conditions"
      />
      <BreadcrumbJsonLd path="/conditions" />
      <GuidePageFrame
        eyebrow="Live tools"
        title="Rock River conditions & weather"
        lead="Use this page the way you would a trailhead board: check the sky, the water, and how crowded it felt to people who checked in—then make your own call on the ground."
      >
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-[#3f4840] sm:text-[15px]">
            The planning card below uses the same NOAA hourly blend, estimated water comfort,
            beach crowd feel, and parking hint as the home page—one fetch, no duplicate story.
          </p>
          <VisitInsightsStandalone />
        </div>

        <GuideSection eyebrow="Instruments" title="Live weather, river, and crowd">
          <p className="!mb-6">
            Widgets pull public feeds and this site’s crowd summaries. If something fails to
            load, try again on a signal-friendly screen—the river still needs to be read in
            person.
          </p>
          <ConditionsLiveWidgets />
        </GuideSection>

        <GuideSection id="read-the-river" eyebrow="Field sense" title="How to read the river">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-[#1F2A24]">Color and clarity:</strong> brown
              or opaque water often means sediment after rain; clear water can still hide strong
              current.
            </li>
            <li>
              <strong className="font-semibold text-[#1F2A24]">Sound:</strong> a loud, continuous
              rumble at ledges is a cue to stay shallow or sit it out.
            </li>
            <li>
              <strong className="font-semibold text-[#1F2A24]">Edges:</strong> undercut banks and
              slippery shelves change after floods—assume nothing is in the same place as last
              year.
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Data" title="What the numbers are (and aren’t)">
          <p>
            Flow and gage height come from a regional USGS-style context in this site’s river
            tool; they help you compare “high” vs “typical,” not to guess depth at every pool.
            Water temperature shown here is an estimate based on available air and proxy
            readings—not a probe in the swim hole.
          </p>
          <p>
            Crowd check-ins are anonymous blends; they describe <em>feel</em>, not head counts.
            Parking starts generous until people report otherwise.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Seasons" title="Seasonal cautions">
          <p>
            <strong className="font-semibold text-[#1F2A24]">Spring:</strong> cold, fast water;
            crossings that were easy in August may be unsafe in April.
          </p>
          <p>
            <strong className="font-semibold text-[#1F2A24]">Summer:</strong> busiest season—carry
            patience, extra water, and a plan B if parking is tight.
          </p>
          <p>
            <strong className="font-semibold text-[#1F2A24]">Fall:</strong> leaves hide
            ankle-rollers; lower flows expose new ledges—watch your step.
          </p>
          <p>
            <strong className="font-semibold text-[#1F2A24]">Winter:</strong> ice, short light,
            and limited access—most visitors wait for spring.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Updates" title="Notes and changelogs">
          <p>
            Short field notes, when posted, live on{" "}
            <Link href="/daily-updates">daily updates</Link>. The dedicated{" "}
            <Link href="/weather">weather page</Link> mirrors the forecast widget if you want a
            calmer, text-forward read.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Next steps" title="Before you drive">
          <p>
            <Link href="/map">Map</Link>
            {" · "}
            <Link href="/visit">Visit planning</Link>
            {" · "}
            <Link href="/guidelines">Guidelines</Link>
            {" · "}
            <Link href="/resources">Resources</Link>
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
