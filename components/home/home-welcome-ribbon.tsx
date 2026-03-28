"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart, MapPin, Sparkles } from "lucide-react";

import type { VisitorsGeo } from "@/lib/visitors-geo";
import { formatVisitorGeoLine } from "@/lib/visitors-geo";

type VisitorsJson = {
  configured?: boolean;
  count?: number | null;
  geo?: VisitorsGeo;
};

const SESSION_KEY = "rr_home_visit_tick";
const FIRST_DAY_KEY = "rr_first_visit_day_vt";
const DEMO_OPENS_KEY = "rr_guide_demo_opens_v1";
const DEMO_SEED = 18_427;

function vermontDateKey(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function readDemoOpens(): number {
  try {
    if (typeof window === "undefined") return DEMO_SEED;
    const raw = window.localStorage.getItem(DEMO_OPENS_KEY);
    const n = raw ? parseInt(raw, 10) : NaN;
    if (Number.isFinite(n) && n > 0) return n;
    window.localStorage.setItem(DEMO_OPENS_KEY, String(DEMO_SEED));
    return DEMO_SEED;
  } catch {
    return DEMO_SEED;
  }
}

function bumpDemoOpens(): number {
  const base = readDemoOpens();
  const bump = 1 + Math.floor(Math.random() * 2);
  const next = base + bump;
  try {
    window.localStorage.setItem(DEMO_OPENS_KEY, String(next));
  } catch {
    /* private mode */
  }
  return next;
}

export function HomeWelcomeRibbon() {
  const [demoOpens, setDemoOpens] = useState<number | null>(null);
  const [geoLine, setGeoLine] = useState<string | null>(null);
  const [welcomeLine, setWelcomeLine] = useState<string | null>(null);

  const todayKey = useMemo(() => vermontDateKey(), []);

  useEffect(() => {
    let cancelled = false;

    try {
      if (typeof window !== "undefined") {
        const prev = window.localStorage.getItem(FIRST_DAY_KEY);
        if (prev !== todayKey) {
          setWelcomeLine("Welcome — first visit from this browser today.");
          window.localStorage.setItem(FIRST_DAY_KEY, todayKey);
        } else {
          setWelcomeLine("Welcome back — nice to see you again.");
        }
      }
    } catch {
      /* private mode */
    }

    try {
      if (typeof window !== "undefined") {
        let n = readDemoOpens();
        if (window.sessionStorage.getItem(SESSION_KEY) !== "1") {
          n = bumpDemoOpens();
          try {
            window.sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* ignore */
          }
        }
        if (!cancelled) setDemoOpens(n);
      }
    } catch {
      if (!cancelled) setDemoOpens(DEMO_SEED);
    }

    async function run() {
      try {
        const res = await fetch("/api/visitors", { cache: "no-store" });
        const json = (await res.json()) as VisitorsJson;
        if (cancelled) return;

        const geo = json.geo;
        setGeoLine(formatVisitorGeoLine(geo));
      } catch {
        if (!cancelled) setGeoLine(null);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [todayKey]);

  const countLabel =
    demoOpens != null ?
      `${demoOpens.toLocaleString()} informal guide opens tallied on this device`
    : null;

  const hasAny = countLabel || geoLine || welcomeLine;

  if (!hasAny) return null;

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 sm:items-start">
      {welcomeLine ?
        <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#4F6B52] sm:justify-start sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{welcomeLine}</span>
        </p>
      : null}
      {geoLine ?
        <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B6F68] sm:justify-start sm:text-xs">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#4F6B52]/90" aria-hidden />
          <span>{geoLine}</span>
        </p>
      : null}
      {countLabel ?
        <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium tabular-nums text-[var(--rr-text-muted)] sm:justify-start sm:text-xs">
          <LineChart className="h-3.5 w-3.5 shrink-0 text-[var(--rr-mint)]" aria-hidden />
          <span>{countLabel}</span>
        </p>
      : null}
      <p className="text-center text-[10px] leading-snug text-[#6B6F68]/85 sm:text-left sm:text-[11px]">
        Friendly counter for the banner—not verified analytics.{" "}
        {geoLine ?
          "Location hint comes from your network region (similar to analytics) and isn’t stored on our servers for this line."
        : null}
      </p>
    </div>
  );
}
