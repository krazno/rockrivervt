"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MapPin, Volume2, VolumeX } from "lucide-react";

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
    reduceMotion ? [0, 0] : [0, 48],
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
      <div className="relative min-h-[min(78vh,560px)] overflow-hidden rounded-[var(--rr-radius-hero)] border border-white/[0.09] shadow-[0_48px_120px_-52px_rgb(0,0,0,0.88)]">
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
              className="scale-[1.08] object-cover object-center"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#121a22] via-[#0a0f14] to-[#06090c]" />
        )}
        {/* Cinematic read — cool slate + water mist */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020508] via-[#050a10]/90 to-[#0c1520]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-[#0a1218]/35 to-[#1a3a48]/14" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgb(0,0,0,0.55),transparent_62%)]" />

        <div className="relative z-10 flex min-h-[min(78vh,560px)] flex-col justify-end p-6 sm:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] text-white/90 uppercase backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 text-[var(--rr-mint)]" aria-hidden />
              Newfane · Windham County
            </p>
            <h1
              className="font-heading max-w-3xl text-[2.35rem] font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-[3.25rem]"
            >
              <span className="rr-shimmer-text">Rock River</span>
              <span className="mt-2 block text-[1.15rem] font-medium tracking-tight text-white/88 sm:text-xl lg:text-2xl">
                Southern Vermont · near Brattleboro
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/[0.82] sm:text-lg">
              Rocky pools, cold water, smooth stone—an unofficial guide for people who swim,
              walk, and share this stretch of southern Vermont with care.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/map" className="rr-btn-primary px-7">
                Map
              </Link>
              <Link href="/conditions" className="rr-btn-ghost border-white/18">
                Conditions
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium text-white/75 underline-offset-[6px] transition hover:text-white hover:underline"
              >
                Gallery
              </Link>
              {audioReady ? (
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-pressed={playing}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2.5 text-xs font-medium text-white/85 backdrop-blur-md transition hover:bg-black/50"
                >
                  {playing ? (
                    <VolumeX className="h-4 w-4" aria-hidden />
                  ) : (
                    <Volume2 className="h-4 w-4" aria-hidden />
                  )}
                  {playing ? "Pause" : "Sound"}
                </button>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
