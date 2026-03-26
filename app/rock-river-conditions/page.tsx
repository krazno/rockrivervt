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
            <strong>Rock River conditions</strong> change with storms in the Green Mountains and
            tributaries above <strong>Newfane, Vermont</strong>. This page is a short orientation to how
            people usually read swim windows in <strong>Windham County</strong>, then hands you off to the live tools. Always
            read the river in person: if it looks loud, brown, or fast, wait for another day, whether
            you drove from <strong>Brattleboro</strong> or from farther across <strong>southern Vermont</strong>.
          </p>
          <p>
            Open the main{" "}
            <Link href="/conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              conditions page
            </Link>{" "}
            for NOAA weather, regional flow context, crowd check-ins, and the “plan today” summary on
            the homepage.
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
        Planning a <strong>Vermont swimming hole</strong> weekend? Check{" "}
        <Link href="/rock-river-swimming-hole" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River swimming hole
        </Link>{" "}
        etiquette, then confirm parking on the{" "}
        <Link href="/rock-river-map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
          Rock River map
        </Link>{" "}
        page before you lose signal near the <strong>West River</strong> hills.
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
