"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  CloudSun,
  Footprints,
  Gem,
  MapPin,
  ScrollText,
  ShieldCheck,
  Trees,
  Users,
} from "lucide-react";

import { HomeGuide } from "@/components/home/home-guide";
import { HomeHero } from "@/components/home/home-hero";
import { HomeMapOverview } from "@/components/home/home-map-overview";
import {
  HomeQuickLinks,
  type HomeQuickLinkItem,
} from "@/components/home/home-quick-links";
import { HomeRiverPhotos } from "@/components/home/home-river-photos";
import { HomeTrailTour } from "@/components/home/home-trail-tour";
import { HomeVermontView } from "@/components/home/home-vermont-view";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { WeatherWidget } from "@/components/conditions/weather-widget";
import { RiverWidget } from "@/components/conditions/river-widget";
import { CrowdWidget } from "@/components/crowd/crowd-widget";

const SITE_URL = "https://rockrivervt.com";

const quickLinks: HomeQuickLinkItem[] = [
  {
    title: "Discoveries",
    description: "What to notice along the river.",
    href: "/discoveries",
    icon: Gem,
  },
  {
    title: "Community",
    description: "Stewardship and people who care for the place.",
    href: "/community",
    icon: Users,
  },
  {
    title: "Resources",
    description: "Maps and links worth saving.",
    href: "/resources",
    icon: BookOpen,
  },
  {
    title: "Local",
    description: "Towns and culture nearby.",
    href: "/local",
    icon: MapPin,
  },
  {
    title: "Visit",
    description: "What to expect on the banks and trail.",
    href: "/visit",
    icon: Footprints,
  },
  {
    title: "Land & River",
    description: "How this stretch fits the valley.",
    href: "/land-river",
    icon: Trees,
  },
  {
    title: "Guidelines",
    description: "Parking, etiquette, dogs, privacy.",
    href: "/guidelines",
    icon: ShieldCheck,
  },
  {
    title: "History",
    description: "Care, floods, protection.",
    href: "/history",
    icon: ScrollText,
  },
];

type HomePageClientProps = {
  hasTrailVideo: boolean;
};

export function HomePageClient({ hasTrailVideo }: HomePageClientProps) {
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
      <main className="rr-body flex flex-col">
        <HomeHero />

        <motion.section
          id="today-at-rock-river"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="rr-section mx-auto w-full max-w-6xl scroll-mt-28 px-4 sm:px-6 lg:px-8"
        >
          <div className="rr-glass-strong p-7 sm:p-9">
            <header className="mb-8 max-w-lg sm:mb-10">
              <SectionEyebrow icon={CloudSun}>Now</SectionEyebrow>
              <h2 className="rr-h2 mt-3 max-w-[18ch]">Conditions</h2>
              <p className="rr-lead mt-3 max-w-md">
                Weather, river, crowd.{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  More
                </Link>
              </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
              <WeatherWidget />
              <RiverWidget />
              <div className="sm:col-span-2">
                <CrowdWidget />
              </div>
            </div>
          </div>
        </motion.section>

        <HomeGuide />

        <HomeMapOverview />

        <HomeTrailTour videoAvailable={hasTrailVideo} />

        <HomeQuickLinks links={quickLinks} />
        <HomeVermontView />
        <HomeRiverPhotos />
      </main>
      <SiteFooter />
    </>
  );
}
