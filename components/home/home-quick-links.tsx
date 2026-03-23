"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type QuickLink = {
  title: string;
  description: string;
  href: string;
};

type HomeQuickLinksProps = {
  links: QuickLink[];
};

const ACCENTS = [
  "from-[#3ecf8e]/25 to-transparent border-[#3ecf8e]/35",
  "from-cyan-400/15 to-transparent border-cyan-400/25",
  "from-emerald-400/15 to-transparent border-emerald-400/30",
  "from-teal-400/15 to-transparent border-teal-400/25",
  "from-[#7dd3c0]/20 to-transparent border-[#7dd3c0]/30",
  "from-white/10 to-transparent border-white/15",
  "from-[#3ecf8e]/20 to-transparent border-[#3ecf8e]/30",
  "from-cyan-300/12 to-transparent border-cyan-300/22",
] as const;

export function HomeQuickLinks({ links }: HomeQuickLinksProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          Go deeper
        </p>
        <h2 className="font-heading mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Explore the guide
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
          Land, history, rules, and tools—tap through before you lace up your boots.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link, i) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.35) }}
          >
            <Link
              href={link.href}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition",
                "hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-28px_rgba(62,207,142,0.35)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]",
                ACCENTS[i % ACCENTS.length],
              )}
            >
              <span className="flex items-start justify-between gap-2">
                <span className="font-heading text-lg font-semibold text-white">
                  {link.title}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-white/35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--rr-mint)]"
                  aria-hidden
                />
              </span>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                {link.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
