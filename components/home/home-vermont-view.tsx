"use client";

import { Trees } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { getHomeVermontBandPhoto } from "@/data/media";

export function HomeVermontView() {
  const photo = getHomeVermontBandPhoto();

  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-7 max-w-2xl">
        <SectionEyebrow icon={Trees}>Forest & river</SectionEyebrow>
        <h2 className="rr-h2 mt-3">Light on the water</h2>
        <p className="rr-lead mt-3">
          Woods and trail along Rock River—local photography, not stock.
        </p>
      </div>
      <figure className="reveal-up rr-surface overflow-hidden rounded-[1.35rem] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--rr-shadow-card-hover)]">
        <span className="relative block h-64 w-full sm:h-72 lg:h-[22rem]">
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
