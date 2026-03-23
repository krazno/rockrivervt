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

  const subCard =
    "rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dailyUpdatesJsonLd) }}
      />
      <SiteHeader />
      <main className="rr-body py-10 text-[#e8f4ef]">
        <Container className="max-w-3xl">
          <div className="rr-glass-strong overflow-hidden p-6 sm:p-8">
            <p className="mb-3 inline-flex rounded-full border border-[var(--rr-glow)]/35 bg-[var(--rr-glow)]/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[var(--rr-mint)] uppercase">
              Conditions journal
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Daily updates
            </h1>
            <p className="mt-3 text-base leading-7 text-white/70 sm:text-lg">
              We’re building a light rhythm of local notes—mud on the lower switchbacks,
              a calm morning on the pools, a heads-up after heavy rain. Posts will appear
              here as neighbors and regulars share what’s safe and kind to expect.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/55">
              For right now, pair this page with live tools on the home page and the{" "}
              <Link
                href="/conditions"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>{" "}
              hub.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#today-at-rock-river"
                className="rounded-full bg-[var(--rr-glow)] px-5 py-2.5 text-sm font-semibold text-[#04120e] shadow-lg shadow-[var(--rr-glow)]/25 transition hover:brightness-110"
              >
                Live weather &amp; river
              </Link>
              <Link
                href="/conditions"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                Conditions hub
              </Link>
              <Link
                href="/weather"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                Weather only
              </Link>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <article className={subCard}>
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                What to expect
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Short, factual blurbs from people who walked the trail that day—not
                forecasts, just ground truth.
              </p>
            </article>
            <article className={subCard}>
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                Cadence
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                More frequent in swim season; extra notes around storms and spring melt.
              </p>
            </article>
            <article className={subCard}>
              <h2 className="text-xs font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase">
                Safety first
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
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
