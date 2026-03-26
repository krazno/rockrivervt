"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Droplets, Leaf, MapPin, Sparkles, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  getHeroBackdropImage,
  getHeroCircleGalleryPhotos,
  type MediaItem,
} from "@/data/media";
import type { HomeHeroSnapshotMode } from "@/components/home/home-hero-snapshot-mode";

const HERO_CIRCLE_SLIDE_MS = 7000;
const HERO_CIRCLE_FADE_MS = 1600;

function HeroCircleSlideshow({
  photos,
}: {
  photos: (MediaItem & { type: "image"; width: number; height: number })[];
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length <= 1 || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % photos.length);
    }, HERO_CIRCLE_SLIDE_MS);
    return () => window.clearInterval(id);
  }, [photos.length, reduceMotion]);

  if (photos.length === 0) return null;

  return (
    <>
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={i === active ? photo.alt : ""}
          title={photo.title}
          fill
          sizes="(max-width: 640px) 120px, 180px"
          priority={i === 0}
          className={cn(
            "object-cover object-center transition-opacity ease-in-out motion-reduce:transition-none",
            i === active ? "z-[1] opacity-100" : "z-0 opacity-0",
          )}
          style={{
            transitionDuration: reduceMotion ? "0ms" : `${HERO_CIRCLE_FADE_MS}ms`,
          }}
          aria-hidden={i !== active}
        />
      ))}
    </>
  );
}

type HomeHeroProps = {
  heroMode: HomeHeroSnapshotMode;
  onHeroModeChange: (mode: HomeHeroSnapshotMode) => void;
};

const iconBtnClass =
  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 p-0 shadow-inner focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80";

export function HomeHero({ heroMode, onHeroModeChange }: HomeHeroProps) {
  const hero = getHeroBackdropImage();
  const circlePhotos = useMemo(() => getHeroCircleGalleryPhotos(), []);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 32],
  );

  const [audioReady, setAudioReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/media/audio/river-ambience.mp3", { method: "HEAD" })
      .then((r) => {
        if (!cancelled && r.ok) setAudioReady(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const inText =
    "font-semibold text-white underline decoration-white/55 underline-offset-[3px] transition hover:decoration-white";

  const toggleAudio = () => {
    if (!audioReady) return;
    if (!audioRef.current) {
      const el = new Audio("/media/audio/river-ambience.mp3");
      el.loop = true;
      el.volume = 0.35;
      audioRef.current = el;
    }
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <section
      ref={sectionRef}
      className="rr-section relative mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8"
    >
      <div className="relative min-h-[min(76vh,560px)] overflow-hidden rounded-2xl border border-[#E2E0D8] bg-[#e8e4db] shadow-sm">
        {hero ? (
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={hero.src}
              alt={hero.alt}
              title={hero.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover object-center"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8e4db] via-[#d4ddd4] to-[#c8d4d0]" />
        )}
        {/* Light wash — keep photo visible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F6F4EF]/58 via-[#ebe6dc]/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1F2A24]/[0.04] via-transparent to-[#4F6B52]/[0.05]" />
        {/* Readability band at copy zone */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(52%,420px)] bg-gradient-to-t from-[#1F2A24]/50 via-[#1F2A24]/18 to-transparent" />

        <div className="relative z-10 flex min-h-[min(76vh,560px)] flex-col justify-end p-9 sm:p-14 lg:p-[4.25rem]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
          >
            <div className="min-w-0 flex-1 space-y-5 lg:py-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/20 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white/95 shadow-sm backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 text-[#c8e0c8]" aria-hidden />
              Newfane · Windham County
            </p>
            <h1 className="font-heading max-w-4xl text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-[3.25rem] sm:leading-[1.02] lg:text-[4rem]">
              Rock River Vermont Visitor Guide
              <span className="mt-3 block text-[1.25rem] font-bold tracking-tight text-white/95 drop-shadow-[0_1px_16px_rgba(0,0,0,0.3)] sm:text-2xl lg:text-[2rem]">
                Newfane, Vermont · Windham County
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] sm:text-base">
                Spending a day on <strong className="font-semibold">Rock River Vermont</strong> or{" "}
                <strong className="font-semibold">Rock River Newfane VT</strong>? Here you will find the{" "}
                <Link href="/rock-river-map" className={inText}>Rock River map</Link>, current{" "}
                <Link href="/rock-river-conditions" className={inText}>Rock River conditions</Link>, and notes on
                the <Link href="/rock-river-trail-vermont" className={inText}>Rock River trail</Link>{" "}
                and the main <Link href="/rock-river-swimming-hole" className={inText}>Rock River swimming hole</Link>{" "}
                pools—practical context for a <strong className="font-semibold">Newfane Vermont swimming hole</strong> outing in{" "}
                <strong className="font-semibold">Windham County Vermont</strong>, in the same spirit as other southern Vermont river days.
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] sm:text-[0.95rem]">
                Start with the <Link href="/map" className={inText}>interactive map</Link> and{" "}
                <Link href="/conditions" className={inText}>conditions</Link>, skim the{" "}
                <Link href="/visit" className={inText}>visit guide</Link> for parking and etiquette, then
                drop into the{" "}
                <Link href="/visitor-guide#guide-top" className={inText}>
                  longer visitor guide
                </Link>{" "}
                for
                history, safety, and local culture. <Link href="/gallery" className={inText}>Photos</Link>{" "}
                help set expectations before you head out from Brattleboro or the West River valley.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4">
              <Link
                href="/map"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#4F6B52] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1F2A24]/20 transition hover:bg-[#3d5240] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2A24]/50"
              >
                Map
              </Link>
              <Link
                href="/conditions"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/95 px-8 py-3.5 text-base font-semibold text-[#1F2A24] shadow-md backdrop-blur-sm transition hover:bg-white"
              >
                Conditions
              </Link>
              <Link
                href="/visit"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/90 bg-transparent px-8 py-3.5 text-base font-semibold text-white shadow-sm backdrop-blur-[2px] transition hover:bg-white/10"
              >
                Visit guide
              </Link>
              {audioReady ? (
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-pressed={playing}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 bg-white/15 px-5 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/25"
                >
                  {playing ? (
                    <VolumeX className="h-4 w-4 text-white" aria-hidden />
                  ) : (
                    <Volume2 className="h-4 w-4 text-white" aria-hidden />
                  )}
                  {playing ? "Pause" : "Sound"}
                </button>
              ) : null}
            </div>
            </div>

            <div className="flex w-full shrink-0 flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 lg:w-[min(100%,13rem)] lg:flex-col lg:justify-center lg:self-center">
              <div className="relative mx-auto lg:mx-0">
                <div
                  className="pointer-events-none absolute -inset-1 animate-pulse rounded-full bg-gradient-to-tr from-[#7a9a8e]/22 via-transparent to-[#8eb8c4]/18 blur-md motion-reduce:animate-none [animation-duration:3.5s]"
                  aria-hidden
                />
                <div className="relative mx-auto h-[7.5rem] w-[7.5rem] overflow-hidden rounded-full border-2 border-[#faf8f4]/90 shadow-[0_12px_40px_-16px_rgba(22,38,48,0.45)] ring-2 ring-[var(--rr-widget-border)]/80 sm:h-[8.25rem] sm:w-[8.25rem] lg:h-[9rem] lg:w-[9rem]">
                  <HeroCircleSlideshow photos={circlePhotos} />
                </div>
              </div>
              <div
                role="group"
                aria-label="Choose today’s visit focus"
                className="flex justify-center gap-2 rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4]/88 px-2.5 py-2 shadow-sm backdrop-blur-sm sm:gap-2.5 sm:px-3 lg:mx-auto"
              >
                <button
                  type="button"
                  aria-pressed={heroMode === "star"}
                  aria-label="Highlights: best conditions and recommended time"
                  onClick={() => onHeroModeChange("star")}
                  className={cn(iconBtnClass, "bg-[#e8f0ec] text-[#2d5a42]")}
                >
                  <Sparkles className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-pressed={heroMode === "leaf"}
                  aria-label="Nature: trail, calm shoreline, and season context"
                  onClick={() => onHeroModeChange("leaf")}
                  className={cn(iconBtnClass, "bg-[#eef5f0] text-[#2f6048]")}
                >
                  <Leaf className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-pressed={heroMode === "water"}
                  aria-label="River: swimming comfort and water conditions"
                  onClick={() => onHeroModeChange("water")}
                  className={cn(iconBtnClass, "bg-[#eaf2f5] text-[#2f5f6e]")}
                >
                  <Droplets className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
