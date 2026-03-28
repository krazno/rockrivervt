"use client";

import { useMemo } from "react";
import { MessageCircleHeart } from "lucide-react";

import type { HomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { buildTodaysFeel, vermontMonth } from "@/lib/todays-feel";

type HomeTodaysFeelProps = {
  snapshot: HomeVisitSnapshot;
};

/**
 * “River honesty” — one human line from weather, water, crowd, and season. No new APIs.
 */
export function HomeTodaysFeel({ snapshot }: HomeTodaysFeelProps) {
  const feel = useMemo(() => {
    const now = new Date();
    return buildTodaysFeel({
      loading: snapshot.loading,
      month: vermontMonth(now),
      airTempF:
        typeof snapshot.weather?.temperature === "number" ? snapshot.weather.temperature : null,
      shortForecast: snapshot.weather?.shortForecast ?? null,
      waterLine: snapshot.waterLine,
      beachLine: snapshot.beachLine,
      visitWindowSummary: snapshot.windowHint?.summary ?? null,
      flowCfs: snapshot.river?.flowCfs ?? null,
      clarityStatus: snapshot.river?.clarityStatus ?? null,
    });
  }, [snapshot]);

  return (
    <aside
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="todays-feel-heading"
    >
      <div className="rounded-2xl border border-dashed border-[#c9d4c9]/90 bg-[#fbfaf7]/90 px-4 py-4 shadow-sm sm:px-5 sm:py-5">
        <SectionEyebrow icon={MessageCircleHeart} iconClassName="h-4 w-4 text-[#4F6B52]">
          Today’s feel
        </SectionEyebrow>
        <h2 id="todays-feel-heading" className="sr-only">
          Honest read for today
        </h2>
        <p className="mt-2 text-[15px] font-medium leading-relaxed text-[#1F2A24] sm:text-base">
          {feel.line}
        </p>
        {feel.aside ?
          <p className="mt-2 text-[13px] leading-relaxed text-[#6B6F68]">{feel.aside}</p>
        : null}
      </div>
    </aside>
  );
}
