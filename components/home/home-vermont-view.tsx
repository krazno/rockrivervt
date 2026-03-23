"use client";

import { Trees } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { getHomeVermontBandPhoto } from "@/data/media";

export function HomeVermontView() {
  const photo = getHomeVermontBandPhoto();

  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-5 max-w-2xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          <Trees className="h-3.5 w-3.5" aria-hidden />
          Forest & river
        </p>
        <h2 className="font-heading mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Light on the water
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-white/60">
          Woods and trail along Rock River—local photography, not stock.
        </p>
      </div>
      <figure className="reveal-up overflow-hidden rounded-3xl border border-white/12 bg-[#0a1210] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/35">
        <span className="relative block h-64 w-full sm:h-72 lg:h-80">
          <MediaImage
            src={photo.thumbnailSrc ?? photo.src}
            alt={photo.alt}
            title={photo.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover object-center"
          />
        </span>
        <figcaption className="sr-only">{photo.alt}</figcaption>
      </figure>
    </section>
  );
}
