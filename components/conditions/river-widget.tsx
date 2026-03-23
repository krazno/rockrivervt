"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Droplets,
  Eye,
  Gauge,
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
      "border-[#b8c4c9] bg-[#eef1f4] text-[#3d5560]",
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
    <div className="flex items-start gap-2.5 rounded-xl border border-[#d0d8e0] bg-[#eef1f4] px-2.5 py-2 sm:px-3 sm:py-2.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d0d8e0] bg-[#f3f5f6] text-[#3f6676]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5a6b78]">
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
      return "border-[#94b0bc] bg-[#e8f0f4] text-[#2a3d48]";
    case "fair":
      return "border-[#c9b87a] bg-[#f7f3e4] text-[#6b5a1a]";
    case "poor":
      return "border-[#c9a39a] bg-[#f7ece8] text-[#6b2f24]";
    default:
      return "border-[#c9d4ce] bg-[#eef1f4] text-[#3d5a68]";
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
    <div className="h-full rounded-2xl border border-[#c0cad2] bg-white/65 p-4 shadow-[0_6px_26px_-20px_rgba(22,38,48,0.22)] backdrop-blur-[2px] sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#4f6d7a] uppercase">
            River
          </h3>
          <p className="mt-1 max-w-[17rem] text-[11px] leading-snug text-[#5f737f]">
            {data?.dataLabel ?? "West River gauge (USGS)—rough context for Rock River flow"}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[#c9d4ce] bg-[#eef1f4] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4a6b7a]">
          Proxy
        </span>
      </div>

      <div className="mt-3 space-y-2 sm:space-y-2.5">
        <MetricBlock
          icon={<Waves className="h-4 w-4" aria-hidden />}
          title="Flow"
          typeBadge={<TypeBadge variant="proxy">Proxy</TypeBadge>}
        >
          <p className="text-lg font-semibold tabular-nums text-[#2a3842] sm:text-xl">
            {loading ? "—" : formatFlow(data?.flowCfs ?? null)}
          </p>
        </MetricBlock>

        <MetricBlock
          icon={<Gauge className="h-4 w-4" aria-hidden />}
          title="Gage height"
          typeBadge={<TypeBadge variant="proxy">Proxy</TypeBadge>}
        >
          <p className="text-lg font-semibold tabular-nums text-[#2a3842] sm:text-xl">
            {loading ? "—" : formatGage(data?.gageHeightFt ?? null)}
          </p>
        </MetricBlock>

        <MetricBlock
          icon={<Thermometer className="h-4 w-4" aria-hidden />}
          title="Est. water temp"
          typeBadge={<TypeBadge variant="estimated">Estimated</TypeBadge>}
        >
          <p className="text-lg font-semibold tabular-nums text-[#2a3842] sm:text-xl">
            {loading
              ? "—"
              : typeof data?.estimatedWaterTempF === "number"
                ? `${data.estimatedWaterTempF}°F`
                : "—"}
          </p>
          {data?.airTemperatureUsedF != null ? (
            <p className="mt-1 text-[10px] text-[#5f737f]">
              Air {data.airTemperatureUsedF}°F (estimate input)
            </p>
          ) : null}
        </MetricBlock>

        <div className="flex items-start gap-2.5 rounded-xl border border-[#d0d8e0] bg-[#eef1f4] px-2.5 py-2 sm:px-3 sm:py-2.5">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d0d8e0] bg-[#f3f5f6] text-[#4f6d7a]">
            <Eye className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5a6b78]">
                Clarity
              </p>
              <TypeBadge variant="site">Site status</TypeBadge>
            </div>
            <div className="mt-2">
              <span className="inline-flex rounded-full border border-[#c5ced4] bg-[#f5f7f8] px-2.5 py-1 text-xs font-semibold text-[#2a3d42]">
                {CLARITY_DISPLAY[clarity]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-[#d0d8e0] bg-[#eef1f4] px-2.5 py-2 sm:px-3 sm:py-2.5">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d0d8e0] bg-[#f3f5f6] text-[#5a7a8a]">
            <Leaf className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5a6b78]">
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

        <div className="flex items-start gap-2 rounded-xl border border-[#dce5df] bg-[#f3f5f6] px-2.5 py-2 sm:px-3">
          <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-[#5a8a9a]" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5a6b78]">
              Last updated
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#3d4f5c]">
              <span className="font-medium text-[#2a3842]">Proxy gauge (USGS):</span>{" "}
              {loading ? "…" : showProxyGauge ? proxyTimestamp : "Unavailable"}
            </p>
            {estimatesTimestamp ? (
              <p className="mt-1 text-[10px] text-[#5f737f]">Est. refreshed {estimatesTimestamp}</p>
            ) : !loading && data && !data.estimatedWaterTempF ? (
              <p className="mt-1 text-[10px] text-[#6b7f88]">Weather estimates loading…</p>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-snug text-[#6b7f88]">
        {data?.transparencyNote ??
          "Flow/gage are from a nearby gauge, not in-river at Rock River. Water temp is estimated. Clarity & cleanliness are field labels for this site."}
      </p>

      {!loading && !data ? (
        <p className="mt-3 text-center text-[11px] text-[#6b7f88]">
          Unable to load river conditions. Refresh to try again.
        </p>
      ) : null}

      {!loading && data && !showProxyGauge ? (
        <p className="mt-2 text-center text-[10px] text-[#6b7f88]">
          USGS flow/gage paused—will return when published.
        </p>
      ) : null}
    </div>
  );
}
