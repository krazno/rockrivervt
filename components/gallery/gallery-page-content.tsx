"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink, Instagram, Play, X } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { YoutubeShortEmbedCover } from "@/components/media/youtube-short-clip";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import type { MediaItem } from "@/data/media";
import { getGalleryMediaSorted } from "@/data/media";
import {
  GALLERY_GROUP_LABEL,
  galleryGroupForItem,
  type GalleryGroup,
} from "@/lib/gallery-group";
import { INSTAGRAM_ROCK_RIVER_LOCATION_URL, mailtoPhotoSubmission } from "@/lib/site";
import { cn } from "@/lib/utils";

const GROUP_ORDER: GalleryGroup[] = ["trail", "water", "other"];

function sortByOrder(a: MediaItem, b: MediaItem): number {
  return (a.order ?? 9999) - (b.order ?? 9999);
}

function GalleryImageTile({
  item,
  onOpen,
}: {
  item: MediaItem;
  onOpen: (item: MediaItem) => void;
}) {
  return (
    <figure className="flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group relative w-full overflow-hidden rounded-[var(--rr-radius-lg)] border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 text-left shadow-[var(--rr-shadow-card)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/30 hover:shadow-[var(--rr-shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/35"
      >
        <span className="relative block aspect-[4/3] w-full overflow-hidden bg-[#e8e4db]/70">
          <MediaImage
            src={item.thumbnailSrc ?? item.src}
            alt={item.alt}
            title={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </span>
        <span className="sr-only">{item.alt}</span>
      </button>
      <figcaption className="mt-2 line-clamp-3 text-left text-[11px] leading-snug text-[var(--rr-text-muted)] sm:text-xs">
        {item.alt}
      </figcaption>
    </figure>
  );
}

export function GalleryPageContent() {
  const galleryMedia = useMemo(() => getGalleryMediaSorted(), []);
  const [active, setActive] = useState<MediaItem | null>(null);

  const { videoItems, imagesByGroup, instaPreview } = useMemo(() => {
    const videos = galleryMedia.filter((m) => m.type === "video").sort(sortByOrder);
    const images = galleryMedia.filter((m) => m.type === "image").sort(sortByOrder);
    const byGroup: Record<GalleryGroup, MediaItem[]> = {
      trail: [],
      water: [],
      other: [],
    };
    for (const img of images) {
      byGroup[galleryGroupForItem(img)].push(img);
    }
    return {
      videoItems: videos,
      imagesByGroup: byGroup,
      instaPreview: images.slice(0, 6),
    };
  }, [galleryMedia]);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  const openItem = useCallback((item: MediaItem) => setActive(item), []);

  return (
    <>
      <SiteHeader />
      <main className="rr-body pb-20 text-[var(--rr-text)]">
        <Container className="py-10 sm:py-12">
          <header className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6B6F68]">
              Photos &amp; video
            </p>
            <h1 className="font-heading mt-2 text-[clamp(1.85rem,3vw+1rem,2.55rem)] font-bold tracking-tight text-[var(--rr-ink)]">
              Rock River Vermont in pictures
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#3f4840] sm:text-lg">
              Still images are grouped loosely by what dominates the frame—woods and trail, or
              water and stone—so you can set expectations before you visit. Alt text doubles as a
              caption; tap any still to enlarge.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--rr-text-muted)]">
              Seasons change light and foliage faster than we re-sort files—use these images as a
              mood board, not a weather forecast.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--rr-text-muted)]" id="share-photos">
              Have a shot you’re willing to share?{" "}
              <a
                href={mailtoPhotoSubmission()}
                className="font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Email it for the gallery
              </a>
              —we review before adding anything to this page.
            </p>
            <p className="mt-5 text-sm text-[var(--rr-text-muted)]">
              <Link
                href="/visit"
                className="font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Visit
              </Link>
              {" · "}
              <Link
                href="/map"
                className="font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Map
              </Link>
              {" · "}
              <Link
                href="/conditions"
                className="font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>
              {" · "}
              <Link
                href="/guidelines"
                className="font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Guidelines
              </Link>
            </p>
          </header>

          <section
            className="mt-12 rounded-2xl border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 p-6 shadow-[var(--rr-shadow-card)] sm:p-8"
            aria-labelledby="instagram-community-heading"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
              <div className="max-w-xl">
                <p
                  id="instagram-community-heading"
                  className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--rr-mint)]"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden />
                  Instagram
                </p>
                <h2 className="font-heading mt-2 text-lg font-semibold text-[var(--rr-ink)] sm:text-xl">
                  Rock River VT on Instagram
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--rr-text-muted)]">
                  Meta doesn’t offer a simple way to embed the live location page here without their
                  Graph API and app review—so we link straight out. Below are a few stills from this
                  site’s gallery while you’re here.
                </p>
                <a
                  href={INSTAGRAM_ROCK_RIVER_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--rr-forest)] bg-[var(--rr-forest)] px-5 py-2.5 text-sm font-semibold text-[#faf8f4] shadow-sm transition hover:bg-[#3d4a3d]"
                >
                  Open location feed
                  <ExternalLink className="h-3.5 w-3.5 opacity-90" aria-hidden />
                </a>
              </div>
              {instaPreview.length > 0 ? (
                <ul
                  className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3 lg:w-[min(100%,24rem)]"
                  role="list"
                  aria-label="Sample photos from this site’s gallery"
                >
                  {instaPreview.map((item) => (
                    <li key={`insta-prev-${item.src}`}>
                      <button
                        type="button"
                        onClick={() => setActive(item)}
                        className="group relative aspect-square w-full overflow-hidden rounded-lg border border-[var(--rr-widget-border)] bg-[#e8e4db]/80 shadow-sm transition hover:border-[var(--rr-glow)]/35 hover:shadow-md"
                      >
                        <MediaImage
                          src={item.thumbnailSrc ?? item.src}
                          alt={item.alt}
                          title={item.title}
                          fill
                          sizes="120px"
                          className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                        />
                        <span className="sr-only">{item.alt}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>

          {videoItems.length > 0 ? (
            <section className="mt-12" aria-labelledby="gallery-video-heading">
              <h2
                id="gallery-video-heading"
                className="font-heading text-xl font-semibold text-[var(--rr-ink)] sm:text-2xl"
              >
                Trail tour &amp; clips
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--rr-text-muted)]">
                Video gives length and elevation change that stills cannot—use it beside the{" "}
                <Link href="/map" className="font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline">
                  map
                </Link>{" "}
                when you are planning footwear and time on the trail. Short clips may live on YouTube;
                they open in an embedded player here (no account required).
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-1" role="list">
                {videoItems.map((item) => (
                  <li key={item.src}>
                    <div className="overflow-hidden rounded-[var(--rr-radius-lg)] border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 shadow-[var(--rr-shadow-card)]">
                      <div className="border-b border-[var(--rr-widget-border)] px-4 py-3 sm:px-5">
                        <p className="text-sm font-semibold text-[var(--rr-ink)]">{item.title}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[var(--rr-text-muted)]">
                          {item.alt}
                        </p>
                        {item.youtubeId ? (
                          <a
                            href={item.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
                          >
                            Open on YouTube
                            <ExternalLink className="h-3 w-3 opacity-80" aria-hidden />
                          </a>
                        ) : null}
                      </div>
                      {item.youtubeId && item.thumbnailSrc ? (
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          className="group relative mx-auto flex w-full max-w-xs justify-center bg-[#5a7d72]/25 px-4 py-6 sm:max-w-sm"
                        >
                          <span className="relative aspect-[9/16] w-[min(100%,220px)] overflow-hidden rounded-2xl border border-[var(--rr-widget-border)] shadow-md ring-2 ring-white/30">
                            <MediaImage
                              src={item.thumbnailSrc}
                              alt={item.alt}
                              title={item.title}
                              fill
                              sizes="220px"
                              className="object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                            <span
                              className="absolute inset-0 flex items-center justify-center bg-[#1F2A24]/25 transition group-hover:bg-[#1F2A24]/35"
                              aria-hidden
                            >
                              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#1F2A24] shadow-lg ring-2 ring-white/50">
                                <Play className="ml-0.5 h-7 w-7" fill="currentColor" aria-hidden />
                              </span>
                            </span>
                          </span>
                          <span className="sr-only">Play {item.title}</span>
                        </button>
                      ) : (
                        <div className="relative aspect-video w-full overflow-hidden bg-[#5a7d72]">
                          <video
                            controls
                            preload="metadata"
                            playsInline
                            poster={item.poster}
                            className="absolute inset-0 h-full w-full object-cover"
                            title={item.title}
                          >
                            <source src={item.src} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setActive(item)}
                        className="w-full px-4 py-2.5 text-center text-xs font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
                      >
                        Open larger view
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {GROUP_ORDER.map((group) => {
            const items = imagesByGroup[group];
            if (items.length === 0) return null;
            return (
              <section
                key={group}
                className="mt-12"
                aria-labelledby={`gallery-group-${group}`}
              >
                <h2
                  id={`gallery-group-${group}`}
                  className="font-heading text-xl font-semibold text-[var(--rr-ink)] sm:text-2xl"
                >
                  {GALLERY_GROUP_LABEL[group]}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[var(--rr-text-muted)]">
                  {group === "trail" ?
                    "Forest floor, tread, and corridor shots—what the walk in tends to look like."
                  : group === "water" ?
                    "Pools, cobbles, and open water—useful for picturing depth and sun exposure."
                  : "Mixed angles that still belong to the same visit."
                  }
                </p>
                <ul
                  className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
                  role="list"
                >
                  {items.map((item) => (
                    <li key={item.src}>
                      <GalleryImageTile item={item} onOpen={openItem} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </Container>
      </main>

      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close gallery item"
            className="absolute inset-0 bg-[#2c2a26]/38 backdrop-blur-[2px]"
            onClick={close}
          />
          <div
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.25rem] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] shadow-[var(--rr-shadow-float)] backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={active.type === "image" ? active.alt : active.title}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[var(--rr-widget-border)] px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug text-[var(--rr-ink)]">
                  {active.type === "image" ? active.alt : active.title}
                </p>
                {active.type === "video" ? (
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--rr-text-muted)]">
                    {active.alt}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={close}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[#f5f2eb] text-[var(--rr-text)] hover:bg-[#faf8f4]",
                )}
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4">
              {active.type === "image" && active.width && active.height ? (
                <div className="flex flex-col items-center gap-3">
                  <MediaImage
                    src={active.src}
                    alt={active.alt}
                    title={active.title}
                    width={active.width}
                    height={active.height}
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
                  />
                  <p className="max-w-2xl text-center text-xs leading-relaxed text-[var(--rr-text-muted)]">
                    {active.alt}
                  </p>
                </div>
              ) : active.type === "video" && active.youtubeId ? (
                <div className="flex flex-col items-center gap-4">
                  <YoutubeShortEmbedCover
                    videoId={active.youtubeId}
                    title={active.title}
                    controls
                    autoplay
                    muted
                    loop
                  />
                  <a
                    href={active.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--rr-link)] underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              ) : active.type === "video" ? (
                <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-lg bg-[#5a7d72]">
                  <video
                    controls
                    autoPlay
                    playsInline
                    poster={active.poster}
                    className="absolute inset-0 h-full w-full object-cover"
                    title={active.title}
                  >
                    <source src={active.src} type="video/mp4" />
                  </video>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <SiteFooter />
    </>
  );
}
