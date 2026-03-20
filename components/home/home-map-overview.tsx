import Image from "next/image";
import Link from "next/link";

const MAP_SRC = "/images/rock-river-map.png";

export function HomeMapOverview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-[#c8d6cb] bg-[#f8faf6] shadow-[0_16px_44px_-30px_rgba(24,49,43,0.35)]">
        <div className="border-b border-[#dce8df] bg-[#eef4ed] px-5 py-5 sm:px-8 sm:py-6">
          <h2 className="text-xl font-semibold tracking-tight text-[#224035] sm:text-2xl">
            Rock River map
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#3d5c50] sm:text-base">
            Use this overview to see parking, trail access, the family beach area, and how
            the river corridor connects before you head out.
          </p>
        </div>
        <div className="bg-[#f4f7f2] px-4 py-5 sm:px-6 sm:py-6">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#d0ddd3] bg-[#eef2ea] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
            <Image
              src={MAP_SRC}
              alt="Topographic map of the Rock River corridor in Vermont, showing parking, trails, beaches, and the West River confluence."
              width={1024}
              height={496}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, min(80rem, 100vw)"
              priority={false}
            />
          </div>
          <div className="mt-5 flex justify-center sm:mt-6">
            <Link
              href="/map"
              className="inline-flex items-center justify-center rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-5 py-2.5 text-sm font-medium text-[#35584c] shadow-[0_10px_28px_-22px_rgba(24,49,43,0.55)] transition duration-200 hover:bg-[#e9f0ea] hover:shadow-[0_14px_34px_-24px_rgba(24,49,43,0.55)]"
            >
              View full map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
