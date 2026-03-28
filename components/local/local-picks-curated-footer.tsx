"use client";

import Link from "next/link";

import { trackRrInteraction } from "@/lib/analytics";

type LocalPicksCuratedFooterProps = {
  placement: "home_teaser" | "after_river_page";
};

/**
 * Quiet CTA after editorial picks — reinforces unpaid curation + on-ramp for businesses.
 */
export function LocalPicksCuratedFooter({ placement }: LocalPicksCuratedFooterProps) {
  return (
    <p
      className={
        placement === "home_teaser" ?
          "mt-5 max-w-3xl text-center text-[13px] leading-relaxed text-[#6B6F68] sm:text-left"
        : "mt-2 max-w-3xl text-sm leading-relaxed text-[#5a6258]"
      }
    >
      Nothing here is paid placement—just places we’d send a friend after a swim. If you run a spot
      that fits, you can{" "}
      <Link
        href="/get-featured"
        onClick={() =>
          trackRrInteraction("partner", "curated_picks_get_featured", { placement })
        }
        className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
      >
        ask to be considered
      </Link>
      . We keep copy short and label anything sponsor-related later.
    </p>
  );
}
