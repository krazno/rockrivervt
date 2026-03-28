"use client";

import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { getHomePhotoCarouselPhotos } from "@/data/media";
import { mailtoPhotoSubmission } from "@/lib/site";

export function HomePhotoCarousel() {
  const photos = getHomePhotoCarouselPhotos();

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="home-photo-carousel-heading"
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionEyebrow icon={ImageIcon} iconClassName="h-4 w-4 text-[#4F6B52]">
            Gallery
          </SectionEyebrow>
          <h2
            id="home-photo-carousel-heading"
            className="font-heading mt-2 text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.65rem]"
          >
            Photos from Rock River
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-snug text-[#6B6F68]">
            Field shots for context—email if you have one you’re happy to share (reviewed before it
            goes live).
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={mailtoPhotoSubmission()}
            className="text-sm font-medium text-[#4F6B52] underline-offset-4 hover:underline"
          >
            Send a photo
          </a>
          <Link
            href="/gallery"
            className="text-sm font-medium text-[#4F6B52] underline-offset-4 hover:underline"
          >
            Open full gallery
          </Link>
        </div>
      </div>

      <div className="rr-home-band rr-home-band--wide -mx-4 border border-[#E2E0D8]/70 px-4 pb-3 pt-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:pb-4 lg:pt-4">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:thin]">
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="w-[min(78vw,280px)] shrink-0 snap-start sm:w-[260px]"
          >
            <div className="rr-interactive-lift relative h-48 overflow-hidden rounded-[1rem] bg-[#e8e4db] shadow-[var(--rr-shadow-card-soft)] sm:h-56">
              <MediaImage
                src={photo.src}
                alt={photo.alt}
                title={photo.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1280px) 30vw, 320px"
                quality={88}
                className="object-cover"
              />
            </div>
            <figcaption className="sr-only">{photo.alt}</figcaption>
          </figure>
        ))}
      </div>
      </div>
    </section>
  );
}
