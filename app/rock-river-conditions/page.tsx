import Link from "next/link";
import type { Metadata } from "next";

import { AuthorityLanding } from "@/components/seo/authority-landing";
import { buildPageMetadata } from "@/lib/seo";

const path = "/rock-river-conditions";

const pageDesc =
  "Rock River conditions: weather, flow context, and swim planning for Newfane VT and Windham County—links to the live tools.";

export const metadata: Metadata = buildPageMetadata({
  title: "Rock River conditions",
  description: pageDesc,
  path,
  titleAbsolute: "Rock River conditions | weather, flow & swim planning — Newfane VT",
  keywords: ["rock river conditions", "rock river vermont water level", "newfane river conditions"],
});

export default function RockRiverConditionsPage() {
  return (
    <AuthorityLanding
      path={path}
      jsonName="Rock River conditions — swim planning"
      jsonDescription={pageDesc}
      breadcrumbLabel="Conditions"
      h1="Rock River conditions"
      intro={
        <>
          <p>
            <strong>Role:</strong> this URL orients search traffic; the live dashboard is the main{" "}
            <Link href="/conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              conditions page
            </Link>
            —weather, river context, crowd check-ins, and the same “right now” card as the home page.
            Water changes fast after mountain rain—always read the river in person.
          </p>
          <p>
            If it looks loud, brown, or fast, wait for another day. Pair tools with{" "}
            <Link href="/visit" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              visit
            </Link>{" "}
            for parking reality and{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              map
            </Link>{" "}
            for pins.
          </p>
        </>
      }
    >
      <p>
        Estimated water comfort and clarity labels are models, not field samples—pair them with
        common sense and the{" "}
        <Link href="/weather" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          dedicated weather page
        </Link>{" "}
        when you want radar and hourly detail.
      </p>
      <p>
        Swimming culture and shoreline norms:{" "}
        <Link href="/rock-river-swimming-hole" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          swimming hole notes
        </Link>
        . Parking and approach:{" "}
        <Link href="/rock-river-map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          map landing
        </Link>{" "}
        → full{" "}
        <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          map
        </Link>
        .
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
