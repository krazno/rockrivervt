"use client";

import { useEffect, useState } from "react";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Radar,
  Sun,
} from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";

type ForecastDaySlice = {
  shortForecast: string;
  high: number | null;
  low: number | null;
};

type WeatherData = {
  temperature: number;
  shortForecast: string;
  icon: string;
  detailedForecast: string;
  hourlyForecastUrl: string;
  timezone: string;
  threeDayForecast: [ForecastDaySlice, ForecastDaySlice, ForecastDaySlice];
  nextFourHours: Array<{
    startTime: string;
    temperature: number;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    icon: string;
    probabilityOfPrecipitation: number | null;
  }>;
  nextTwelveHours: Array<{
    startTime: string;
    temperature: number;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    icon: string;
    probabilityOfPrecipitation: number | null;
  }>;
};

const FORECAST_DAY_LABELS = ["Today", "Tomorrow", "Next"] as const;

function formatHighLow(day: ForecastDaySlice): string {
  const { high, low } = day;
  if (high === null && low === null) return "—";
  if (high !== null && low !== null && high !== low) {
    return `${high}° / ${low}°`;
  }
  const t = high ?? low;
  return `${t}°`;
}

export function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as WeatherData;
        if (!isMounted) return;
        setData(json);
      } catch {
        // placeholders on failure
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  const temperatureText =
    data && typeof data.temperature === "number" ? `${data.temperature}°` : "—";

  const shortForecastText = loading ? "…" : data?.shortForecast ?? "—";

  const nextFourHours = data?.nextFourHours ?? [];

  const hourLabel = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleTimeString([], { hour: "numeric" });
  };

  const tz = data?.timezone ?? "America/New_York";
  const dateLine = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const threeDay = data?.threeDayForecast;
  const forecastSectionLoading = loading && !data;

  const iconForForecast = (forecast: string, size = 18) => {
    const text = forecast.toLowerCase();

    if (text.includes("thunder")) {
      return <CloudLightning className="text-[#9a6b4a]" size={size} />;
    }
    if (text.includes("snow") || text.includes("sleet") || text.includes("flurr")) {
      return <CloudSnow className="text-[#6d7a82]" size={size} />;
    }
    if (text.includes("rain") || text.includes("shower") || text.includes("drizzle")) {
      return <CloudRain className="text-[#5c7a82]" size={size} />;
    }
    if (
      text.includes("partly cloudy") ||
      text.includes("mostly sunny") ||
      text.includes("partly sunny")
    ) {
      return <CloudSun className="text-[#6d8078]" size={size} />;
    }
    if (text.includes("cloud")) {
      return <Cloud className="text-[#6d736d]" size={size} />;
    }
    if (text.includes("sun") || text.includes("clear") || text.includes("fair")) {
      return <Sun className="text-[#b8925a]" size={size} />;
    }

    return <CloudSun className="text-[#6d8078]" size={size} />;
  };

  return (
    <div className="h-full rounded-[1.35rem] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] p-5 shadow-[var(--rr-shadow-card)] backdrop-blur-sm sm:p-6">
      <div className="mb-2 w-full sm:mb-3">
        <SectionEyebrow icon={CloudSun} align="center" className="sm:justify-start">
          Weather
        </SectionEyebrow>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-3 text-center text-[11px] font-medium tracking-[0.02em] text-[var(--rr-text-muted)] sm:mb-4 sm:text-xs">
          {dateLine}
        </p>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="shrink-0 rounded-2xl border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg-soft)] p-2.5 shadow-[var(--rr-shadow-card)]">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#f7f4ed] sm:h-14 sm:w-14">
              {iconForForecast(data?.shortForecast ?? "", 26)}
            </div>
          </div>
          <div className="min-w-0 text-center sm:text-left">
            <p className="mt-0 text-[2.125rem] leading-none font-semibold tracking-tight text-[var(--rr-ink)] sm:text-[2.5rem]">
              {temperatureText}
            </p>
            <p className="mt-1.5 max-w-[16rem] text-[13px] leading-snug text-[var(--rr-text)] sm:text-[0.9375rem]">
              {shortForecastText}
            </p>
            <p className="mt-1 text-[11px] tracking-wide text-[var(--rr-text-muted)]">
              Newfane
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--rr-widget-border)]/80 bg-gradient-to-b from-[var(--rr-widget-bg-soft)]/90 to-transparent p-3 sm:p-4">
        <h3 className="text-center text-[10px] font-semibold tracking-[0.18em] text-[var(--rr-mint)] uppercase">
          Next few hours
        </h3>
        <div className="mt-3 space-y-2">
          {nextFourHours.length > 0
            ? nextFourHours.map((hour) => (
                <div
                  key={hour.startTime}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-[var(--rr-widget-border)]/60 bg-[#faf8f4]/85 px-3 py-2.5 shadow-[0_1px_0_rgb(255_253_249/0.5)_inset] sm:gap-x-4"
                >
                  <span className="min-w-[2.75rem] text-sm font-medium tabular-nums text-[var(--rr-mint)]">
                    {hourLabel(hour.startTime)}
                  </span>
                  <span className="flex shrink-0 items-center justify-center opacity-90">
                    {iconForForecast(hour.shortForecast, 15)}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--rr-ink)]">
                    {hour.temperature}°
                  </span>
                  <span className="min-w-0 flex-1 text-[11px] leading-snug text-[var(--rr-text-muted)] sm:text-xs">
                    {hour.windSpeed} {hour.windDirection}
                  </span>
                  <span className="text-[11px] tabular-nums text-[var(--rr-text-muted)] sm:text-xs">
                    {typeof hour.probabilityOfPrecipitation === "number"
                      ? `${hour.probabilityOfPrecipitation}%`
                      : "—"}
                  </span>
                </div>
              ))
            : Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`placeholder-${idx}`}
                  className="rounded-xl border border-[var(--rr-widget-border)]/50 bg-[#faf8f4]/50 px-3 py-3"
                >
                  <div className="h-4 animate-pulse rounded-lg bg-[#e8e4db] sm:h-5" />
                </div>
              ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--rr-widget-border)]/80 bg-gradient-to-b from-[var(--rr-widget-bg-soft)]/85 to-transparent p-4 sm:p-5">
        <h3 className="text-center text-[10px] font-semibold tracking-[0.16em] text-[var(--rr-mint)] uppercase">
          Outlook
        </h3>
        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
          {FORECAST_DAY_LABELS.map((label, i) => {
            const day = threeDay?.[i];
            return (
              <div
                key={label}
                className="flex min-h-[7.25rem] flex-col items-center rounded-2xl border border-[var(--rr-widget-border)]/70 bg-[#faf8f4]/90 px-2 py-3 text-center shadow-[var(--rr-shadow-card)] sm:min-h-[7.5rem] sm:px-2.5"
              >
                <p className="text-[9px] font-semibold tracking-[0.1em] text-[var(--rr-mint)] uppercase sm:text-[10px]">
                  {label}
                </p>
                {forecastSectionLoading ? (
                  <div className="mt-2 flex flex-1 flex-col items-center justify-center gap-2">
                    <div className="h-7 w-7 animate-pulse rounded-lg bg-[#e8e4db]" />
                    <div className="h-2.5 w-full max-w-[4.5rem] animate-pulse rounded bg-[#e8e4db]" />
                    <div className="h-2 w-10 animate-pulse rounded bg-[#e8e4db]" />
                  </div>
                ) : (
                  <>
                    <div className="mt-2 flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9">
                      {iconForForecast(day?.shortForecast ?? "", 22)}
                    </div>
                    <p className="mt-1.5 line-clamp-2 min-h-[2rem] text-[10px] leading-snug text-[var(--rr-text)] sm:min-h-[2.25rem] sm:text-[11px]">
                      {day?.shortForecast ?? "—"}
                    </p>
                    <p className="mt-auto pt-1.5 text-[10px] font-semibold tabular-nums text-[var(--rr-ink)] sm:text-[11px]">
                      {day ? formatHighLow(day) : "—"}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center pb-0.5">
        <a
          href="https://radar.weather.gov/station/KENX/standard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--rr-widget-border)] bg-[#f5f2eb] px-4 py-2.5 text-xs font-medium text-[var(--rr-link)] transition hover:bg-[#ebe6dc] hover:shadow-[var(--rr-shadow-card-hover)]"
        >
          <Radar className="h-3.5 w-3.5 opacity-80" />
          Radar
        </a>
      </div>
    </div>
  );
}
