"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

import { getHomePeopleSplashImages } from "@/lib/people-media";
import { cn } from "@/lib/utils";

/**
 * Small overlapping circles below the hero — welcoming human warmth without competing with the main photo.
 */
export function HomePeopleSplash() {
  const items = useMemo(() => getHomePeopleSplashImages(), []);
  const reduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <div
      className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-2 pt-4 sm:px-6 sm:pb-3 sm:pt-5 lg:px-8"
      aria-label="Visitors at Rock River"
    >
      <p className="mb-4 text-center text-[10px] font-medium tracking-[0.14em] text-[#8a918c] sm:mb-4 sm:text-[11px] sm:tracking-[0.12em]">
        Real river days
      </p>
      <div className="flex justify-center" role="list">
        {items.map((img, i) => (
          <motion.div
            key={img.src}
            role="listitem"
            initial={false}
            whileHover={
              reduceMotion ?
                undefined
              : {
                  scale: 1.055,
                  y: -1,
                  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                }
            }
            className={cn(
              "relative",
              i > 0 && "-ml-[1.125rem] sm:-ml-5",
            )}
            style={{ zIndex: items.length - i }}
          >
            <Link
              href="/gallery"
              className="relative block h-16 w-16 overflow-hidden rounded-full border-2 border-[#faf8f4] bg-[#eef0ec] shadow-[0_4px_18px_-10px_rgba(31,42,36,0.18)] ring-2 ring-[#E2E0D8]/75 transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_8px_24px_-12px_rgba(31,42,36,0.2)] hover:ring-[#4F6B52]/22 sm:h-[4.5rem] sm:w-[4.5rem] motion-reduce:transition-shadow"
            >
              <Image
                src={img.src}
                alt={img.alt}
                title={img.title}
                fill
                sizes="72px"
                className="object-cover object-center"
              />
              <span className="sr-only">{img.title}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
