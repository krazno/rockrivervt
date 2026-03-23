"use client";

import { motion } from "motion/react";
import { Film, Trees } from "lucide-react";

import { getTrailTourVideo } from "@/data/media";

export function HomeTrailTour() {
  const video = getTrailTourVideo();

  if (!video) return null;

  return (
    <section
      className="rr-section relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="trail-tour-heading"
    >
      <div
        className="pointer-events-none absolute -left-8 top-8 hidden h-40 w-40 rounded-full bg-[#2a4a58]/18 blur-3xl lg:block"
        aria-hidden
      />
      <div className="mb-8 max-w-2xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          <Trees className="h-3.5 w-3.5" aria-hidden />
          Trail tour
        </p>
        <h2
          id="trail-tour-heading"
          className="font-heading mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Full walkthrough
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          One continuous pass—useful if you’ve never been. Pair it with{" "}
          <a
            href="/conditions"
            className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
          >
            current conditions
          </a>{" "}
          and the map.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[var(--rr-radius-xl)] border border-white/12 bg-[#070c0a] shadow-[var(--rr-shadow-card)] ring-1 ring-white/[0.06]"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.08] bg-black/50 px-4 py-3 backdrop-blur-sm">
          <Film className="h-4 w-4 text-[var(--rr-mint)]" aria-hidden />
          <span className="text-xs font-medium text-white/80">{video.title}</span>
        </div>
        <div className="relative aspect-video w-full overflow-hidden bg-[#050807]">
          <video
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
            className="absolute inset-0 h-full w-full object-cover"
            title={video.title}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </section>
  );
}
