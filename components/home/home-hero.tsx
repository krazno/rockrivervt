"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Volume2, VolumeX } from "lucide-react";

import { getHeroBackdropImage } from "@/data/media";

type HomeHeroProps = {
  showWelcome: boolean;
  onClose: () => void;
  homeJsonLd: Record<string, unknown>;
};

export function HomeHero({ showWelcome, onClose, homeJsonLd }: HomeHeroProps) {
  const hero = getHeroBackdropImage();
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {showWelcome ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#0b1814]/95 p-6 shadow-2xl ring-1 ring-[var(--rr-glow)]/20"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--rr-mint)] uppercase">
              Welcome
            </p>
            <h2 className="font-heading mt-2 text-xl font-semibold text-white">
              Welcome to Rock River VT
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              We’re glad you’re here. Peek at conditions, scan the map, and step
              into the day with kindness for the water and everyone beside it.{" "}
              <span className="font-medium text-[var(--rr-mint)]">All are welcome</span>
              —families, neighbors, LGBTQ+ visitors, and newcomers.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex w-full justify-center rounded-full bg-[var(--rr-glow)] px-4 py-2.5 text-sm font-semibold text-[#04120e] shadow-lg shadow-[var(--rr-glow)]/25 transition hover:brightness-110"
            >
              Come on in
            </button>
          </motion.div>
        </div>
      ) : null}

      <section className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
        <div className="relative min-h-[min(72vh,520px)] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-50px_rgb(0,0,0,0.85)] sm:rounded-[2.25rem]">
          {hero ? (
            <Image
              src={hero.src}
              alt={hero.alt}
              title={hero.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f2a22] via-[#0a1814] to-[#050c0a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020806] via-[#030a08]/85 to-[#03120e]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-[#0b6b3e]/10" />

          <div className="relative z-10 flex min-h-[min(72vh,520px)] flex-col justify-end p-6 sm:p-10 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-[var(--rr-mint)]" aria-hidden />
                All are welcome
              </p>
              <h1 className="font-heading max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="rr-shimmer-text">Rock River</span>
                <span className="block text-white/95">made for slow days</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Cold pools, sun-warmed stone, and trails kept by neighbors who care.
                Your unofficial guide to conditions, maps, and stewardship—built for
                locals, newcomers, and everyone who loves this water.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--rr-glow)] px-6 py-3 text-sm font-semibold text-[#04120e] shadow-lg shadow-[var(--rr-glow)]/30 transition hover:brightness-110"
                >
                  Explore the map
                </Link>
                <Link
                  href="/conditions"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Live conditions
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium text-white/85 underline-offset-4 hover:underline"
                >
                  Photo gallery
                </Link>
                {audioReady ? (
                  <button
                    type="button"
                    onClick={toggleAudio}
                    aria-pressed={playing}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2.5 text-xs font-semibold text-white/90 backdrop-blur transition hover:bg-black/45"
                  >
                    {playing ? (
                      <VolumeX className="h-4 w-4" aria-hidden />
                    ) : (
                      <Volume2 className="h-4 w-4" aria-hidden />
                    )}
                    {playing ? "Pause" : "River sound"}
                  </button>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
