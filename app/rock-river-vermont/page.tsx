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
            <strong>Rock River Vermont</strong> is a free-flowing corridor in{" "}
            <strong>Newfane, Vermont</strong>, in <strong>Windham County</strong>. Visitors treat it as
            one of the best-known <strong>southern Vermont</strong> river days: wading, swimming holes,
            and a footpath that stays close to the water. The valley sits near{" "}
            <strong>Brattleboro</strong> and the <strong>West River</strong> watershed, so many trip
            plans pair a <strong>Vermont swimming hole</strong> here with errands or dinner downstream.
          </p>
          <p>
            This site is a volunteer guide—not a government page. Use the{" "}
            <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              Rock River map
            </Link>
            ,{" "}
            <Link href="/conditions" className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline">
              conditions
            </Link>
            , and the topic pages below to plan a respectful visit.
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
          homepage guide
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
