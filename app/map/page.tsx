import Link from "next/link";

import { InteractiveMap } from "@/components/map/interactive-map";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function MapPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] pb-16 text-[#20342c]">
        <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-[#4d6d61] underline-offset-4 hover:text-[#35584c] hover:underline"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-[#224035] sm:text-3xl">
            Rock River map
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3d5c50]">
            Parking, trail access, beaches, and the river corridor — pan and zoom with the
            same local data as the homepage preview. Scroll to zoom.
          </p>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#c8d6cb] bg-[#f8faf6] p-4 shadow-[0_16px_44px_-30px_rgba(24,49,43,0.35)] sm:p-6">
            <InteractiveMap
              mode="full"
              height={500}
              showLegend
              showControls
              geoJsonUrl="/geo/map.geojson"
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
