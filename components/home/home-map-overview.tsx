"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { InteractiveMap } from "@/components/map/interactive-map";

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

  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="rr-glass-strong overflow-hidden shadow-[var(--rr-shadow-card)]">
        <div className="border-b border-white/[0.08] px-5 py-6 sm:px-8 sm:py-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
            Orient
          </p>
          <h2 className="font-heading mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Rock River map
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
            Parking, trails, beaches, and the river—tap features for detail. Expand for
            a larger canvas.
          </p>
        </div>
        <div className="bg-[#050a08]/40 px-4 py-5 sm:px-6 sm:py-6">
          <InteractiveMap
            mode="preview"
            height={360}
            showLegend
            showControls
            geoJsonUrl="/geo/map.geojson"
            tone="dark"
            ariaLabel="Rock River area map preview"
          />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--rr-glow)]/35 bg-[var(--rr-glow)]/12 px-5 py-2.5 text-sm font-medium text-[var(--rr-mint)] transition hover:bg-[var(--rr-glow)]/20"
            >
              <Maximize2 className="h-4 w-4 opacity-90" aria-hidden />
              Expand map
            </button>
            <Link
              href="/map"
              className="text-center text-sm font-medium text-white/45 transition hover:text-white/70 sm:text-left"
            >
              Open full page →
            </Link>
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
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
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
              className="relative z-10 flex max-h-[min(92dvh,820px)] w-full max-w-5xl flex-col overflow-hidden rounded-[var(--rr-radius-xl)] border border-white/12 bg-[#070f0d] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-5">
                <p className="text-sm font-medium text-white/90">Rock River area</p>
                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition hover:bg-white/[0.09]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden p-3 sm:p-4">
                <InteractiveMap
                  key="modal-map"
                  mode="full"
                  height={modalMapHeight}
                  showLegend
                  showControls
                  geoJsonUrl="/geo/map.geojson"
                  tone="dark"
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
