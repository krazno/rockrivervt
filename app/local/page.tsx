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
        lead="Rock River sits between small Vermont towns where people are used to sharing trails and parking without much fuss. This page is context, not a brochure—we may add specific spots later."
        photoAccentSeed="local-windham"
      >
        <section>
          <h2>Nearby towns</h2>
          <p>
            <strong className="text-[var(--rr-ink)]">Newfane</strong> is the town anchor;
            <strong className="text-[var(--rr-ink)]"> Brattleboro</strong> is the nearest
            larger town for food, supplies, and culture. Windham County is small-town Vermont:
            low key and neighborly, and—for many visitors and residents—welcoming to LGBTQ+
            people in an everyday, low-key way.
          </p>
        </section>
        <section>
          <h2>On the river</h2>
          <p>
            The river has long drawn a mixed crowd—families, swimmers, hikers, and others—
            including signed clothing-optional areas where posted norms apply. Be respectful,
            give others space, and see{" "}
            <Link href="/guidelines">guidelines</Link> for the plain version.
          </p>
        </section>
        <section>
          <h2>Cafés, shops, lodging</h2>
          <p>
            Brattleboro’s downtown has groceries, cafés, and lodging within a short drive of Rock
            River; Newfane village is smaller but has essentials nearby. This page stays general; if you
            are looking for spots that want to welcome river visitors, see{" "}
            <Link href="/local-business">Area partners</Link>.
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
