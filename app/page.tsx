import type { Metadata } from "next";

import { HomePageClient } from "@/components/home/home-page-client";
import { HomePageJsonLd } from "@/components/seo/home-page-json-ld";
import {
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_TITLE_ABSOLUTE,
  SITE_NAME_LONG,
  SITE_URL,
} from "@/lib/seo";

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
  return (
    <>
      <HomePageJsonLd description={HOME_PAGE_DESCRIPTION} />
      <HomePageClient />
    </>
  );
}
