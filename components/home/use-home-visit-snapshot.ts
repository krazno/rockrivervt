"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Car } from "lucide-react";

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

export type HomeVisitSnapshot = {
  loading: boolean;
  weather: WeatherPayload | null;
  crowd: CrowdSummaryResponse | null;
  river: RiverApiResponse | null;
  windowHint: ReturnType<typeof bestVisitWindow>;
  waterLine: string;
  beachLine: string;
  parkingRow: { level: ParkingDifficulty; hasSignal: boolean };
  parkingUi: (typeof PARKING_UI)[ParkingDifficulty];
  timeRangeText: string;
};

export function useHomeVisitSnapshot(): HomeVisitSnapshot {
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

  const windowHint = useMemo(() => {
    const hours = weather?.nextTwelveHours ?? [];
    const tz = weather?.timezone ?? "America/New_York";
    return bestVisitWindow(hours, tz);
  }, [weather]);

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

  const timeRangeText =
    windowHint ?
      `${windowHint.startLabel}–${windowHint.endLabel}`
    : loading ? "…"
    : "Weather windows loading";

  return useMemo(
    () => ({
      loading,
      weather,
      crowd,
      river,
      windowHint,
      waterLine,
      beachLine,
      parkingRow,
      parkingUi,
      timeRangeText,
    }),
    [
      loading,
      weather,
      crowd,
      river,
      windowHint,
      waterLine,
      beachLine,
      parkingRow,
      parkingUi,
      timeRangeText,
    ],
  );
}
