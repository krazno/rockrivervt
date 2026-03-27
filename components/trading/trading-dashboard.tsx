import { tradingDashboardData } from "@/lib/trading-data";
import { cn } from "@/lib/utils";

import { TopPickCard } from "./top-pick-card";

function formatDisplayDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function TradingDashboard() {
  const data = tradingDashboardData;
  const displayDate = formatDisplayDate(data.sessionDate);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(56,189,248,0.08),transparent)]" />

      <div className="relative mx-auto max-w-[1600px] px-4 pb-16 pt-10 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="min-w-0 space-y-12">
            <HeroSection displayDate={displayDate} />
            <RegimeCard />
            <section className="space-y-6">
              <SectionHeading
                eyebrow="Execution"
                title="Top 3 picks for today"
                subtitle="Ranked for 24–48 hour holds — entries, risk, and sell logic in one view."
              />
              <div className="space-y-8">
                {data.topPicks.map((pick) => (
                  <TopPickCard key={pick.ticker} pick={pick} />
                ))}
              </div>
            </section>
            <WhyCutSection />
            <RejectedSection />
            <ReportTableSection />
            <FooterNotes />
          </div>

          <StickySidebar displayDate={displayDate} />
        </div>
      </div>
    </div>
  );
}

function HeroSection({ displayDate }: { displayDate: string }) {
  const data = tradingDashboardData;
  return (
    <header className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/95 via-zinc-950 to-black p-6 shadow-2xl ring-1 ring-white/5 sm:p-8">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {data.regime.primaryBadges.map((b) => (
            <span
              key={b.id}
              className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-300"
            >
              {b.label}
            </span>
          ))}
        </div>
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {data.heroTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-zinc-400">
            {data.heroSubtitle}
          </p>
          <p className="mt-3 text-sm font-medium text-zinc-500">{displayDate}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <HighlightTile
            label="Best overall"
            value={data.highlights.bestOverall}
            tone="emerald"
          />
          <HighlightTile
            label="Safest macro"
            value={data.highlights.safestMacro}
            tone="sky"
          />
          <HighlightTile
            label="Highest vol catalyst"
            value={data.highlights.highestVolatility}
            tone="amber"
          />
        </div>
      </div>
    </header>
  );
}

function HighlightTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "sky" | "amber";
}) {
  const tones = {
    emerald: "border-emerald-500/30 bg-emerald-500/5 text-emerald-200",
    sky: "border-sky-500/30 bg-sky-500/5 text-sky-200",
    amber: "border-amber-500/30 bg-amber-500/5 text-amber-200",
  };
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 backdrop-blur-sm",
        tones[tone],
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-xl font-semibold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}

function RegimeCard() {
  const data = tradingDashboardData;
  return (
    <section className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 shadow-xl ring-1 ring-white/5 backdrop-blur-sm sm:p-8">
      <SectionHeading
        eyebrow="Context"
        title="Market regime"
        subtitle="Single-glance read on the tape before you size anything."
      />
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300">
        {data.regime.summary}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {data.regime.signalBadges.map((s) => (
          <span
            key={s}
            className="rounded-full border border-zinc-700/80 bg-black/30 px-2.5 py-1 text-[11px] text-zinc-300"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.regime.metrics.map((m) => (
          <div
            key={m.label}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-black/25 px-3 py-2.5"
          >
            <span
              className={cn(
                "text-lg leading-none",
                m.tone === "up" && "text-emerald-400",
                m.tone === "down" && "text-rose-400",
                m.tone === "neutral" && "text-zinc-500",
              )}
              aria-hidden
            >
              {m.tone === "up" ? "↑" : m.tone === "down" ? "↓" : "◆"}
            </span>
            <p
              className={cn(
                "text-sm font-medium",
                m.tone === "up" && "text-emerald-300",
                m.tone === "down" && "text-rose-300",
                m.tone === "neutral" && "text-zinc-300",
              )}
            >
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyCutSection() {
  const data = tradingDashboardData;
  return (
    <section className="space-y-5">
      <SectionHeading
        eyebrow="Audit"
        title="Why these made the cut"
        subtitle="What passed validation vs the original desk view."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {data.whyCut.map((w) => (
          <div
            key={w.ticker}
            className="rounded-xl border border-zinc-800/90 bg-zinc-950/50 p-5"
          >
            <p className="font-mono text-lg font-semibold text-white">
              {w.ticker}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              {w.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function RejectedSection() {
  const data = tradingDashboardData;
  return (
    <section className="space-y-5">
      <SectionHeading
        eyebrow="Filter"
        title="Rejected names and why"
        subtitle="Explicit passes — so you don’t second-guess the watchlist."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.rejectedPicks.map((r) => (
          <div
            key={r.ticker}
            className="rounded-xl border border-zinc-800/80 bg-black/20 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono font-semibold text-zinc-200">
                {r.ticker}
              </span>
              <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-rose-200/90">
                Rejected
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{r.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReportTableSection() {
  const data = tradingDashboardData;
  return (
    <section className="space-y-5">
      <SectionHeading
        eyebrow="Source"
        title="Original report vs final ruling"
        subtitle="Every name from the morning book, with a clear decision state."
      />
      <div className="overflow-x-auto rounded-xl border border-zinc-800/90">
        <table className="w-full min-w-[900px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wide text-zinc-500">
              <th className="px-3 py-3 font-medium">Ticker</th>
              <th className="px-3 py-3 font-medium">Orig. rank</th>
              <th className="px-3 py-3 font-medium">Orig. entry</th>
              <th className="px-3 py-3 font-medium">Orig. target</th>
              <th className="px-3 py-3 font-medium">Orig. conf.</th>
              <th className="px-3 py-3 font-medium">Final ruling</th>
              <th className="px-3 py-3 font-medium">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/90">
            {data.reportRows.map((row) => (
              <tr key={row.ticker} className="hover:bg-white/[0.02]">
                <td className="px-3 py-2.5 font-mono font-medium text-zinc-100">
                  {row.ticker}
                </td>
                <td className="px-3 py-2.5 text-zinc-400">{row.originalRank}</td>
                <td className="px-3 py-2.5 font-mono text-zinc-300">
                  {row.originalEntryRange}
                </td>
                <td className="px-3 py-2.5 font-mono text-zinc-300">
                  {row.originalTarget}
                </td>
                <td className="px-3 py-2.5 font-mono text-zinc-300">
                  {row.originalConfidence}
                </td>
                <td className="px-3 py-2.5 text-zinc-400">{row.finalRuling}</td>
                <td className="px-3 py-2.5">
                  <DecisionBadge decision={row.finalDecision} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DecisionBadge({
  decision,
}: {
  decision: "Top 3" | "Watchlist" | "Rejected";
}) {
  const styles = {
    "Top 3": "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    Watchlist: "border-sky-500/40 bg-sky-500/10 text-sky-200",
    Rejected: "border-zinc-600 bg-zinc-800/80 text-zinc-400",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        styles[decision],
      )}
    >
      {decision}
    </span>
  );
}

function StickySidebar({ displayDate }: { displayDate: string }) {
  const data = tradingDashboardData;
  const builtAt = new Date().toISOString();
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 to-black p-5 shadow-2xl ring-1 ring-white/5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Quick actions
        </p>
        <h2 className="mt-2 font-heading text-lg font-semibold text-white">
          Session summary
        </h2>
        <dl className="mt-5 space-y-4 text-sm">
          <SidebarRow label="Today’s best setup" value={data.sidebar.bestSetup} />
          <SidebarRow
            label="Best entry style"
            value={data.sidebar.bestEntryStyle}
          />
          <SidebarRow label="Safer trade" value={data.sidebar.saferTrade} />
          <SidebarRow
            label="Highest risk / upside"
            value={data.sidebar.highestRiskUpside}
          />
          <SidebarRow
            label="Cash"
            value={data.sidebar.cashSuggestion}
            muted
          />
        </dl>
        <div className="mt-6 border-t border-zinc-800/90 pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            First-hour checklist
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            {data.sidebar.checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-[10px] leading-relaxed text-zinc-600">
          {displayDate} · Static layout —{" "}
          <span className="font-mono text-[10px] text-zinc-500">
            built {builtAt.slice(0, 19)}Z
          </span>
        </p>
      </div>
    </aside>
  );
}

function SidebarRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] text-zinc-500">{label}</dt>
      <dd
        className={cn(
          "mt-0.5 font-medium",
          muted ? "text-zinc-400" : "text-zinc-100",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500/90">
        {eyebrow}
      </p>
      <h2 className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      <p className="text-sm text-zinc-500">{subtitle}</p>
    </div>
  );
}

function FooterNotes() {
  const builtAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <footer className="border-t border-zinc-800/80 pt-8 text-center text-[12px] text-zinc-600">
      <p>For planning and educational review.</p>
      <p className="mt-1">
        Static mock data for layout — ready for live quote integration.
      </p>
      <p className="mt-2 font-mono text-[11px] text-zinc-700">
        Page generated {builtAt}
      </p>
    </footer>
  );
}
