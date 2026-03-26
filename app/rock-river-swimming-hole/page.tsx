import Link from "next/link";
import type { Metadata } from "next";

import { AuthorityLanding } from "@/components/seo/authority-landing";
import { buildPageMetadata } from "@/lib/seo";

const path = "/rock-river-swimming-hole";

const pageDesc =
  "Rock River swimming hole guide for Newfane VT: pools, stone, etiquette, and planning—Windham County river swimming near Brattleboro.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River swimming hole",
  description: pageDesc,
  path,
  titleAbsolute: "Rock River swimming hole | Newfane Vermont & Windham County guide",
  keywords: [
    "rock river swimming hole",
    "newfane vermont swimming hole",
    "vermont swimming hole",
    "southern vermont swimming hole",
  ],
});

export default function RockRiverSwimmingHolePage() {
  return (
    <AuthorityLanding
      path={path}
      jsonName="Rock River swimming hole — Newfane, Vermont"
      jsonDescription={pageDesc}
      breadcrumbLabel="Swimming hole"
      h1="Rock River swimming hole"
      intro={
        <>
          <p>
            The <strong>Rock River swimming hole</strong> experience is really a string of pools and
            ledges along <strong>Newfane, Vermont</strong> water—not a single roped beach. In summer,
            people from <strong>Windham County</strong> and <strong>southern Vermont</strong> (including
            day trips from <strong>Brattleboro</strong>) share deep pockets and shallow shelves on
            rounded stone. Spring snowmelt runs cold and fast; late summer can expose more rock and
            slower eddies. Treat every <strong>Vermont swimming hole</strong> visit as conditional on
            weather upstream, not just the forecast in town.
          </p>
          <p>
            Pair this page with the{" "}
            <Link href="/conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              Rock River conditions
            </Link>{" "}
            page and the{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              interactive map
            </Link>{" "}
            before you go.
          </p>
        </>
      }
    >
      <p>
        Footing is uneven; water shoes help. Some stretches are signed clothing-optional areas—part of
        the local culture, known to locals. Quiet voices, consent before photos, leave no trace, and
        giving others space keep the mixed crowd comfortable. Signage is light; the{" "}
        <Link href="/guidelines" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          guidelines
        </Link>{" "}
        page spells out what long-time visitors usually expect.
      </p>
      <p>
        From the <strong>West River</strong> side of the county, Rock River feels like a parallel
        valley: smaller, tighter, and easy to underestimate after rain. When in doubt, wait for
        another day.
      </p>
      <p>
        More:{" "}
        <Link href="/rock-river-vermont" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River Vermont overview
        </Link>
        ,{" "}
        <Link href="/rock-river-trail-vermont" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River trail Vermont
        </Link>
        ,{" "}
        <Link href="/visit" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          visit &amp; parking
        </Link>
        , or{" "}
        <Link href="/" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          home
        </Link>
        .
      </p>
    </AuthorityLanding>
  );
}
