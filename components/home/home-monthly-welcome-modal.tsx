"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Heart, MapPinned, Sparkles, SunMedium, Waves, X } from "lucide-react";

import { YoutubeShortEmbedCover } from "@/components/media/youtube-short-clip";
import { getRiverCharacterShort } from "@/data/media";
import { SITE_STUDIO_BRAND } from "@/lib/site";
import { vermontYearMonthKey } from "@/lib/vermont-time";

const STORAGE_KEY = "rr_monthly_welcome_modal_month";

/**
 * Once per calendar month (ET), first home visit — warm welcome + quick flex on live widgets.
 * Dismiss stores YYYY-MM so it won’t repeat until next month.
 */
export function HomeMonthlyWelcomeModal() {
  const labelId = useId();
  const [open, setOpen] = useState(false);
  const riverShort = getRiverCharacterShort();

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, vermontYearMonthKey());
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const month = vermontYearMonthKey();
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (seen !== month) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="monthly-welcome"
          className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close welcome"
            className="absolute inset-0 bg-[#1a221e]/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[1.35rem] border border-[#E2E0D8] bg-gradient-to-br from-white via-[#faf9f6] to-[#e8efe9]/95 shadow-[0_28px_80px_-32px_rgba(25,40,32,0.45)]"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4F6B52]/12 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-[#c4a5d8]/10 blur-3xl"
              aria-hidden
            />
            <div className="relative border-b border-[#E2E0D8]/80 bg-white/60 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E0D8] bg-[#F6F4EF] text-[#4F6B52] shadow-sm">
                    <Sparkles className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6F68]">
                      You made it
                    </p>
                    <h2
                      id={labelId}
                      className="font-heading text-xl font-bold tracking-tight text-[#1F2A24] sm:text-2xl"
                    >
                      Welcome to the river
                    </h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={dismiss}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8] bg-white text-[#5a6258] transition hover:bg-[#F6F4EF]"
                  aria-label="Dismiss"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {riverShort ? (
              <div
                className="pointer-events-none border-b border-[#E2E0D8]/70 bg-gradient-to-b from-[#e3ebe4]/50 to-transparent px-5 py-4 sm:px-6"
                aria-hidden
              >
                <YoutubeShortEmbedCover
                  videoId={riverShort.youtubeId}
                  title={riverShort.title}
                  className="mx-auto max-w-[200px] shadow-none sm:max-w-[220px]"
                  controls={false}
                />
                <p className="mt-2 text-center text-[10px] font-medium tracking-wide text-[#6B6F68]">
                  Muted river moment · loops
                </p>
              </div>
            ) : null}

            <div className="relative space-y-4 px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-sm leading-relaxed text-[#3a423c] sm:text-[15px]">
                This guide is{" "}
                <strong className="font-semibold text-[#1F2A24]">neighbor-built &amp; queer-friendly</strong>
                —live weather, river context, a real map, trail film, and anonymous crowd check-ins so
                you’re not guessing before you pack the towel.
              </p>
              <ul className="grid gap-2.5 text-sm text-[#3a423c]">
                <li className="flex items-start gap-2.5 rounded-xl border border-[#E2E0D8]/80 bg-white/70 px-3 py-2.5">
                  <SunMedium className="mt-0.5 h-4 w-4 shrink-0 text-[#4F6B52]" aria-hidden />
                  <span>
                    <strong className="font-semibold text-[#1F2A24]">Plan today</strong> picks a decent
                    window—not hype, just timing.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-[#E2E0D8]/80 bg-white/70 px-3 py-2.5">
                  <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-[#4F6B52]" aria-hidden />
                  <span>
                    <strong className="font-semibold text-[#1F2A24]">Map &amp; trail</strong> sit
                    side-by-side—preview here, full map one tap away.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-[#E2E0D8]/80 bg-white/70 px-3 py-2.5">
                  <Waves className="mt-0.5 h-4 w-4 shrink-0 text-[#4F6B52]" aria-hidden />
                  <span>
                    <strong className="font-semibold text-[#1F2A24]">Conditions stack</strong> lines up
                    air, water feel, and shoreline vibe before you go.
                  </span>
                </li>
              </ul>
              <p className="flex items-center gap-2 text-[13px] font-medium text-[#5a4a62]">
                <Heart className="h-4 w-4 shrink-0 text-[#8b5a7c]" aria-hidden />
                Built with care for a mixed, respectful crowd—including signed clothing-optional spots
                where posted.
              </p>
              <p className="text-[11px] leading-snug text-[#6B6F68]">
                Site &amp; experience · {SITE_STUDIO_BRAND}. Shown once per month on this device.
              </p>
              <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={dismiss}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#4F6B52]/35 bg-[#4F6B52] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d5640] sm:w-auto"
                >
                  Let’s go
                </button>
                <Link
                  href="#plan-today"
                  onClick={dismiss}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#E2E0D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#2d4a38] shadow-sm transition hover:border-[#4F6B52]/35 hover:bg-[#F6F4EF] sm:w-auto"
                >
                  Jump to Plan today
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
