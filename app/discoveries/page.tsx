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
  "Rock River field notes from the local knowledge base: river stones and ice-age context, plants and wildlife along the corridor, seasons in Windham County—and why to look without taking.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Discoveries",
  description: pageDesc,
  path: "/discoveries",
  titleAbsolute:
    "Rock River discoveries | Nature & field notes — Newfane VT, Windham County",
  keywords: [
    "Rock River wildlife",
    "Newfane nature",
    "Windham County plants",
    "Vermont river stones",
    "Rock River trail ecology",
  ],
});

export default function DiscoveriesPage() {
  const geology = {
    overview: getKnowledgeSection("geology", "overview") ?? "",
    notes: getKnowledgeSection("geology", "notes") ?? "",
    visitor: getKnowledgeSection("geology", "visitor_context") ?? "",
    cautions: getKnowledgeSection("geology", "cautions") ?? "",
    sources: getKnowledgeSection("geology", "sources") ?? "",
  };
  const wildlife = {
    overview: getKnowledgeSection("wildlife", "overview") ?? "",
    notes: getKnowledgeSection("wildlife", "notes") ?? "",
    visitor: getKnowledgeSection("wildlife", "visitor_context") ?? "",
    cautions: getKnowledgeSection("wildlife", "cautions") ?? "",
    sources: getKnowledgeSection("wildlife", "sources") ?? "",
  };
  const seasons = {
    overview: getKnowledgeSection("seasons", "overview") ?? "",
    notes: getKnowledgeSection("seasons", "notes") ?? "",
    visitor: getKnowledgeSection("seasons", "visitor_context") ?? "",
    cautions: getKnowledgeSection("seasons", "cautions") ?? "",
    sources: getKnowledgeSection("seasons", "sources") ?? "",
  };

  const stonesBody = [geology.overview, geology.notes].filter(Boolean).join("\n\n");
  const plantsAndWildlifeBody = [wildlife.overview, wildlife.notes, wildlife.visitor]
    .filter(Boolean)
    .join("\n\n");
  const seasonsBody = [seasons.overview, seasons.notes, seasons.visitor]
    .filter(Boolean)
    .join("\n\n");

  return (
    <>
      <WebPageJsonLd
        name="Rock River discoveries — field notes, Newfane Vermont"
        description={pageDesc}
        path="/discoveries"
      />
      <BreadcrumbJsonLd path="/discoveries" />
      <GuidePageFrame
        eyebrow="In the field"
        title="Discoveries along Rock River"
        lead="Slow down enough to see cobbles, shade, and who shares the corridor with you. What follows comes straight from this site’s local knowledge files—river stones and ice-age context, plants and animals, seasons—written for neighbors, not textbooks."
      >
        <GuideSection eyebrow="Underfoot" title="River stones and glacial shaping">
          <KnowledgeSectionProse content={stonesBody} />
          <p className="mt-4 text-sm text-[#6B6F68]">
            More on the watershed and ecology:{" "}
            <Link href="/land-river" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Land &amp; river
            </Link>
            .
          </p>
        </GuideSection>

        <GuideSection eyebrow="Looking" title="What visitors notice in the stone">
          <KnowledgeSectionProse content={geology.visitor} />
        </GuideSection>

        <GuideSection eyebrow="Along the bank" title="Plants and animals">
          <KnowledgeSectionProse content={plantsAndWildlifeBody} />
          <div className="mt-5 border-t border-[#E2E0D8]/70 pt-4">
            <KnowledgeSectionProse content={wildlife.cautions} />
          </div>
        </GuideSection>

        <GuideSection eyebrow="The year" title="Seasonal changes">
          <KnowledgeSectionProse content={seasonsBody} />
          <p className="mt-4 text-sm text-[#6B6F68]">
            Live tools when you’re planning:{" "}
            <Link href="/conditions" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Conditions
            </Link>
            {" · "}
            <Link href="/visit" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              Visit
            </Link>
            .
          </p>
          <div className="mt-5 border-t border-[#E2E0D8]/70 pt-4">
            <KnowledgeSectionProse content={seasons.cautions} />
          </div>
        </GuideSection>

        <GuideSection eyebrow="Leave it" title="Why not to remove rocks—or treat the bed like a souvenir shop">
          <p>
            Pulling stone from the bed or banks can disturb habitat other visitors and wildlife
            rely on; along public recreation corridors here it’s discouraged—same idea as the
            knowledge base notes on leaving cobbles in place.
          </p>
          <p className="mt-3">
            Photos from the bank or shallow water carry the pattern and color home without moving
            anything underfoot.
          </p>
          <div className="mt-5 border-t border-[#E2E0D8]/70 pt-4">
            <KnowledgeSectionProse content={geology.cautions} />
          </div>
        </GuideSection>

        <GuideSection eyebrow="Read next" title="Sources (from the knowledge base)">
          <p className="text-sm text-[#6B6F68]">
            Each block below is the <strong className="text-[#3f4840]">sources</strong> section from{" "}
            <code className="rounded bg-[#F6F4EF] px-1 py-0.5 text-[13px]">data/knowledge</code>{" "}
            — edit there when citations change.
          </p>
          <div className="mt-5 space-y-6 border-t border-[#E2E0D8]/80 pt-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6F68]">
                Geology
              </p>
              <div className="mt-2">
                <KnowledgeSectionProse content={geology.sources} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6F68]">
                Wildlife
              </p>
              <div className="mt-2">
                <KnowledgeSectionProse content={wildlife.sources} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6F68]">
                Seasons
              </p>
              <div className="mt-2">
                <KnowledgeSectionProse content={seasons.sources} />
              </div>
            </div>
          </div>
        </GuideSection>

        <GuideSection eyebrow="On this guide" title="Related pages">
          <p>
            <Link href="/guidelines">Guidelines</Link>
            {" · "}
            <Link href="/land-river">Land &amp; river</Link>
            {" · "}
            <Link href="/preservation">Preservation</Link>
            {" · "}
            <Link href="/resources">Resources</Link>
            {" · "}
            <Link href="/gallery">Photos</Link>
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
