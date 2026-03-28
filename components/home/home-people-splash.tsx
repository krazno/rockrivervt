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
      className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-1 pt-2 sm:px-6 sm:pb-2 sm:pt-3 lg:px-8"
      aria-label="Visitors at Rock River"
    >
      <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a918c]">
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
                  scale: 1.03,
                  y: -1,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }
            }
            className={cn(
              "relative",
              i > 0 && "-ml-3 sm:-ml-3.5",
            )}
            style={{ zIndex: items.length - i }}
          >
            <Link
              href="/gallery"
              className="relative block h-[3.25rem] w-[3.25rem] overflow-hidden rounded-full border-2 border-[#faf8f4] bg-[#eef0ec] shadow-[0_4px_18px_-10px_rgba(31,42,36,0.18)] ring-2 ring-[#E2E0D8]/75 transition-shadow duration-300 hover:shadow-[0_8px_24px_-12px_rgba(31,42,36,0.2)] hover:ring-[#4F6B52]/22 sm:h-14 sm:w-14"
            >
              <Image
                src={img.src}
                alt={img.alt}
                title={img.title}
                fill
                sizes="56px"
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
