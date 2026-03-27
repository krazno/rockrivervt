import type { TopPick } from "@/lib/trading-data";
import { cn } from "@/lib/utils";

import { TradePlanBar } from "./trade-plan-bar";

const medalStyles: Record<
  1 | 2 | 3,
  { ring: string; label: string; bg: string }
> = {
  1: {
    ring: "ring-amber-400/50",
    label: "Gold",
    bg: "from-amber-500/15 to-amber-600/5",
  },
  2: {
    ring: "ring-zinc-400/45",
    label: "Silver",
    bg: "from-zinc-400/12 to-zinc-500/5",
  },
  3: {
    ring: "ring-orange-400/40",
    label: "Bronze",
    bg: "from-orange-700/20 to-orange-900/10",
  },
};

const accentBorder: Record<TopPick["accent"], string> = {
  emerald: "border-emerald-500/25 shadow-emerald-950/20",
  sky: "border-sky-500/25 shadow-sky-950/20",
  amber: "border-amber-500/25 shadow-amber-950/20",
};

const chipTone = (chip: string) => {
  const c = chip.toLowerCase();
  if (c.includes("validated") && !c.includes("partially"))
    return "border-emerald-500/35 bg-emerald-500/10 text-emerald-200";
  if (c.includes("partially"))
    return "border-amber-500/40 bg-amber-500/10 text-amber-100";
  if (c.includes("risk") || c.includes("higher"))
    return "border-rose-500/35 bg-rose-500/10 text-rose-100";
  if (c.includes("macro") || c.includes("liquid"))
    return "border-sky-500/35 bg-sky-500/10 text-sky-100";
  if (c.includes("event") || c.includes("timing"))
    return "border-violet-500/35 bg-violet-500/10 text-violet-100";
  return "border-zinc-600 bg-zinc-800/60 text-zinc-200";
};

export function TopPickCard({ pick }: { pick: TopPick }) {
  const medal = medalStyles[pick.rank];
  const gapSign = pick.gapPercent >= 0 ? "+" : "";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 p-5 shadow-xl ring-1 ring-white/5",
        accentBorder[pick.accent],
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90",
          medal.bg,
        )}
      />
      <div className="relative flex flex-col gap-4">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-950/80 text-lg font-bold tabular-nums text-zinc-100 ring-2",
                medal.ring,
              )}
              title={`${medal.label} — rank ${pick.rank}`}
            >
              {pick.rank}
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-mono text-2xl font-semibold tracking-tight text-white">
                  {pick.ticker}
                </h3>
                <span className="text-sm text-zinc-400">{pick.companyName}</span>
              </div>
              <p className="mt-1 max-w-prose text-sm leading-relaxed text-zinc-300">
                {pick.thesis}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full border border-zinc-600 bg-zinc-900/80 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
              Confidence {pick.confidence}
            </span>
            <span className="text-[11px] text-zinc-500">
              Hold {pick.holdWindow} · Risk {pick.riskLevel}
            </span>
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          {pick.statusChips.map((chip) => (
            <span
              key={chip}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                chipTone(chip),
              )}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            Why top 3
          </p>
          <p className="mt-1 text-sm text-zinc-200">{pick.whyTop3}</p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            Audited summary
          </p>
          <p className="mt-1 text-sm text-zinc-400">{pick.auditNotes}</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
          <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
            <tbody className="divide-y divide-zinc-800/90">
              <MetricRow
                label="Previous close"
                value={pick.previousClose.toFixed(2)}
                mono
              />
              <MetricRow
                label="Market open"
                value={pick.marketOpen.toFixed(2)}
                mono
                hint="TODO(live): session open"
              />
              <MetricRow
                label="Current / last"
                value={pick.currentPrice.toFixed(2)}
                mono
                highlight
                hint="TODO(live): last trade"
              />
              <MetricRow
                label="Gap %"
                value={`${gapSign}${pick.gapPercent.toFixed(2)}%`}
                mono
                hint="TODO(live): vs prior close"
              />
              <MetricRow label="Entry zone" value={pick.entryZone} mono />
              <MetricRow label="Ideal entry" value={pick.idealEntry} />
              <MetricRow label="Stop loss" value={pick.stopLoss} danger mono />
              <MetricRow label="Base target" value={pick.baseTarget} ok mono />
              <MetricRow
                label="Stretch target"
                value={pick.stretchTarget}
                ok
                mono
              />
              <MetricRow label="Expected gain" value={pick.expectedGain} ok />
              <MetricRow label="Hold window" value={pick.holdWindow} />
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            Report cross-check
          </p>
          <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-[11px] text-zinc-500">Report entry</dt>
              <dd className="font-mono text-zinc-200">{pick.reportEntryRange}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-zinc-500">Report exit</dt>
              <dd className="font-mono text-zinc-200">{pick.reportExitRange}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-zinc-500">Report confidence</dt>
              <dd className="font-mono text-zinc-200">{pick.reportConfidence}</dd>
            </div>
          </dl>
        </div>

        <TradePlanBar pick={pick} />

        <div className="grid gap-2 rounded-xl border border-zinc-800/80 bg-black/20 p-4 text-sm text-zinc-300">
          <PlanLine label="Best on pullback" value={pick.sellPlan.bestOnPullback} />
          <PlanLine label="Avoid chasing" value={pick.sellPlan.avoidChasingAbove} />
          <PlanLine
            label="Partial profits"
            value={pick.sellPlan.takePartialNear}
          />
          <PlanLine label="Exit plan" value={pick.sellPlan.exitRemainder} />
        </div>
      </div>
    </article>
  );
}

function MetricRow({
  label,
  value,
  mono,
  highlight,
  danger,
  ok,
  hint,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
  danger?: boolean;
  ok?: boolean;
  hint?: string;
}) {
  return (
    <tr
      className={cn(
        highlight && "bg-white/[0.04]",
        "hover:bg-white/[0.02]",
      )}
    >
      <th className="whitespace-nowrap px-3 py-2.5 font-normal text-zinc-500">
        {label}
      </th>
      <td
        className={cn(
          "px-3 py-2.5",
          mono && "font-mono text-[13px] tracking-tight",
          danger && "text-rose-300",
          ok && "text-emerald-300/95",
          !danger && !ok && "text-zinc-100",
        )}
      >
        {value}
        {hint ? (
          <span className="ml-2 text-[10px] text-zinc-600">({hint})</span>
        ) : null}
      </td>
    </tr>
  );
}

function PlanLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <span className="text-zinc-200">{value}</span>
    </div>
  );
}
