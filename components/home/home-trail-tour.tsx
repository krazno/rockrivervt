"use client";

import { motion } from "motion/react";
import { Film, Footprints } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
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
        className="pointer-events-none absolute -left-8 top-8 hidden h-44 w-44 rounded-full bg-[#7a9a8e]/20 blur-3xl lg:block"
        aria-hidden
      />
      <div className="mb-9 max-w-2xl">
        <SectionEyebrow icon={Footprints}>Trail tour</SectionEyebrow>
        <h2 id="trail-tour-heading" className="rr-h2 mt-3">
          Full walkthrough
        </h2>
        <p className="rr-lead mt-3 max-w-xl">
          One continuous pass—useful if you’ve never been. Pair it with{" "}
          <a
            href="/conditions"
            className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
          >
            conditions
          </a>{" "}
          and the map.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rr-surface overflow-hidden rounded-[var(--rr-radius-xl)]"
      >
        <div className="flex items-center gap-2.5 border-b border-[var(--rr-widget-border)] bg-gradient-to-r from-[#f7f4ed] to-transparent px-5 py-3.5">
          <Film className="h-4 w-4 text-[var(--rr-forest)]" aria-hidden />
          <span className="text-xs font-medium text-[var(--rr-ink)]">{video.title}</span>
        </div>
        <div className="relative aspect-video w-full overflow-hidden bg-[#2a2824]">
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
