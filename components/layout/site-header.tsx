"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { Container } from "@/components/shared/container";
import { primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--rr-nav)]/85 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--rr-nav)]/75">
      <Container className="flex items-center justify-between gap-4 py-3.5 sm:py-4">
        <Link
          href="/"
          className="group flex shrink-0 flex-col leading-tight transition hover:opacity-90"
        >
          <span className="font-heading text-lg font-semibold tracking-tight text-white sm:text-xl">
            Rock River
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--rr-mint)]">
            Vermont
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/conditions"
            className="rounded-full bg-[var(--rr-glow)]/25 px-3 py-1.5 text-xs font-semibold text-[var(--rr-mint)] ring-1 ring-[var(--rr-glow)]/40"
          >
            Today
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-[#0a1612]/95 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-white/90 hover:bg-white/5"
              >
                Home
              </Link>
              {primaryNav.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex rounded-xl px-4 py-3 text-base font-medium transition",
                      "text-white/90 hover:bg-white/5 active:bg-white/10",
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
