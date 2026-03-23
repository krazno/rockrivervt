import Link from "next/link";
import type { Metadata } from "next";

import { ArticleShell } from "@/components/marketing/article-shell";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Newfane, Brattleboro, and Windham County around Rock River: southern Vermont towns, culture, and practical context for visitors from the swimming hole to downtown.";

export const metadata: Metadata = buildPageMetadata({
  title: "Local area",
  description: pageDesc,
  path: "/local",
  keywords: [
    "Rock River LGBTQ friendly Vermont",
    "Newfane VT local",
    "Brattleboro near Rock River",
    "Windham County welcoming",
  ],
});

export default function LocalPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River local guide — Newfane & Brattleboro, Vermont"
        description={pageDesc}
        path="/local"
      />
      <BreadcrumbJsonLd path="/local" />
      <ArticleShell
        eyebrow="Southern Vermont"
        title="Local · Welcoming places"
        lead="Rock River sits between small towns and a region where a lot of people already know how to share space. This isn’t a brochure list—just context and room to add real spots later."
      >
        <section>
          <h2>Nearby towns</h2>
          <p>
            <strong className="text-[var(--rr-ink)]">Newfane</strong> is the town anchor;
            <strong className="text-[var(--rr-ink)]"> Brattleboro</strong> is the nearest
            hub for food, supplies, and culture. Windham County is small-town Vermont:
            low key, neighborly, and—for many visitors and residents—openly welcoming to
            LGBTQ+ people without making a campaign of it.
          </p>
        </section>
        <section>
          <h2>On the river</h2>
          <p>
            The river has long drawn a mix of families, swimmers, hikers, and others—
            including clothing-optional beaches where signposting and community norms apply.
            Respect and discretion keep that mix workable; see{" "}
            <Link href="/guidelines">guidelines</Link> for the plain version.
          </p>
        </section>
        <section>
          <h2>Cafés, shops, lodging</h2>
          <p>
            Brattleboro’s downtown has groceries, cafés, and lodging within a short drive of
            Rock River; Newfane village is smaller but has essentials nearby. Pick what fits
            your trip—this guide does not list individual businesses so listings stay current
            without endorsements.
          </p>
        </section>
        <section>
          <h2>Practical</h2>
          <ul>
            <li>
              <Link href="/map">Map</Link> — parking and trail access
            </li>
            <li>
              <Link href="/conditions">Conditions</Link> — weather &amp; river context
            </li>
            <li>
              <Link href="/resources">Resources</Link> — town &amp; state links
            </li>
            <li>
              <Link href="/preservation">Preservation</Link> — stewardship context
            </li>
          </ul>
        </section>
      </ArticleShell>
    </>
  );
}
