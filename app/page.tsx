"use client";

import { useRef, useState } from "react";

import { HomeFinalImage } from "@/components/home/home-final-image";
import { HomeHero } from "@/components/home/home-hero";
import { HomeInfoCards } from "@/components/home/home-info-cards";
import { HomePhotoUpload } from "@/components/home/home-photo-upload";
import { HomeQuickLinks } from "@/components/home/home-quick-links";
import { HomeRiverPhotos } from "@/components/home/home-river-photos";
import { HomeVermontView } from "@/components/home/home-vermont-view";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WeatherWidget } from "@/components/conditions/weather-widget";
import { RiverWidget } from "@/components/conditions/river-widget";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const riverPhotos = [
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
      alt: "Forest stream with soft green tones",
      credit: "Unsplash",
    },
    {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      alt: "Mountain valley and water in muted blue light",
      credit: "Unsplash",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
      alt: "Woodland path near water and stone",
      credit: "Unsplash",
    },
  ];

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
      href: "/photos",
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
        <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-[#224035] sm:text-2xl">
              Today at Rock River
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <WeatherWidget />

            <RiverWidget />

            <div className="rounded-2xl border border-[#c3ced1] bg-[#f4f7f8] p-5">
              <h3 className="text-sm font-semibold tracking-[0.12em] text-[#4e6870] uppercase">
                Busy level
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#38515a]">—</p>
            </div>

            <div className="rounded-2xl border border-[#d5d0c3] bg-[#f7f3ea] p-5">
              <h3 className="text-sm font-semibold tracking-[0.12em] text-[#6c6350] uppercase">
                Last update time
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a5140]">—</p>
            </div>
          </div>
        </section>

        <HomeQuickLinks links={quickLinks} />
        <HomeVermontView />
        <HomeRiverPhotos riverPhotos={riverPhotos} />
        <HomePhotoUpload
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          photoInputRef={photoInputRef}
        />
        <HomeInfoCards />
        <HomeFinalImage />

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
