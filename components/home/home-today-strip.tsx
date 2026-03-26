"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CloudSun, Droplets, Leaf, Users } from "lucide-react";

import type { HomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";
import {
  HOME_SEASON_STRIP,
  homeSeasonFromMonth,
  vermontCalendarMonth,
} from "@/lib/home-seasonal";
type HomeTodayStripProps = {
  snapshot: HomeVisitSnapshot;
};

function StripCell({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 gap-2.5 rounded-xl border border-[#E2E0D8]/90 bg-[#F6F4EF]/70 px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8] bg-white text-[#4F6B52] shadow-sm">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B6F68]">
          {label}
        </p>
        <p className="mt-0.5 text-[13px] font-medium leading-snug text-[#1F2A24] sm:text-sm">
          {children}
        </p>
      </div>
    </div>
  );
}

export function HomeTodayStrip({ snapshot }: HomeTodayStripProps) {
  const { loading, weather, river, waterLine, beachLine, parkingUi } = snapshot;
  const ParkingIcon = parkingUi.icon;
  const month = vermontCalendarMonth();
  const season = homeSeasonFromMonth(month);
  const seasonLine = HOME_SEASON_STRIP[season];

  const waterDisplay =
    typeof river?.estimatedWaterTempF === "number" && !Number.isNaN(river.estimatedWaterTempF) ?
      <>
        {waterLine}
        <span className="mt-0.5 block text-[12px] font-normal text-[#6B6F68]">
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
      aria-labelledby="before-you-go-today-heading"
    >
      <h2
        id="before-you-go-today-heading"
        className="font-heading text-lg font-semibold tracking-tight text-[#1F2A24] sm:text-xl"
      >
        Before you go today
      </h2>
      <div className="mt-4 rounded-2xl border border-[#E2E0D8] bg-white p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StripCell icon={CloudSun} label="Weather">
            {weatherDisplay}
          </StripCell>
          <StripCell icon={Droplets} label="Water">
            {waterDisplay}
          </StripCell>
          <StripCell icon={Users} label="Crowd feel">
            {beachLine}
          </StripCell>
          <StripCell icon={ParkingIcon} label="Parking">
            <span className="tabular-nums">Mostly {parkingUi.label.toLowerCase()}</span>
            <span className="mt-0.5 block text-[11px] font-normal opacity-90">
              From today’s check-ins when people share it
            </span>
          </StripCell>
          <StripCell icon={Leaf} label="Season">
            {seasonLine}
          </StripCell>
        </div>
      </div>
    </section>
  );
}
