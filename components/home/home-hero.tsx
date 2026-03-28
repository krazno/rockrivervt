"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";
import { getHeroBackdropImage, getHeroCircleGalleryPhotos, type MediaItem } from "@/data/media";

const HERO_CIRCLE_SLIDE_MS = 7000;
const HERO_CIRCLE_FADE_MS = 1600;
const HERO_START_KEY = "rr_hero_circle_slide_start";

function HeroCircleSlideshow({
  photos,
}: {
  photos: (MediaItem & { type: "image"; width: number; height: number })[];
}) {
  const reduceMotion = useReducedMotion();
  const [rotated, setRotated] = useState(photos);

  useEffect(() => {
    if (photos.length <= 1) {
      setRotated(photos);
      return;
    }
    let start = 0;
    try {
      const raw = sessionStorage.getItem(HERO_START_KEY);
      if (raw != null) {
        start = parseInt(raw, 10) % photos.length;
      } else {
        start = Math.floor(Math.random() * photos.length);
        sessionStorage.setItem(HERO_START_KEY, String(start));
      }
    } catch {
      start = 0;
    }
    setRotated([...photos.slice(start), ...photos.slice(0, start)]);
  }, [photos]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [rotated]);

  useEffect(() => {
    if (rotated.length <= 1 || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % rotated.length);
    }, HERO_CIRCLE_SLIDE_MS);
    return () => window.clearInterval(id);
  }, [rotated, reduceMotion]);

  if (rotated.length === 0) return null;

  return (
    <>
      {rotated.map((photo, i) => (
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

export function HomeHero() {
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
              <div className="inline-flex max-w-md flex-col gap-1 rounded-2xl border border-white/25 bg-white/15 px-3.5 py-2.5 text-left shadow-sm backdrop-blur-md sm:max-w-none">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-white/95">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#c8e0c8]" aria-hidden />
                  Newfane · Windham County
                </span>
                <span className="text-[9px] font-medium leading-snug tracking-[0.12em] text-white/88 sm:text-[10px]">
                  River in Newfane · usual parking along Route 30 (Dummerston side)
                </span>
              </div>
              <h1 className="font-heading max-w-4xl text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-[3.1rem] sm:leading-[1.04] lg:text-[3.65rem]">
                Rock River
                <span className="mt-2 block text-[1.2rem] font-semibold leading-snug tracking-tight text-white/95 drop-shadow-[0_1px_16px_rgba(0,0,0,0.28)] sm:mt-3 sm:text-[1.45rem] lg:text-[1.65rem]">
                  Unofficial guide for a real river day
                </span>
                <span className="mt-3 block text-[1.05rem] font-bold tracking-tight text-white/92 sm:text-xl">
                  Newfane, Vermont
                </span>
              </h1>
              <div className="max-w-2xl space-y-4">
                <p className="text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] sm:text-base">
                  Use the <Link href="/map" className={inText}>map</Link>,{" "}
                  <Link href="/conditions" className={inText}>live conditions</Link>, and{" "}
                  <Link href="/visit" className={inText}>visit</Link> notes—neighbor-sourced, not the town.
                  LGBTQ+ visitors have shared this river for generations where posted areas apply; the same
                  quiet respect you’d want on any shoreline applies here.
                </p>
                <p className="text-sm font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] sm:text-[0.95rem]">
                  <span className="text-white/95">First time?</span>{" "}
                  <Link href="/map" className={inText}>Map</Link>
                  {" → "}
                  <Link href="/#plan-today" className={inText}>
                    Today’s snapshot
                  </Link>
                  {" → "}
                  <Link href="/visit" className={inText}>Visit tips</Link>. More depth in the{" "}
                  <Link href="/visitor-guide#guide-top" className={inText}>visitor guide</Link>;{" "}
                  <Link href="/gallery" className={inText}>photos</Link> only hint at conditions—always look at
                  the water yourself.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2 sm:gap-3.5">
                <Link
                  href="/map"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#4F6B52] px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-lg shadow-[#1F2A24]/20 transition hover:bg-[#3d5240] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2A24]/50 sm:px-8 sm:text-base"
                >
                  Open map
                </Link>
                <Link
                  href="/#plan-today"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/95 px-7 py-3.5 text-[0.9375rem] font-semibold text-[#1F2A24] shadow-md backdrop-blur-sm transition hover:bg-white sm:px-8 sm:text-base"
                >
                  Today’s snapshot
                </Link>
                <Link
                  href="/conditions"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/90 bg-white/10 px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-sm backdrop-blur-[2px] transition hover:bg-white/18 sm:px-8 sm:text-base"
                >
                  Conditions
                </Link>
                <Link
                  href="/visit"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/55 bg-transparent px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-sm backdrop-blur-[2px] transition hover:bg-white/10 sm:px-8 sm:text-base"
                >
                  Visit tips
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

            <div className="flex w-full shrink-0 flex-col items-center justify-center lg:w-[min(100%,20rem)] lg:self-center">
              <div className="relative mx-auto lg:mx-0">
                <div
                  className="pointer-events-none absolute -inset-1 animate-pulse rounded-full bg-gradient-to-tr from-[#7a9a8e]/22 via-transparent to-[#8eb8c4]/18 blur-md motion-reduce:animate-none [animation-duration:3.5s]"
                  aria-hidden
                />
                <div className="relative mx-auto h-[7.5rem] w-[7.5rem] overflow-hidden rounded-full border-2 border-[#faf8f4]/90 shadow-[0_12px_40px_-16px_rgba(22,38,48,0.45)] ring-2 ring-[var(--rr-widget-border)]/80 sm:h-[8.25rem] sm:w-[8.25rem] lg:h-[9rem] lg:w-[9rem]">
                  <HeroCircleSlideshow photos={circlePhotos} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
