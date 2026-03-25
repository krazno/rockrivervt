/** Full trail walk on YouTube — linked from the homepage map row. */
export const ROCK_RIVER_TRAIL_YOUTUBE_ID = "xtlnzIW3B5k";

export const ROCK_RIVER_TRAIL_YOUTUBE_URL = `https://www.youtube.com/watch?v=${ROCK_RIVER_TRAIL_YOUTUBE_ID}`;

/**
 * youtube-nocookie embed with muted autoplay (allowed after load; may require user gesture on strict browsers).
 */
export function rockRiverTrailEmbedSrc(opts?: { autoplay?: boolean }): string {
  const id = ROCK_RIVER_TRAIL_YOUTUBE_ID;
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (opts?.autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
    params.set("loop", "1");
    params.set("playlist", id);
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}
