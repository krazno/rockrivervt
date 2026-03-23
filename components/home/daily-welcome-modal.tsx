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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2c2a26]/35 px-4 backdrop-blur-[3px]">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="daily-welcome-title"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="w-full max-w-md rounded-[1.35rem] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)]/95 p-7 shadow-[var(--rr-shadow-float)] backdrop-blur-md"
      >
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[var(--rr-mint)] uppercase">
          <Sparkles className="h-3.5 w-3.5 opacity-80" aria-hidden />
          First visit today?
        </p>
        <h2
          id="daily-welcome-title"
          className="font-heading mt-3 text-xl font-semibold text-[var(--rr-ink)]"
        >
          Rock River, Newfane VT
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--rr-text-muted)]">
          Unofficial guide—map, conditions, stewardship. Leave no trace; respect everyone at the water.
        </p>
        <p className="mt-4 flex gap-2.5 text-sm text-[var(--rr-text-muted)]">
          <Compass className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rr-forest)]" aria-hidden />
          <span>
            New here? Start with the <strong className="text-[var(--rr-ink)]">trail tour</strong>, then
            the map.
          </span>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="rr-btn-primary mt-7 inline-flex w-full justify-center px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/45"
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
}
