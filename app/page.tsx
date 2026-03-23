"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  CloudSun,
  Footprints,
  Leaf,
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
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
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
          <div className="rr-glass overflow-hidden p-7 sm:p-9">
            <div className="max-w-2xl">
              <SectionEyebrow icon={Leaf}>Care</SectionEyebrow>
              <h2 className="rr-h2 mt-3">Stewardship</h2>
              <p className="rr-lead mt-4">
                Pack it out, leave space for others. Signed clothing-optional areas.{" "}
                <Link
                  href="/guidelines"
                  className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                >
                  Guidelines
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
