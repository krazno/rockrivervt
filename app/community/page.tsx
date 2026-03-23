import Link from "next/link";
import type { Metadata } from "next";

import { ArticleShell } from "@/components/marketing/article-shell";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River community: stewardship, cleanups, legacy, and remembrance in Newfane and Windham County VT—space for memorial content when details are confirmed.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Community, Legacy & Stewardship",
  description: pageDesc,
  path: "/community",
  keywords: ["Rock River community", "Rock River stewardship", "Newfane volunteers", "Windham County river"],
});

export default function CommunityPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River community & legacy — Windham County, Vermont"
        description={pageDesc}
        path="/community"
      />
      <BreadcrumbJsonLd path="/community" />
      <ArticleShell
        eyebrow="People & place"
        title="Community & legacy"
        lead="Rock River exists because volunteers, neighbors, and donors put time and money into access and conservation. This page gathers that story—and leaves room for remembrance when the community chooses to share it."
      >
        <section>
          <h2>Stewardship</h2>
          <p>
            Trail work, cleanup days, and coordination with landowners and conservation
            partners keep the corridor usable. For the full picture, see{" "}
            <Link href="/preservation">Preservation</Link> and{" "}
            <Link href="/history">History</Link>.
          </p>
        </section>
        <section>
          <h2>Memorials &amp; remembrance</h2>
          <p>
            No specific names or dates are listed here yet—only add what the community
            confirms and wants public. When you’re ready, this block can hold a short,
            dignified tribute or link to an external obituary or fund.
          </p>
          <p className="rounded-xl border border-dashed border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg-soft)] p-4 text-sm italic text-[var(--rr-ink-muted)]">
            Placeholder for memorial content — edit with care.
          </p>
        </section>
        <section>
          <h2>Contribute</h2>
          <p>
            Photos, corrections, and field notes—use the{" "}
            <Link href="/#contact">contact form</Link> on the home page. Unofficial guide
            only; not affiliated with any town or land agency.
          </p>
        </section>
        <p className="!text-sm !text-[var(--rr-ink-muted)]">
          <Link href="/resources">Resources</Link> ·{" "}
          <Link href="/map">Map</Link> ·{" "}
          <Link href="/guidelines">Guidelines</Link>
        </p>
      </ArticleShell>
    </>
  );
}
