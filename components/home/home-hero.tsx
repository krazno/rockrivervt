"use client";

import Link from "next/link";

type HomeHeroProps = {
  showWelcome: boolean;
  onClose: () => void;
  homeJsonLd: Record<string, unknown>;
};

export function HomeHero({ showWelcome, onClose, homeJsonLd }: HomeHeroProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {showWelcome ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14231d]/58 px-4 backdrop-blur-[2px]">
          <div className="reveal-up w-full max-w-sm rounded-2xl border border-[#b6c9bc] bg-[#f3f7f1] p-5 shadow-[0_22px_70px_-45px_rgba(20,36,31,0.85)] ring-1 ring-black/5">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#4e6b60] uppercase">
              Welcome
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#1f392f]">
              Welcome to Rock River VT
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#466359]">
              We’re glad you’re here. Peek at conditions, scan the map, and step
              into the day with kindness for the water and everyone beside it.{" "}
              <span className="font-medium text-[#35584c]">All are welcome</span>
              —families, neighbors, LGBTQ+ visitors, and newcomers.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 inline-flex rounded-full bg-[#31584b] px-4 py-2 text-sm font-medium text-[#edf4ef] transition duration-200 hover:bg-[#284a3f] hover:shadow-[0_18px_45px_-30px_rgba(49,88,75,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f7f1]"
            >
              Come on in
            </button>
          </div>
        </div>
      ) : null}

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="hero-sheen relative overflow-hidden rounded-3xl border border-[#c9d5c6] bg-gradient-to-br from-[#e7efe2] via-[#dde8df] to-[#cfded9] shadow-[0_18px_55px_-25px_rgba(30,52,44,0.55)] transition duration-300 ease-out hover:border-[#a8c4ab] hover:shadow-[0_28px_90px_-55px_rgba(30,52,44,0.75)]">
          <div
            className="float-slow pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#d7e4dd]/80 blur-xl"
            aria-hidden
          />
          <div
            className="float-slower pointer-events-none absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-[#b7d0cf]/70 blur-xl"
            aria-hidden
          />
          <div className="relative p-6 sm:p-8 md:p-10">
            <p className="mb-3 inline-flex rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#446258] uppercase">
              All are welcome
            </p>
            <h1 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
              Rock River VT
            </h1>
            <p className="mt-2 max-w-2xl text-base text-[#35544a] sm:text-lg">
              A calm, community-built guide to Rock River in southern Vermont—cold
              pools, sun-warmed stone, and woodland trails looked after by
              neighbors and volunteers who want this place to stay wild and open.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#4e6c62] sm:text-base">
              Locals, families, LGBTQ+ visitors, and first-time guests share the
              same shoreline when we lead with care: light packing, quiet voices,
              and respect for private land, living habitat, and each other.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/map"
                className="rounded-full bg-[#31584b] px-5 py-2.5 text-sm font-medium text-[#edf4ef] shadow-[0_14px_34px_-30px_rgba(49,88,75,0.85)] transition duration-200 hover:bg-[#284a3f] hover:shadow-[0_22px_60px_-45px_rgba(49,88,75,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]"
              >
                Open the map
              </Link>
              <Link
                href="/conditions"
                className="rounded-full border border-[#8ea497] bg-[#f3f6f2] px-5 py-2.5 text-sm font-medium text-[#35584c] transition duration-200 hover:bg-[#e7ede8] hover:shadow-[0_20px_55px_-45px_rgba(20,36,31,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ea497]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f6f2]"
              >
                Plan with conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

