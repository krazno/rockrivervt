"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";

import { HomeBusinessTeaser } from "@/components/home/home-business-teaser";
import { HomeGuideShort } from "@/components/home/home-guide-short";
import { HomeHero } from "@/components/home/home-hero";
import { HomeMapOverview } from "@/components/home/home-map-overview";
import { HomePhotoCarousel } from "@/components/home/home-photo-carousel";
import { HomeMonthlyWelcomeModal } from "@/components/home/home-monthly-welcome-modal";
import { HomeSeasonBanner } from "@/components/home/home-season-banner";
import { HomeSeasonalNote } from "@/components/home/home-seasonal-note";
import { HomeTodayStrip } from "@/components/home/home-today-strip";
import { HomeVisitorGuideBlock } from "@/components/home/home-visitor-guide-block";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import type { HomeHeroSnapshotMode } from "@/components/home/home-hero-snapshot-mode";
import { useHomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { VisitInsightsWidget } from "@/components/conditions/visit-insights-widget";
import { WeatherWidget } from "@/components/conditions/weather-widget";
import { RiverWidget } from "@/components/conditions/river-widget";
import { CrowdWidget } from "@/components/crowd/crowd-widget";

function todayLabelVermont(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());
}

export function HomePageClient() {
  const visitSnapshot = useHomeVisitSnapshot();
  const [heroMode, setHeroMode] = useState<HomeHeroSnapshotMode>("water");
  const todayLabel = useMemo(() => todayLabelVermont(), []);

  return (
    <>
      <SiteHeader />
      <HomeMonthlyWelcomeModal />
      <HomeSeasonBanner />
      <PageGalleryBackdrop />
      <main className="home-page-main relative z-[1] flex min-h-screen flex-col bg-[#F6F4EF]/88 text-[#1F2A24] antialiased backdrop-blur-[2px]">
        <p className="mx-auto w-full max-w-6xl px-4 pt-2 text-center text-[11px] leading-snug text-[#6B6F68] sm:px-6 sm:pt-3 sm:text-[12px] lg:px-8">
          Neighbor-run field guide—map, live snapshot, and local context. Not a government or agency site.
        </p>
        <HomeHero heroMode={heroMode} onHeroModeChange={setHeroMode} />

        <div className="mt-2 space-y-8 sm:mt-3 sm:space-y-10 lg:space-y-12">
          <motion.section
            id="plan-today"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45 }}
            className="rr-section mx-auto w-full max-w-6xl scroll-mt-28 space-y-6 px-4 sm:space-y-7 sm:px-6 lg:px-8"
          >
            <HomeSectionHeader
              eyebrow="Right now"
              icon={Calendar}
              title={todayLabel}
              description="Quick read: is today reasonable before you drive? Same numbers as the full conditions page."
              titleClassName="max-w-[28ch] text-[#1F2A24] font-bold"
              eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
              eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
              descriptionClassName="text-[#6B6F68]"
              className="mb-0 sm:mb-0"
            />
            <HomeSeasonalNote />
            <VisitInsightsWidget variant="home" snapshot={visitSnapshot} heroMode={heroMode} />
          </motion.section>

          <div className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8" id="map-trail">
            <HomeMapOverview includeTrailFilm />
          </div>

          <HomeVisitorGuideBlock />

          <HomeTodayStrip snapshot={visitSnapshot} />

          <motion.section
            id="conditions-widgets"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-45px" }}
            transition={{ duration: 0.42 }}
            className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
            aria-label="Weather, river, and how busy it feels"
          >
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-6">
              <div className="h-full origin-center transition-transform duration-300 ease-out [transform-style:preserve-3d] hover:-translate-y-1 hover:shadow-lg">
                <WeatherWidget variant="home" homeHeroMode={heroMode} />
              </div>
              <div className="h-full transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                <RiverWidget variant="home" homeHeroMode={heroMode} />
              </div>
              <div
                id="crowd-check-in"
                className="h-full scroll-mt-28 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <CrowdWidget variant="home" homeHeroMode={heroMode} />
              </div>
            </div>
          </motion.section>

          <HomePhotoCarousel />

          <HomeBusinessTeaser />

          <HomeGuideShort />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
