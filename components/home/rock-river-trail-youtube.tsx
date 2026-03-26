"use client";

import {
  ROCK_RIVER_TRAIL_YOUTUBE_URL,
  rockRiverTrailEmbedSrc,
} from "@/lib/youtube";

type RockRiverTrailYoutubeEmbedProps = {
  /** When true, matches the homepage embed behavior. */
  autoplay?: boolean;
};

export function RockRiverTrailYoutubeEmbed({
  autoplay = false,
}: RockRiverTrailYoutubeEmbedProps) {
  const embedSrc = rockRiverTrailEmbedSrc({ autoplay });

  return (
    <div className="flex flex-1 flex-col justify-between gap-4 bg-[#F6F4EF]/35 px-6 py-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E2E0D8] bg-white shadow-sm">
        <iframe
          title="Rock River full trail walk on YouTube"
          src={embedSrc}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="text-center text-[10px] font-medium text-[#6B6F68] sm:text-xs">
        <a
          href={ROCK_RIVER_TRAIL_YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
        >
          Open on YouTube
        </a>
      </p>
    </div>
  );
}
