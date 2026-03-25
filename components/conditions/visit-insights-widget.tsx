"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarHeart,
  Car,
  CloudSun,
  Droplets,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";

import type { CrowdSummaryResponse } from "@/lib/crowd/types";
import type { RiverApiResponse } from "@/lib/river-types";
import {
  beachCrowdPhrase,
  bestVisitWindow,
  findParkingSummary,
  parkingFromCrowdLevel,
  waterComfortPhrase,
  type ParkingDifficulty,
  type WeatherHourSlice,
} from "@/lib/visit-insights";
import { cn } from "@/lib/utils";

type WeatherPayload = {
  timezone?: string;
  shortForecast?: string;
  temperature?: number;
  nextTwelveHours?: WeatherHourSlice[];
};

const PARKING_UI: Record<
  ParkingDifficulty,
  { label: string; sub: string; icon: LucideIcon; ring: string; chip: string }
> = {
  easy: {
    label: "Easy",
    sub: "Mostly easy—updates when people check in parking",
    icon: Car,
    ring: "ring-[#b8d4c8]/45",
    chip: "border-[#c5ddd2] bg-[#eef6f2] text-[#2d4f3c]",
  },
  moderate: {
    label: "Moderate",
    sub: "Crowdsourced parking feel",
    icon: Car,
    ring: "ring-[#c9b86a]/45",
    chip: "border-[#d4c89a] bg-[#f5f0e0] text-[#5a4a1a]",
  },
  hard: {
    label: "Hard",
    sub: "Crowdsourced parking feel",
    icon: Car,
    ring: "ring-[#d4a878]/45",
    chip: "border-[#d4b4a8] bg-[#f7ece8] text-[#6b2f24]",
  },
  full: {
    label: "Full",
    sub: "Crowdsourced parking feel",
    icon: Car,
    ring: "ring-[#c98a8a]/50",
    chip: "border-[#d4a8a8] bg-[#f7e8e8] text-[#5c2222]",
  },
};

function MetricRow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-[var(--rr-widget-border)]/70 bg-[#faf8f4]/80 px-3 py-2.5 sm:px-3.5 sm:py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg-soft)] text-[var(--rr-forest)]">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-[13px] leading-snug text-[var(--rr-ink)] sm:text-sm">
        {children}
      </p>
    </div>
  );
}

export function VisitInsightsWidget() {
  const [weather, setWeather] = useState<WeatherPayload | null>(null);
  const [crowd, setCrowd] = useState<CrowdSummaryResponse | null>(null);
  const [river, setRiver] = useState<RiverApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const [wRes, cRes, rRes] = await Promise.all([
          fetch("/api/weather", { cache: "no-store" }),
          fetch("/api/crowd", { cache: "no-store" }),
          fetch("/api/river", { cache: "no-store" }),
        ]);
        const [wJson, cJson, rJson] = await Promise.all([
          wRes.ok ? wRes.json() : null,
          cRes.ok ? cRes.json() : null,
          rRes.ok ? rRes.json() : null,
        ]);
        if (!alive) return;
        setWeather(wJson as WeatherPayload);
        setCrowd(cJson as CrowdSummaryResponse);
        setRiver(rJson as RiverApiResponse);
      } catch {
        if (!alive) return;
        setWeather(null);
        setCrowd(null);
        setRiver(null);
      } finally {
        if (alive) setLoading(false);
      }
    }
    void load();
    return () => {
      alive = false;
    };
  }, []);

  const tz = weather?.timezone ?? "America/New_York";
  const hours = weather?.nextTwelveHours ?? [];

  const windowHint = useMemo(
    () => bestVisitWindow(hours, tz),
    [hours, tz],
  );

  const waterLine = useMemo(
    () => waterComfortPhrase(river?.estimatedWaterTempF ?? null),
    [river?.estimatedWaterTempF],
  );

  const beachLine = useMemo(() => {
    if (!crowd?.areas?.length) {
      return "Crowd at beaches — check-ins update through the day";
    }
    return beachCrowdPhrase(crowd.areas);
  }, [crowd?.areas]);

  const parkingRow = useMemo(() => {
    const p = crowd?.areas ? findParkingSummary(crowd.areas) : undefined;
    const hasParkingCheckins = Boolean(p && p.reportCount > 0);
    const level: ParkingDifficulty =
      hasParkingCheckins && p ?
        parkingFromCrowdLevel(p.displayedLevel)
      : "easy";
    return { level, hasSignal: hasParkingCheckins };
  }, [crowd?.areas]);

  const parkingUi = PARKING_UI[parkingRow.level];
  const ParkingIcon = parkingUi.icon;

  const timeRangeText =
    windowHint ?
      `${windowHint.startLabel}–${windowHint.endLabel}`
    : loading ? "…"
    : "Weather windows loading";

  return (
    <section
      className="mb-7 rounded-[1.35rem] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] p-5 shadow-[var(--rr-shadow-card)] backdrop-blur-sm sm:mb-8 sm:p-6"
      aria-labelledby="visit-insights-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <header className="w-full text-center sm:min-w-0 sm:flex-1 sm:text-left">
          <SectionEyebrow icon={Sparkles} align="center" className="sm:justify-start">
            Plan today
          </SectionEyebrow>
          <h2
            id="visit-insights-heading"
            className="font-heading mt-2 text-lg font-semibold tracking-tight text-[var(--rr-ink)] sm:mt-2 sm:text-xl"
          >
            Best time to visit today
          </h2>
          <p className="mt-1 text-[12px] text-[var(--rr-text-muted)] sm:text-[13px]">
            NOAA hourly forecast, est. water temp, and today’s crowd check-ins.
          </p>
        </header>
        <div
          className={cn(
            "mx-auto flex w-fit shrink-0 items-center gap-2 rounded-full border-2 px-3 py-2 text-xs font-semibold shadow-sm ring-2 sm:mx-0 sm:px-4 sm:py-2.5 sm:text-sm",
            parkingUi.chip,
            parkingUi.ring,
          )}
          title={parkingUi.sub}
        >
          <ParkingIcon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          <span className="tabular-nums">Parking · {parkingUi.label}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--rr-widget-border)] bg-gradient-to-br from-[var(--rr-widget-bg-soft)] to-transparent p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[var(--rr-mint)]">
            <CalendarHeart className="h-4 w-4" aria-hidden />
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Best window
            </p>
          </div>
          {loading && !windowHint ? (
            <p className="mt-2 text-sm text-[var(--rr-text-muted)]">Loading…</p>
          ) : (
            <>
              <p className="mt-2 font-heading text-base font-semibold text-[var(--rr-ink)] sm:text-lg">
                {windowHint?.summary ?? "Check weather"}
              </p>
              <p className="mt-1 text-sm font-medium tabular-nums text-[var(--rr-forest)]">
                {timeRangeText}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--rr-text-muted)]">
                Best 2–4 hour span in the next ~12 hours (drier, calmer sky scores higher).
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <MetricRow icon={Droplets}>{waterLine}</MetricRow>
          <MetricRow icon={Users}>{beachLine}</MetricRow>
          <MetricRow icon={CloudSun}>
            {typeof weather?.temperature === "number" && weather.shortForecast ?
              <>Now about {weather.temperature}°F — {weather.shortForecast}</>
            : loading ?
              "Current sky…"
            : "Current conditions from NOAA load above when available."}
          </MetricRow>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[var(--rr-text-muted)] sm:text-xs">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8b6a42]" aria-hidden />
        <span>
          Parking starts as <strong className="font-semibold text-[var(--rr-ink)]">Easy</strong> until
          parking check-ins roll in; then it follows the blend. Not a guarantee of open spaces.
        </span>
      </p>
    </section>
  );
}
