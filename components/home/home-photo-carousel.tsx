"use client";

import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { getHomePhotoCarouselPhotos } from "@/data/media";

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
        </div>
        <Link
          href="/gallery"
          className="text-sm font-medium text-[#4F6B52] underline-offset-4 hover:underline"
        >
          Open full gallery
        </Link>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="w-[min(78vw,280px)] shrink-0 snap-start sm:w-[260px]"
          >
            <div className="relative h-44 overflow-hidden rounded-[1rem] bg-[#e8e4db] shadow-[0_8px_24px_rgba(31,42,36,0.12)] sm:h-52">
              <MediaImage
                src={photo.thumbnailSrc ?? photo.src}
                alt={photo.alt}
                title={photo.title}
                fill
                sizes="(max-width: 640px) 78vw, 260px"
                className="object-cover"
              />
            </div>
            <figcaption className="sr-only">{photo.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
