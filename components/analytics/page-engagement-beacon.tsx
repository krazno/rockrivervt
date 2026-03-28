"use client";

import { useEffect, useRef } from "react";

import { trackRrInteraction, type RrInteractionCategory } from "@/lib/analytics";

type PageEngagementBeaconProps = {
  category: RrInteractionCategory;
  /** Short stable id, e.g. conditions_page */
  label: string;
};

/**
 * Fires once per mount when the page is viewed — complements automatic page_view in GA4.
 */
export function PageEngagementBeacon({ category, label }: PageEngagementBeaconProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackRrInteraction(category, label);
  }, [category, label]);

  return null;
}
