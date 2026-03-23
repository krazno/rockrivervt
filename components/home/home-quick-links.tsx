"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Compass } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
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

const cardBase =
  "group relative flex min-h-[8.5rem] flex-col overflow-hidden rounded-[var(--rr-radius-lg)] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] p-6 shadow-[var(--rr-shadow-card)] transition duration-300 hover:border-[var(--rr-glow)]/35 hover:shadow-[var(--rr-shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1ea]";

export function HomeQuickLinks({ links }: HomeQuickLinksProps) {
  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-11 max-w-xl">
        <SectionEyebrow icon={Compass}>Guide</SectionEyebrow>
        <h2 className="rr-h2 mt-3">Explore</h2>
        <p className="rr-lead mt-3">
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
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.992 }}
                transition={{ type: "spring", stiffness: 460, damping: 32 }}
              >
                <Link href={link.href} className={cn(cardBase)}>
                  <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#7a9a8e]/10 blur-2xl" aria-hidden />
                  <span className="relative flex items-start justify-between gap-3">
                    <span className="flex min-w-0 flex-1 items-start gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--rr-widget-border)] bg-[#f7f4ed] text-[var(--rr-forest)] shadow-sm transition group-hover:border-[var(--rr-glow)]/40">
                        <Icon className="h-[1.25rem] w-[1.25rem]" aria-hidden />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="font-heading block text-[1.06rem] font-semibold leading-snug text-[var(--rr-ink)]">
                          {link.title}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-[var(--rr-text-muted)]/50 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--rr-link)]"
                      aria-hidden
                    />
                  </span>
                  <p className="relative mt-2 flex-1 text-[0.8125rem] leading-relaxed text-[var(--rr-text-muted)]">
                    {link.description}
                  </p>
                  <span className="relative mt-4 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--rr-link)]">
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
