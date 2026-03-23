"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import type { MediaItem } from "@/data/media";
import { getGalleryMediaSorted } from "@/data/media";
import { cn } from "@/lib/utils";

export function GalleryPageContent() {
  const galleryMedia = getGalleryMediaSorted();
  const [active, setActive] = useState<MediaItem | null>(null);

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

  return (
    <>
      <SiteHeader />
      <main className="rr-body pb-16 text-[#e8f4ef]">
        <Container className="py-10">
          <header className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Gallery
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Photos &amp; video
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/65 sm:text-lg">
              Moments from Rock River near Newfane—tap an image to go large. When river
              clips are back in the folder, they&apos;ll show up here with standard video
              controls.
            </p>
          </header>

          <ul
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {galleryMedia.map((item) => (
              <li key={item.src}>
                {item.type === "image" ? (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="group w-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] text-left shadow-[0_8px_28px_-22px_rgba(0,0,0,0.5)] ring-0 transition hover:ring-2 hover:ring-[var(--rr-glow)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]"
                  >
                    <span className="relative block aspect-[4/3] w-full bg-[#0a1210]">
                      <MediaImage
                        src={item.thumbnailSrc ?? item.src}
                        alt={item.alt}
                        title={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </span>
                    <span className="block px-3 py-2.5">
                      <span className="line-clamp-2 text-sm font-medium text-white/85">
                        {item.title}
                      </span>
                    </span>
                  </button>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] shadow-[0_8px_28px_-22px_rgba(0,0,0,0.5)]">
                    <div className="border-b border-white/10 px-3 py-2">
                      <p className="text-sm font-medium text-white/90">{item.title}</p>
                      <p className="text-[11px] text-white/45">MP4 — tap controls to play</p>
                    </div>
                    <video
                      controls
                      preload="metadata"
                      poster={item.poster}
                      className="aspect-video w-full bg-black object-contain"
                      title={item.title}
                    >
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                      onClick={() => setActive(item)}
                      className="w-full px-3 py-2 text-center text-xs font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
                    >
                      Open larger view
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />
          <div
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0c1815] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{active.title}</p>
                <p className="mt-0.5 text-[11px] text-white/50">{active.alt}</p>
              </div>
              <button
                type="button"
                onClick={close}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/10",
                )}
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4">
              {active.type === "image" && active.width && active.height ? (
                <div className="flex justify-center">
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
                </div>
              ) : active.type === "video" ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  poster={active.poster}
                  className="mx-auto max-h-[75vh] w-full max-w-full bg-black"
                  title={active.title}
                >
                  <source src={active.src} type="video/mp4" />
                </video>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <SiteFooter />
    </>
  );
}
