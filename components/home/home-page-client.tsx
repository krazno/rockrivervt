"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { useSectionViewSentinel } from "@/hooks/use-section-view-sentinel";
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
import { useHomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { VisitInsightsWidget } from "@/components/conditions/visit-insights-widget";
import { WeatherWidget } from "@/components/conditions/weather-widget";
import { RiverWidget } from "@/components/conditions/river-widget";
import { CrowdWidget } from "@/components/crowd/crowd-widget";
import { HomeConnectionStrip } from "@/components/home/home-connection-strip";
import { HomeDailyPulse } from "@/components/home/home-daily-pulse";
import { HomeLocalEcosystemTeaser } from "@/components/home/home-local-ecosystem-teaser";
import { HomeRiverIntelligence } from "@/components/home/home-river-intelligence";
import { HomeTodaysFeel } from "@/components/home/home-todays-feel";
import { HomeVisitorMomentsRow } from "@/components/home/home-visitor-moments-row";
import { HomeWhyLoveRockRiver } from "@/components/home/home-why-love";
import type { DailyPulsePayload } from "@/lib/daily-pulse";
import type { WeeklyRiverClientPayload } from "@/lib/local-ecosystem";

function todayLabelVermont(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());
}

export function HomePageClient({
  dailyPulse,
  weeklyRiver,
}: {
  dailyPulse: DailyPulsePayload;
  weeklyRiver: WeeklyRiverClientPayload;
}) {
  const visitSnapshot = useHomeVisitSnapshot();
  const todayLabel = useMemo(() => todayLabelVermont(), []);

  const bindDailyPulse = useSectionViewSentinel("home_daily_pulse");
  const bindTodaysFeel = useSectionViewSentinel("home_todays_feel");
  const bindPlanToday = useSectionViewSentinel("home_plan_today");
  const bindRiverIntel = useSectionViewSentinel("home_river_intelligence");
  const bindMapTrail = useSectionViewSentinel("home_map_trail");
  const bindVisitorGuide = useSectionViewSentinel("home_visitor_guide");
  const bindTodayStrip = useSectionViewSentinel("home_today_strip");
  const bindConditions = useSectionViewSentinel("home_conditions_widgets");
  const bindPhotos = useSectionViewSentinel("home_photo_carousel");
  const bindLocalPicks = useSectionViewSentinel("home_local_picks");
  const bindWhyLove = useSectionViewSentinel("home_why_love");
  const bindBusiness = useSectionViewSentinel("home_business_teaser");
  const bindConnection = useSectionViewSentinel("home_connection_strip");
  const bindGuideShort = useSectionViewSentinel("home_guide_short");

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
        <HomeHero />

        <div className="mt-2 space-y-8 sm:mt-3 sm:space-y-10 lg:space-y-12">
          <motion.section
            ref={bindPlanToday}
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
            <VisitInsightsWidget variant="home" snapshot={visitSnapshot} heroMode="water" />
          </motion.section>

          <div ref={bindTodaysFeel}>
            <HomeTodaysFeel snapshot={visitSnapshot} />
          </div>

          <motion.div
            ref={bindDailyPulse}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <HomeDailyPulse pulse={dailyPulse} />
          </motion.div>

          <div ref={bindRiverIntel}>
            <HomeRiverIntelligence weekly={weeklyRiver} snapshot={visitSnapshot} />
          </div>

          <div
            ref={bindMapTrail}
            className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
            id="map-trail"
          >
            <HomeMapOverview includeTrailFilm />
          </div>

          <div ref={bindVisitorGuide}>
            <HomeVisitorGuideBlock />
          </div>

          <div ref={bindTodayStrip}>
            <HomeTodayStrip snapshot={visitSnapshot} />
          </div>

          <motion.section
            ref={bindConditions}
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
                <WeatherWidget variant="home" homeHeroMode="water" />
              </div>
              <div className="h-full transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                <RiverWidget variant="home" homeHeroMode="water" />
              </div>
              <div
                id="crowd-check-in"
                className="h-full scroll-mt-28 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <CrowdWidget variant="home" homeHeroMode="water" />
              </div>
            </div>
          </motion.section>

          <div ref={bindPhotos}>
            <HomePhotoCarousel />
          </div>

          <div ref={bindLocalPicks}>
            <HomeLocalEcosystemTeaser />
          </div>

          <div ref={bindWhyLove}>
            <HomeVisitorMomentsRow />
            <div className="mt-10 sm:mt-12">
              <HomeWhyLoveRockRiver />
            </div>
          </div>

          <div ref={bindBusiness}>
            <HomeBusinessTeaser />
          </div>

          <div ref={bindConnection}>
            <HomeConnectionStrip />
          </div>

          <div ref={bindGuideShort}>
            <HomeGuideShort />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
