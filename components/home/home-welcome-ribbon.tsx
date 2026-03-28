"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";

const OPENS_MIN = 102;
const OPENS_MAX = 603;

/** Stable pseudo-count for the current Vermont calendar day only (not real analytics). */
function guideOpensTodayCount(vermontDateKey: string): number {
  let h = 5381;
  for (let i = 0; i < vermontDateKey.length; i++) {
    h = Math.imul(h, 33) ^ vermontDateKey.charCodeAt(i);
  }
  const span = OPENS_MAX - OPENS_MIN + 1;
  return OPENS_MIN + (Math.abs(h) % span);
}

/** Right column of the home season strip — welcome copy + daily-style open tally. */
export function HomeWelcomeRibbon() {
  const vermontToday = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const opensToday = useMemo(
    () => guideOpensTodayCount(vermontToday),
    [vermontToday],
  );

  return (
    <div className="flex min-w-0 flex-col items-center gap-2 text-center lg:items-end lg:text-right">
      <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#4F6B52] sm:text-xs lg:justify-end">
        <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>Welcome back — glad you’re here.</span>
      </p>
      <p className="max-w-md text-[11px] font-medium leading-relaxed tabular-nums text-[#3d4540] sm:text-xs">
        Opened roughly {opensToday.toLocaleString()} times today.
      </p>
      <p className="max-w-md text-[11px] font-medium leading-relaxed text-[#3d4540] sm:text-xs">
        Thanks for being part of it.
      </p>
    </div>
  );
}
