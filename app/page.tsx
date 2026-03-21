"use client";

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
      title: "Visit Guide",
      description: "A gentle step-by-step walk from village edge to river bends.",
      href: "/visit",
    },
    {
      title: "Directions & Parking",
      description: "Parking pull-offs, swimming pockets, and trail access points.",
      href: "/visit",
    },
    {
      title: "Map",
      description: "Parking pull-offs, swimming pockets, and trail access points.",
      href: "/map",
    },
    {
      title: "Conditions",
      description: "Local observations on trail conditions, flow, and crowd levels.",
      href: "/daily-updates",
    },
    {
      title: "Updates",
      description: "Local observations on trail conditions, flow, and crowd levels.",
      href: "/daily-updates",
    },
    {
      title: "Photos",
      description: "Seasonal scenes from misty spring mornings to late summer light.",
      href: "/gallery",
    },
    {
      title: "Safety & Rules",
      description: "Community tips about respectful access and quiet places to pause.",
      href: "/visit",
    },
  ];

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RockRiverVT",
    url: "https://rockrivervt.com",
    description:
      "An unofficial local guide to Rock River near Newfane, Vermont with updates, maps, weather context, and stewardship notes.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rockrivervt.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] text-[#20342c]">
        <HomeHero
          showWelcome={showWelcome}
          onClose={() => setShowWelcome(false)}
          homeJsonLd={homeJsonLd}
        />
        <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-[1.75rem] border border-[#b5c7bb] bg-gradient-to-b from-white/75 to-[#f2f6f0]/95 p-5 shadow-[0_14px_48px_-32px_rgba(24,49,43,0.38)] sm:p-7">
            <header className="mb-6 max-w-2xl sm:mb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
                Daily conditions
              </p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-[#1a2f27] sm:text-2xl">
                Today at Rock River
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4d6a5f] sm:text-sm">
                A quick local snapshot—weather, water context, and how busy spots feel—so
                you can plan a good day by the water.
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
        </section>

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

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#c8d6cb] bg-white/60 p-6 shadow-[0_16px_44px_-30px_rgba(24,49,43,0.35)] sm:p-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight text-[#1a2f27] sm:text-2xl">
                Respect the River
              </h2>
              <p className="mt-3 text-base leading-7 text-[#38594f] sm:text-lg">
                Please respect private land, stay on paths, leave no trace,
                and help keep Rock River a family-safe environment for
                everyone.
              </p>
            </div>
          </div>
        </section>
    </main>
      <SiteFooter />
    </>
  );
}
