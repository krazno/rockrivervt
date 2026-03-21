import Link from "next/link";

import { InteractiveMap } from "@/components/map/interactive-map";

export function HomeMapOverview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-[#c8d6cb] bg-[#f8faf6] shadow-[0_16px_44px_-30px_rgba(24,49,43,0.35)]">
        <div className="border-b border-[#dce8df] bg-[#eef4ed] px-5 py-5 sm:px-8 sm:py-6">
          <h2 className="text-xl font-semibold tracking-tight text-[#224035] sm:text-2xl">
            Rock River map
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#3d5c50] sm:text-base">
            Interactive preview of parking, trails, beaches, and the river corridor — tap
            or click a feature for details. For a larger view, open the full map.
          </p>
        </div>
        <div className="bg-[#f4f7f2] px-4 py-5 sm:px-6 sm:py-6">
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
              className="inline-flex items-center justify-center rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-5 py-2.5 text-sm font-medium text-[#35584c] shadow-[0_10px_28px_-22px_rgba(24,49,43,0.55)] transition duration-200 hover:bg-[#e9f0ea] hover:shadow-[0_14px_34px_-24px_rgba(24,49,43,0.55)]"
            >
              View full map
            </Link>
            <p className="text-center text-[11px] font-medium text-[#6d8a7e] sm:text-left">
              Preview uses the same local GeoJSON as the full map — no extra overlays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
