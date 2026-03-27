"use client";

import { PartyPopper } from "lucide-react";

import { HomeWelcomeRibbon } from "@/components/home/home-welcome-ribbon";

export function HomeSeasonBanner() {
  return (
    <div className="rr-season-photo-band border-b border-[#E2E0D8]/90 bg-gradient-to-r from-[#e8ede6]/95 via-[#F6F4EF]/92 to-[#e6ebe8]/95">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-4 px-4 py-3.5 sm:flex-row sm:items-start sm:gap-8 sm:py-4">
        <p className="flex shrink-0 items-center justify-center gap-2 text-center text-sm font-medium text-[#1F2A24] sm:max-w-[min(100%,20rem)] sm:justify-start sm:text-left">
          <PartyPopper
            className="h-4 w-4 shrink-0 text-[#4F6B52]"
            aria-hidden
          />
          <span>Excited for the 2026 season—hope to see you on the river.</span>
        </p>
        <span className="hidden h-auto w-px shrink-0 self-stretch bg-[#E2E0D8] sm:block" aria-hidden />
        <HomeWelcomeRibbon />
      </div>
    </div>
  );
}
