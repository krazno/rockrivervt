import Link from "next/link";
import type { Metadata } from "next";

import { AuthorityLanding } from "@/components/seo/authority-landing";
import { buildPageMetadata } from "@/lib/seo";

const path = "/rock-river-swimming-hole";

const pageDesc =
  "Rock River swimming: pools on stone, mixed shoreline, etiquette, and planning—Newfane corridor, Windham County VT.";

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
            <strong>Role:</strong> shoreline culture and swim planning context—not the live dashboard.
            Rock River is a string of pools and ledges on rounded stone, not one roped beach. Summer
            draws a mixed crowd from Windham County and day trips; spring snowmelt is cold and fast;
            late summer can mean more exposed rock and slower eddies.
          </p>
          <p>
            For <strong>today</strong>, use{" "}
            <Link href="/conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              conditions
            </Link>{" "}
            and the home page snapshot; for <strong>pins</strong>, use the{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              full map
            </Link>
            . For <strong>parking and town names</strong>, read{" "}
            <Link href="/visit" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              visit
            </Link>
            .
          </p>
        </>
      }
    >
      <p>
        Footing is uneven—water shoes help. Some stretches are signed clothing-optional; that pattern
        is part of local use. Quiet voices, consent before photos, leave no trace, and giving others
        space keep the mixed crowd comfortable. Plain expectations:{" "}
        <Link href="/guidelines" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          guidelines
        </Link>
        .
      </p>
      <p>
        After heavy rain in the hills, the main stem can rise quickly—easy to underestimate from a town
        forecast. If you are unsure, wait for a clearer day.
      </p>
      <p>
        Trail approach and film:{" "}
        <Link href="/rock-river-trail-vermont" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River trail Vermont
        </Link>
        . Orientation:{" "}
        <Link href="/rock-river-vermont" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River Vermont overview
        </Link>
        {" · "}
        <Link href="/" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Home
        </Link>
        .
      </p>
    </AuthorityLanding>
  );
}
