import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";

import { SiteWideJsonLd } from "@/components/seo/site-wide-json-ld";
import { DEFAULT_OG_ALT, OG_IMAGE, SITE_NAME_LONG, SITE_URL } from "@/lib/seo";

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

/*
 * Google Search Console (manual steps — no secrets in repo):
 * 1. Add property for https://rockrivervt.com
 * 2. Verify via DNS or HTML tag: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in .env.local
 * 3. Submit sitemap: https://rockrivervt.com/sitemap.xml
 * 4. (Optional) Link Google Analytics 4 property in GA admin; use env for measurement ID in a client wrapper if needed
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Rock River Vermont Guide | Newfane VT Swimming Hole, Map, Conditions & Weather",
    template: "%s | Rock River Vermont",
  },
  description:
    "Guide to Rock River in Newfane, Windham County VT near Brattleboro: rocky swimming holes, trail map, live conditions, photos, and visitor info for southern Vermont’s Rock River.",
  keywords: [
    "Rock River Vermont",
    "Rock River Newfane VT",
    "Newfane Vermont swimming hole",
    "Brattleboro swimming hole",
    "southern Vermont swimming hole",
    "Windham County swimming hole",
    "Rock River map",
    "Rock River conditions",
    "Rock River trail",
    "Rock River preserve",
  ],
  applicationName: SITE_NAME_LONG,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME_LONG,
    title:
      "Rock River Vermont Guide | Newfane VT Swimming Hole, Map, Conditions & Weather",
    description:
      "Rocky pools, trails, and river access in Newfane & Windham County VT—map, conditions, photos, and stewardship near Brattleboro.",
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
    title:
      "Rock River Vermont Guide | Newfane VT Swimming Hole, Map, Conditions & Weather",
    description:
      "Map, conditions, trail tour, photos—Rock River, Newfane & southern Vermont.",
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
        <SiteWideJsonLd />
        {children}
      </body>
    </html>
  );
}
