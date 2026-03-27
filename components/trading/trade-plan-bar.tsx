import type { TopPick } from "@/lib/trading-data";
import { cn } from "@/lib/utils";

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function pct(value: number, min: number, max: number) {
  if (max <= min) return 50;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

type TradePlanBarProps = {
  pick: TopPick;
  className?: string;
};

export function TradePlanBar({ pick, className }: TradePlanBarProps) {
  const span = pick.stretchTargetNumeric - pick.stopNumeric;
  const pad = Math.max(span * 0.06, 0.05);
  const min = pick.stopNumeric - pad;
  const max = pick.stretchTargetNumeric + pad;

  const pStop = pct(pick.stopNumeric, min, max);
  const pEntryLo = pct(pick.entryLow, min, max);
  const pEntryHi = pct(pick.entryHigh, min, max);
  const pBase = pct(pick.baseTargetNumeric, min, max);
  const pStretch = pct(pick.stretchTargetNumeric, min, max);
  const pOpen = pct(pick.marketOpen, min, max);
  const pCur = pct(pick.currentPrice, min, max);

  const Seg = ({
    from,
    to,
    className: segClass,
  }: {
    from: number;
    to: number;
    className?: string;
  }) => {
    const w = Math.max(to - from, 0.25);
    return (
      <div
        className={cn("h-full shrink-0", segClass)}
        style={{ width: `${w}%` }}
      />
    );
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
        <span>Trade plan (stop → stretch)</span>
        <span className="font-mono text-zinc-400">
          {pick.stopNumeric.toFixed(2)} — {pick.stretchTargetNumeric.toFixed(2)}
        </span>
      </div>
      <div className="relative rounded-lg border border-zinc-700/80 bg-zinc-950/80 p-1.5">
        <div className="relative h-14 w-full">
          <div className="absolute inset-x-0 top-2 flex h-9 overflow-hidden rounded-md">
            <Seg from={0} to={pStop} className="bg-rose-950/55" />
            <Seg from={pStop} to={pEntryLo} className="bg-rose-900/20" />
            <Seg
              from={pEntryLo}
              to={pEntryHi}
              className="border-x border-amber-500/35 bg-amber-500/18"
            />
            <Seg from={pEntryHi} to={pBase} className="bg-zinc-800/45" />
            <Seg from={pBase} to={pStretch} className="bg-emerald-600/18" />
            <Seg from={pStretch} to={100} className="bg-emerald-500/12" />
          </div>
          <PriceMarker left={pStop} label="Stop" tone="rose" />
          <PriceMarker left={pEntryLo} label="Entry" tone="amber" />
          <PriceMarker left={pBase} label="Base" tone="emerald" />
          <PriceMarker left={pStretch} label="Stretch" tone="emerald" />
          <SessionMarker left={pOpen} label="Open" variant="open" />
          <SessionMarker left={pCur} label="Last" variant="last" />
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-zinc-400 sm:grid-cols-4">
        <div>
          <dt className="text-zinc-600">Open</dt>
          <dd className="font-mono text-sky-300">{pick.marketOpen.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-zinc-600">Last</dt>
          <dd className="font-mono text-zinc-100">{pick.currentPrice.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-zinc-600">Base T.</dt>
          <dd className="font-mono text-emerald-400/90">
            {pick.baseTargetNumeric.toFixed(2)}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-600">Stretch</dt>
          <dd className="font-mono text-emerald-300">
            {pick.stretchTargetNumeric.toFixed(2)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function PriceMarker({
  left,
  label,
  tone,
}: {
  left: number;
  label: string;
  tone: "rose" | "amber" | "emerald";
}) {
  const line =
    tone === "rose"
      ? "bg-rose-500/70"
      : tone === "amber"
        ? "bg-amber-400/70"
        : "bg-emerald-400/70";
  return (
    <div
      className="pointer-events-none absolute top-2 bottom-0 z-[5] w-px"
      style={{ left: `${left}%`, transform: "translateX(-50%)" }}
    >
      <div className={cn("mx-auto h-9 w-px", line)} />
      <span className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-wide text-zinc-500">
        {label}
      </span>
    </div>
  );
}

function SessionMarker({
  left,
  label,
  variant,
}: {
  left: number;
  label: string;
  variant: "open" | "last";
}) {
  const isOpen = variant === "open";
  return (
    <div
      className="pointer-events-none absolute top-0 z-20"
      style={{ left: `${left}%`, transform: "translateX(-50%)" }}
    >
      <span
        className={cn(
          "mb-0.5 block text-center text-[9px] font-semibold uppercase tracking-wide",
          isOpen ? "text-sky-400" : "text-zinc-100",
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "mx-auto h-10 w-px",
          isOpen ? "bg-sky-400/90" : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)]",
        )}
      />
      <div
        className={cn(
          "mx-auto mt-0.5 h-2 w-2 rotate-45 border-2",
          isOpen
            ? "border-sky-400 bg-sky-500/30"
            : "border-white bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)]",
        )}
      />
    </div>
  );
}
