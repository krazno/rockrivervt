import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";

import { AnalyticsScripts } from "@/components/seo/analytics";
import { SiteWideJsonLd } from "@/components/seo/site-wide-json-ld";
import {
  DEFAULT_OG_ALT,
  META_DESC_MAX,
  OG_IMAGE,
  SITE_NAME_LONG,
  SITE_URL,
  TITLE_TEMPLATE,
  truncateMetaDescription,
} from "@/lib/seo";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

const defaultDesc = truncateMetaDescription(
  "Guide to Rock River in Newfane Vermont with map, trail, swimming holes, photos, and visitor info near Brattleboro and Windham County.",
  META_DESC_MAX,
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME_LONG,
    template: TITLE_TEMPLATE,
  },
  description: defaultDesc,
  applicationName: SITE_NAME_LONG,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME_LONG,
    title: SITE_NAME_LONG,
    description: defaultDesc,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: DEFAULT_OG_ALT,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME_LONG,
    description: defaultDesc,
    images: [{ url: OG_IMAGE.url, alt: DEFAULT_OG_ALT }],
  },
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ebe6dc" },
    { media: "(prefers-color-scheme: dark)", color: "#2c2a26" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${outfit.variable} ${cormorant.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <AnalyticsScripts />
        <SiteWideJsonLd />
        {children}
      </body>
    </html>
  );
}
