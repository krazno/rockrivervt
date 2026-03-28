"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

import { buildYoutubeEmbedSrc } from "@/lib/youtube-embed";

export type YoutubeShortMask = "circle" | "droplet";

type YoutubeShortClipProps = {
  videoId: string;
  /** Square frame; defaults to match home hero photo circle breakpoints. */
  dimensionClassName?: string;
  mask?: YoutubeShortMask;
  className?: string;
  /** Decorative embeds omit controls; gallery lightbox can enable them. */
  controls?: boolean;
  title: string;
};

/**
 * Muted, looping YouTube Short in a circle or teardrop mask. Vertical 9:16 is
 * scaled to cover so black bars stay outside the clip.
 */
export function YoutubeShortClip({
  videoId,
  dimensionClassName = "h-[7.5rem] w-[7.5rem] sm:h-[8.25rem] sm:w-[8.25rem] lg:h-[9rem] lg:w-[9rem]",
  mask = "droplet",
  className,
  controls = false,
  title,
}: YoutubeShortClipProps) {
  const uid = useId().replace(/:/g, "");
  const clipId = `rr-droplet-${uid}`;
  const src = buildYoutubeEmbedSrc(videoId, {
    autoplay: true,
    mute: true,
    loop: true,
    controls,
  });

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-[#5a7d72]",
        dimensionClassName,
        mask === "circle" && "rounded-full",
        className,
      )}
      style={{
        clipPath: mask === "droplet" ? `url(#${clipId})` : undefined,
      }}
    >
      {mask === "droplet" ? (
        <svg width={0} height={0} className="absolute" aria-hidden>
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.03 C0.74,0.03 0.94,0.24 0.94,0.5 C0.94,0.78 0.62,0.97 0.5,1 C0.38,0.97 0.06,0.78 0.06,0.5 C0.06,0.24 0.26,0.03 0.5,0.03 Z" />
            </clipPath>
          </defs>
        </svg>
      ) : null}
      <div className="pointer-events-none absolute inset-0">
        <iframe
          title={title}
          src={src}
          className="absolute left-1/2 top-1/2 w-full border-0"
          style={{
            height: "177.78%",
            transform: "translate(-50%, -50%) scale(1.06)",
            transformOrigin: "center",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

type YoutubeShortEmbedCoverProps = {
  videoId: string;
  title: string;
  className?: string;
  controls?: boolean;
  autoplay?: boolean;
  /** Start muted so autoplay is allowed; viewer can unmute in the player when controls are on. */
  muted?: boolean;
  loop?: boolean;
};

/**
 * Vertical short in a 9:16 frame; scales the embed so letterboxing stays outside the crop.
 */
export function YoutubeShortEmbedCover({
  videoId,
  title,
  className,
  controls = true,
  autoplay = true,
  muted = true,
  loop = true,
}: YoutubeShortEmbedCoverProps) {
  const src = buildYoutubeEmbedSrc(videoId, {
    autoplay,
    mute: muted,
    loop,
    controls,
  });

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-[#5a7d72] shadow-inner",
        className,
      )}
    >
      <div className="relative mx-auto aspect-[9/16] w-full max-w-sm sm:max-w-md">
        <iframe
          title={title}
          src={src}
          className="absolute left-1/2 top-1/2 w-full border-0"
          style={{
            height: "177.78%",
            transform: "translate(-50%, -50%) scale(1.06)",
            transformOrigin: "center",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

type YoutubeShortHeaderChipProps = {
  videoId: string;
  title: string;
};

/**
 * Tight 9:16 crop for the sticky header—vertical short scaled to cover (no letterboxing).
 */
export function YoutubeShortHeaderChip({ videoId, title }: YoutubeShortHeaderChipProps) {
  const src = buildYoutubeEmbedSrc(videoId, {
    autoplay: true,
    mute: true,
    loop: true,
    controls: false,
  });

  return (
    <div
      className="relative h-11 w-[24.75px] shrink-0 overflow-hidden rounded-md border border-[#dcd6cc]/90 bg-[#5a7d72] shadow-sm sm:h-12 sm:w-[27px]"
      title={`${title} — muted loop`}
    >
      <div className="pointer-events-none absolute inset-0">
        <iframe
          title={title}
          src={src}
          className="absolute left-1/2 top-1/2 w-full border-0"
          style={{
            height: "177.78%",
            transform: "translate(-50%, -50%) scale(1.06)",
            transformOrigin: "center",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    </div>
  );
}
