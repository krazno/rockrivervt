"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Car,
  CloudSun,
  Droplets,
  MapPinned,
  Shield,
  Users,
} from "lucide-react";

const cardShellClass =
  "rr-interactive-lift flex h-full items-center gap-4 rounded-2xl border border-[#E2E0D8] bg-white/95 p-6 shadow-[var(--rr-shadow-card-soft)]";

const bullets: { label: string; icon: typeof MapPinned; href?: string }[] = [
  { label: "Map & trail", icon: MapPinned, href: "/map" },
  { label: "Swimming holes", icon: Droplets, href: "/visit" },
  { label: "Conditions", icon: CloudSun, href: "/conditions" },
  { label: "Parking", icon: Car, href: "/map" },
  { label: "Guidelines", icon: Shield, href: "/guidelines" },
  { label: "Community", icon: Users, href: "/community" },
];

export function HomeVisitorGuideBlock() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="visitor-guide-identity-heading"
    >
      <div className="rr-photo-surface rr-photo-surface--trail rounded-[1.35rem] border border-[#E2E0D8]/85 p-6 shadow-[0_8px_32px_-22px_rgba(31,42,36,0.09)] sm:p-8">
      <h2
        id="visitor-guide-identity-heading"
        className="font-heading text-balance text-3xl font-extrabold tracking-tight text-[#1F2A24] sm:text-4xl"
      >
        Plan with the local guide
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6B6F68] sm:mt-5 sm:text-lg">
        First time? Use the map and trail section above, then today’s snapshot and live conditions
        below. Neighbor-maintained field notes—not a town or park office.
      </p>
      <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {bullets.map(({ label, icon: Icon, href }) => {
          const card = (
            <div className={cardShellClass}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8] bg-[#F6F4EF] text-[#4F6B52] shadow-sm">
                <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </span>
              <span className="text-base font-semibold text-[#1F2A24]">{label}</span>
            </div>
          );
          return (
            <li key={label}>
              {href ? (
                <Link href={href} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>
      </div>
    </motion.section>
  );
}
