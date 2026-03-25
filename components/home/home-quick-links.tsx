"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type HomeQuickLinkItem = {
  title: string;
  /** Optional; omitted or empty = icon + title only. */
  description?: string;
  href: string;
  icon: LucideIcon;
};

type HomeQuickLinksProps = {
  links: HomeQuickLinkItem[];
};

/** Soft pastel wells for icon circles — friendly, nature-adjacent. */
const ICON_ACCENTS = [
  { well: "bg-[#e8f2ec] text-[#2d5a42] border-[#c8dccf]", ring: "ring-[#a8c4b2]/35" },
  { well: "bg-[#eef3f7] text-[#355a6e] border-[#c5d4e0]", ring: "ring-[#8fafc4]/35" },
  { well: "bg-[#f5f0e8] text-[#6b5a2e] border-[#e0d4c4]", ring: "ring-[#d4c4a8]/40" },
  { well: "bg-[#edf4f2] text-[#2f5c52] border-[#c5ddd6]", ring: "ring-[#9ec9bc]/35" },
  { well: "bg-[#f3eef5] text-[#5a3d58] border-[#ddd0e0]", ring: "ring-[#c9b4cf]/35" },
  { well: "bg-[#f0f6ed] text-[#3d5c2d] border-[#cddcc4]", ring: "ring-[#a8c99a]/35" },
  { well: "bg-[#eef1f8] text-[#3d4a6e] border-[#d0d8ea]", ring: "ring-[#a8b8e0]/35" },
  { well: "bg-[#f7f2ea] text-[#6b4e2a] border-[#e8dcc8]", ring: "ring-[#dcc8a8]/40" },
] as const;

const circleOuter =
  "group relative flex aspect-square w-full max-w-[11rem] flex-col items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] px-4 py-5 text-center shadow-[var(--rr-shadow-card)] transition duration-300 hover:border-[var(--rr-glow)]/40 hover:shadow-[var(--rr-shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1ea] sm:max-w-[11.5rem] sm:px-5 sm:py-6";

export function HomeQuickLinks({ links }: HomeQuickLinksProps) {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-label="Explore"
    >
      <h2 className="sr-only">Explore</h2>
      <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
        {links.map((link, i) => {
          const Icon = link.icon;
          const accent = ICON_ACCENTS[i % ICON_ACCENTS.length]!;
          return (
            <motion.div
              key={link.title}
              className="w-full max-w-[11.5rem] sm:max-w-[12rem]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.42, delay: Math.min(i * 0.04, 0.28) }}
            >
              <motion.div
                whileHover={{ y: -2, rotate: 0.6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <Link href={link.href} className={cn(circleOuter)}>
                  <span
                    className="pointer-events-none absolute inset-2 rounded-full bg-gradient-to-br from-[#7a9a8e]/[0.07] via-transparent to-[#6d8a8a]/[0.06]"
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "relative mb-2 flex h-14 w-14 items-center justify-center rounded-full border shadow-sm transition duration-300 sm:h-16 sm:w-16",
                      accent.well,
                      accent.ring,
                      "ring-2 group-hover:scale-[1.04]",
                    )}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                  </span>
                  <span className="relative font-heading text-[0.95rem] font-semibold leading-tight text-[var(--rr-ink)] sm:text-base">
                    {link.title}
                  </span>
                  {link.description?.trim() ? (
                    <span className="relative mt-1.5 line-clamp-2 text-[0.7rem] leading-snug text-[var(--rr-text-muted)] sm:text-[11px]">
                      {link.description}
                    </span>
                  ) : null}
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
