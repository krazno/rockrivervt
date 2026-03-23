"use client";

import { MediaImage } from "@/components/MediaImage";
import { getHomeVermontBandPhoto } from "@/data/media";

export function HomeVermontView() {
  const photo = getHomeVermontBandPhoto();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          Still moment
        </p>
        <h2 className="font-heading mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Along the river
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-white/60">
          A quiet frame of woods and water near Newfane—local photography, not stock.
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
        <figcaption className="border-t border-white/10 bg-black/40 px-4 py-2 text-xs text-white/55 backdrop-blur">
          {photo.title} — Rock River area, Vermont
        </figcaption>
      </figure>
    </section>
  );
}
