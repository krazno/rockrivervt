"use client";

import { motion } from "motion/react";
import { Film, Footprints } from "lucide-react";

import { HomeSectionHeader } from "@/components/home/home-section-header";
import { getTrailTourVideo } from "@/data/media";

type HomeTrailTourProps = {
  /** False when the MP4 is not deployed in `public/` (e.g. gitignored large file). */
  videoAvailable: boolean;
};

export function HomeTrailTour({ videoAvailable }: HomeTrailTourProps) {
  const video = getTrailTourVideo();

  if (!video || !videoAvailable) return null;

  return (
    <section className="w-full" aria-labelledby="trail-tour-heading">
      <HomeSectionHeader
        eyebrow="Trail tour"
        icon={Footprints}
        id="trail-tour-heading"
        title="Full walkthrough"
        titleClassName="text-[#1F2A24] font-bold"
        eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
        eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
        description={
          <>
            One continuous pass—useful if you’ve never been. Pair it with{" "}
            <a
              href="/conditions"
              className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
            >
              conditions
            </a>{" "}
            and the map.
          </>
        }
        className="mb-8 max-w-2xl sm:mb-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-2xl border border-[#E2E0D8] bg-white shadow-sm"
      >
        <div className="flex items-center gap-3 border-b border-[#E2E0D8] bg-[#F6F4EF]/40 px-6 py-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8] bg-white text-[#4F6B52] shadow-sm">
            <Film className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-[#1F2A24]">{video.title}</span>
        </div>
        <div className="px-6 pb-6 pt-5">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E2E0D8] bg-[#1F2A24] shadow-sm">
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
        </div>
      </motion.div>
    </section>
  );
}
