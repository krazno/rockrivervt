"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun } from "lucide-react";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import type { DailyPulsePayload } from "@/lib/daily-pulse";
import {
  formatNoteDateForDisplay,
  pulseKindLabel,
} from "@/lib/daily-pulse";
import { cn } from "@/lib/utils";

type HomeDailyPulseProps = {
  pulse: DailyPulsePayload;
};

type WeatherSnap = {
  shortForecast: string;
  high: number | null;
  low: number | null;
} | null;

/**
 * Human field note + photo + season context; optional one-line NWS summary from /api/weather.
 */
export function HomeDailyPulse({ pulse }: HomeDailyPulseProps) {
  const [weatherLine, setWeatherLine] = useState<WeatherSnap>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok || !alive) return;
        const j = (await res.json()) as {
          shortForecast?: string;
          threeDayForecast?: Array<{ shortForecast: string; high: number | null; low: number | null }>;
        };
        const day0 = j.threeDayForecast?.[0];
        if (day0) {
          setWeatherLine({
            shortForecast: day0.shortForecast || j.shortForecast || "",
            high: day0.high,
            low: day0.low,
          });
        } else if (j.shortForecast) {
          setWeatherLine({
            shortForecast: j.shortForecast,
            high: null,
            low: null,
          });
        }
      } catch {
        /* optional */
      }
    }
    void load();
    return () => {
      alive = false;
    };
  }, []);

  const { note, kind, photo, seasonalLine, vermontToday } = pulse;
  const noteDateLabel = formatNoteDateForDisplay(note.date);
  const kindLabel = pulseKindLabel(kind);
  const bodyParagraphs = note.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  const weatherSentence =
    weatherLine?.shortForecast ?
      [
        weatherLine.shortForecast,
        weatherLine.high != null && weatherLine.low != null ?
          `High near ${weatherLine.high}°, low near ${weatherLine.low}°.`
        : weatherLine.high != null ? `High near ${weatherLine.high}°.`
        : null,
      ]
        .filter(Boolean)
        .join(" ")
    : null;

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="home-daily-pulse-heading"
    >
      <div className="overflow-hidden rounded-2xl border border-[#E2E0D8] bg-white/95 shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(220px,38%)]">
          <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-7">
            <HomeSectionHeader
              eyebrow="Today at Rock River"
              icon={Sun}
              id="home-daily-pulse-heading"
              title={note.headline}
              titleClassName="text-[#1F2A24] text-xl font-bold tracking-tight sm:text-2xl"
              eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
              eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
              description={
                <span className="text-[#6B6F68]">
                  <span className="font-medium text-[#4a5c4e]">{kindLabel}</span>
                  {" · "}
                  <time dateTime={note.date}>{noteDateLabel}</time>
                  {kind !== "today" && vermontToday !== note.date ?
                    <span className="block pt-1 text-[12px] text-[#8a918c]">
                      Vermont today is {formatNoteDateForDisplay(vermontToday)}—nothing newer is in the
                      journal yet.
                    </span>
                  : null}
                </span>
              }
              descriptionClassName="text-[#6B6F68]"
              className="mb-4 text-center sm:mb-5 sm:text-left"
            />

            <div className="space-y-3 text-[14px] leading-relaxed text-[#3f4840] sm:text-[15px]">
              {bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <p className="mt-4 border-t border-[#ECEAE4] pt-4 text-[13px] leading-relaxed text-[#5a635e] italic">
              {seasonalLine}
            </p>

            {weatherSentence ?
              <p
                className="mt-3 text-[12px] leading-snug text-[#6B6F68]"
                data-source="nws"
              >
                <span className="font-medium text-[#5a635e] not-italic">Forecast snapshot: </span>
                {weatherSentence}
              </p>
            : null}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#ECEAE4] pt-4">
              <Link
                href="/daily-updates"
                className="text-sm font-semibold text-[#4F6B52] underline-offset-4 hover:underline"
              >
                All daily updates
              </Link>
              <span className="text-[11px] text-[#9aa39c]">
                Last journal entry · <time dateTime={note.date}>{noteDateLabel}</time>
              </span>
            </div>
          </div>

          <div className="relative min-h-[200px] border-t border-[#E2E0D8] lg:min-h-[280px] lg:border-l lg:border-t-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className={cn("object-cover", "motion-safe:transition-transform motion-safe:duration-[20s] motion-safe:ease-out hover:scale-[1.02]")}
              sizes="(max-width:1024px) 100vw, 38vw"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a2822]/25 via-transparent to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </div>
    </section>
  );
}
