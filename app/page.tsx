"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  Footprints,
  Gem,
  MapPin,
  ScrollText,
  ShieldCheck,
  Trees,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";

import { ContactSection } from "@/components/home/contact-section";
import { DailyWelcomeModal } from "@/components/home/daily-welcome-modal";
import { HomeFeaturedLocal } from "@/components/home/home-featured-local";
import { HomeHero } from "@/components/home/home-hero";
import { HomeInfoCards } from "@/components/home/home-info-cards";
import { HomeMapOverview } from "@/components/home/home-map-overview";
import { HomePhotoUpload } from "@/components/home/home-photo-upload";
import {
  HomeQuickLinks,
  type HomeQuickLinkItem,
} from "@/components/home/home-quick-links";
import { HomeRiverPhotos } from "@/components/home/home-river-photos";
import { HomeTrailTour } from "@/components/home/home-trail-tour";
import { HomeVermontView } from "@/components/home/home-vermont-view";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WeatherWidget } from "@/components/conditions/weather-widget";
import { RiverWidget } from "@/components/conditions/river-widget";
import { CrowdWidget } from "@/components/crowd/crowd-widget";

const SITE_URL = "https://rockrivervt.com";

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const quickLinks: HomeQuickLinkItem[] = [
    {
      title: "Discoveries",
      description: "Stones, seasons, wildlife—look without taking.",
      href: "/discoveries",
      icon: Gem,
    },
    {
      title: "Community",
      description: "Stewardship, legacy, how people hold this place.",
      href: "/community",
      icon: Users,
    },
    {
      title: "Resources",
      description: "Maps, links, planning—bookmark what you use.",
      href: "/resources",
      icon: BookOpen,
    },
    {
      title: "Local",
      description: "Towns, culture, welcoming spots—southern Vermont.",
      href: "/local",
      icon: MapPin,
    },
    {
      title: "Visit",
      description: "What to expect on the banks and the trail.",
      href: "/visit",
      icon: Footprints,
    },
    {
      title: "Land & River",
      description: "How this rocky corridor fits the valley.",
      href: "/land-river",
      icon: Trees,
    },
    {
      title: "Guidelines",
      description: "Parking, etiquette, dogs, privacy—plain language.",
      href: "/guidelines",
      icon: ShieldCheck,
    },
    {
      title: "History",
      description: "Grassroots care, floods, land protection.",
      href: "/history",
      icon: ScrollText,
    },
  ];

  /** Home-only: trail tour video (global WebSite / Organization / Place live in root layout). */
  const homeJsonLd = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <DailyWelcomeModal />
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
          <div className="rr-glass-strong p-6 sm:p-8">
            <header className="mb-7 max-w-lg sm:mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
                Now
              </p>
              <h2 className="font-heading mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Rock River conditions
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Weather, gauge read, how busy it feels.{" "}
                <Link
                  href="/conditions"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Full read
                </Link>
              </p>
            </header>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <WeatherWidget />
              <RiverWidget />
              <div className="sm:col-span-2">
                <CrowdWidget />
              </div>
            </div>
          </div>
        </motion.section>

        <HomeMapOverview />

        <HomeTrailTour />

        <HomeQuickLinks links={quickLinks} />
        <HomeVermontView />
        <HomeRiverPhotos />
        <HomePhotoUpload
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          photoInputRef={photoInputRef}
        />
        <HomeInfoCards />

        <HomeFeaturedLocal />

        <ContactSection />

        <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rr-glass overflow-hidden p-6 sm:p-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Stewardship
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/58 sm:text-[1.05rem]">
                This water stays special because people pack it out, keep voices low, and
                respect the mix of families, neighbors, queer visitors, and others who share
                the banks—including signed clothing-optional spots.{" "}
                <Link
                  href="/guidelines"
                  className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                >
                  Guidelines
                </Link>{" "}
                spell it out.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
