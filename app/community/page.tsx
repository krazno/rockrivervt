import Link from "next/link";
import type { Metadata } from "next";

import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata, truncateMetaDescription, META_DESC_MAX } from "@/lib/seo";
import {
  CONTACT_FORM_EMAIL,
  mailtoPhotoSubmission,
  SITE_STUDIO_BRAND,
} from "@/lib/site";

const pageDesc = truncateMetaDescription(
  "Rock River community: a mixed shoreline, volunteer stewardship, respectful use, and how to send corrections to this neighbor-maintained guide—Newfane VT, Windham County.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "Community",
  description: pageDesc,
  path: "/community",
  titleAbsolute:
    "Rock River community | Stewardship & shoreline — Newfane VT, Windham County",
  keywords: [
    "Rock River community",
    "Rock River stewardship",
    "Newfane volunteers",
    "Windham County river",
    "Rock River Preservation volunteers",
  ],
});

export default function CommunityPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River community — Windham County, Vermont"
        description={pageDesc}
        path="/community"
      />
      <BreadcrumbJsonLd path="/community" />
      <GuidePageFrame
        eyebrow="People & place"
        title="Community along Rock River"
        lead="Rock River works because many kinds of people share one narrow corridor—families, hikers, swimmers, long-time regulars, and neighbors who live beside the trail. Calm days happen when everyone gives a little room and packs out what they bring."
        photoAccentSeed="community-shore"
      >
        <GuideSection eyebrow="Shoreline" title="A mixed crowd, one river">
          <p>
            On warm weekends the beaches and pools can feel busy. Signed clothing-optional areas
            sit in the same woods as family-oriented spots—read the posts, keep voices low, and
            let people enjoy the water without an audience. Photography waits on clear consent.
          </p>
          <p>
            If something feels off, step back, find a steward when one is present, or choose
            another stretch of river. Most conflicts here are solved by patience and distance.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Care" title="Stewardship you can see">
          <p>
            Trails, litter pickup, invasive plant pulls, and steward presence come from volunteers
            working with Rock River Preservation and neighbors. That labor keeps access open
            after storms and heavy seasons—not a park service, but a community habit.
          </p>
          <p>
            Land tenure, easements, and management themes:{" "}
            <Link href="/preservation">Preservation</Link>. Timeline and context:{" "}
            <Link href="/history">History</Link>.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Day to day" title="Respect as a practice">
          <ul className="list-disc space-y-2 pl-5">
            <li>Leave no trace—food scraps, dog waste, and gear all go home with you.</li>
            <li>Stay on marked trails where they exist; social paths change after high water.</li>
            <li>
              Sound carries over water—headphones and speaker volume affect everyone downstream.
            </li>
            <li>
              Full etiquette: <Link href="/guidelines">visitor guidelines</Link>.
            </li>
          </ul>
        </GuideSection>

        <GuideSection eyebrow="This website" title="Corrections and contact">
          <p>
            RockRiverVT is a volunteer field guide—not the nonprofit, not a town office. Map tweaks,
            gentle corrections, and gallery photos help the next visitor.
          </p>
          <p>
            <strong className="font-semibold text-[#1F2A24]">Crowd check-ins:</strong> The “how busy
            it feels” widget saves anonymous ratings (you can check in more than once per day; each
            submission adds to the merged view) when Supabase is configured. If the database is
            unavailable, the widget shows baselines only and check-in is disabled—same on the home and
            conditions pages.
          </p>
          <p>
            <strong className="font-semibold text-[#1F2A24]">Photos:</strong> There is no drag-and-drop
            uploader here yet.{" "}
            <a
              href={mailtoPhotoSubmission()}
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              Email photos for the gallery
            </a>
            ; we review before publishing.
          </p>
          <p>
            <a
              href={`mailto:${CONTACT_FORM_EMAIL}?subject=${encodeURIComponent("Rock River VT — note")}`}
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              Email {SITE_STUDIO_BRAND}
            </a>{" "}
            for anything else. For formal volunteer onboarding or policies, use official{" "}
            <a
              href="https://www.rockriverpreservation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              Rock River Preservation
            </a>{" "}
            channels.
          </p>
        </GuideSection>

        <GuideSection eyebrow="Explore" title="More on this guide">
          <p>
            <Link href="/visit">Visit</Link>
            {" · "}
            <Link href="/map">Map</Link>
            {" · "}
            <Link href="/conditions">Conditions</Link>
            {" · "}
            <Link href="/guidelines">Guidelines</Link>
            {" · "}
            <Link href="/land-river">Land &amp; river</Link>
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
