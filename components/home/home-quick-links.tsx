"use client";

import { Compass, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

import { HomeSectionHeader } from "@/components/home/home-section-header";
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

const ICON_ACCENTS = [
  { well: "bg-[#F6F4EF] text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
  { well: "bg-white text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
  { well: "bg-[#F6F4EF] text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
  { well: "bg-white text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
  { well: "bg-[#F6F4EF] text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
  { well: "bg-white text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
  { well: "bg-[#F6F4EF] text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
  { well: "bg-white text-[#1F2A24] border-[#E2E0D8]", ring: "ring-[#4F6B52]/30" },
] as const;

const circleOuter =
  "group relative flex aspect-square w-full max-w-[9.75rem] flex-col items-center justify-center rounded-full border border-[#E2E0D8] bg-white px-3 py-4 text-center shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[#4F6B52]/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6B52]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF] sm:max-w-[10.25rem] sm:px-4 sm:py-5";

export function HomeQuickLinks({ links }: HomeQuickLinksProps) {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="explore-links-heading"
    >
      <HomeSectionHeader
        eyebrow="Quick links"
        icon={Compass}
        id="explore-links-heading"
        title="Explore"
        titleClassName="text-[#1F2A24] font-bold"
        eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
        eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
        description="Maps, community, guidelines, history, and more—pick a circle below."
        className="mb-8 sm:mb-9"
      />
      <div className="grid grid-cols-2 justify-items-center gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-4">
        {links.map((link, i) => {
          const Icon = link.icon;
          const accent = ICON_ACCENTS[i % ICON_ACCENTS.length]!;
          return (
            <motion.div
              key={link.title}
              className="w-full max-w-[10.25rem]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.38, delay: Math.min(i * 0.03, 0.2) }}
            >
              <Link href={link.href} className={cn(circleOuter)}>
                <span
                  className="pointer-events-none absolute inset-2 rounded-full bg-gradient-to-br from-[#4F6B52]/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className={cn(
                    "relative mb-1.5 flex h-14 w-14 items-center justify-center rounded-full border shadow-sm transition duration-200 group-hover:border-[#4F6B52]/40 sm:h-[3.75rem] sm:w-[3.75rem]",
                    accent.well,
                    accent.ring,
                    "ring-2",
                  )}
                >
                  <Icon
                    className="h-6 w-6 text-[#4F6B52] sm:h-6 sm:w-6"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </span>
                <span className="relative font-heading text-[0.9rem] font-extrabold leading-tight text-[#1F2A24] sm:text-[0.95rem]">
                  {link.title}
                </span>
                {link.description?.trim() ? (
                  <span className="relative mt-1 line-clamp-2 text-[0.65rem] font-medium leading-snug text-[#6B6F68] sm:text-[10px]">
                    {link.description}
                  </span>
                ) : null}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
