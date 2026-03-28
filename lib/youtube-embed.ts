/**
 * YouTube iframe embed helpers (Shorts use the same /embed/ ID as watch URLs).
 */

export function buildYoutubeEmbedSrc(
  videoId: string,
  opts: {
    autoplay?: boolean;
    mute?: boolean;
    loop?: boolean;
    controls?: boolean;
  } = {},
): string {
  const { autoplay = false, mute = false, loop = false, controls = true } =
    opts;
  const p = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    controls: controls ? "1" : "0",
  });
  if (loop) {
    p.set("loop", "1");
    p.set("playlist", videoId);
  }
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${p}`;
}

export function youtubeThumbnailUrl(videoId: string, quality: "max" | "hq" = "max"): string {
  const name = quality === "max" ? "maxresdefault" : "hqdefault";
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/${name}.jpg`;
}
