"use client";

import { motion } from "motion/react";
import { CloudRain, Leaf, Mountain, Users } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";

const CARDS = [
  {
    title: "Stone & water",
    body: "Flow changes with season and weather. Glance at conditions—then see what the river’s doing today.",
    icon: Mountain,
  },
  {
    title: "Space for everyone",
    body: "Quiet voices, pack it out, consent before photos. Locals, visitors, families—same water.",
    icon: Users,
  },
  {
    title: "When it’s high",
    body: "After rain or melt, crossings get real. Turn back if it feels wrong.",
    icon: CloudRain,
  },
] as const;

export function HomeInfoCards() {
  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-xl">
        <SectionEyebrow icon={Leaf}>Field notes</SectionEyebrow>
        <h2 className="rr-h2 mt-3">Before you head out</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-32px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rr-card group rounded-[var(--rr-radius-lg)] p-6 sm:p-7"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--rr-widget-border)] bg-[#f7f4ed] text-[var(--rr-forest)]">
                  <Icon className="h-4 w-4 opacity-85" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--rr-mint)]">
                  {card.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--rr-text-muted)]">{card.body}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
