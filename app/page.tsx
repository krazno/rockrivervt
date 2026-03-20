"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const riverPhotos = [
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
      alt: "Forest stream with soft green tones",
      credit: "Unsplash",
    },
    {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      alt: "Mountain valley and water in muted blue light",
      credit: "Unsplash",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
      alt: "Woodland path near water and stone",
      credit: "Unsplash",
    },
  ];

  const quickLinks = [
    {
      title: "Map",
      description: "Parking pull-offs, swimming pockets, and trail access points.",
      href: "/map",
    },
    {
      title: "Walk Guide",
      description: "A gentle step-by-step walk from village edge to river bends.",
      href: "/walk-guide",
    },
    {
      title: "Daily Updates",
      description: "Local observations on trail conditions, flow, and crowd levels.",
      href: "/daily-updates",
    },
    {
      title: "Photos",
      description: "Seasonal scenes from misty spring mornings to late summer light.",
      href: "/photos",
    },
    {
      title: "Notes",
      description: "Community tips about respectful access and quiet places to pause.",
      href: "/notes",
    },
    {
      title: "Weather",
      description: "Quick weather context before heading down to the river.",
      href: "/weather",
    },
    {
      title: "Learn More",
      description: "Background on Rock River, local ecology, and stewardship basics.",
      href: "/learn-more",
    },
  ];

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RockRiverVT",
    url: "https://rockrivervt.com",
    description:
      "An unofficial local guide to Rock River near Newfane, Vermont with updates, maps, weather context, and stewardship notes.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rockrivervt.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="min-h-screen bg-[#eef2ea] text-[#20342c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {showWelcome ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14231d]/55 px-4 backdrop-blur-[2px]">
          <div className="reveal-up w-full max-w-sm rounded-2xl border border-[#b6c9bc] bg-[#f3f7f1] p-5 shadow-[0_18px_45px_-20px_rgba(20,36,31,0.75)]">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#4e6b60] uppercase">
              Welcome
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#1f392f]">
              Welcome to RockRiverVT
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#466359]">
              Check conditions, explore the map, and enjoy Rock River
              respectfully.
            </p>
            <button
              type="button"
              onClick={() => setShowWelcome(false)}
              className="mt-4 inline-flex rounded-full bg-[#31584b] px-4 py-2 text-sm font-medium text-[#edf4ef] transition hover:bg-[#284a3f]"
            >
              Enter site
            </button>
          </div>
        </div>
      ) : null}

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="hero-sheen relative overflow-hidden rounded-3xl border border-[#c9d5c6] bg-gradient-to-br from-[#e7efe2] via-[#dde8df] to-[#cfded9] shadow-[0_18px_55px_-25px_rgba(30,52,44,0.55)]">
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
              Community Guide
            </p>
            <h1 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
              RockRiverVT
            </h1>
            <p className="mt-2 max-w-2xl text-base text-[#35544a] sm:text-lg">
              An unofficial local guide to Rock River near Newfane, Vermont -
              built by neighbors, walkers, and river regulars.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#4e6c62] sm:text-base">
              Check the path before you go, find calm spots to explore, and
              learn how to enjoy this place while helping keep it wild and
              welcoming for everyone.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/map"
                className="rounded-full bg-[#31584b] px-5 py-2.5 text-sm font-medium text-[#edf4ef] transition hover:bg-[#284a3f]"
              >
                Explore the Map
              </Link>
              <Link
                href="/daily-updates"
                className="rounded-full border border-[#8ea497] bg-[#f3f6f2] px-5 py-2.5 text-sm font-medium text-[#35584c] transition hover:bg-[#e7ede8]"
              >
                View Daily Updates
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
            Quick links
          </h2>
          <span className="text-xs tracking-[0.14em] text-[#56756a] uppercase">
            Mobile-first
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group reveal-up rounded-2xl border border-[#c4d3ca] bg-[#f4f6f2] p-4 shadow-[0_8px_26px_-18px_rgba(22,45,36,0.55)] transition hover:-translate-y-0.5 hover:border-[#99b0a4] hover:shadow-[0_12px_30px_-18px_rgba(22,45,36,0.58)]"
            >
              <p className="text-base font-semibold text-[#224136] group-hover:text-[#163128]">
                {link.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#4b695f]">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="reveal-up rounded-3xl border border-[#c6d3ca] bg-[#f3f7f2] p-5 shadow-[0_14px_34px_-28px_rgba(21,40,33,0.7)] sm:p-6">
          <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
            Share a Rock River photo
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4e6c62]">
            Quick mock upload: open your camera, snap a photo, and preview it.
            This is lightweight and does not save to a backend yet.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="rounded-full bg-[#31584b] px-5 py-2.5 text-sm font-medium text-[#edf4ef] transition hover:bg-[#284a3f]"
            >
              Open Camera
            </button>
            <button
              type="button"
              onClick={() => {
                if (!selectedPhoto) return;
                window.alert("Photo send mock complete. Backend coming soon.");
              }}
              className="rounded-full border border-[#8ea497] bg-[#f3f6f2] px-5 py-2.5 text-sm font-medium text-[#35584c] transition hover:bg-[#e7ede8] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!selectedPhoto}
            >
              Send Photo (Mock)
            </button>
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setSelectedPhoto(URL.createObjectURL(file));
            }}
          />
          {selectedPhoto ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#c7d4cb] bg-[#e9f0eb]">
              <Image
                src={selectedPhoto}
                alt="Selected Rock River upload preview"
                width={1200}
                height={900}
                unoptimized
                className="h-56 w-full object-cover sm:h-64"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
            Vermont view
          </h2>
          <p className="mt-1 text-sm text-[#4f6d63]">
            A quick look at the Green Mountain landscape around Newfane.
          </p>
        </div>
        <figure className="reveal-up overflow-hidden rounded-3xl border border-[#c7d5cd] bg-[#eef4f2] shadow-[0_16px_44px_-30px_rgba(24,49,43,0.65)]">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Vermont mountain landscape with forest and lake"
            width={1600}
            height={1067}
            unoptimized
            className="h-64 w-full object-cover sm:h-72 lg:h-80"
          />
          <figcaption className="border-t border-[#cbd8d1] bg-[#f4f7f5] px-4 py-2 text-xs text-[#4f6f63]">
            Vermont landscape inspiration.
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
            River photos
          </h2>
          <p className="mt-1 text-sm text-[#4f6d63]">
            A visual feel for Rock River moods and nearby Vermont terrain.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {riverPhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className="reveal-up overflow-hidden rounded-2xl border border-[#c7d4cb] bg-[#f2f5f1]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={800}
                unoptimized
                className="h-52 w-full object-cover transition duration-500 hover:scale-105"
              />
              <figcaption className="px-3 py-2 text-xs text-[#56756a]">
                Photo source: {photo.credit}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="reveal-up rounded-2xl border border-[#c2d0c6] bg-[#f8f8f3] p-5">
            <h3 className="text-sm font-semibold tracking-[0.14em] text-[#4d6d61] uppercase">
              Today near the river
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#36584c]">
              Cool morning air, softer light in the gorge, and patchy wet
              stones near the lower bends after overnight rain.
            </p>
          </article>
          <article
            className="reveal-up rounded-2xl border border-[#c3ced1] bg-[#f4f7f8] p-5"
            style={{ animationDelay: "80ms" }}
          >
            <h3 className="text-sm font-semibold tracking-[0.14em] text-[#4e6870] uppercase">
              Visitor note
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#38515a]">
              Stay on marked paths where possible, keep voices low, and pack
              out everything you bring in.
            </p>
          </article>
          <article
            className="reveal-up rounded-2xl border border-[#d5d0c3] bg-[#f7f3ea] p-5"
            style={{ animationDelay: "160ms" }}
          >
            <h3 className="text-sm font-semibold tracking-[0.14em] text-[#6c6350] uppercase">
              Local reminder
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5a5140]">
              Conditions can change quickly; always use your judgment and avoid
              entering fast or unclear water.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <figure className="reveal-up overflow-hidden rounded-3xl border border-[#c8d6cb] bg-[#e6eee7] shadow-[0_18px_50px_-30px_rgba(23,45,36,0.6)]">
          <Image
            src="/rock-river-hero.png"
            alt="Rock River in Newfane, Vermont with afternoon light"
            width={1536}
            height={2048}
            className="h-[44svh] min-h-[290px] w-full object-cover object-center sm:h-[50svh] lg:h-[56svh]"
          />
          <figcaption className="border-t border-[#c6d3ca] bg-[#f2f5f1] px-4 py-2 text-xs text-[#4f6f63]">
            Rock River near Newfane, Vermont.
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
