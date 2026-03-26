"use client";

import { useState } from "react";

import { HomeGuideShort } from "@/components/home/home-guide-short";
import { HomeHero } from "@/components/home/home-hero";
import { HomeMapOverview } from "@/components/home/home-map-overview";
import { HomeSeasonBanner } from "@/components/home/home-season-banner";
import { HomeTodayStrip } from "@/components/home/home-today-strip";
import { HomeVisitorGuideBlock } from "@/components/home/home-visitor-guide-block";
import type { HomeHeroSnapshotMode } from "@/components/home/home-hero-snapshot-mode";
import { useHomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function HomePageClient() {
  const visitSnapshot = useHomeVisitSnapshot();
  const [heroMode, setHeroMode] = useState<HomeHeroSnapshotMode>("water");

  return (
    <>
      <SiteHeader />
      <HomeSeasonBanner />
      <main className="home-page-main flex min-h-screen flex-col bg-[#F6F4EF] text-[#1F2A24] antialiased">
        <p className="mx-auto w-full max-w-6xl px-4 pt-3 text-center text-[11px] leading-snug text-[#6B6F68] sm:px-6 sm:pt-4 sm:text-[12px] lg:px-8">
          Independent guide to Rock River Vermont. Community maintained. Not a town or agency site.
        </p>
        <HomeHero heroMode={heroMode} onHeroModeChange={setHeroMode} />

        <div className="mt-2 space-y-12 sm:mt-3 sm:space-y-14 lg:space-y-16">
          <HomeVisitorGuideBlock />

          <HomeTodayStrip snapshot={visitSnapshot} heroMode={heroMode} />

          <HomeGuideShort />

          <div className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <HomeMapOverview />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
