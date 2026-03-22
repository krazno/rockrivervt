import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Daily updates",
  description:
    "Short local notes on Rock River trail footing, flow, and season shifts—paired with live conditions on the home page.",
  alternates: {
    canonical: "/daily-updates",
  },
  openGraph: {
    title: "Daily Updates | Rock River VT",
    description:
      "Trail and river notes for Rock River near Newfane and Dummerston, Vermont.",
    url: "https://rockrivervt.com/daily-updates",
    type: "website",
    images: [
      {
        url: "/rock-river-hero.png",
        width: 1200,
        height: 630,
        alt: "Rock River in Newfane, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Updates | Rock River VT",
    description:
      "Trail and river notes for Rock River near Newfane and Dummerston, Vermont.",
    images: ["/rock-river-hero.png"],
  },
};

export default function DailyUpdatesPage() {
  const dailyUpdatesJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Daily Updates | Rock River VT",
    url: "https://rockrivervt.com/daily-updates",
    description:
      "Short local notes on Rock River trail footing, flow, and season shifts.",
    isPartOf: {
      "@type": "WebSite",
      name: "Rock River VT",
      url: "https://rockrivervt.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dailyUpdatesJsonLd) }}
      />
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] py-10 text-[#20342c]">
        <Container className="max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-[#c8d6cb] bg-gradient-to-br from-[#e6efe5] via-[#dce7df] to-[#cfded9] p-6 shadow-[0_18px_55px_-25px_rgba(30,52,44,0.55)] sm:p-8">
            <p className="mb-3 inline-flex rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#446258] uppercase">
              Conditions journal
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
              Daily updates
            </h1>
            <p className="mt-3 text-base leading-7 text-[#38594f] sm:text-lg">
              We’re building a light rhythm of local notes—mud on the lower switchbacks,
              a calm morning on the pools, a heads-up after heavy rain. Posts will appear
              here as neighbors and regulars share what’s safe and kind to expect.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#4e6c62]">
              For right now, pair this page with live tools on the home page and the{" "}
              <Link
                href="/conditions"
                className="font-medium text-[#31584b] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>{" "}
              hub.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#today-at-rock-river"
                className="rounded-full bg-[#31584b] px-5 py-2.5 text-sm font-medium text-[#edf4ef] transition hover:bg-[#284a3f]"
              >
                Live weather &amp; river
              </Link>
              <Link
                href="/conditions"
                className="rounded-full border border-[#8ea497] bg-[#f3f6f2] px-5 py-2.5 text-sm font-medium text-[#35584c] transition hover:bg-[#e7ede8]"
              >
                Conditions hub
              </Link>
              <Link
                href="/weather"
                className="rounded-full border border-[#8ea497] bg-[#f3f6f2] px-5 py-2.5 text-sm font-medium text-[#35584c] transition hover:bg-[#e7ede8]"
              >
                Weather only
              </Link>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-[#c2d0c6] bg-[#f8f8f3] p-4">
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                What to expect
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#38594f]">
                Short, factual blurbs from people who walked the trail that day—not
                forecasts, just ground truth.
              </p>
            </article>
            <article className="rounded-2xl border border-[#c3ced1] bg-[#f4f7f8] p-4">
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[#4e6870] uppercase">
                Cadence
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#38515a]">
                More frequent in swim season; extra notes around storms and spring melt.
              </p>
            </article>
            <article className="rounded-2xl border border-[#d5d0c3] bg-[#f7f3ea] p-4">
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[#6c6350] uppercase">
                Safety first
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5a5140]">
                Always confirm conditions on site—no post replaces your own judgment
                near moving water.
              </p>
            </article>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
