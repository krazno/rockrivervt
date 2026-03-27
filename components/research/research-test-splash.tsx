"use client";

import { useId, useState } from "react";
import { ArrowRight, Microscope, Sparkles } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { cn } from "@/lib/utils";

/**
 * Lightweight test surface for a future “deep research” flow (multi-step retrieval + synthesis).
 * No backend calls — UI and copy only.
 */
export function ResearchTestSplash() {
  const queryId = useId();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleRun(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
    setQuery("");
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <header className="reveal-up text-center sm:text-left">
        <SectionEyebrow
          icon={Microscope}
          align="center"
          className="sm:justify-start"
          iconClassName="h-4 w-4"
        >
          Lab · test surface
        </SectionEyebrow>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-[#1F2A24] sm:text-4xl">
          Deep research (prototype)
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--rr-text-muted)] sm:mx-0 sm:text-base">
          This page is a{" "}
          <strong className="font-medium text-[#1F2A24]">placeholder product lab</strong> for a
          future capability: multi-step research that plans sub-questions, gathers evidence, and
          synthesizes an answer. Nothing here calls an LLM or the web yet—it exists to validate
          layout, tone, and user flow inside the Rock River VT site.
        </p>
      </header>

      <section
        className="reveal-up mt-10 rounded-2xl border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)] p-5 shadow-[var(--rr-shadow-card)] backdrop-blur-sm sm:p-6"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4F6B52]/12 text-[#3d5240]">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 space-y-2 text-[13px] leading-relaxed text-[var(--rr-text-muted)] sm:text-sm">
            <p className="font-medium text-[#1F2A24]">What “deep research” would mean here</p>
            <ul className="list-inside list-disc space-y-1 marker:text-[#4F6B52]">
              <li>User asks one open-ended question in natural language.</li>
              <li>A server route (e.g. future <code className="rounded bg-[#eef0ec] px-1 py-0.5 text-[12px]">/api/research</code>) orchestrates planning, tool use, and citations.</li>
              <li>Results stream or render as sections: summary, sources, caveats.</li>
            </ul>
            <p className="pt-1 text-[12px] text-[#6B6F68]">
              Market-specific dashboards live separately at{" "}
              <span className="font-medium text-[#1F2A24]">/trading</span>; this lab stays
              general-purpose so the same stack could support visitor planning, stewardship Q&amp;A,
              or other research-style tasks without mixing product goals.
            </p>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleRun}
        className="reveal-up mt-8 space-y-4"
        style={{ animationDelay: "140ms" }}
      >
        <label htmlFor={queryId} className="block text-sm font-medium text-[#1F2A24]">
          Research query
        </label>
        <textarea
          id={queryId}
          name="query"
          rows={5}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. What are reliable public sources on seasonal water levels and safety for Rock River swimming areas?"
          className={cn(
            "w-full resize-y rounded-xl border border-[#d2dcd3] bg-white/90 px-4 py-3 text-[15px] text-[#1F2A24]",
            "placeholder:text-[#9cb0a4] shadow-sm",
            "focus:border-[#5a8a9a] focus:outline-none focus:ring-2 focus:ring-[#5a8a9a]/25",
          )}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={!query.trim()}
            className={cn(
              "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition",
              query.trim() ?
                "border border-[var(--rr-forest)] bg-[var(--rr-forest)] text-[#faf8f4] shadow-[var(--rr-shadow-card)] hover:bg-[#3d4a3d]"
              : "cursor-not-allowed border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg-soft)] text-[var(--rr-text-muted)]",
            )}
          >
            Run research
            <ArrowRight className="h-4 w-4 opacity-90" aria-hidden />
          </button>
          {submitted ?
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-[#4F6B52] underline-offset-4 hover:underline"
            >
              Clear and start over
            </button>
          : null}
        </div>
      </form>

      <section
        className="reveal-up mt-10"
        style={{ animationDelay: "200ms" }}
        aria-labelledby="research-results-heading"
      >
        <h2
          id="research-results-heading"
          className="text-sm font-semibold uppercase tracking-wide text-[#6B6F68]"
        >
          Results
        </h2>
        <div className="mt-3 min-h-[12rem] rounded-2xl border border-dashed border-[#c5cdc0] bg-[#faf8f4]/80 p-6 sm:p-8">
          {!submitted ?
            <p className="text-center text-[14px] leading-relaxed text-[var(--rr-text-muted)] sm:text-left">
              Submit a query to see the <strong className="font-medium text-[#1F2A24]">placeholder</strong>{" "}
              layout. In a real build, this panel would show streamed output, citations, and follow-up
              prompts.
            </p>
          : (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6B6F68]">
                  Your question
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-[#1F2A24]">{query.trim()}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <PlaceholderCard
                  title="Planned steps"
                  body="Stub: decompose the question, identify entities, choose search or doc tools."
                />
                <PlaceholderCard
                  title="Evidence"
                  body="Stub: retrieved snippets and URLs would list here with timestamps."
                />
              </div>
              <PlaceholderCard
                title="Synthesis"
                body="Stub: a structured answer with uncertainty called out. No model ran—this card is static copy to reserve space and typography."
                wide
              />
              <p className="rounded-lg border border-amber-200/90 bg-amber-50/90 px-3 py-2 text-[12px] leading-snug text-amber-950/90">
                <strong className="font-semibold">Test mode.</strong> Wire this panel to an API
                route and provider when you are ready; keep keys server-only and add rate limits
                before exposing publicly.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function PlaceholderCard({
  title,
  body,
  wide,
}: {
  title: string;
  body: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--rr-widget-border)] bg-white/70 p-4 shadow-sm",
        wide && "sm:col-span-2",
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6B6F68]">{title}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--rr-text-muted)]">{body}</p>
    </div>
  );
}
