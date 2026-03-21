"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Droplets,
  Eye,
  Gauge,
  Info,
  Leaf,
  Thermometer,
  Waves,
} from "lucide-react";

import type {
  CleanlinessStatus,
  ClarityStatus,
  RiverApiResponse,
} from "@/lib/river-types";
import {
  CLEANLINESS_DISPLAY,
  CLARITY_DISPLAY,
} from "@/lib/river-config";
import { cn } from "@/lib/utils";

function TypeBadge({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "proxy" | "estimated" | "site";
}) {
  const styles = {
    proxy:
      "border-[#b8c9c0] bg-[#eef4ed] text-[#3d5c50]",
    estimated:
      "border-[#b8c9d4] bg-[#eef4f7] text-[#3a5566]",
    site:
      "border-[#c9c4b8] bg-[#f5f2ea] text-[#5a5340]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider",
        styles[variant],
      )}
    >
      {children}
    </span>
  );
}

function MetricBlock({
  icon,
  title,
  typeBadge,
  children,
}: {
  icon: ReactNode;
  title: string;
  typeBadge: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-[#d4ddd3] bg-[#edf3ec] px-2.5 py-2 sm:px-3 sm:py-2.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d0ddd3] bg-[#f4f8f3] text-[#3f6676]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5b796e]">
            {title}
          </p>
          {typeBadge}
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function cleanlinessStyles(status: CleanlinessStatus) {
  switch (status) {
    case "good":
      return "border-[#9cb89a] bg-[#e8f2e6] text-[#1f4a28]";
    case "fair":
      return "border-[#c9b87a] bg-[#f7f3e4] text-[#6b5a1a]";
    case "poor":
      return "border-[#c9a39a] bg-[#f7ece8] text-[#6b2f24]";
    default:
      return "border-[#c9d4ce] bg-[#eef4ed] text-[#35584c]";
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

  const proxyTimestamp = (() => {
    if (!data?.timestampIso) return "—";
    const d = new Date(data.timestampIso);
    if (Number.isNaN(d.getTime())) return data.timestampIso;
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  })();

  const estimatesTimestamp = (() => {
    if (!data?.estimatesAsOfIso) return null;
    const d = new Date(data.estimatesAsOfIso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  })();

  const showProxyGauge = Boolean(data?.proxyGaugeAvailable);
  const clarity: ClarityStatus = data?.clarityStatus ?? "clear";
  const cleanliness: CleanlinessStatus = data?.cleanlinessStatus ?? "good";

  return (
    <div className="h-full rounded-2xl border border-[#c4d2c7] bg-white/65 p-4 shadow-[0_6px_26px_-20px_rgba(24,49,43,0.3)] backdrop-blur-[2px] sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#4d6d61] uppercase">
            River conditions
          </h3>
          <p className="mt-1 max-w-[18rem] text-[11px] leading-snug text-[#5c786e]">
            {data?.dataLabel ??
              "Proxy gauge — West River near Newfane (USGS 01156000)"}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[#c9d4ce] bg-[#eef4ed] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4a6b5f]">
          Proxy context
        </span>
      </div>

      <div className="mt-3 space-y-2 sm:space-y-2.5">
        <MetricBlock
          icon={<Waves className="h-4 w-4" aria-hidden />}
          title="Flow"
          typeBadge={<TypeBadge variant="proxy">Proxy</TypeBadge>}
        >
          <p className="text-lg font-semibold tabular-nums text-[#1f3a30] sm:text-xl">
            {loading ? "—" : formatFlow(data?.flowCfs ?? null)}
          </p>
        </MetricBlock>

        <MetricBlock
          icon={<Gauge className="h-4 w-4" aria-hidden />}
          title="Gage height"
          typeBadge={<TypeBadge variant="proxy">Proxy</TypeBadge>}
        >
          <p className="text-lg font-semibold tabular-nums text-[#1f3a30] sm:text-xl">
            {loading ? "—" : formatGage(data?.gageHeightFt ?? null)}
          </p>
        </MetricBlock>

        <MetricBlock
          icon={<Thermometer className="h-4 w-4" aria-hidden />}
          title="Est. water temp"
          typeBadge={<TypeBadge variant="estimated">Estimated</TypeBadge>}
        >
          <p className="text-lg font-semibold tabular-nums text-[#1f3a30] sm:text-xl">
            {loading
              ? "—"
              : typeof data?.estimatedWaterTempF === "number"
                ? `${data.estimatedWaterTempF}°F`
                : "—"}
          </p>
          {data?.airTemperatureUsedF != null ? (
            <p className="mt-1 text-[10px] leading-snug text-[#5c786e]">
              NWS air (grid): {data.airTemperatureUsedF}°F
            </p>
          ) : null}
          {data?.estimatedWaterTempSummary ? (
            <p className="mt-1 text-[10px] leading-snug text-[#6d8a7e]">
              {data.estimatedWaterTempSummary}
            </p>
          ) : null}
        </MetricBlock>

        <div className="flex items-start gap-2.5 rounded-xl border border-[#d4ddd3] bg-[#edf3ec] px-2.5 py-2 sm:px-3 sm:py-2.5">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d0ddd3] bg-[#f4f8f3] text-[#4d6d61]">
            <Eye className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5b796e]">
                Clarity
              </p>
              <TypeBadge variant="site">Site status</TypeBadge>
            </div>
            <div className="mt-2">
              <span className="inline-flex rounded-full border border-[#c5d4c8] bg-[#f6faf4] px-2.5 py-1 text-xs font-semibold text-[#2d4a38]">
                {CLARITY_DISPLAY[clarity]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-[#d4ddd3] bg-[#edf3ec] px-2.5 py-2 sm:px-3 sm:py-2.5">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d0ddd3] bg-[#f4f8f3] text-[#5c7f62]">
            <Leaf className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5b796e]">
                Cleanliness
              </p>
              <TypeBadge variant="site">Site status</TypeBadge>
            </div>
            <div className="mt-2">
              <span
                className={cn(
                  "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
                  cleanlinessStyles(cleanliness),
                )}
              >
                {CLEANLINESS_DISPLAY[cleanliness]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-[#dce5df] bg-[#f4f8f3] px-2.5 py-2 sm:px-3">
          <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-[#5c8a7a]" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5b796e]">
              Last updated
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#38594f]">
              <span className="font-medium text-[#2a4538]">Proxy gauge (USGS):</span>{" "}
              {loading ? "…" : showProxyGauge ? proxyTimestamp : "Unavailable"}
            </p>
            {estimatesTimestamp ? (
              <p className="mt-1 text-[11px] text-[#5c786e]">
                <span className="font-medium text-[#3d5c50]">Estimates (NWS):</span>{" "}
                {estimatesTimestamp}
              </p>
            ) : !loading && data && !data.estimatedWaterTempF ? (
              <p className="mt-1 text-[11px] text-[#6d8a7e]">
                Estimates unavailable until weather data loads.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 rounded-xl border border-[#d5e0d6] bg-[#f4f8f3] px-3 py-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#6d8a7e]" aria-hidden />
        <p className="text-[11px] leading-relaxed text-[#56756a]">
          {data?.transparencyNote ??
            "West River readings are watershed proxy context for Rock River. Water temperature is estimated from air temperature, not measured in-water. Clarity and cleanliness are site status labels for this guide, not lab tests."}
        </p>
      </div>

      {!loading && !data ? (
        <p className="mt-3 text-center text-[11px] text-[#6d8a7e]">
          Unable to load river conditions. Refresh to try again.
        </p>
      ) : null}

      {!loading && data && !showProxyGauge ? (
        <p className="mt-2 text-center text-[11px] leading-snug text-[#6d8a7e]">
          USGS instantaneous data isn’t available for this proxy site right now.
          Flow and gage will appear when published; estimates above still help
          with planning.
        </p>
      ) : null}
    </div>
  );
}
