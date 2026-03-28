"use client";

import Link from "next/link";
import { Mail, Users } from "lucide-react";

import { trackRrInteraction } from "@/lib/analytics";
import { mailtoPhotoSubmission, mailtoVisitorFieldNote } from "@/lib/site";

/**
 * Low-noise bridge: real-world contributions + partners, no feeds or accounts.
 */
export function HomeConnectionStrip() {
  const linkClass =
    "font-semibold text-[#4F6B52] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F6B52]/40";

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-label="Ways to connect with this guide"
    >
      <div className="rounded-2xl border border-[#E2E0D8]/90 bg-white/80 px-4 py-5 shadow-sm sm:px-6 sm:py-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6F68]">
          Real-world loop
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#3f4840]">
          This guide gets better when people on the ground share a sentence or a frame—curated, not
          a comment wall.
        </p>
        <ul className="mt-4 flex flex-col gap-3 text-sm text-[#1F2A24] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-[#4F6B52]" aria-hidden />
            <a
              href={mailtoVisitorFieldNote()}
              onClick={() => trackRrInteraction("navigation", "connection_field_note")}
              className={linkClass}
            >
              Send a short field note
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-[#4F6B52]" aria-hidden />
            <a
              href={mailtoPhotoSubmission()}
              onClick={() => trackRrInteraction("navigation", "connection_photo_mailto")}
              className={linkClass}
            >
              Offer a photo for the gallery
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Users className="h-4 w-4 shrink-0 text-[#4F6B52]" aria-hidden />
            <Link
              href="/community"
              onClick={() => trackRrInteraction("navigation", "connection_community")}
              className={linkClass}
            >
              Community &amp; mail-in contributions
            </Link>
          </li>
          <li className="sm:ml-auto">
            <Link
              href="/get-featured"
              onClick={() => trackRrInteraction("partner", "connection_get_featured_strip")}
              className={`${linkClass} text-[13px]`}
            >
              Businesses: get featured →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
