"use client";

import { MediaImage } from "@/components/MediaImage";
import { getHomeClosingPhoto } from "@/data/media";

export function HomeFinalImage() {
  const photo = getHomeClosingPhoto();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <figure className="reveal-up overflow-hidden rounded-3xl border border-white/12 bg-[#0a1210] shadow-[0_24px_90px_-40px_rgba(0,0,0,0.85)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/35">
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
        <figcaption className="border-t border-white/10 bg-black/40 px-4 py-2 text-xs text-white/55 backdrop-blur">
          {photo.title} — Rock River near Newfane, Vermont
        </figcaption>
      </figure>
    </section>
  );
}
