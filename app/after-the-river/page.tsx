import Link from "next/link";
import type { Metadata } from "next";

import { PageEngagementBeacon } from "@/components/analytics/page-engagement-beacon";
import { GuidePageFrame } from "@/components/guide/guide-page-frame";
import { GuideSection } from "@/components/guide/guide-section";
import { LocalPickCard } from "@/components/local/local-pick-card";
import { LocalPicksCuratedFooter } from "@/components/local/local-picks-curated-footer";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import type { LocalPickCategory } from "@/content/local-ecosystem";
import { picksForAfterRiver } from "@/lib/local-ecosystem";
import { buildPageMetadata, META_DESC_MAX, truncateMetaDescription } from "@/lib/seo";

const pageDesc = truncateMetaDescription(
  "After Rock River Vermont: where to eat, get coffee, wander nearby towns, and take a scenic drive in Windham County—curated, non-generic ideas near Newfane and Brattleboro.",
  META_DESC_MAX,
);

export const metadata: Metadata = buildPageMetadata({
  title: "After the river",
  description: pageDesc,
  path: "/after-the-river",
  titleAbsolute: "After Rock River VT | Food, coffee, towns & drives — Windham County",
  keywords: [
    "after Rock River Vermont",
    "Brattleboro after swimming",
    "Newfane scenic drive",
    "Windham County food",
  ],
});

const SECTION_ORDER: { category: LocalPickCategory; title: string; eyebrow: string }[] = [
  { category: "food", eyebrow: "Eat", title: "Food & provisions" },
  { category: "coffee", eyebrow: "Morning", title: "Coffee & cafés" },
  { category: "town", eyebrow: "Places", title: "Towns worth a pass" },
  { category: "scenic", eyebrow: "Slow roads", title: "Scenic drives & loops" },
  { category: "evening", eyebrow: "Later", title: "Evening wind-down" },
  { category: "practical", eyebrow: "Basics", title: "Practical stops" },
  { category: "culture", eyebrow: "Partners", title: "Local listings" },
];

export default function AfterTheRiverPage() {
  const picks = picksForAfterRiver();

  return (
    <>
      <PageEngagementBeacon category="after_river" label="after_the_river_page" />
      <WebPageJsonLd
        name="After Rock River — Windham County, Vermont"
        description={pageDesc}
        path="/after-the-river"
      />
      <BreadcrumbJsonLd path="/after-the-river" />
      <GuidePageFrame
        eyebrow="Local ecosystem"
        title="After Rock River"
        lead="The river day doesn’t have to end at the pull-off. Here are calm, specific ideas for food, coffee, towns, and drives—curated for people already in southern Vermont, not generic travel filler."
        photoAccentSeed="after-river-local"
      >
        <GuideSection eyebrow="Start here" title="What this page is">
          <p>
            These are editorial picks, not paid placements. Hours, menus, and closures change—use
            links as starting points. For businesses that explicitly welcome river visitors, see{" "}
            <Link
              href="/local-business"
              className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
            >
              Area partners
            </Link>
            .
          </p>
          <LocalPicksCuratedFooter placement="after_river_page" />
        </GuideSection>

        {SECTION_ORDER.map(({ category, title, eyebrow }) => {
          const items = picks.filter((p) => p.category === category);
          if (items.length === 0) return null;
          return (
            <GuideSection key={category} eyebrow={eyebrow} title={title}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {items.map((pick) => (
                  <li key={pick.id}>
                    <LocalPickCard pick={pick} />
                  </li>
                ))}
              </ul>
            </GuideSection>
          );
        })}

        <GuideSection eyebrow="More" title="Related on this site">
          <ul className="list-disc space-y-2 pl-5 text-[var(--rr-ink-muted)]">
            <li>
              <Link href="/local" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
                Local area
              </Link>{" "}
              — context on Newfane, Brattleboro, and welcoming places.
            </li>
            <li>
              <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
                Map
              </Link>{" "}
              — parking and trail access for the return trip.
            </li>
            <li>
              <Link
                href="/daily-updates"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Daily updates
              </Link>{" "}
              — short field notes when they’re posted.
            </li>
          </ul>
        </GuideSection>
      </GuidePageFrame>
    </>
  );
}
