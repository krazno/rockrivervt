"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Clock3,
  Radar,
  Sun,
} from "lucide-react";

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
};

const FORECAST_DAY_LABELS = ["Today", "Tomorrow", "Next day"] as const;

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
  const [showHourlyDetails, setShowHourlyDetails] = useState(false);

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
        // Keep placeholders on failure.
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
    data && typeof data.temperature === "number"
      ? `${data.temperature}°`
      : "—";

  const shortForecastText = loading ? "Loading forecast..." : data?.shortForecast ?? "—";

  const detailedForecastText = data?.detailedForecast ?? null;

  const nextFourHours = data?.nextFourHours ?? [];

  const hourLabel = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleTimeString([], { hour: "numeric" });
  };

  const hourRangeOnly = (() => {
    if (nextFourHours.length < 2) return null;
    const first = hourLabel(nextFourHours[0].startTime);
    const last = hourLabel(nextFourHours[nextFourHours.length - 1].startTime);
    if (first === "—" || last === "—") return null;
    return `${first} to ${last}`;
  })();

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
      return <CloudLightning className="text-[#c06f3c]" size={size} />;
    }
    if (text.includes("snow") || text.includes("sleet") || text.includes("flurr")) {
      return <CloudSnow className="text-[#527281]" size={size} />;
    }
    if (text.includes("rain") || text.includes("shower") || text.includes("drizzle")) {
      return <CloudRain className="text-[#3f6676]" size={size} />;
    }
    if (
      text.includes("partly cloudy") ||
      text.includes("mostly sunny") ||
      text.includes("partly sunny")
    ) {
      return <CloudSun className="text-[#5a7a8a]" size={size} />;
    }
    if (text.includes("cloud")) {
      return <Cloud className="text-[#5c6d72]" size={size} />;
    }
    if (text.includes("sun") || text.includes("clear") || text.includes("fair")) {
      return <Sun className="text-[#b68140]" size={size} />;
    }

    return <CloudSun className="text-[#5a7a8a]" size={size} />;
  };

  return (
    <div className="h-full rounded-2xl border border-[#c0cad2] bg-white/65 p-4 shadow-[0_6px_26px_-20px_rgba(22,38,48,0.22)] backdrop-blur-[2px] sm:p-5">
      <div className="flex flex-col items-center">
        <p className="mb-3 text-center text-[11px] font-medium tracking-[0.02em] text-[#6b7f88] sm:mb-3.5 sm:text-xs">
          {dateLine}
        </p>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="shrink-0 rounded-2xl border border-[#d0d8e0] bg-[#eef1f4] p-2 shadow-[0_8px_20px_-16px_rgba(24,49,43,0.4)]">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#f6f8f9] sm:h-14 sm:w-14">
              {iconForForecast(data?.shortForecast ?? "", 26)}
            </div>
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#4f6d7a] uppercase">
              Weather
            </p>
            <p className="mt-1.5 text-[2.125rem] leading-none font-semibold tracking-tight text-[#2a3842] sm:text-[2.375rem]">
              {temperatureText}
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-[#3d4f5c]">
              {shortForecastText}
            </p>
            <p className="mt-1 text-[11px] tracking-wide text-[#5f737f]">
              Newfane · forecast
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3.5 rounded-xl border border-[#d0d8e0] bg-[#eef1f4] p-2.5 sm:p-3">
        <h3 className="text-center text-[11px] font-bold tracking-[0.18em] text-[#2a3842] uppercase">
          Next 4 hours
        </h3>
        {hourRangeOnly ? (
          <p className="mt-1 text-center text-[13px] text-[#5f737f]">
            {hourRangeOnly}
          </p>
        ) : null}
        <div className="mt-2 overflow-hidden rounded-lg border border-[#d0d6de] bg-[#f5f7f8]">
          <div className="grid grid-cols-[2.75rem_1.125rem_2.5rem_minmax(0,1fr)_minmax(2.25rem,2.75rem)] items-center gap-x-2 border-b border-[#dfe0e4] bg-[#eef1f4] px-2 py-1.5 text-[9px] font-bold leading-tight tracking-[0.06em] text-[#5a6b78] uppercase sm:px-2.5 sm:text-[10px]">
            <span>Time</span>
            <span className="text-center">Cond.</span>
            <span>Temp</span>
            <span className="min-w-0">Wind</span>
            <span className="text-right">Rain</span>
          </div>
          {nextFourHours.length > 0
            ? nextFourHours.map((hour) => (
                <div
                  key={hour.startTime}
                  className="grid grid-cols-[2.75rem_1.125rem_2.5rem_minmax(0,1fr)_minmax(2.25rem,2.75rem)] items-center gap-x-2 border-b border-[#e2e5e8] px-2 py-1.5 text-[10px] last:border-b-0 sm:px-2.5 sm:text-[11px]"
                >
                  <span className="font-medium tabular-nums text-[#4f6d7a]">
                    {hourLabel(hour.startTime)}
                  </span>
                  <span className="flex items-center justify-center">
                    {iconForForecast(hour.shortForecast, 15)}
                  </span>
                  <span className="font-semibold tabular-nums text-[#2a3842]">
                    {hour.temperature}°
                  </span>
                  <span className="min-w-0 break-words leading-snug text-[#5f737f]">
                    {hour.windSpeed} {hour.windDirection}
                  </span>
                  <span className="text-right tabular-nums text-[#5f737f]">
                    {typeof hour.probabilityOfPrecipitation === "number"
                      ? `${hour.probabilityOfPrecipitation}%`
                      : "—"}
                  </span>
                </div>
              ))
            : Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`placeholder-${idx}`}
                  className="border-b border-[#e2e5e8] px-2 py-1.5 last:border-b-0 sm:px-2.5"
                >
                  <div className="h-4 animate-pulse rounded bg-[#e8ecef] sm:h-5" />
                </div>
              ))}
        </div>
        <div className="mt-2.5 flex justify-center">
          <button
            type="button"
            onClick={() => setShowHourlyDetails((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-3 py-1.5 text-xs font-medium text-[#3d5a68] transition duration-200 hover:bg-[#e9f0ea] hover:shadow-[0_12px_30px_-24px_rgba(24,49,43,0.65)]"
          >
            <Clock3 className="h-3.5 w-3.5" />
            Hourly details
            {showHourlyDetails ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {showHourlyDetails && detailedForecastText ? (
          <div className="mt-3 rounded-lg border border-[#d5e0d6] bg-[#f3f5f6] p-3.5">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-[#4f6d7a] uppercase">
              Hourly details
            </p>
            <p className="mt-2 whitespace-normal break-words text-xs leading-relaxed text-[#5a6b78]">
              {detailedForecastText}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 rounded-xl border border-[#d0d8e0] bg-[#eef1f4] p-3 sm:p-3.5">
        <h3 className="text-center text-[11px] font-bold tracking-[0.16em] text-[#2a3842] uppercase">
          Forecast
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-2.5">
          {FORECAST_DAY_LABELS.map((label, i) => {
            const day = threeDay?.[i];
            return (
              <div
                key={label}
                className="flex min-h-[7.5rem] flex-col items-center rounded-xl border border-[#d0ddd2] bg-[#f5f7f8] px-1.5 py-2.5 text-center shadow-[0_6px_16px_-14px_rgba(24,49,43,0.35)] sm:min-h-[7.75rem] sm:px-2"
              >
                <p className="text-[9px] font-bold tracking-[0.1em] text-[#4f6d7a] uppercase sm:text-[10px]">
                  {label}
                </p>
                {forecastSectionLoading ? (
                  <div className="mt-2 flex flex-1 flex-col items-center justify-center gap-2">
                    <div className="h-7 w-7 animate-pulse rounded-lg bg-[#e8eaeb]" />
                    <div className="h-2.5 w-full max-w-[4.5rem] animate-pulse rounded bg-[#e8eaeb]" />
                    <div className="h-2 w-10 animate-pulse rounded bg-[#e8eaeb]" />
                  </div>
                ) : (
                  <>
                    <div className="mt-2 flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9">
                      {iconForForecast(day?.shortForecast ?? "", 22)}
                    </div>
                    <p className="mt-1.5 line-clamp-2 min-h-[2rem] text-[10px] leading-snug text-[#3d4f5c] sm:min-h-[2.25rem] sm:text-[11px]">
                      {day?.shortForecast ?? "—"}
                    </p>
                    <p className="mt-auto pt-1.5 text-[10px] font-semibold tabular-nums text-[#2a3842] sm:text-[11px]">
                      {day ? formatHighLow(day) : "—"}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-center pb-0.5">
        <a
          href="https://radar.weather.gov/station/KENX/standard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-3 py-1.5 text-xs font-medium text-[#3d5a68] transition duration-200 hover:bg-[#e9f0ea] hover:shadow-[0_12px_30px_-24px_rgba(24,49,43,0.65)]"
        >
          <Radar className="h-3.5 w-3.5" />
          Radar
        </a>
      </div>
    </div>
  );
}

