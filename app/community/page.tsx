import Link from "next/link";
import type { Metadata } from "next";

import { ArticleShell } from "@/components/marketing/article-shell";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_FORM_EMAIL } from "@/lib/site";

const pageDesc =
  "Rock River community and stewardship in Newfane and Windham County Vermont: volunteers, conservation, and how people care for the river near Brattleboro.";

export const metadata: Metadata = buildPageMetadata({
  title: "Community",
  description: pageDesc,
  path: "/community",
  keywords: ["Rock River community", "Rock River stewardship", "Newfane volunteers", "Windham County river"],
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
      <ArticleShell
        eyebrow="People & place"
        title="Community & stewardship"
        lead="Rock River depends on volunteers, neighbors, and conservation partners who maintain access and protect land along the corridor in southern Vermont."
      >
        <section>
          <h2>Stewardship</h2>
          <p>
            Trail work, cleanup days, and coordination with landowners and conservation
            partners keep the corridor usable. For land protection and the Rock River
            Preserve, see <Link href="/preservation">Preservation</Link> and{" "}
            <Link href="/history">History</Link>.
          </p>
        </section>
        <section>
          <h2>Get in touch</h2>
          <p>
            Photos, corrections, and field notes:{" "}
            <a
              href={`mailto:${CONTACT_FORM_EMAIL}?subject=${encodeURIComponent("Rock River VT — note")}`}
              className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
            >
              Email
            </a>
            . This site is an independent guide—not affiliated with any town or land agency.
          </p>
        </section>
        <p className="!text-sm !text-[var(--rr-ink-muted)]">
          <Link href="/resources">Resources</Link> · <Link href="/map">Map</Link> ·{" "}
          <Link href="/guidelines">Guidelines</Link> · <Link href="/visit">Visit</Link>
        </p>
      </ArticleShell>
    </>
  );
}
