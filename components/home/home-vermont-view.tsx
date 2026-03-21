"use client";

import { MediaImage } from "@/components/MediaImage";
import { getHomeVermontBandPhoto } from "@/data/media";

export function HomeVermontView() {
  const photo = getHomeVermontBandPhoto();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
          Vermont view
        </h2>
        <p className="mt-1 text-sm text-[#4f6d63]">
          A calm slice of the river and woods near Newfane—not stock, just the real
          place.
        </p>
      </div>
      <figure className="reveal-up overflow-hidden rounded-3xl border border-[#c7d5cd] bg-[#eef4f2] shadow-[0_16px_44px_-30px_rgba(24,49,43,0.65)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_22px_70px_-55px_rgba(24,49,43,0.75)]">
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
        <figcaption className="border-t border-[#cbd8d1] bg-[#f4f7f5] px-4 py-2 text-xs text-[#4f6f63]">
          {photo.title} — Rock River area, Vermont
        </figcaption>
      </figure>
    </section>
  );
}

