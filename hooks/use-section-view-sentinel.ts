"use client";

import { useCallback, useRef } from "react";

import { trackRrInteraction } from "@/lib/analytics";

/**
 * Attach the returned ref callback to a home (or other) section root.
 * Fires once per page load when ~12%+ of the node is visible.
 */
export function useSectionViewSentinel(sectionId: string) {
  const fired = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  return useCallback(
    (node: Element | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!node || fired.current) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting || fired.current) return;
          fired.current = true;
          trackRrInteraction("surface", "section_in_view", { section_id: sectionId });
          obs.disconnect();
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      obs.observe(node);
      observerRef.current = obs;
    },
    [sectionId],
  );
}
