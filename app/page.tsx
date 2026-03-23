"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useRef, useState } from "react";

import { HomeFeaturedLocal } from "@/components/home/home-featured-local";
import { HomeFinalImage } from "@/components/home/home-final-image";
import { HomeHero } from "@/components/home/home-hero";
import { HomeInfoCards } from "@/components/home/home-info-cards";
import { HomeMapOverview } from "@/components/home/home-map-overview";
import { HomePhotoUpload } from "@/components/home/home-photo-upload";
import { HomeQuickLinks } from "@/components/home/home-quick-links";
import { HomeRiverPhotos } from "@/components/home/home-river-photos";
import { HomeVermontView } from "@/components/home/home-vermont-view";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WeatherWidget } from "@/components/conditions/weather-widget";
import { RiverWidget } from "@/components/conditions/river-widget";
import { CrowdWidget } from "@/components/crowd/crowd-widget";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const quickLinks = [
    {
      title: "Land & River",
      description:
        "Where the water comes from, what grows beside it, and how people have gathered here over time.",
      href: "/land-river",
    },
    {
      title: "Guidelines",
      description:
        "Parking on Route 30 in Dummerston, trail care, privacy, dogs, fires, and river etiquette.",
      href: "/guidelines",
    },
    {
      title: "Preservation",
      description:
        "Volunteer-led care, Vermont Land Trust easement, and how about 25 acres stay conserved.",
      href: "/preservation",
    },
    {
      title: "History",
      description:
        "Grassroots cleanup to 501(c)(3) land buys—Irene, neighbors, and the 2018 purchase.",
      href: "/history",
    },
    {
      title: "Visit",
      description:
        "Woodland trails, uneven footing, and spring currents—plan a steady, low-impact day.",
      href: "/visit",
    },
    {
      title: "Map",
      description:
        "Parking, trails, beaches, and the river corridor—the same local data as below, full screen.",
      href: "/map",
    },
    {
      title: "Conditions",
      description:
        "Spring crossing caution, daily notes, and shortcuts to weather and this page’s live tools.",
      href: "/conditions",
    },
    {
      title: "Photos",
      description: "Light on water and forest from the same collection as the full gallery.",
      href: "/gallery",
    },
  ];

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rock River VT",
    url: "https://rockrivervt.com",
    description:
      "Community guide to Rock River near Newfane, Vermont (unofficial). All are welcome—maps, live conditions, preservation context, and practical, respectful visitor guidance for families, LGBTQ+ visitors, locals, and newcomers.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rockrivervt.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="rr-body flex flex-col">
        <HomeHero
          showWelcome={showWelcome}
          onClose={() => setShowWelcome(false)}
          homeJsonLd={homeJsonLd}
        />

        <motion.section
          id="today-at-rock-river"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 pb-12 sm:px-6 lg:px-8"
        >
          <div className="rr-glass-strong p-5 sm:p-7">
            <header className="mb-6 max-w-2xl sm:mb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
                Right now
              </p>
              <h2 className="font-heading mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Today at Rock River
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/65 sm:text-sm">
                Weather for Newfane, river readings from a nearby West River gauge as
                planning context, and a neighborly read on how full popular spots feel.
                In spring, snowmelt upriver can change flows through the day—see{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Conditions
                </Link>{" "}
                for trail and crossing caution.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <WeatherWidget />

              <RiverWidget />

              <div className="sm:col-span-2">
                <CrowdWidget />
              </div>
            </div>
          </div>
        </motion.section>

        <HomeMapOverview />

        <HomeQuickLinks links={quickLinks} />
        <HomeVermontView />
        <HomeRiverPhotos />
        <HomePhotoUpload
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          photoInputRef={photoInputRef}
        />
        <HomeInfoCards />
        <HomeFinalImage />

        <HomeFeaturedLocal />

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rr-glass overflow-hidden p-6 sm:p-8">
            <div className="max-w-3xl">
              <h2 className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
                Welcome, stewardship, and respect
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70 sm:text-lg">
                This shoreline is fragile, beloved, and held in trust by volunteers.
                Stay on durable paths, carry out what you carry in, give adjacent homes
                their privacy, and keep voices low.{" "}
                <strong className="font-medium text-[var(--rr-mint)]">All are welcome</strong>{" "}
                when we meet as guests of the river—families, neighbors, LGBTQ+ visitors,
                and newcomers alike. The full{" "}
                <Link
                  href="/guidelines"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  visitor guidelines
                </Link>{" "}
                spell out parking on Route 30 in Dummerston, river etiquette, and safety
                in plain language.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
