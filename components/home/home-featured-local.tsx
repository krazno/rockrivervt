"use client";

import { Trees } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
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
      className="relative flex h-full min-h-[220px] flex-col items-center justify-center bg-gradient-to-br from-[#ebe6dc] via-[#dde5df] to-[#d0d8d0] px-6 py-10 sm:min-h-[280px]"
      role="region"
      aria-label={`${name} photograph — coming soon`}
    >
      <Trees
        className="h-16 w-16 text-[var(--rr-forest)]/35 sm:h-20 sm:w-20"
        strokeWidth={1}
        aria-hidden
        focusable="false"
      />
      <p className="mt-4 max-w-[14rem] text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--rr-text-muted)]">
        Portrait soon
      </p>
      <p className="mt-2 max-w-[15rem] text-center text-[12px] leading-relaxed text-[var(--rr-text-muted)]">
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
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="featured-local-heading"
    >
      <header className="mb-7 max-w-2xl sm:mb-8">
        <SectionEyebrow icon={Trees}>{spotlight.sectionEyebrow}</SectionEyebrow>
        <h2 id="featured-local-heading" className="rr-h2 mt-3">
          {spotlight.sectionTitle}
        </h2>
      </header>

      <article className="rr-surface overflow-hidden rounded-[1.35rem]">
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

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 border-t border-[var(--rr-widget-border)] p-6 sm:gap-3.5 sm:p-8 md:border-l md:border-t-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--rr-mint)]">
              {spotlight.cardRibbon}
            </p>

            <div className="flex flex-wrap items-center gap-2 gap-y-2">
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-[var(--rr-ink)] sm:text-[1.65rem]">
                {spotlight.displayName}
              </h3>
              <span
                className={cn(
                  "inline-flex rounded-full border border-[var(--rr-widget-border)] bg-[#f5f2eb] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--rr-link)]",
                )}
              >
                {spotlight.categoryBadge}
              </span>
            </div>

            <div className="space-y-2.5 text-[13px] leading-relaxed text-[var(--rr-text-muted)] sm:text-sm">
              <p>{spotlight.bioSentences[0]}</p>
              <p>{spotlight.bioSentences[1]}</p>
            </div>

            <p className="pt-1 text-[11px] leading-snug text-[var(--rr-text-muted)]/90">
              We’ll swap this spotlight now and then—another face, another thread in the
              river’s story.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
