"use client";

import { MediaImage } from "@/components/MediaImage";
import { getHomeVermontBandPhoto } from "@/data/media";

export function HomeVermontView() {
  const photo = getHomeVermontBandPhoto();

  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8" aria-label="River scene">
      <figure className="reveal-up overflow-hidden rounded-2xl border border-[#E2E0D8] bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md">
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
