import type { Metadata } from "next";

import { HomePageClient } from "@/components/home/home-page-client";
import { HomePageJsonLd } from "@/components/seo/home-page-json-ld";
import { trailTourVideoFileExists } from "@/lib/media-server";
import {
  DEFAULT_OG_ALT,
  META_DESC_MAX,
  OG_IMAGE,
  SITE_NAME_LONG,
  SITE_URL,
  truncateMetaDescription,
} from "@/lib/seo";

/** Fresh “today” line for the home snapshot (America/New_York). */
export const dynamic = "force-dynamic";

function todayInVermont(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());
}

const HOME_DESC = truncateMetaDescription(
  "Rock River Vermont homepage—today’s visit window, weather, river levels, crowd feel, trail map, and full trail video for Newfane & Windham County VT.",
  META_DESC_MAX,
);

/** Default title &lt; 60 chars */
const HOME_TITLE_ABSOLUTE = "Rock River Vermont | Newfane VT Swimming Hole Guide";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: HOME_TITLE_ABSOLUTE },
  description: HOME_DESC,
  keywords: [
    "rock river vermont",
    "rock river newfane vt",
    "rock river newfane vermont",
    "rock river swimming hole vermont",
    "newfane vermont swimming hole",
    "brattleboro swimming hole",
    "southern vermont swimming hole",
    "rock river trail vermont",
    "rock river vt map",
    "rock river conditions",
    "rock river photos",
    "rock river preserve",
    "rock river vt guide",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME_LONG,
    title: HOME_TITLE_ABSOLUTE,
    description: HOME_DESC,
    images: [{ ...OG_IMAGE, alt: DEFAULT_OG_ALT }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE_ABSOLUTE,
    description: HOME_DESC,
    images: [{ url: OG_IMAGE.url, alt: DEFAULT_OG_ALT }],
  },
};

export default function Home() {
  const hasTrailVideo = trailTourVideoFileExists();

  return (
    <>
      <HomePageJsonLd description={HOME_DESC} />
      <HomePageClient hasTrailVideo={hasTrailVideo} todayLabel={todayInVermont()} />
    </>
  );
}
