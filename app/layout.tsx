import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rockrivervt.com"),
  title: {
    default: "Rock River VT | All Are Welcome",
    template: "%s | Rock River VT",
  },
  description:
    "A local, community-built guide to Rock River near Newfane, Vermont with map links, walk tips, updates, and weather context.",
  keywords: [
    "Rock River Vermont",
    "Newfane Vermont",
    "Rock River swimming",
    "Vermont river guide",
    "RockRiverVT",
    "daily river conditions",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://rockrivervt.com",
    siteName: "Rock River VT",
    title: "Rock River VT | All Are Welcome",
    description:
      "An unofficial community guide to Rock River near Newfane, Vermont with updates, maps, weather context, and local notes.",
    images: [
      {
        url: "/rock-river-hero.png",
        width: 1200,
        height: 630,
        alt: "Rock River in Newfane, Vermont",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock River VT | All Are Welcome",
    description:
      "An unofficial community guide to Rock River near Newfane, Vermont with updates, maps, weather context, and local notes.",
    images: ["/rock-river-hero.png"],
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
