"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Droplets, Leaf, MapPin, Sparkles, Volume2, VolumeX } from "lucide-react";

import { getHeroBackdropImage } from "@/data/media";

export function HomeHero() {
  const hero = getHeroBackdropImage();
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
      className="rr-section relative mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8"
    >
      <div className="relative min-h-[min(72vh,520px)] overflow-hidden rounded-[var(--rr-radius-hero)] border border-[var(--rr-widget-border)] bg-[#e8e4db] shadow-[var(--rr-shadow-card)]">
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f4f1ea]/95 via-[#ebe6dc]/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#3d4a3d]/10 via-transparent to-[#6d8a8a]/12" />

        <div className="relative z-10 flex min-h-[min(72vh,520px)] flex-col justify-end p-7 sm:p-11 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
          >
            <div className="min-w-0 flex-1 lg:py-2">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-[var(--rr-mint)] shadow-sm backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-[var(--rr-forest)]" aria-hidden />
              Newfane · Windham County
            </p>
            <h1 className="font-heading max-w-3xl text-[2.2rem] font-semibold leading-[1.05] tracking-tight text-[var(--rr-ink)] sm:text-5xl lg:text-[3.1rem]">
              Rock River
              <span className="mt-2 block text-[1.1rem] font-medium tracking-tight text-[var(--rr-ink-muted)] sm:text-xl lg:text-2xl">
                Newfane, Vermont
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-[var(--rr-text)] sm:text-lg">
              A guide to the river, the trail, and the places people return to.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/map" className="rr-btn-primary px-7">
                Map
              </Link>
              <Link href="/conditions" className="rr-btn-ghost">
                Conditions
              </Link>
              {audioReady ? (
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-pressed={playing}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 px-4 py-2.5 text-xs font-semibold text-[var(--rr-text)] shadow-sm transition hover:bg-[#f5f2eb]"
                >
                  {playing ? (
                    <VolumeX className="h-4 w-4 text-[var(--rr-forest)]" aria-hidden />
                  ) : (
                    <Volume2 className="h-4 w-4 text-[var(--rr-forest)]" aria-hidden />
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
                <div className="relative mx-auto overflow-hidden rounded-full border-2 border-[#faf8f4]/90 shadow-[0_12px_40px_-16px_rgba(22,38,48,0.45)] ring-2 ring-[var(--rr-widget-border)]/80">
                  <Image
                    src="/media/home/river-montage.gif"
                    alt="Glimpses of Rock River water and shore"
                    width={220}
                    height={220}
                    unoptimized
                    className="h-[7.5rem] w-[7.5rem] object-cover object-center sm:h-[8.25rem] sm:w-[8.25rem] lg:h-[9rem] lg:w-[9rem]"
                  />
                </div>
              </div>
              <div
                className="flex justify-center gap-2 rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4]/88 px-2.5 py-2 shadow-sm backdrop-blur-sm sm:gap-2.5 sm:px-3 lg:mx-auto"
                aria-hidden
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f0ec] text-[#2d5a42] shadow-inner">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef5f0] text-[#2f6048] shadow-inner">
                  <Leaf className="h-4 w-4" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf2f5] text-[#2f5f6e] shadow-inner">
                  <Droplets className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
