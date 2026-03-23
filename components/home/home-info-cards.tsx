"use client";

import { motion } from "motion/react";

const CARDS = [
  {
    title: "Stone & water",
    body:
      "Wet rock moves; spring shifts flow. Glance at conditions—then let the river tell you what’s true today.",
  },
  {
    title: "Space for everyone",
    body:
      "Quiet voices, durable paths, consent before photos, pack it out. Locals, visitors, queer folks, families, first-timers—same water.",
  },
  {
    title: "When it’s high",
    body:
      "After rain or melt, crossings get honest fast. Turn back if it feels wrong.",
  },
] as const;

export function HomeInfoCards() {
  return (
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          Field notes
        </p>
        <h2 className="font-heading mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
          Before you head out
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {CARDS.map((card, i) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-32px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rr-card group rounded-[var(--rr-radius-md)] p-5 sm:p-6"
          >
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--rr-mint)]">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{card.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
