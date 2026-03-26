import Link from "next/link";
import type { Metadata } from "next";

import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { KnowledgeSectionProse } from "@/components/guide/knowledge-section-prose";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { getKnowledgeSection } from "@/lib/knowledge";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Plan a Rock River Vermont visit: seasons, what to pack for town and trail, parking and driveways, mixed shoreline etiquette, and first-trip tips—Newfane, Windham County, southern VT.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Visit",
  description: pageDesc,
  path: "/visit",
  titleAbsolute:
    "Visit Rock River Vermont | Newfane VT swimming hole, trail access & parking",
  keywords: [
    "Rock River directions",
    "Rock River parking",
    "Newfane VT river access",
    "Rock River swimming hole parking",
    "Rock River trail Newfane",
    "Windham County Vermont swimming",
  ],
});

/** Split on period-boundary spaces; keeps sentences stable for knowledge-base lines. */
function sentences(text: string): string[] {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return [];
  return t
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function VisitPage() {
  const seasonsOverview = getKnowledgeSection("seasons", "overview") ?? "";
  const seasonsNotes = getKnowledgeSection("seasons", "notes") ?? "";
  const seasonsVisitor = getKnowledgeSection("seasons", "visitor_context") ?? "";

  const cultureOverview = getKnowledgeSection("culture", "overview") ?? "";
  const cultureVisitor = getKnowledgeSection("culture", "visitor_context") ?? "";

  const localOverview = getKnowledgeSection("local", "overview") ?? "";
  const localVisitor = getKnowledgeSection("local", "visitor_context") ?? "";

  const noteSents = sentences(seasonsNotes);
  const visitorSents = sentences(seasonsVisitor);
  const localSents = sentences(localVisitor);

  /** Split layout only when KB sentences are still in the expected shape—avoids duplicate lines. */
  const canSplit =
    noteSents.length >= 4 && visitorSents.length >= 3 && localSents.length >= 2;

  const springNote = canSplit ? (noteSents[0] ?? "") : "";
  const summerParkingNote = canSplit ? (noteSents[1] ?? "") : "";
  const fallTrailNote = canSplit ? (noteSents[2] ?? "") : "";
  const winterNote = canSplit ? (noteSents[3] ?? "") : "";

  const whenTools = canSplit ? (visitorSents[0] ?? "") : seasonsVisitor;
  const footwearLayers = canSplit ? (visitorSents[1] ?? "") : "";
  const daylightTrail = canSplit ? (visitorSents[2] ?? "") : "";

  const localPlanning = canSplit ? (localSents[0] ?? "") : localVisitor;
  const localDriveways = canSplit ? (localSents[1] ?? "") : "";

  const whenToGoBody = canSplit
    ? [seasonsOverview, whenTools].filter(Boolean).join("\n\n")
    : [seasonsOverview, seasonsNotes, seasonsVisitor].filter(Boolean).join("\n\n");

  const whatToBringBody = canSplit
    ? [footwearLayers, localPlanning].filter(Boolean).join("\n\n")
    : localVisitor.trim();

  return (
    <>
      <WebPageJsonLd
        name="Visit Rock River Vermont — Newfane & Windham County"
        description={pageDesc}
        path="/visit"
      />
      <BreadcrumbJsonLd path="/visit" />
      <GuidePageFrame
        eyebrow="Practical planning"
        title="Visit Rock River Vermont"
        lead="A Windham County river day shifts with the season—busy banks in summer, cold water in spring, quieter woods after leaf-drop. What follows is drawn from the site knowledge files; pair it with the map and conditions before you go."
      >
        <GuideSection id="when-to-go" eyebrow="Timing" title="When to go">
          <KnowledgeSectionProse content={whenToGoBody} />
        </GuideSection>

        {springNote ? (
          <div className="rounded-2xl border border-amber-200/85 bg-amber-50/90 p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-900/80">
              Spring runoff
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-950/90">{springNote}</p>
          </div>
        ) : null}

        <GuideSection id="what-to-bring" eyebrow="Gear & town" title="What to bring">
          {whatToBringBody ? <KnowledgeSectionProse content={whatToBringBody} /> : null}
          <p className="mt-4 text-sm text-[#6B6F68]">
            Errands or dinner after swimming:{" "}
            <Link href="/local" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Local guide
            </Link>
            .
          </p>
        </GuideSection>

        <GuideSection id="parking-notes" eyebrow="Arrival" title="Parking notes">
          {localOverview ? <KnowledgeSectionProse content={localOverview} /> : null}
          {summerParkingNote ? (
            <p className={localOverview ? "mt-3" : undefined}>{summerParkingNote}</p>
          ) : null}
          {canSplit && localDriveways ? <p className="mt-3">{localDriveways}</p> : null}
          <p className="mt-4 text-sm text-[#6B6F68]">
            Pins and labels:{" "}
            <Link href="/map" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Map
            </Link>
            .
          </p>
        </GuideSection>

        <GuideSection id="trail-expectations" eyebrow="On foot" title="Trail expectations">
          {fallTrailNote ? <p>{fallTrailNote}</p> : null}
          {daylightTrail ? <p className={fallTrailNote ? "mt-3" : undefined}>{daylightTrail}</p> : null}
          <p className="mt-4 text-sm text-[#6B6F68]">
            <Link href="/rock-river-trail-vermont" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Trail notes
            </Link>
            {" · "}
            <Link href="/map" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Map legend
            </Link>
          </p>
        </GuideSection>

        <GuideSection
          id="mixed-use-shoreline"
          eyebrow="Shoreline"
          title="Mixed-use shoreline etiquette"
        >
          <KnowledgeSectionProse content={cultureOverview} />
          <p className="mt-4 text-sm text-[#6B6F68]">
            Posted expectations:{" "}
            <Link href="/guidelines" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Guidelines
            </Link>
            {" · "}
            <Link href="/community" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Community
            </Link>
            .
          </p>
        </GuideSection>

        <GuideSection id="first-visit-tips" eyebrow="First trip" title="First visit tips">
          <KnowledgeSectionProse content={cultureVisitor} />
          {winterNote ? <p className="mt-4">{winterNote}</p> : null}
        </GuideSection>

        <GuideSection eyebrow="More" title="Related on this guide">
          <p>
            <Link href="/map">Map</Link>
            {" · "}
            <Link href="/conditions">Conditions</Link>
            {" · "}
            <Link href="/gallery">Photos</Link>
            {" · "}
            <Link href="/resources">Resources</Link>
            {" · "}
            <Link href="/discoveries">Discoveries</Link>
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
