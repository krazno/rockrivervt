"use client";

import { Trees } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import {
  featuredLocalSpotlight,
  type FeaturedLocalSpotlight,
} from "@/data/featured-local";
import { cn } from "@/lib/utils";

type HomeFeaturedLocalProps = {
  spotlight?: FeaturedLocalSpotlight;
};

function ImagePlaceholder({ name }: { name: string }) {
  return (
    <div
      className="relative flex h-full min-h-[220px] flex-col items-center justify-center bg-gradient-to-br from-[#2a3830] via-[#3d4f44] to-[#2f3f36] px-6 py-10 sm:min-h-[280px]"
      role="region"
      aria-label={`${name} photograph — coming soon`}
    >
      <Trees
        className="h-16 w-16 text-[#c5d4c8]/20 sm:h-20 sm:w-20"
        strokeWidth={1}
        aria-hidden
        focusable="false"
      />
      <p className="mt-4 max-w-[14rem] text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#b8c9bf]/70">
        Portrait soon
      </p>
      <p className="mt-2 max-w-[15rem] text-center text-[12px] leading-relaxed text-[#d8e4dc]/55">
        A field image will sit here when we have one worth sharing.
      </p>
    </div>
  );
}

export function HomeFeaturedLocal({
  spotlight = featuredLocalSpotlight,
}: HomeFeaturedLocalProps) {
  const { image } = spotlight;

  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8"
      aria-labelledby="featured-local-heading"
    >
      <header className="mb-5 max-w-2xl sm:mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
          {spotlight.sectionEyebrow}
        </p>
        <h2
          id="featured-local-heading"
          className="mt-1.5 text-xl font-semibold tracking-tight text-[#1a2f27] sm:text-2xl"
        >
          {spotlight.sectionTitle}
        </h2>
      </header>

      <article className="overflow-hidden rounded-3xl border border-[#b8c9be] bg-[#f6f8f5] shadow-[0_16px_48px_-32px_rgba(24,49,43,0.38)] ring-1 ring-black/[0.03]">
        <div className="flex flex-col md:flex-row md:items-stretch">
          <div className="relative md:flex md:h-full md:w-[min(42%,20rem)] md:shrink-0 md:self-stretch lg:w-[min(40%,22rem)]">
            {image ? (
              <div className="relative aspect-[4/3] w-full min-h-[200px] md:absolute md:inset-0 md:aspect-auto md:min-h-[280px]">
                <MediaImage
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <ImagePlaceholder name={spotlight.displayName} />
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 border-t border-[#dce8df] p-5 sm:gap-3.5 sm:p-7 md:border-l md:border-t-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6d8a7e]">
              {spotlight.cardRibbon}
            </p>

            <div className="flex flex-wrap items-center gap-2 gap-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-[#1a2f27] sm:text-[1.65rem]">
                {spotlight.displayName}
              </h3>
              <span
                className={cn(
                  "inline-flex rounded-full border border-[#a8bdae] bg-[#eef4ef] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#3d5c50]",
                )}
              >
                {spotlight.categoryBadge}
              </span>
            </div>

            <div className="space-y-2.5 text-[13px] leading-relaxed text-[#3d5348] sm:text-sm">
              <p>{spotlight.bioSentences[0]}</p>
              <p>{spotlight.bioSentences[1]}</p>
            </div>

            <p className="pt-1 text-[11px] leading-snug text-[#6d8a7e]">
              We’ll swap this spotlight now and then—another face, another thread in the
              river’s story.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
