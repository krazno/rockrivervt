"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Film, MapPinned, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { HomeSectionHeader } from "@/components/home/home-section-header";
import { InteractiveMap } from "@/components/map/interactive-map";
import { RockRiverTrailYoutubeEmbed } from "@/components/home/rock-river-trail-youtube";
import { trackRrInteraction } from "@/lib/analytics";

type HomeMapOverviewProps = {
  /** When false, map-only layout (trail film on trail page). */
  includeTrailFilm?: boolean;
};

export function HomeMapOverview({ includeTrailFilm = false }: HomeMapOverviewProps) {
  const [mapOpen, setMapOpen] = useState(false);
  const [modalMapHeight, setModalMapHeight] = useState(560);

  useEffect(() => {
    if (!mapOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mapOpen]);

  useEffect(() => {
    if (!mapOpen) return;
    const id = requestAnimationFrame(() => {
      const h = Math.min(Math.floor(window.innerHeight * 0.72), 640);
      setModalMapHeight(Math.max(420, h));
    });
    return () => cancelAnimationFrame(id);
  }, [mapOpen]);

  const headerDescription: ReactNode =
    includeTrailFilm ?
      "Interactive map and a short trail film—pins show parking (most pull-offs along Route 30 on the Dummerston side), trail, and beaches. Expand for detail or open the full map page."
    : (
        <>
          Interactive map—expand for detail or open the full map page. Short trail film and full
          walkthrough:{" "}
          <Link
            href="/rock-river-trail-vermont#trail-film"
            className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
          >
            Rock River trail Vermont
          </Link>{" "}
          page.
        </>
      );

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="map-trail-overview-heading"
    >
      <HomeSectionHeader
        eyebrow="Find your way"
        icon={MapPinned}
        id="map-trail-overview-heading"
        title="Map & trail"
        description={headerDescription}
        descriptionClassName="text-[#6B6F68]"
        titleClassName="text-[#1F2A24] font-bold"
        eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
        eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
        className="mb-8 sm:mb-10"
      />
      <div
        className={
          includeTrailFilm ?
            "rr-home-band rr-home-band--mist grid grid-cols-1 gap-6 border border-[#E2E0D8]/75 p-3 sm:p-4 md:grid-cols-2 md:items-stretch md:gap-6 md:p-5"
          : "rr-home-band rr-home-band--mist grid grid-cols-1 gap-6 border border-[#E2E0D8]/75 p-3 sm:p-4 md:p-5"
        }
      >
        <div className="rr-interactive-lift flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E2E0D8]/85 bg-white/95 shadow-[var(--rr-shadow-card-soft)]">
          <div className="flex shrink-0 items-center gap-3 border-b border-[#E2E0D8] px-6 py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8] bg-[#F6F4EF] text-[#4F6B52]">
              <MapPinned className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#1F2A24] sm:text-xl">Map</h3>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B6F68]">
                Preview · expand or open full page
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-6 bg-[#F6F4EF]/35 px-6 py-6">
            <InteractiveMap
              mode="preview"
              height={340}
              showLegend
              showControls
              geoJsonUrl="/geo/map.geojson"
              tone="light"
              ariaLabel="Rock River area map preview"
              analyticsSurface="home_preview"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  trackRrInteraction("map", "home_expand_modal");
                  setMapOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E0D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#4F6B52] shadow-sm transition hover:border-[#4F6B52]/35 hover:bg-[#F6F4EF]"
              >
                <Maximize2 className="h-4 w-4 opacity-90" aria-hidden />
                Expand
              </button>
              <Link
                href="/map"
                onClick={() => trackRrInteraction("map", "home_full_map_link")}
                className="text-center text-sm font-semibold text-[#4F6B52] underline-offset-2 transition hover:text-[#1F2A24] hover:underline sm:text-left"
              >
                Full page →
              </Link>
            </div>
          </div>
        </div>

        {includeTrailFilm ?
          <div className="rr-interactive-lift flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E2E0D8]/85 bg-white/95 shadow-[var(--rr-shadow-card-soft)]">
            <div className="flex shrink-0 items-center gap-3 border-b border-[#E2E0D8] px-6 py-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8] bg-[#F6F4EF] text-[#4F6B52]">
                <Film className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1F2A24] sm:text-xl">Trail</h3>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B6F68]">
                  Short film · YouTube
                </p>
              </div>
            </div>
            <RockRiverTrailYoutubeEmbed autoplay />
          </div>
        : null}
      </div>

      <AnimatePresence>
        {mapOpen ? (
          <motion.div
            key="map-modal"
            className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              type="button"
              aria-label="Close map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#2c2a26]/35 backdrop-blur-sm"
              onClick={() => setMapOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Expanded map"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="relative z-10 flex max-h-[min(92dvh,820px)] w-full max-w-5xl flex-col overflow-hidden rounded-[var(--rr-radius-xl)] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] shadow-[0_24px_80px_-32px_rgba(42,38,32,0.18)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--rr-widget-border)] px-4 py-3 sm:px-5">
                <p className="text-sm font-semibold text-[var(--rr-ink)]">Rock River area</p>
                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4] text-[var(--rr-text)] transition hover:bg-[#f5f2eb]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden bg-[#f0ebe6]/70 p-3 sm:p-4">
                <InteractiveMap
                  key="modal-map"
                  mode="full"
                  height={modalMapHeight}
                  showLegend
                  showControls
                  geoJsonUrl="/geo/map.geojson"
                  tone="light"
                  ariaLabel="Rock River area map expanded"
                  analyticsSurface="home_modal"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
