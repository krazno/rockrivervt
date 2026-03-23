"use client";

import { useEffect, useState } from "react";
import { Eye, Leaf, Thermometer, Waves } from "lucide-react";

import type {
  CleanlinessStatus,
  ClarityStatus,
  RiverApiResponse,
} from "@/lib/river-types";
import { CLEANLINESS_DISPLAY, CLARITY_DISPLAY } from "@/lib/river-config";
import { cn } from "@/lib/utils";

function cleanlinessStyles(status: CleanlinessStatus) {
  switch (status) {
    case "good":
      return "border-[#b8c9c0] bg-[#eef3ef] text-[#2f3d34]";
    case "fair":
      return "border-[#c9c4a8] bg-[#f5f3e8] text-[#5a4f20]";
    case "poor":
      return "border-[#d4b8b0] bg-[#f8f0ee] text-[#5c2c22]";
    default:
      return "border-[#c9d0cc] bg-[#f0f3f1] text-[#3d4a42]";
  }
}

export function RiverWidget() {
  const [data, setData] = useState<RiverApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRiver() {
      try {
        const res = await fetch("/api/river", { cache: "no-store" });
        const json = (await res.json()) as RiverApiResponse;
        if (!isMounted) return;
        setData(json);
      } catch {
        if (!isMounted) return;
        setData(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    loadRiver();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatFlow = (n: number | null | undefined) => {
    if (typeof n !== "number" || Number.isNaN(n)) return "—";
    return `${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} cfs`;
  };

  const formatGage = (n: number | null | undefined) => {
    if (typeof n !== "number" || Number.isNaN(n)) return "—";
    return `${n.toLocaleString(undefined, { maximumFractionDigits: 2 })} ft`;
  };

  const clarity: ClarityStatus = data?.clarityStatus ?? "clear";
  const cleanliness: CleanlinessStatus = data?.cleanlinessStatus ?? "good";

  const rowClass =
    "flex items-baseline justify-between gap-3 border-b border-[#d8d2c6]/55 py-2.5 last:border-0";

  return (
    <div className="h-full rounded-[1.35rem] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] p-5 shadow-[var(--rr-shadow-card)] backdrop-blur-sm sm:p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--rr-mint)]">
        River
      </h3>

      <div className="mt-4 space-y-0 text-[var(--rr-text)]">
        <div className={rowClass}>
          <span className="flex items-center gap-2 text-xs text-[var(--rr-text-muted)]">
            <Waves className="h-3.5 w-3.5 opacity-70" aria-hidden />
            Flow
          </span>
          <span className="font-medium tabular-nums text-base text-[var(--rr-ink)]">
            {loading ? "—" : formatFlow(data?.flowCfs ?? null)}
          </span>
        </div>
        <div className={rowClass}>
          <span className="flex items-center gap-2 text-xs text-[var(--rr-text-muted)]">
            <span className="inline-block h-3.5 w-3.5 text-center text-[10px] opacity-70" aria-hidden>
              ′
            </span>
            Gage
          </span>
          <span className="font-medium tabular-nums text-base text-[var(--rr-ink)]">
            {loading ? "—" : formatGage(data?.gageHeightFt ?? null)}
          </span>
        </div>
        <div className={rowClass}>
          <span className="flex items-center gap-2 text-xs text-[var(--rr-text-muted)]">
            <Thermometer className="h-3.5 w-3.5 opacity-70" aria-hidden />
            Water
          </span>
          <span className="font-medium tabular-nums text-base text-[var(--rr-ink)]">
            {loading
              ? "—"
              : typeof data?.estimatedWaterTempF === "number"
                ? `${data.estimatedWaterTempF}°F`
                : "—"}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t border-[#d8d2c6]/45 pt-4">
        <div className="flex items-start gap-2">
          <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--rr-mint)] opacity-80" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--rr-text-muted)]">
              Clarity
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--rr-ink)]">{CLARITY_DISPLAY[clarity]}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Leaf className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--rr-mint)] opacity-80" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--rr-text-muted)]">
              Shore
            </p>
            <span
              className={cn(
                "mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                cleanlinessStyles(cleanliness),
              )}
            >
              {CLEANLINESS_DISPLAY[cleanliness]}
            </span>
          </div>
        </div>
      </div>

      {!loading && !data ? (
        <p className="mt-4 text-center text-xs text-[var(--rr-text-muted)]">Couldn’t load river data.</p>
      ) : null}
    </div>
  );
}
