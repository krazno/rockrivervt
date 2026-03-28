"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { useSectionViewSentinel } from "@/hooks/use-section-view-sentinel";
import { Calendar, MapPin } from "lucide-react";

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
import { HomeLeafAtmosphere } from "@/components/home/home-leaf-atmosphere";
import { HomePageFlowSpine } from "@/components/home/home-page-flow-spine";
import { HomePeopleSplash } from "@/components/home/home-people-splash";
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
      <main className="home-page-main relative z-[1] flex min-h-screen flex-col bg-gradient-to-b from-[#F6F4EF]/72 via-[#F5F2EC]/66 to-[#F3EFE6]/74 text-[#1F2A24] antialiased backdrop-blur-[3px]">
        <HomePageFlowSpine />
        <HomeLeafAtmosphere />
        <div className="relative z-[2] flex min-h-screen flex-col">
        <p className="mx-auto w-full max-w-6xl px-4 pt-2 text-center text-[11px] leading-snug text-[#6B6F68] sm:px-6 sm:pt-3 sm:text-[12px] lg:px-8">
          Neighbor-run field guide—map, live snapshot, and local context. Not a government or agency site.
        </p>
        <div
          className="mx-auto w-full max-w-6xl px-4 pb-1 pt-2 text-center sm:px-6 sm:pb-2 sm:pt-2.5 lg:px-8"
          aria-label="Where Rock River is"
        >
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-[10px] font-medium leading-snug text-[#5c645c] sm:text-[11px]">
            <MapPin
              className="h-3 w-3 shrink-0 text-[#4F6B52]/75 sm:h-3.5 sm:w-3.5"
              aria-hidden
            />
            <span>
              <span className="text-[#4a524a]">Newfane, Vermont</span>
              <span className="text-[#6B6F68]"> · Windham County</span>
            </span>
          </p>
          <p className="mt-0.5 text-[10px] leading-snug text-[#8a918c] sm:text-[11px]">
            River in Newfane · usual parking pull-offs along Vermont Route 30 (Dummerston side)
          </p>
        </div>
        <HomeHero />
        <HomePeopleSplash />

        <div className="mt-2 flex flex-col gap-10 sm:mt-3 sm:gap-12 lg:gap-[3.25rem]">
          <div className="flex flex-col gap-7 sm:gap-8 lg:gap-9">
            <motion.section
              ref={bindPlanToday}
              id="plan-today"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rr-section mx-auto w-full max-w-6xl scroll-mt-28 px-4 sm:px-6 lg:px-8"
            >
              <div className="rr-home-band rr-home-band--river space-y-6 border border-[#E2E0D8]/75 px-4 py-6 sm:space-y-7 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
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
              </div>
            </motion.section>

            <div ref={bindTodaysFeel}>
              <HomeTodaysFeel snapshot={visitSnapshot} />
            </div>

            <motion.div
              ref={bindDailyPulse}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <HomeDailyPulse pulse={dailyPulse} />
            </motion.div>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-11">
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
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
              aria-label="Weather, river, and how busy it feels"
            >
              <div className="rr-home-band rr-home-band--shore border border-[#E2E0D8]/75 p-4 sm:p-5 lg:p-6">
                <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-6">
                  <div className="h-full origin-center transition-[transform,box-shadow] duration-[var(--rr-motion-duration-hover)] ease-[var(--rr-motion-ease-hover)] [transform-style:preserve-3d] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none hover:-translate-y-0.5 hover:shadow-[var(--rr-shadow-lift-hover)]">
                    <WeatherWidget variant="home" homeHeroMode="water" />
                  </div>
                  <div className="h-full transition-[transform,box-shadow] duration-[var(--rr-motion-duration-hover)] ease-[var(--rr-motion-ease-hover)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none hover:-translate-y-0.5 hover:shadow-[var(--rr-shadow-lift-hover)]">
                    <RiverWidget variant="home" homeHeroMode="water" />
                  </div>
                  <div
                    id="crowd-check-in"
                    className="h-full scroll-mt-28 transition-[transform,box-shadow] duration-[var(--rr-motion-duration-hover)] ease-[var(--rr-motion-ease-hover)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none hover:-translate-y-0.5 hover:shadow-[var(--rr-shadow-lift-hover)]"
                  >
                    <CrowdWidget variant="home" homeHeroMode="water" />
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          <div className="flex flex-col gap-7 sm:gap-9 lg:gap-10">
            <div ref={bindPhotos}>
              <HomePhotoCarousel />
            </div>

            <div ref={bindLocalPicks}>
              <HomeLocalEcosystemTeaser />
            </div>

            <div ref={bindWhyLove} className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
              <HomeVisitorMomentsRow />
              <HomeWhyLoveRockRiver />
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
        </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
