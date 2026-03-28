"use client";

import Link from "next/link";

import { trackRrInteraction } from "@/lib/analytics";
import type { PlanItinerary } from "@/content/plan-itineraries";

export function PlanItinerariesClient({ itineraries }: { itineraries: PlanItinerary[] }) {
  return (
    <div className="space-y-12">
      {itineraries.map((it) => (
        <article
          key={it.id}
          className="rounded-2xl border border-[#E2E0D8] bg-[#fafaf8] p-5 shadow-sm sm:p-7"
        >
          <h2 className="font-heading text-xl font-bold tracking-tight text-[#1F2A24] sm:text-2xl">
            {it.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#5a6258]">{it.vibe}</p>
          <ol className="mt-6 space-y-6 border-t border-[#E2E0D8]/80 pt-6">
            {it.steps.map((step, i) => (
              <li key={`${it.id}-${step.title}`} className="flex gap-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#4F6B52]/25 bg-white text-sm font-bold text-[#4F6B52]"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a918c]">
                    {step.time}
                  </p>
                  <h3 className="font-heading mt-1 text-lg font-semibold text-[#1F2A24]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3f4840]">{step.detail}</p>
                  {step.href && step.hrefLabel ?
                    <p className="mt-3">
                      <Link
                        href={step.href}
                        onClick={() =>
                          trackRrInteraction("navigation", "plan_day_step_link", {
                            itinerary_id: it.id,
                            step: step.title,
                          })
                        }
                        className="text-sm font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
                      >
                        {step.hrefLabel} →
                      </Link>
                    </p>
                  : null}
                </div>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}
