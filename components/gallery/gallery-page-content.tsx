"use client";

import Link from "next/link";
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
      <main className="rr-body pb-20 text-[#e8f4ef]">
        <Container className="py-10 sm:py-12">
          <header className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Gallery
            </p>
            <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Rock River photos &amp; video
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/55 sm:text-lg">
              Tap stills to enlarge. Video fills the frame—use controls to play.
            </p>
            <p className="mt-4 text-sm text-white/45">
              <Link
                href="/map"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Rock River map
              </Link>
              {" · "}
              <Link
                href="/conditions"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>
              {" · "}
              <Link
                href="/visit"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Visit
              </Link>
            </p>
          </header>

          <ul
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
            role="list"
          >
            {galleryMedia.map((item) => (
              <li key={item.src}>
                {item.type === "image" ? (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="group relative w-full overflow-hidden rounded-[var(--rr-radius-lg)] border border-white/[0.09] bg-[#0a1210] text-left shadow-[var(--rr-shadow-card)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/25 hover:shadow-[var(--rr-shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]"
                  >
                    <span className="relative block aspect-[4/3] w-full overflow-hidden bg-[#0a1210]">
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
                ) : (
                  <div className="overflow-hidden rounded-[var(--rr-radius-lg)] border border-white/[0.09] bg-[#070c0a] shadow-[var(--rr-shadow-card)]">
                    <div className="border-b border-white/[0.07] px-3 py-2.5 sm:px-4">
                      <p className="text-sm font-medium text-white/90">{item.title}</p>
                      <p className="text-[11px] text-white/40">Video</p>
                    </div>
                    <div className="relative aspect-video w-full overflow-hidden bg-[#050807]">
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
            aria-label={active.type === "image" ? active.alt : active.title}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug text-white">
                  {active.type === "image" ? active.alt : active.title}
                </p>
                {active.type === "video" ? (
                  <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                    {active.alt}
                  </p>
                ) : null}
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
                <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-lg bg-[#050807]">
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
