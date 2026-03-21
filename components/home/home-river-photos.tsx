"use client";

import { MediaImage } from "@/components/MediaImage";
import { getHomeRiverStripePhotos } from "@/data/media";

export function HomeRiverPhotos() {
  const riverPhotos = getHomeRiverStripePhotos();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
          River photos
        </h2>
        <p className="mt-1 text-sm text-[#4f6d63]">
          Real scenes from Rock River and the Newfane area—same gallery as our full
          photo collection.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {riverPhotos.map((photo, index) => (
          <figure
            key={photo.src}
            className="reveal-up overflow-hidden rounded-2xl border border-[#c7d4cb] bg-[#f2f5f1] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_22px_70px_-55px_rgba(24,49,43,0.65)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span className="relative block h-52 w-full overflow-hidden bg-[#e4ebe4]">
              <MediaImage
                src={photo.thumbnailSrc ?? photo.src}
                alt={photo.alt}
                title={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 hover:scale-[1.04]"
              />
            </span>
            <figcaption className="px-3 py-2 text-xs text-[#56756a]">
              {photo.title} — Rock River VT
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

