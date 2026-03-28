"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { CalendarRange, Clock } from "lucide-react";

import type { HomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";
import { getHomeRiverIntelPeopleAccent } from "@/lib/people-media";

type WeeklySerial = {
  headline: string;
  body: string;
  windowLabel: string;
};

type HomeRiverIntelligenceProps = {
  weekly: WeeklySerial;
  snapshot: HomeVisitSnapshot;
};

/**
 * Pair of light modules: editorial “this week” + weather-derived visit window (no fake precision).
 */
export function HomeRiverIntelligence({ weekly, snapshot }: HomeRiverIntelligenceProps) {
  const { loading, windowHint, timeRangeText } = snapshot;
  const trailFace = useMemo(() => getHomeRiverIntelPeopleAccent(), []);

  const windowSummary =
    loading ? "Loading forecast…"
    : windowHint ?
      <>
        <span className="font-medium text-[#1F2A24]">{timeRangeText}</span>
        <span className="mt-1 block text-[13px] font-normal leading-snug text-[#5a6258]">
          {windowHint.summary}
        </span>
      </>
    : "Open the weather tile for hourly detail—we’ll highlight a calmer window when the forecast loads.";

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-label="This week and best visit window"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E0D8] bg-white/90 p-5 shadow-sm sm:p-6 sm:pr-[7.5rem]">
          {trailFace ?
            <Link
              href="/gallery"
              className="absolute right-4 top-4 hidden h-16 w-16 overflow-hidden rounded-full border-2 border-[#faf8f4] shadow-md ring-2 ring-[#E2E0D8]/80 transition duration-300 hover:ring-[#4F6B52]/30 sm:block"
              aria-label={`${trailFace.title} — open gallery`}
            >
              <Image
                src={trailFace.src}
                alt={trailFace.alt}
                title={trailFace.title}
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </Link>
          : null}
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6F68]">
            <CalendarRange className="h-4 w-4 text-[#4F6B52]" aria-hidden />
            This week at Rock River
          </div>
          <p className="mt-0.5 text-[11px] text-[#9aa39c]">{weekly.windowLabel}</p>
          <h2 className="font-heading mt-3 text-lg font-bold text-[#1F2A24] sm:text-xl">
            {weekly.headline}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#4a524a] sm:text-sm">
            {weekly.body}
          </p>
        </div>
        <div className="rounded-2xl border border-[#E2E0D8] bg-[#f8f9f6] p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6F68]">
            <Clock className="h-4 w-4 text-[#4F6B52]" aria-hidden />
            Best window from forecast
          </div>
          <p className="mt-3 text-[14px] leading-snug text-[#3f4840] sm:text-[15px]">
            {windowSummary}
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-[#8a918c]">
            Hint uses NOAA hourly data—rough guide only; storms and river conditions still rule the day.
          </p>
        </div>
      </div>
    </section>
  );
}
