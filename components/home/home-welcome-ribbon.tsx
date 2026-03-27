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

function vermontDateKey(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function HomeWelcomeRibbon() {
  const [countLabel, setCountLabel] = useState<string | null>(null);
  const [geoLine, setGeoLine] = useState<string | null>(null);
  const [firstTodayLine, setFirstTodayLine] = useState<string | null>(null);

  const todayKey = useMemo(() => vermontDateKey(), []);

  useEffect(() => {
    let cancelled = false;

    try {
      if (typeof window !== "undefined") {
        const prev = window.localStorage.getItem(FIRST_DAY_KEY);
        if (prev !== todayKey) {
          setFirstTodayLine("Welcome — first visit from this browser today.");
          window.localStorage.setItem(FIRST_DAY_KEY, todayKey);
        }
      }
    } catch {
      /* private mode */
    }

    async function run() {
      try {
        const res = await fetch("/api/visitors", { cache: "no-store" });
        const json = (await res.json()) as VisitorsJson;
        if (cancelled) return;

        const geo = json.geo;
        setGeoLine(formatVisitorGeoLine(geo));

        if (!json.configured) {
          if (!cancelled) {
            setCountLabel(
              "Visit counter loads when our tally service is connected—thanks for stopping by.",
            );
          }
          return;
        }

        let n = typeof json.count === "number" ? json.count : 0;

        if (
          typeof window !== "undefined" &&
          window.sessionStorage.getItem(SESSION_KEY) !== "1"
        ) {
          const post = await fetch("/api/visitors", { method: "POST" });
          const pj = (await post.json()) as {
            count?: number | null;
            ok?: boolean;
            geo?: VisitorsGeo;
          };
          if (!cancelled && typeof pj.count === "number") {
            n = pj.count;
          }
          if (!cancelled && pj.geo) {
            setGeoLine(formatVisitorGeoLine(pj.geo));
          }
          try {
            window.sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* ignore */
          }
        }

        if (!cancelled) {
          setCountLabel(`${n.toLocaleString()} visits counted since launch`);
        }
      } catch {
        if (!cancelled) {
          setGeoLine(null);
          setCountLabel(
            "Visit counter loads when our tally service is connected—thanks for stopping by.",
          );
        }
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [todayKey]);

  const hasAny = countLabel || geoLine || firstTodayLine;

  if (!hasAny) return null;

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 sm:items-start">
      {firstTodayLine ?
        <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#4F6B52] sm:justify-start sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{firstTodayLine}</span>
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
      {geoLine ?
        <p className="text-[10px] leading-snug text-[#6B6F68]/85 sm:text-[11px]">
          Approximate area from your network (similar to analytics)—not saved on our servers for this
          banner.
        </p>
      : null}
    </div>
  );
}
