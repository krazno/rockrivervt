import Link from "next/link";
import type { Metadata } from "next";

import { AuthorityLanding } from "@/components/seo/authority-landing";
import { buildPageMetadata } from "@/lib/seo";

const path = "/rock-river-trail-vermont";

const pageDesc =
  "Rock River trail Vermont: footpath along the river in Newfane, parking links, and how the corridor connects swimming holes in Windham County.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River trail Vermont",
  description: pageDesc,
  path,
  titleAbsolute: "Rock River trail Vermont | Newfane hiking & river access",
  keywords: ["rock river trail vermont", "rock river trail", "newfane vt hiking", "windham county trail"],
});

export default function RockRiverTrailVermontPage() {
  return (
    <AuthorityLanding
      path={path}
      jsonName="Rock River trail Vermont — access & map"
      jsonDescription={pageDesc}
      breadcrumbLabel="Trail"
      h1="Rock River trail Vermont"
      intro={
        <>
          <p>
            The <strong>Rock River trail</strong> in <strong>Vermont</strong> is a modest riverside
            path—not a long summit hike. It links parking pockets to beaches and pools along{" "}
            <strong>Rock River</strong> in <strong>Newfane</strong>, <strong>Windham County</strong>.
            If you are visiting from <strong>Brattleboro</strong> or elsewhere in{" "}
            <strong>southern Vermont</strong>, expect roots, stone, and short climbs; mud season
            softens tread in spring. The same tread supports anglers, families, and swimmers heading
            to popular <strong>Vermont swimming hole</strong> pockets in summer.
          </p>
          <p>
            Use the{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              full map
            </Link>{" "}
            to orient before cell signal drops, and skim{" "}
            <Link href="/rock-river-map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              Rock River map notes
            </Link>{" "}
            for how the map layers line up with what you will see on the ground.
          </p>
        </>
      }
    >
      <p>
        The corridor parallels the main stem while side brooks feed in from the hills above the{" "}
        <strong>West River</strong> basin. After high water, crossings and social trails shift—what
        felt obvious last season may not match this year.
      </p>
      <p>
        Trail video and context: see the homepage trail embed after you read{" "}
        <Link href="/rock-river-conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River conditions
        </Link>
        . For swim-focused planning, jump to{" "}
        <Link href="/rock-river-swimming-hole" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River swimming hole
        </Link>
        .
      </p>
      <p>
        <Link href="/" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          ← Rock River Vermont home
        </Link>
      </p>
    </AuthorityLanding>
  );
}
