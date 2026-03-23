"use client";

import Link from "next/link";

import { MediaImage } from "@/components/MediaImage";
import { getHomeRiverStripePhotos } from "@/data/media";

export function HomeRiverPhotos() {
  const riverPhotos = getHomeRiverStripePhotos();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
            From the banks
          </p>
          <h2 className="font-heading mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
            River photos
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60">
            Honest light on Rock River and the Newfane area—see the full{" "}
            <Link
              href="/gallery"
              className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
            >
              gallery
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {riverPhotos.map((photo, index) => (
          <figure
            key={photo.src}
            className="reveal-up overflow-hidden rounded-2xl border border-white/10 bg-[#0a1210] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/35 hover:shadow-[0_22px_70px_-55px_rgba(62,207,142,0.25)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span className="relative block h-52 w-full overflow-hidden bg-[#0d1815]">
              <MediaImage
                src={photo.thumbnailSrc ?? photo.src}
                alt={photo.alt}
                title={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 hover:scale-[1.04]"
              />
            </span>
            <figcaption className="px-3 py-2 text-xs text-white/50">
              {photo.title} — Rock River VT
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
