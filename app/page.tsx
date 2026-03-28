import type { Metadata } from "next";

import { HomePageClient } from "@/components/home/home-page-client";
import { HomePageJsonLd } from "@/components/seo/home-page-json-ld";
import { getDailyPulsePayload } from "@/lib/daily-pulse";
import { weeklyRiverClientPayload } from "@/lib/local-ecosystem";
import {
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_TITLE_ABSOLUTE,
  SITE_NAME_LONG,
  SITE_URL,
} from "@/lib/seo";

/** Daily pulse uses Vermont calendar “today” — must not freeze at build time. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: HOME_PAGE_TITLE_ABSOLUTE },
  description: HOME_PAGE_DESCRIPTION,
  keywords: [
    "rock river vermont",
    "rock river newfane vt",
    "LGBTQ friendly Vermont",
    "LGBTQ Vermont swimming",
    "Windham County LGBTQ",
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
    title: HOME_PAGE_TITLE_ABSOLUTE,
    description: HOME_PAGE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_PAGE_TITLE_ABSOLUTE,
    description: HOME_PAGE_DESCRIPTION,
  },
};

export default function Home() {
  const dailyPulse = getDailyPulsePayload();
  const weeklyRiver = weeklyRiverClientPayload();
  return (
    <>
      <HomePageJsonLd description={HOME_PAGE_DESCRIPTION} />
      <HomePageClient dailyPulse={dailyPulse} weeklyRiver={weeklyRiver} />
    </>
  );
}
