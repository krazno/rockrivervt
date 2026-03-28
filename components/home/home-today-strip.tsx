"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CloudSun, Droplets, Users } from "lucide-react";

import type { HomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";
import { trackRrInteraction } from "@/lib/analytics";

type HomeTodayStripProps = {
  snapshot: HomeVisitSnapshot;
};

function StripStat({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-[min(100%,260px)] shrink-0 snap-start sm:min-w-0">
      <div className="flex min-w-0 gap-3 rounded-2xl border border-white/60 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-sm sm:rounded-xl sm:py-3.5">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8]/80 bg-white text-[#4F6B52] shadow-sm">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5a6258]">
            {label}
          </p>
          <p className="mt-1 text-[14px] font-medium leading-snug text-[#1F2A24] sm:text-[15px]">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

const linkBtnClass =
  "inline-flex items-center gap-1.5 rounded-full border border-[#4F6B52]/25 bg-white/90 px-3.5 py-1.5 text-[12px] font-semibold text-[#2d4a38] shadow-sm transition hover:border-[#4F6B52]/45 hover:bg-white";

/**
 * Three stats + quick links; background uses a slow drift (see globals `.rr-now-backdrop`).
 */
export function HomeTodayStrip({ snapshot }: HomeTodayStripProps) {
  const { loading, weather, river, waterLine, beachLine } = snapshot;

  const waterDisplay =
    typeof river?.estimatedWaterTempF === "number" && !Number.isNaN(river.estimatedWaterTempF) ?
      <>
        {waterLine}
        <span className="mt-1 block text-[12px] font-normal text-[#5a6258]">
          ~{Math.round(river.estimatedWaterTempF)}°F est.
        </span>
      </>
    : waterLine;

  const weatherDisplay =
    typeof weather?.temperature === "number" && weather.shortForecast ?
      <>
        {weather.temperature}°F · {weather.shortForecast}
      </>
    : loading ?
      "Loading…"
    : "Forecast loads when NOAA responds";

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="right-now-preview-heading"
    >
      <div className="relative overflow-hidden rounded-[1.35rem] border border-[#E2E0D8]/90 shadow-[0_12px_40px_-24px_rgba(31,42,36,0.35)]">
        <div
          className="rr-now-backdrop pointer-events-none absolute inset-0 opacity-90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#F6F4EF]/30"
          aria-hidden
        />
        <div className="relative z-10 px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#5a6258]">
                Snapshot
              </p>
              <h2
                id="right-now-preview-heading"
                className="font-heading mt-1 text-[clamp(1.65rem,2.5vw+1rem,2.25rem)] font-bold tracking-tight text-[#1F2A24]"
              >
                Right now
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#4a524a]">
                Air, water, and crowd feel—same three cards as below. Use the buttons to dig in.
              </p>
            </div>
            <nav
              className="flex flex-wrap gap-2 sm:justify-end"
              aria-label="Jump to conditions detail"
            >
              <Link href="/weather" className={linkBtnClass}>
                Full forecast
                <ArrowRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
              </Link>
              <Link href="/conditions" className={linkBtnClass}>
                Conditions page
                <ArrowRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
              </Link>
              <Link
                href="/plan-your-day"
                className={linkBtnClass}
                onClick={() => trackRrInteraction("navigation", "home_plan_your_day")}
              >
                Plan your day
                <ArrowRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
              </Link>
              <Link href="#crowd-check-in" className={linkBtnClass}>
                Crowd check-in
                <ArrowRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
              </Link>
            </nav>
          </div>

          <div className="mt-6 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin] sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0">
            <StripStat icon={CloudSun} label="Weather">
              {weatherDisplay}
            </StripStat>
            <StripStat icon={Droplets} label="River & swim">
              {waterDisplay}
            </StripStat>
            <StripStat icon={Users} label="How busy it feels">
              {beachLine}
            </StripStat>
          </div>
        </div>
      </div>
    </section>
  );
}
