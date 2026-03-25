"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Film, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { InteractiveMap } from "@/components/map/interactive-map";
import {
  ROCK_RIVER_TRAIL_YOUTUBE_URL,
  rockRiverTrailEmbedSrc,
} from "@/lib/youtube";

export function HomeMapOverview() {
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
    const h = Math.min(Math.floor(window.innerHeight * 0.72), 640);
    setModalMapHeight(Math.max(420, h));
  }, [mapOpen]);

  const embedSrc = rockRiverTrailEmbedSrc({ autoplay: true });

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-label="Map and trail video"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="rr-glass-strong overflow-hidden shadow-[var(--rr-shadow-card)]">
          <div className="border-b border-[var(--rr-widget-border)] px-5 py-4 sm:px-6 sm:py-5">
            <h3 className="font-heading text-base font-semibold text-[var(--rr-ink)] sm:text-[1.05rem]">
              Map
            </h3>
          </div>
          <div className="bg-[#f0ebe6]/80 px-4 py-5 sm:px-6 sm:py-6">
            <InteractiveMap
              mode="preview"
              height={360}
              showLegend
              showControls
              geoJsonUrl="/geo/map.geojson"
              tone="light"
              ariaLabel="Rock River area map preview"
            />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 px-5 py-2.5 text-sm font-medium text-[var(--rr-link)] shadow-sm transition hover:border-[var(--rr-glow)]/35 hover:bg-[#f5f2eb]"
              >
                <Maximize2 className="h-4 w-4 opacity-90" aria-hidden />
                Expand
              </button>
              <Link
                href="/map"
                className="text-center text-sm font-medium text-[var(--rr-link)] underline-offset-2 transition hover:text-[var(--rr-ink)] hover:underline sm:text-left"
              >
                Full page →
              </Link>
            </div>
          </div>
        </div>

        <div className="rr-glass-strong overflow-hidden shadow-[var(--rr-shadow-card)]">
          <div className="flex items-center gap-2 border-b border-[var(--rr-widget-border)] px-5 py-4 sm:px-6 sm:py-5">
            <Film className="h-4 w-4 shrink-0 text-[var(--rr-forest)]" aria-hidden />
            <h3 className="font-heading text-base font-semibold text-[var(--rr-ink)] sm:text-[1.05rem]">
              Trail
            </h3>
          </div>
          <div className="border-t border-[var(--rr-widget-border)] bg-[#f4f1ea] px-3 py-4 sm:px-5 sm:py-5">
            <div className="relative aspect-video w-full overflow-hidden rounded-[var(--rr-radius-lg)] border border-[var(--rr-widget-border)] bg-white shadow-[var(--rr-shadow-card)]">
              <iframe
                title="Rock River full trail walk on YouTube"
                src={embedSrc}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-center text-[11px] text-[var(--rr-text-muted)] sm:text-xs">
              <a
                href={ROCK_RIVER_TRAIL_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Open on YouTube
              </a>
            </p>
          </div>
        </div>
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
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
