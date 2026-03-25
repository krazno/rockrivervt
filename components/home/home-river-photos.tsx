"use client";

import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { getHomeRiverStripePhotos } from "@/data/media";

export function HomeRiverPhotos() {
  const riverPhotos = getHomeRiverStripePhotos();

  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <SectionEyebrow icon={ImageIcon}>Photos</SectionEyebrow>
          <h2 className="rr-h2 mt-3">
            <Link
              href="/gallery"
              className="text-[var(--rr-ink)] underline-offset-4 transition hover:text-[var(--rr-link)] hover:underline"
            >
              Gallery
            </Link>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {riverPhotos.map((photo, index) => (
          <figure
            key={photo.src}
            className="reveal-up rr-surface overflow-hidden rounded-[1.15rem] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--rr-shadow-card-hover)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span className="relative block h-52 w-full overflow-hidden bg-[#e8e4db]">
              <MediaImage
                src={photo.thumbnailSrc ?? photo.src}
                alt={photo.alt}
                title={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 hover:scale-[1.03]"
              />
            </span>
            <figcaption className="sr-only">{photo.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
