"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarHeart,
  CloudSun,
  Droplets,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

import type { HomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { cn } from "@/lib/utils";

function MetricRow({
  icon: Icon,
  children,
  iconSize = "default",
}: {
  icon: LucideIcon;
  children: ReactNode;
  iconSize?: "default" | "home";
}) {
  const wrap =
    iconSize === "home" ?
      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E2E0D8] bg-[#F6F4EF] text-[#4F6B52]"
    : "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg-soft)] text-[var(--rr-forest)]";
  const ico = iconSize === "home" ? "h-5 w-5" : "h-4 w-4";
  const rowShell =
    iconSize === "home" ?
      "flex gap-3 rounded-xl border border-[#E2E0D8]/90 bg-[#F6F4EF]/60 px-3 py-2.5 sm:px-3.5 sm:py-3"
    : "flex gap-3 rounded-xl border border-[var(--rr-widget-border)]/70 bg-[#faf8f4]/80 px-3 py-2.5 sm:px-3.5 sm:py-3";

  return (
    <div className={rowShell}>
      <span className={wrap}>
        <Icon className={ico} aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#1F2A24] sm:text-sm">
        {children}
      </p>
    </div>
  );
}

const SHELL = {
  default:
    "mb-7 rounded-[1.35rem] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] p-5 shadow-[var(--rr-shadow-card)] backdrop-blur-sm sm:mb-8 sm:p-6",
  home: "rounded-2xl border border-[#E2E0D8] bg-white p-6 shadow-sm",
} as const;

type VisitInsightsWidgetProps = {
  variant?: keyof typeof SHELL;
  /** Shared homepage snapshot (single fetch with `useHomeVisitSnapshot` in the parent). */
  snapshot: HomeVisitSnapshot;
};

export function VisitInsightsWidget({ variant = "default", snapshot }: VisitInsightsWidgetProps) {
  const {
    loading,
    weather,
    windowHint,
    waterLine,
    beachLine,
    parkingUi,
    timeRangeText,
  } = snapshot;
  const ParkingIcon = parkingUi.icon;
  const home = variant === "home";

  return (
    <section
      className={SHELL[variant]}
      aria-labelledby="visit-insights-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <header className="w-full text-center sm:min-w-0 sm:flex-1 sm:text-left">
          <SectionEyebrow
            icon={Sparkles}
            align="center"
            className={cn(
              "sm:justify-start",
              home && "text-[9px] tracking-[0.22em] text-[#6B6F68]",
            )}
            iconClassName={home ? "h-4 w-4" : undefined}
          >
            Plan today
          </SectionEyebrow>
          <h2
            id="visit-insights-heading"
            className={cn(
              "font-heading mt-2 text-lg font-semibold tracking-tight sm:mt-2 sm:text-xl",
              home ? "text-[#1F2A24] font-bold" : "text-[var(--rr-ink)]",
            )}
          >
            Best time to visit today
          </h2>
          <p
            className={cn(
              "mt-1 text-[12px] sm:text-[13px]",
              home ? "text-[#6B6F68]" : "text-[var(--rr-text-muted)]",
            )}
          >
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
        <div
          className={cn(
            "rounded-2xl border p-4 sm:p-5",
            home ?
              "border-[#E2E0D8] bg-[#F6F4EF]/50"
            : "border-[var(--rr-widget-border)] bg-gradient-to-br from-[var(--rr-widget-bg-soft)] to-transparent",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
              home ? "text-[#4F6B52]" : "text-[var(--rr-mint)]",
            )}
          >
            <CalendarHeart className="h-4 w-4" aria-hidden />
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Best window
            </p>
          </div>
          {loading && !windowHint ? (
            <p
              className={cn(
                "mt-2 text-sm",
                home ? "text-[#6B6F68]" : "text-[var(--rr-text-muted)]",
              )}
            >
              Loading…
            </p>
          ) : (
            <>
              <p
                className={cn(
                  "mt-2 font-heading text-base font-semibold sm:text-lg",
                  home ? "text-[#1F2A24]" : "text-[var(--rr-ink)]",
                )}
              >
                {windowHint?.summary ?? "Check weather"}
              </p>
              <p
                className={cn(
                  "mt-1 text-sm font-medium tabular-nums",
                  home ? "text-[#4F6B52]" : "text-[var(--rr-forest)]",
                )}
              >
                {timeRangeText}
              </p>
              <p
                className={cn(
                  "mt-2 text-[12px] leading-relaxed",
                  home ? "text-[#6B6F68]" : "text-[var(--rr-text-muted)]",
                )}
              >
                Best 2–4 hour span in the next ~12 hours (drier, calmer sky scores higher).
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <MetricRow icon={Droplets} iconSize={home ? "home" : "default"}>
            {waterLine}
          </MetricRow>
          <MetricRow icon={Users} iconSize={home ? "home" : "default"}>
            {beachLine}
          </MetricRow>
          <MetricRow icon={CloudSun} iconSize={home ? "home" : "default"}>
            {typeof weather?.temperature === "number" && weather.shortForecast ?
              <>Now about {weather.temperature}°F — {weather.shortForecast}</>
            : loading ?
              "Current sky…"
            : "Current conditions from NOAA load above when available."}
          </MetricRow>
        </div>
      </div>

      <p
        className={cn(
          "mt-4 flex items-start gap-2 text-[11px] leading-relaxed sm:text-xs",
          home ? "text-[#6B6F68]" : "text-[var(--rr-text-muted)]",
        )}
      >
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8b6a42]" aria-hidden />
        <span>
          Parking starts as{" "}
          <strong
            className={cn(
              "font-semibold",
              home ? "text-[#1F2A24]" : "text-[var(--rr-ink)]",
            )}
          >
            Easy
          </strong>{" "}
          until
          parking check-ins roll in; then it follows the blend. Not a guarantee of open spaces.
        </span>
      </p>
    </section>
  );
}
