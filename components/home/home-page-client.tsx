"use client";

import { motion } from "motion/react";
import {
  BookOpen,
  Calendar,
  Footprints,
  Gem,
  MapPin,
  ScrollText,
  ShieldCheck,
  Trees,
  Users,
} from "lucide-react";

import { HomeExploreArea } from "@/components/home/home-explore-area";
import { HomeGuide } from "@/components/home/home-guide";
import { HomeHero } from "@/components/home/home-hero";
import { HomeKnowBeforeYouGo } from "@/components/home/home-know-before-go";
import { HomeMapOverview } from "@/components/home/home-map-overview";
import { HomePhotoCarousel } from "@/components/home/home-photo-carousel";
import { HomeSeasonBanner } from "@/components/home/home-season-banner";
import { HomeSeasonalNote } from "@/components/home/home-seasonal-note";
import { HomeTodayStrip } from "@/components/home/home-today-strip";
import { HomeVisitorGuideBlock } from "@/components/home/home-visitor-guide-block";
import { HomeWhyLoveRockRiver } from "@/components/home/home-why-love";
import {
  HomeQuickLinks,
  type HomeQuickLinkItem,
} from "@/components/home/home-quick-links";
import { HomeTrailTour } from "@/components/home/home-trail-tour";
import { HomeVermontView } from "@/components/home/home-vermont-view";
import { useHomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { WeatherWidget } from "@/components/conditions/weather-widget";
import { RiverWidget } from "@/components/conditions/river-widget";
import { VisitInsightsWidget } from "@/components/conditions/visit-insights-widget";
import { CrowdWidget } from "@/components/crowd/crowd-widget";

const SITE_URL = "https://rockrivervt.com";

const quickLinks: HomeQuickLinkItem[] = [
  {
    title: "Discoveries",
    href: "/discoveries",
    icon: Gem,
  },
  {
    title: "Community",
    href: "/community",
    icon: Users,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
  {
    title: "Local",
    href: "/local",
    icon: MapPin,
  },
  {
    title: "Visit",
    href: "/visit",
    icon: Footprints,
  },
  {
    title: "Land & River",
    href: "/land-river",
    icon: Trees,
  },
  {
    title: "Guidelines",
    href: "/guidelines",
    icon: ShieldCheck,
  },
  {
    title: "History",
    href: "/history",
    icon: ScrollText,
  },
];

type HomePageClientProps = {
  hasTrailVideo: boolean;
  /** Long date string for the conditions block (computed on the server). */
  todayLabel: string;
};

export function HomePageClient({ hasTrailVideo, todayLabel }: HomePageClientProps) {
  const visitSnapshot = useHomeVisitSnapshot();

  const homeJsonLd =
    hasTrailVideo ?
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Rock River Trail Tour — full hike",
        description:
          "Trail tour of the Rock River recreation area—Newfane, Windham County, Vermont.",
        thumbnailUrl: `${SITE_URL}/media/images/rock-river-newfane-vermont-outdoors-010.jpg`,
        contentUrl: `${SITE_URL}/media/videos/rock-river-trail-tour-full-hike.mp4`,
        uploadDate: "2026-03-19",
        publisher: {
          "@type": "Organization",
          name: "Rock River Vermont",
          url: SITE_URL,
        },
      }
    : null;

  return (
    <>
      {homeJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
        />
      ) : null}
      <SiteHeader />
      <HomeSeasonBanner />
      <main className="home-page-main flex min-h-screen flex-col bg-[#F6F4EF] text-[#1F2A24] antialiased">
        <p className="mx-auto w-full max-w-6xl px-4 pt-3 text-center text-[11px] leading-snug text-[#6B6F68] sm:px-6 sm:pt-4 sm:text-[12px] lg:px-8">
          Independent guide to Rock River Vermont. Community maintained. Not a town or agency site.
        </p>
        <HomeHero />

        <div className="mt-2 space-y-12 sm:mt-3 sm:space-y-14 lg:space-y-16">
          <HomeTodayStrip snapshot={visitSnapshot} />

          <HomeVisitorGuideBlock />

          <div className="rr-section mx-auto w-full max-w-6xl space-y-14 px-4 sm:space-y-16 sm:px-6 lg:px-8">
            <HomeMapOverview />
            <HomeTrailTour videoAvailable={hasTrailVideo} />
          </div>

          <motion.section
            id="today-at-rock-river"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="rr-section mx-auto w-full max-w-6xl scroll-mt-28 space-y-6 px-4 sm:space-y-8 sm:px-6 lg:px-8"
          >
            <HomeSectionHeader
              eyebrow="Today"
              icon={Calendar}
              title={todayLabel}
              titleClassName="max-w-[28ch] text-[#1F2A24] font-bold"
              eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
              eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
              className="mb-0 sm:mb-0"
            />

            <HomeSeasonalNote />

            <VisitInsightsWidget variant="home" snapshot={visitSnapshot} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45 }}
            className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
            aria-label="Weather, river, and crowd"
          >
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-6">
              <WeatherWidget variant="home" />
              <RiverWidget variant="home" />
              <CrowdWidget variant="home" />
            </div>
          </motion.section>

          <HomePhotoCarousel />

          <HomeKnowBeforeYouGo />

          <HomeGuide />

          <HomeExploreArea />

          <HomeWhyLoveRockRiver />

          <HomeQuickLinks links={quickLinks} />
          <HomeVermontView />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
