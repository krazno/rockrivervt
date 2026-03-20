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

type WeatherData = {
  temperature: number;
  shortForecast: string;
  icon: string;
  detailedForecast: string;
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

  const detailedForecastText = data?.detailedForecast
    ? data.detailedForecast.length > 120
      ? `${data.detailedForecast.slice(0, 120)}...`
      : data.detailedForecast
    : null;

  const nextFourHours = data?.nextFourHours ?? [];

  const hourLabel = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleTimeString([], { hour: "numeric" });
  };

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
      return <CloudSun className="text-[#5c7f62]" size={size} />;
    }
    if (text.includes("cloud")) {
      return <Cloud className="text-[#5c6d72]" size={size} />;
    }
    if (text.includes("sun") || text.includes("clear") || text.includes("fair")) {
      return <Sun className="text-[#b68140]" size={size} />;
    }

    return <CloudSun className="text-[#5c7f62]" size={size} />;
  };

  return (
    <div className="rounded-2xl border border-[#c2d0c6] bg-[#f8f8f3] p-5 shadow-[0_10px_30px_-24px_rgba(24,49,43,0.55)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#4d6d61] uppercase">
            Weather
          </p>
          <p className="mt-1 text-4xl leading-none font-semibold tracking-tight text-[#1f3a30]">
            {temperatureText}
          </p>
          <p className="mt-1 text-sm leading-5 text-[#38594f]">
            {shortForecastText}
          </p>
          <p className="mt-1 text-xs leading-5 text-[#5c786e]">
            Newfane, Vermont
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-[#d3ddd3] bg-[#eef4ed] p-2 shadow-[0_8px_20px_-16px_rgba(24,49,43,0.45)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7fbf6]">
            {iconForForecast(data?.shortForecast ?? "", 24)}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#d4ddd3] bg-[#edf3ec] p-3">
        <div className="mb-2 flex items-center justify-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5 text-[#4d6d61]" />
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
            Next 4 hours
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-[#d7e1d8] bg-[#f6faf4]">
          {nextFourHours.length > 0
            ? nextFourHours.map((hour) => (
                <div
                  key={hour.startTime}
                  className="grid grid-cols-[50px_24px_36px_1fr_52px] items-center gap-2 border-b border-[#e2e9e2] px-2.5 py-2 text-[11px] last:border-b-0"
                >
                  <span className="font-medium text-[#4f6f63]">
                    {hourLabel(hour.startTime)}
                  </span>
                  <span className="flex items-center justify-center">
                    {iconForForecast(hour.shortForecast, 16)}
                  </span>
                  <span className="font-semibold text-[#1f3a30]">
                    {hour.temperature}°
                  </span>
                  <span className="truncate text-[#5c786e]">
                    {hour.windSpeed} {hour.windDirection}
                  </span>
                  <span className="text-right text-[#5c786e]">
                    {typeof hour.probabilityOfPrecipitation === "number"
                      ? `${hour.probabilityOfPrecipitation}%`
                      : "—"}
                  </span>
                </div>
              ))
            : Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`placeholder-${idx}`}
                  className="border-b border-[#e2e9e2] px-2.5 py-2 last:border-b-0"
                >
                  <div className="h-5 animate-pulse rounded bg-[#ecf3ea]" />
                </div>
              ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setShowHourlyDetails((prev) => !prev)}
          className="inline-flex items-center gap-1 rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-3 py-1.5 text-xs font-medium text-[#35584c] transition duration-200 hover:bg-[#e9f0ea] hover:shadow-[0_12px_30px_-24px_rgba(24,49,43,0.65)]"
        >
          <Clock3 className="h-3.5 w-3.5" />
          Hourly details
          {showHourlyDetails ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
        <a
          href="https://radar.weather.gov/station/KENX/standard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-3 py-1.5 text-xs font-medium text-[#35584c] transition duration-200 hover:bg-[#e9f0ea] hover:shadow-[0_12px_30px_-24px_rgba(24,49,43,0.65)]"
        >
          <Radar className="h-3.5 w-3.5" />
          Radar
        </a>
      </div>

      {showHourlyDetails && detailedForecastText ? (
        <div className="mt-3 rounded-xl border border-[#d4ddd3] bg-[#f1f6ef] p-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
            Hourly details
          </p>
          <p className="mt-1.5 text-xs leading-5 text-[#56756a]">
            {detailedForecastText}
          </p>
        </div>
      ) : null}
    </div>
  );
}

