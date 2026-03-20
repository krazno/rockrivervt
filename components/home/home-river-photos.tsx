"use client";

import Image from "next/image";

type RiverPhoto = {
  src: string;
  alt: string;
  credit: string;
};

type HomeRiverPhotosProps = {
  riverPhotos: RiverPhoto[];
};

export function HomeRiverPhotos({ riverPhotos }: HomeRiverPhotosProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
          River photos
        </h2>
        <p className="mt-1 text-sm text-[#4f6d63]">
          A visual feel for Rock River moods and nearby Vermont terrain.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {riverPhotos.map((photo, index) => (
          <figure
            key={photo.src}
              className="reveal-up overflow-hidden rounded-2xl border border-[#c7d4cb] bg-[#f2f5f1] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_22px_70px_-55px_rgba(24,49,43,0.65)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1200}
              height={800}
              unoptimized
                className="h-52 w-full object-cover transition duration-500 hover:scale-[1.04]"
            />
            <figcaption className="px-3 py-2 text-xs text-[#56756a]">
              Photo source: {photo.credit}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

