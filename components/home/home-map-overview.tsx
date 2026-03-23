import Link from "next/link";

import { InteractiveMap } from "@/components/map/interactive-map";

export function HomeMapOverview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rr-glass-strong overflow-hidden">
        <div className="border-b border-white/10 bg-white/[0.04] px-5 py-5 sm:px-8 sm:py-6">
          <h2 className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
            On the map
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
            Parking, trails, beaches, and the river corridor—tap or click a feature for
            context. Open the full map when you want more room to pan and zoom.
          </p>
        </div>
        <div className="bg-[#050a08]/50 px-4 py-5 sm:px-6 sm:py-6">
          <InteractiveMap
            mode="preview"
            height={440}
            showLegend
            showControls
            geoJsonUrl="/geo/map.geojson"
          />
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row sm:gap-4">
            <Link
              href="/map"
              className="inline-flex items-center justify-center rounded-full border border-[var(--rr-glow)]/40 bg-[var(--rr-glow)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--rr-mint)] shadow-[0_10px_28px_-22px_rgba(62,207,142,0.35)] transition hover:bg-[var(--rr-glow)]/25"
            >
              View full map
            </Link>
            <p className="text-center text-[11px] font-medium text-white/45 sm:text-left">
              Same local GeoJSON as the full map—what you see here is what you get there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
