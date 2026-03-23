import Link from "next/link";
import type { Metadata } from "next";

import { ArticleShell } from "@/components/marketing/article-shell";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Rock River resources: maps, conditions, preservation, town and state links, safety, weather, and visitor planning for Newfane, Windham County VT, and southern Vermont.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Resources — Maps, Links & Visitor Planning",
  description: pageDesc,
  path: "/resources",
  keywords: ["Rock River resources", "Newfane VT links", "Windham County maps", "Rock River planning"],
});

export default function ResourcesPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River resources — maps & planning"
        description={pageDesc}
        path="/resources"
      />
      <BreadcrumbJsonLd path="/resources" />
      <ArticleShell
        eyebrow="Planning"
        title="Resources"
        lead="Quick paths to maps, conditions, stewardship context, and official links—bookmark what you use."
      >
        <section>
          <h2>This site</h2>
          <ul>
            <li>
              <Link href="/map">Interactive map</Link> — parking, trails, beaches
            </li>
            <li>
              <Link href="/conditions">Conditions</Link> — weather &amp; river context
            </li>
            <li>
              <Link href="/gallery">Photos &amp; video</Link>
            </li>
            <li>
              <Link href="/preservation">Preservation</Link>
            </li>
            <li>
              <Link href="/guidelines">Visitor guidelines</Link>
            </li>
            <li>
              <Link href="/visit">Visiting Rock River</Link>
            </li>
          </ul>
        </section>
        <section>
          <h2>Town &amp; region</h2>
          <p>
            Placeholder: add Newfane town site, Windham County VT, Vermont State Parks or
            relevant agencies, and local land trust links when you want them pinned here.
          </p>
        </section>
        <section>
          <h2>Safety &amp; weather</h2>
          <ul>
            <li>
              <Link href="/conditions">Live conditions hub</Link>
            </li>
            <li>
              <Link href="/weather">Rock River weather</Link>
            </li>
          </ul>
        </section>
        <section>
          <h2>Community &amp; history</h2>
          <ul>
            <li>
              <Link href="/community">Community &amp; legacy</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
            <li>
              <Link href="/land-river">Land &amp; river</Link>
            </li>
            <li>
              <Link href="/discoveries">Discoveries</Link>
            </li>
          </ul>
        </section>
      </ArticleShell>
    </>
  );
}
