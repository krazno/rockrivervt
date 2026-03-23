import Link from "next/link";
import type { Metadata } from "next";

import { ArticleShell } from "@/components/marketing/article-shell";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildPageMetadata } from "@/lib/seo";

const pageDesc =
  "Nature and field notes around Rock River in Newfane Vermont: plants, wildlife, and stone in Windham County—look, learn, leave things as you found them.";

export const metadata: Metadata = buildPageMetadata({
  title: "Discoveries",
  description: pageDesc,
  path: "/discoveries",
  keywords: ["Rock River wildlife", "Newfane nature", "Windham County plants", "Rock River fossils"],
});

export default function DiscoveriesPage() {
  return (
    <>
      <WebPageJsonLd
        name="Rock River discoveries — Newfane, Vermont"
        description={pageDesc}
        path="/discoveries"
      />
      <BreadcrumbJsonLd path="/discoveries" />
      <ArticleShell
        eyebrow="Rock River"
        title="Discoveries"
        lead="A rocky river cuts through southern Vermont—there’s always something to notice, if you look without taking."
      >
        <section>
          <h2>Stones &amp; fossils</h2>
          <p>
            The corridor holds glacial story in the stones—rounded cobbles, schist, the odd
            fossil impression. Enjoy them in place; collecting from the bed or banks can
            damage habitat and isn’t the ethic here.
          </p>
        </section>
        <section>
          <h2>Plants &amp; seasons</h2>
          <p>
            Spring ephemerals, summer canopy, fall color—Windham County shifts week to week.
            A pocket field guide beats guessing; leave rare plants alone.
          </p>
        </section>
        <section>
          <h2>Wildlife</h2>
          <p>
            Birds, fish, mammals—early mornings and quiet banks reward patience. Give
            nests and young animals distance; dogs on leash help everyone.
          </p>
        </section>
        <section>
          <h2>Field notes</h2>
          <p>
            This page is a frame for what people notice here—odd rocks, first trilliums, a
            heron on a snag. If you contribute photos or notes later, they can live beside
            respectful collecting guidance: look, learn, leave the river intact.
          </p>
        </section>
        <p className="!text-sm !text-[var(--rr-ink-muted)]">
          See also{" "}
          <Link href="/guidelines">guidelines</Link>,{" "}
          <Link href="/land-river">land &amp; river</Link>, and{" "}
          <Link href="/resources">resources</Link>.
        </p>
      </ArticleShell>
    </>
  );
}
