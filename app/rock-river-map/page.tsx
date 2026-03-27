import Link from "next/link";
import type { Metadata } from "next";

import { AuthorityLanding } from "@/components/seo/authority-landing";
import { buildPageMetadata } from "@/lib/seo";

const path = "/rock-river-map";

const pageDesc =
  "Rock River map for Newfane VT: parking, trail, beaches, and swimming holes in Windham County—use the live interactive map.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River map",
  description: pageDesc,
  path,
  titleAbsolute: "Rock River map | Newfane Vermont parking, trail & swimming holes",
  keywords: ["rock river map", "rock river vt map", "newfane vt map", "rock river parking"],
});

export default function RockRiverMapPage() {
  return (
    <AuthorityLanding
      path={path}
      jsonName="Rock River map — Newfane, Vermont"
      jsonDescription={pageDesc}
      breadcrumbLabel="Map guide"
      h1="Rock River map"
      intro={
        <>
          <p>
            <strong>Role:</strong> this URL is the long-search landing; the working tool is the full{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              interactive map
            </Link>
            —same layers: parking, trail, beaches, and shoreline labels. Open it to pan, zoom, and read the
            legend before you lose signal.
          </p>
          <p>
            The river is in Newfane; most parking pins sit along Route 30 on the Dummerston side—use the
            map, not town names alone. The home page shows a smaller preview of the same map if you want a
            quick glance first.
          </p>
        </>
      }
    >
      <p>
        After you orient, read{" "}
        <Link href="/rock-river-trail-vermont" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River trail Vermont
        </Link>{" "}
        for how foot travel meets the water, and{" "}
        <Link href="/rock-river-swimming-hole" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River swimming hole
        </Link>{" "}
        for on-shore expectations. Live hydrology and sky data stay on{" "}
        <Link href="/rock-river-conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River conditions
        </Link>
        .
      </p>
      <p>
        <Link href="/gallery" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Photo gallery
        </Link>{" "}
        helps visualize corners of the corridor the map labels cannot fully explain.
      </p>
      <p>
        <Link href="/rock-river-vermont" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River Vermont overview
        </Link>{" "}
        ·{" "}
        <Link href="/" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Home
        </Link>
      </p>
    </AuthorityLanding>
  );
}
