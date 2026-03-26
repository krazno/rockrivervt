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

import { HomeCollapsibleSection } from "@/components/home/home-collapsible-section";

const cardShellClass =
  "flex h-full items-center gap-4 rounded-2xl border border-[#E2E0D8] bg-white p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md";

const bullets: { label: string; icon: typeof MapPinned; href?: string }[] = [
  { label: "Map & trail", icon: MapPinned, href: "/map" },
  { label: "Swimming holes", icon: Droplets, href: "/visit" },
  { label: "Conditions", icon: CloudSun, href: "/conditions" },
  { label: "Parking", icon: Car, href: "/map" },
  { label: "Guidelines", icon: Shield },
  { label: "Community info", icon: Users },
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
      <HomeCollapsibleSection
        panelId="visitor-guide-panel"
        summaryContent={
          <h2
            id="visitor-guide-identity-heading"
            className="font-heading text-balance text-3xl font-extrabold tracking-tight text-[#1F2A24] sm:text-4xl"
          >
            Rock River Visitor Guide
          </h2>
        }
      >
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6B6F68] sm:text-lg">
          Neighbor-written notes on Rock River swimming holes, the trail, and the preserve in Newfane Vermont—unofficial but well known.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
      </HomeCollapsibleSection>
    </motion.section>
  );
}
