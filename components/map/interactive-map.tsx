"use client";

import dynamic from "next/dynamic";

import type { InteractiveMapViewProps } from "@/components/map/leaflet-map-view";

const LeafletMapView = dynamic(
  () =>
    import("@/components/map/leaflet-map-view").then((m) => m.LeafletMapView),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full min-h-[360px] animate-pulse rounded-[var(--rr-radius-lg)] border border-white/10 bg-[#0a1210]"
        aria-hidden
      />
    ),
  },
);

export type InteractiveMapProps = InteractiveMapViewProps;

/**
 * Leaflet map (client-only). Use for homepage preview or full `/map` page.
 */
export function InteractiveMap(props: InteractiveMapProps) {
  return <LeafletMapView {...props} />;
}
