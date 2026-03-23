"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type HomeQuickLinkItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type HomeQuickLinksProps = {
  links: HomeQuickLinkItem[];
};

/** Slate, water, mist — not emerald */
const ACCENTS = [
  "from-sky-400/14 to-[#0a1016] border-sky-300/20",
  "from-cyan-500/12 to-[#0a1016] border-cyan-400/18",
  "from-slate-400/14 to-[#0a1016] border-slate-400/22",
  "from-[#7eb8c8]/18 to-[#0a1016] border-[#6a9bab]/28",
  "from-stone-300/10 to-[#0a1016] border-stone-400/16",
  "from-[var(--rr-forest)]/12 to-[#0a1016] border-[var(--rr-forest)]/22",
  "from-sky-300/10 to-[#0a1016] border-sky-200/14",
  "from-teal-500/10 to-[#0a1016] border-teal-400/16",
] as const;

export function HomeQuickLinks({ links }: HomeQuickLinksProps) {
  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          Guide
        </p>
        <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Explore
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/50 sm:text-base">
          Land, rules, history, tools.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.42, delay: Math.min(i * 0.04, 0.28) }}
            >
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.992 }}
                transition={{ type: "spring", stiffness: 460, damping: 32 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "group relative flex min-h-[9rem] flex-col overflow-hidden rounded-[var(--rr-radius-lg)] border bg-gradient-to-br p-6 shadow-[var(--rr-shadow-card)] transition duration-300",
                    "hover:shadow-[var(--rr-shadow-card-hover)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06090d]",
                    ACCENTS[i % ACCENTS.length],
                  )}
                >
                  <span
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--rr-glow)]/6 blur-2xl transition duration-500 group-hover:bg-[var(--rr-glow)]/11"
                    aria-hidden
                  />
                  <span className="relative flex items-start justify-between gap-3">
                    <span className="flex min-w-0 flex-1 items-start gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-[var(--rr-mint)] shadow-inner ring-1 ring-white/[0.06] backdrop-blur-sm transition group-hover:border-[var(--rr-glow)]/30 group-hover:text-[#b8dce8]">
                        <Icon className="h-[1.35rem] w-[1.35rem]" aria-hidden />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="font-heading block text-[1.05rem] font-semibold leading-snug text-white">
                          {link.title}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-white/28 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--rr-mint)]"
                      aria-hidden
                    />
                  </span>
                  <p className="relative mt-3 flex-1 text-[0.8125rem] leading-relaxed text-white/50">
                    {link.description}
                  </p>
                  <span className="relative mt-5 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--rr-mint)]/90">
                    Open
                    <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
