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
      <main className="rr-body pb-20 text-[var(--rr-text)]">
        <Container className="py-12 sm:py-14">
          <header className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Gallery
            </p>
            <h1 className="font-heading mt-3 text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-semibold tracking-tight text-[var(--rr-ink)]">
              Rock River photos &amp; video
            </h1>
            <p className="rr-lead mt-4 sm:text-[1.0625rem]">
              Tap stills to enlarge. Video fills the frame—use controls to play.
            </p>
            <p className="mt-5 text-sm text-[var(--rr-text-muted)]">
              <Link
                href="/visit"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Visit
              </Link>
              {" · "}
              <Link
                href="/map"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Map
              </Link>
              {" · "}
              <Link
                href="/conditions"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>
            </p>
          </header>

          <ul
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            role="list"
          >
            {galleryMedia.map((item) => (
              <li key={item.src}>
                {item.type === "image" ? (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
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
                ) : (
                  <div className="overflow-hidden rounded-[var(--rr-radius-lg)] border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 shadow-[var(--rr-shadow-card)]">
                    <div className="border-b border-[var(--rr-widget-border)] px-3 py-2.5 sm:px-4">
                      <p className="text-sm font-semibold text-[var(--rr-ink)]">{item.title}</p>
                      <p className="text-[11px] text-[var(--rr-text-muted)]">Video</p>
                    </div>
                    <div className="relative aspect-video w-full overflow-hidden bg-[#2a2824]">
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
                      className="w-full px-3 py-2 text-center text-xs font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
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
