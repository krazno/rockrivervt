import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
