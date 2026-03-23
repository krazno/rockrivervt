"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Compass, Sparkles } from "lucide-react";

const STORAGE_KEY = "rr-welcome-dismissed-date";

function todayYmd(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DailyWelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (last !== todayYmd()) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, todayYmd());
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="daily-welcome-title"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0b1814]/95 p-6 shadow-2xl ring-1 ring-[var(--rr-glow)]/25"
      >
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[var(--rr-mint)] uppercase">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          First visit today?
        </p>
        <h2
          id="daily-welcome-title"
          className="font-heading mt-2 text-xl font-semibold text-white"
        >
          Rock River, Newfane VT
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/72">
          Unofficial field guide to a rocky swimming river in southern Vermont—map,
          conditions, stewardship. Leave no trace; respect the mix of people who use this
          water.
        </p>
        <p className="mt-4 flex gap-2 text-sm text-white/60">
          <Compass className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rr-mint)]" aria-hidden />
          <span>
            New here? Start with the <strong className="text-white/90">trail tour</strong>, then
            the map.
          </span>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="mt-6 inline-flex w-full justify-center rounded-full bg-[var(--rr-glow)] px-4 py-2.5 text-sm font-semibold text-[#04120e] shadow-lg shadow-[var(--rr-glow)]/25 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]"
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
}
