"use client";

import { useMemo } from "react";
import { MessageCircleHeart } from "lucide-react";

import type { HomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { PeoplePresenceCircles } from "@/components/shared/people-presence-circles";
import { getHomeTodaysFeelPeoplePrimary } from "@/lib/people-media";
import { buildTodaysFeel, vermontMonth } from "@/lib/todays-feel";

type HomeTodaysFeelProps = {
  snapshot: HomeVisitSnapshot;
};

/**
 * “River honesty” — one human line from weather, water, crowd, and season. No new APIs.
 */
export function HomeTodaysFeel({ snapshot }: HomeTodaysFeelProps) {
  const peoplePrimary = useMemo(() => getHomeTodaysFeelPeoplePrimary(), []);

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
      <div className="rr-home-band rr-home-band--mist border border-dashed border-[#c9d4c9]/85 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0 flex-1">
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
          {peoplePrimary ?
            <PeoplePresenceCircles
              items={[peoplePrimary]}
              overlapClassName=""
              sizeClassName="h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem]"
              className="shrink-0 self-center sm:self-start sm:pt-1"
            />
          : null}
        </div>
      </div>
    </aside>
  );
}
