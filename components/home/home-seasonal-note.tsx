"use client";

import { Leaf } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import {
  HOME_SEASON_NOTE,
  homeSeasonFromMonth,
  vermontCalendarMonth,
} from "@/lib/home-seasonal";

export function HomeSeasonalNote() {
  const month = vermontCalendarMonth();
  const season = homeSeasonFromMonth(month);
  const body = HOME_SEASON_NOTE[season];

  return (
    <div className="mb-6 rounded-2xl border border-[#dfe8df]/90 bg-white/55 px-4 py-4 shadow-[var(--rr-shadow-card-soft)] sm:mb-8 sm:px-5 sm:py-5">
      <SectionEyebrow
        icon={Leaf}
        className="text-[9px] tracking-[0.22em] text-[#6B6F68]"
        iconClassName="h-4 w-4"
      >
        Seasonal note
      </SectionEyebrow>
      <p className="mt-2 text-sm leading-relaxed text-[#1F2A24] sm:text-[15px]">{body}</p>
    </div>
  );
}
