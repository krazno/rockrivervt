import Link from "next/link";
import type { Metadata } from "next";

import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SOURCE_REGISTRY } from "@/content/sourced/source-registry";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "Rock River Vermont resources: official preservation links, Vermont geology and ANR context, USGS river data, maps, conditions, and planning pages for Newfane & Windham County.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description: pageDesc,
  path: "/resources",
  titleAbsolute:
    "Rock River resources | Maps, official links & planning — Newfane VT, Windham County",
  keywords: [
    "Rock River resources",
    "Newfane VT links",
    "Windham County maps",
    "Rock River planning",
    "Rock River Preservation official",
    "Vermont river safety",
  ],
});

export default function ResourcesPage() {
  const agencySources = SOURCE_REGISTRY.filter((s) => s.url && s.id !== "rrp-official");

  return (
    <>
      <WebPageJsonLd
        name="Rock River resources — maps & planning"
        description={pageDesc}
        path="/resources"
      />
      <BreadcrumbJsonLd path="/resources" />
      <GuidePageFrame
        eyebrow="Planning hub"
        title="Resources"
        lead="Bookmark what you use: this site’s maps and live tools first, then official stewardship and state agencies for context. Municipal websites change URLs often—search “Town of Newfane Vermont” for the current roads and notices page when you need it."
        photoAccentSeed="resources-hub"
      >
        <GuideSection eyebrow="On RockRiverVT" title="This guide">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <Link href="/map">Interactive map</Link> — parking, trails, shoreline labels
            </li>
            <li>
              <Link href="/conditions">Conditions</Link> — weather, river context, crowd check-ins
            </li>
            <li>
              <Link href="/visit">Visit</Link> — practical planning and first-timer notes
            </li>
            <li>
              <Link href="/gallery">Photos &amp; video</Link> — visual expectations
            </li>
            <li>
              <Link href="/guidelines">Visitor guidelines</Link>
            </li>
            <li>
              <Link href="/weather">Dedicated weather page</Link>
            </li>
            <li>
              <Link href="/daily-updates">Daily updates</Link> — when notes are posted
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Stewardship" title="Rock River Preservation (official)">
          <p>
            Policies, donations, and volunteer onboarding live with the nonprofit—not this
            volunteer website.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <a
                href="https://www.rockriverpreservation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
              >
                rockriverpreservation.org
              </a>{" "}
              — land protection and access mission
            </li>
            <li>
              On-site context: <Link href="/preservation">Preservation overview</Link> and{" "}
              <Link href="/history">History</Link>
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Geology & maps" title="Vermont and federal context">
          <p>
            Use these for regional background— not as permission to collect material from the
            river bed or banks.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            {agencySources.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
                >
                  {s.label}
                </a>
                <span className="text-[#6B6F68]"> — {s.publicBlurb}</span>
              </li>
            ))}
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Place" title="Local and watershed context">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <Link href="/local">Local guide</Link> — Newfane, Brattleboro, Windham County
              texture
            </li>
            <li>
              <Link href="/land-river">Land &amp; river</Link> — Rock River and the West River
              watershed
            </li>
            <li>
              <Link href="/rock-river-vermont">Rock River Vermont overview</Link>
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Safety" title="Planning and etiquette">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <Link href="/conditions">Conditions &amp; live widgets</Link>
            </li>
            <li>
              <Link href="/discoveries">Discoveries</Link> — notice, don’t remove
            </li>
            <li>
              <Link href="/community">Community</Link> — shoreline respect and corrections
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="Contributors" title="Sourced facts">
          <p>
            Stewardship and geology wording on <Link href="/discoveries">Discoveries</Link> should match
            the curated source registry—update those references before changing factual claims about the
            river or land.
          </p>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
