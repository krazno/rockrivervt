"use client";

import Link from "next/link";
import { Building2, Mail, Sparkles } from "lucide-react";

import { PhotoAccentRow } from "@/components/shared/photo-accent-row";
import { SITE_STUDIO_BRAND, mailtoBusinessPartners } from "@/lib/site";

/** On-ramp for the area partners program—clear CTA to Krasno Design. */
export function HomeBusinessTeaser() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="area-partners-teaser-heading"
    >
      <div className="rr-photo-surface rr-photo-surface--shore overflow-hidden rounded-2xl border border-[#E2E0D8]/85 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6F68]">
              <Sparkles className="h-3.5 w-3.5 text-[#4F6B52]" aria-hidden />
              Windham County
            </p>
            <h2
              id="area-partners-teaser-heading"
              className="font-heading mt-2 text-xl font-bold tracking-tight text-[#1F2A24] sm:text-2xl"
            >
              Cafés, shops &amp; places to stay
            </h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-[#5a6258]">
              We’re lining up a tasteful directory for spots visitors actually hit before and after the
              river—coffee, groceries, a bed for the night. Queer-friendly crowd, straight-shooter
              copy. Want in? Ping {SITE_STUDIO_BRAND}; optional perks or sponsor nooks later, always
              labeled.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <Link
              href="/local-business"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#4F6B52]/35 bg-[#4F6B52] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d5640]"
            >
              <Building2 className="h-4 w-4 opacity-95" aria-hidden />
              Area partners
            </Link>
            <a
              href={mailtoBusinessPartners()}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#4F6B52] underline-offset-4 hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email {SITE_STUDIO_BRAND}
            </a>
            <Link
              href="/local-business#list"
              className="text-center text-[13px] font-medium text-[#6B6F68] underline-offset-2 hover:text-[#1F2A24] hover:underline sm:text-right"
            >
              How to get listed →
            </Link>
          </div>
        </div>
        <PhotoAccentRow seed="home-windham-partners" className="mt-8 opacity-95" />
      </div>
    </section>
  );
}
