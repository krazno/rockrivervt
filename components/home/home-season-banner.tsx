"use client";

import { PartyPopper } from "lucide-react";

import { HomeVisitorCounter } from "@/components/home/home-visitor-counter";

export function HomeSeasonBanner() {
  return (
    <div className="border-b border-[var(--rr-widget-border)] bg-gradient-to-r from-[#e3ede5] via-[#f2eee6] to-[#e5eef3]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 text-center sm:flex-row sm:justify-center sm:gap-4 sm:py-3.5 sm:text-left">
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--rr-ink)] sm:justify-start">
          <PartyPopper
            className="h-4 w-4 shrink-0 text-[var(--rr-forest)]"
            aria-hidden
          />
          <span>Excited for the 2026 season—hope to see you on the river.</span>
        </p>
        <span className="hidden h-4 w-px shrink-0 bg-[var(--rr-widget-border)] sm:block" aria-hidden />
        <HomeVisitorCounter />
      </div>
    </div>
  );
}
