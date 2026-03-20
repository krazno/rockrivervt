import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const MAP_SRC = "/images/rock-river-map.png";

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
            Parking, trail access, beaches, and the river corridor — use pinch/zoom in your
            browser if you need a closer look.
          </p>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#c8d6cb] bg-[#f8faf6] p-4 shadow-[0_16px_44px_-30px_rgba(24,49,43,0.35)] sm:p-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#d0ddd3] bg-[#eef2ea]">
              <Image
                src={MAP_SRC}
                alt="Full Rock River corridor map: parking, trails, beaches, and West River."
                width={1024}
                height={496}
                className="h-auto w-full object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
