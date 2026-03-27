import Link from "next/link";
import type { Metadata } from "next";

import { AuthorityLanding } from "@/components/seo/authority-landing";
import { buildPageMetadata } from "@/lib/seo";

const path = "/rock-river-vermont";

const pageDesc =
  "Rock River Vermont overview: Newfane swimming holes, trail access, map, and live conditions in Windham County—near Brattleboro and the West River valley.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River Vermont overview",
  description: pageDesc,
  path,
  titleAbsolute: "Rock River Vermont | Newfane, Windham County & southern VT guide",
  keywords: [
    "rock river vermont",
    "rock river newfane vt",
    "windham county vermont swimming",
    "southern vermont swimming hole",
  ],
});

export default function RockRiverVermontPage() {
  return (
    <AuthorityLanding
      path={path}
      jsonName="Rock River Vermont — visitor overview"
      jsonDescription={pageDesc}
      breadcrumbLabel="Rock River Vermont"
      h1="Rock River Vermont"
      intro={
        <>
          <p>
            Rock River is a Windham County corridor—wading, pools, and a trail that hugs the water in
            Newfane. Day trips often combine it with Brattleboro or the West River valley; this page is a
            short orientation, not the full planning tools.
          </p>
          <p>
            For real trip planning, use the live{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              map
            </Link>{" "}
            and{" "}
            <Link href="/conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              conditions
            </Link>
            . This site is volunteer-maintained—not a government page.
          </p>
        </>
      }
    >
      <p>
        If you are new to the area, start with{" "}
        <Link href="/rock-river-map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River map &amp; directions
        </Link>{" "}
        and{" "}
        <Link href="/rock-river-conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River conditions
        </Link>
        . For water access culture and parking nuance, read{" "}
        <Link href="/rock-river-swimming-hole" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River swimming hole notes
        </Link>{" "}
        and{" "}
        <Link href="/rock-river-trail-vermont" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River trail Vermont
        </Link>
        . The long-form{" "}
        <Link
          href="/visitor-guide#guide-top"
          className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline"
        >
          visitor guide
        </Link>{" "}
        adds history, safety, and community context.
      </p>
      <p>
        <Link href="/gallery" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Photos
        </Link>{" "}
        show how light and water levels change by season—always confirm flow in person before you wade.
      </p>
    </AuthorityLanding>
  );
}
