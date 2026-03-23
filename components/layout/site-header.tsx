"use client";

import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/shared/container";
import { primaryNav, secondaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** e.g. Today · Sun, Mar 22 — links to conditions */
function useConditionsChipLabel() {
  return useMemo(() => {
    const d = new Date();
    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(d);
    const rest = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(d);
    return `Today · ${weekday}, ${rest}`;
  }, []);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const chipLabel = useConditionsChipLabel();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--rr-widget-border)] bg-[#faf8f4]/88 shadow-[0_1px_0_rgb(42_38_32/0.05)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#faf8f4]/78">
        <Container className="flex items-center justify-between gap-3 py-3 sm:py-3.5">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 flex-col leading-tight transition duration-200 hover:opacity-85"
          >
            <span className="font-heading text-[1.05rem] font-semibold tracking-tight text-[var(--rr-ink)] sm:text-lg">
              Rock River
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Vermont
            </span>
          </Link>

          <nav
            className="hidden max-h-[5rem] max-w-[min(52rem,calc(100%-11rem))] flex-1 flex-wrap justify-end gap-x-0.5 gap-y-1 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-full px-2 py-1.5 text-[0.7rem] font-medium tracking-wide text-[var(--rr-text-muted)] transition duration-200 lg:px-2.5 lg:text-[0.75rem]",
                  "hover:bg-[#ebe6dc]/90 hover:text-[var(--rr-ink)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1ea]",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/conditions"
              className="max-w-[11rem] truncate rounded-full border border-[var(--rr-widget-border)] bg-[#f5f2eb]/95 px-2.5 py-1.5 text-[10px] font-semibold leading-tight tracking-wide text-[var(--rr-text)] transition hover:border-[var(--rr-glow)]/35 hover:bg-[#faf8f4] sm:px-3 sm:text-[11px]"
              aria-label={`Today's conditions — ${chipLabel}`}
              title="Today’s conditions"
            >
              <span className="text-[var(--rr-text-muted)]">Conditions · </span>
              {chipLabel.replace(/^Today · /, "")}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--rr-widget-border)] bg-[#faf8f4] text-[var(--rr-ink)] shadow-sm transition hover:bg-[#f5f2eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/40"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-[80] lg:hidden" key="nav-overlay">
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 bg-[#2c2a26]/28 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,21rem)] flex-col border-l border-[var(--rr-widget-border)] bg-[#faf8f4] shadow-[-12px_0_40px_-16px_rgba(42,38,32,0.1)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--rr-widget-border)] px-4 py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--rr-mint)]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[#f5f2eb] text-[var(--rr-text)] transition hover:bg-[#faf8f4]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav
                className="flex flex-1 flex-col overflow-y-auto px-2 py-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                aria-label="Mobile"
              >
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 text-[0.9375rem] font-semibold text-[var(--rr-ink)] transition hover:bg-[#ebe6dc]/80 active:bg-[#e8e4db]"
                >
                  Home
                  <ChevronRight className="h-4 w-4 text-[var(--rr-text-muted)]/50" aria-hidden />
                </Link>
                <p className="mt-3 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--rr-text-muted)]/70">
                  Explore
                </p>
                {primaryNav.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 + i * 0.02 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-[0.9375rem] font-semibold text-[var(--rr-ink)] transition hover:bg-[#ebe6dc]/80 active:bg-[#e8e4db]"
                    >
                      {label}
                      <ChevronRight className="h-4 w-4 text-[var(--rr-text-muted)]/50" aria-hidden />
                    </Link>
                  </motion.div>
                ))}
                <p className="mt-4 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--rr-text-muted)]/70">
                  Also
                </p>
                {secondaryNav.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.02 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-[0.9375rem] font-medium text-[var(--rr-text-muted)] transition hover:bg-[#ebe6dc]/60 active:bg-[#e8e4db]/80"
                    >
                      {label}
                      <ChevronRight className="h-4 w-4 text-[var(--rr-text-muted)]/50" aria-hidden />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
