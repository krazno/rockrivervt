"use client";

import { MediaImage } from "@/components/MediaImage";
import { getHomeClosingPhoto } from "@/data/media";

export function HomeFinalImage() {
  const photo = getHomeClosingPhoto();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <figure className="reveal-up overflow-hidden rounded-3xl border border-[#c8d6cb] bg-[#e6eee7] shadow-[0_18px_50px_-30px_rgba(23,45,36,0.6)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_28px_90px_-55px_rgba(23,45,36,0.75)]">
        <span className="relative block h-[44svh] min-h-[290px] w-full sm:h-[50svh] lg:h-[56svh]">
          <MediaImage
            src={photo.src}
            alt={photo.alt}
            title={photo.title}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </span>
        <figcaption className="border-t border-[#c6d3ca] bg-[#f2f5f1] px-4 py-2 text-xs text-[#4f6f63]">
          {photo.title} — Rock River near Newfane, Vermont
        </figcaption>
      </figure>
    </section>
  );
}

