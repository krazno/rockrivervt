"use client";

import { PartyPopper } from "lucide-react";

import { HomeWelcomeRibbon } from "@/components/home/home-welcome-ribbon";

/**
 * Home-only strip: three intentional columns on large screens—season note, place identity,
 * welcome & guide signal. On small screens the same pieces stack in that order.
 */
export function HomeSeasonBanner() {
  return (
    <div className="rr-season-photo-band border-b border-[#E2E0D8]/90 bg-gradient-to-r from-[#e8ede6]/95 via-[#F6F4EF]/92 to-[#e6ebe8]/95">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-center lg:gap-8">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left lg:border-r lg:border-[#dcd6cc]/90 lg:pr-8 lg:text-left">
            <PartyPopper
              className="h-4 w-4 shrink-0 text-[#4F6B52] sm:mt-0.5"
              aria-hidden
            />
            <p className="text-sm font-medium leading-snug text-[#1F2A24] sm:min-w-0 sm:flex-1">
              Excited for the 2026 season—hope to see you on the river.
            </p>
          </div>

          <div className="mt-5 flex flex-col items-center justify-center border-t border-[#dcd6cc]/80 pt-5 text-center lg:mt-0 lg:border-r lg:border-t-0 lg:border-[#dcd6cc]/90 lg:pt-0 lg:pr-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a918c] sm:text-[11px] sm:tracking-[0.24em]">
              Newfane · Windham County · Southern Vermont
            </p>
          </div>

          <div className="mt-5 border-t border-[#dcd6cc]/80 pt-5 lg:mt-0 lg:border-t-0 lg:pt-0 lg:pl-2">
            <HomeWelcomeRibbon />
          </div>
        </div>
      </div>
    </div>
  );
}
