"use client";

import { PartyPopper } from "lucide-react";

import { HomeVisitorCounter } from "@/components/home/home-visitor-counter";

export function HomeSeasonBanner() {
  return (
    <div className="border-b border-[#E2E0D8] bg-gradient-to-r from-[#e8ede6] via-[#F6F4EF] to-[#e6ebe8]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 text-center sm:flex-row sm:justify-center sm:gap-4 sm:py-3.5 sm:text-left">
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-[#1F2A24] sm:justify-start">
          <PartyPopper
            className="h-4 w-4 shrink-0 text-[#4F6B52]"
            aria-hidden
          />
          <span>Excited for the 2026 season—hope to see you on the river.</span>
        </p>
        <span className="hidden h-4 w-px shrink-0 bg-[#E2E0D8] sm:block" aria-hidden />
        <HomeVisitorCounter />
      </div>
    </div>
  );
}
