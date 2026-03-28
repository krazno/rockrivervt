"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Camera } from "lucide-react";

import { getVisitorMomentPhotos } from "@/data/media";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { sessionSeededShuffle } from "@/lib/session-seeded-shuffle";

const SHUFFLE_KEY = "rr_visitor_moments_order";

/**
 * Short row of circular crops — real visitor energy without competing with the main hero.
 * Order shuffles per session so the same face isn’t always first.
 */
export function HomeVisitorMomentsRow() {
  const source = useMemo(() => getVisitorMomentPhotos(), []);
  const [photos, setPhotos] = useState(source);

  useEffect(() => {
    setPhotos(sessionSeededShuffle(source, SHUFFLE_KEY));
  }, [source]);

  if (photos.length === 0) return null;

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="visitor-moments-heading"
    >
      <SectionEyebrow icon={Camera} iconClassName="h-4 w-4 text-[#4F6B52]">
        Visitor moments
      </SectionEyebrow>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="visitor-moments-heading"
            className="font-heading text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.65rem]"
          >
            Real people, real river days
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5a6358] sm:text-[15px]">
            A few candid frames from the swimming hole and trail—same water you’ll find on the{" "}
            <Link href="/map" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              map
            </Link>{" "}
            and in the{" "}
            <Link href="/gallery" className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline">
              gallery
            </Link>
            .
          </p>
        </div>
        <Link
          href="/gallery"
          className="shrink-0 self-start rounded-full border border-[#E2E0D8] bg-white px-4 py-2 text-sm font-semibold text-[#2d4a38] shadow-sm transition hover:border-[#4F6B52]/35 hover:bg-[#F6F4EF] sm:self-auto"
        >
          Full gallery
        </Link>
      </div>
      <ul
        className="rr-home-band rr-home-band--mist mt-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-[#E2E0D8]/65 p-5 sm:justify-start sm:gap-5 sm:p-6"
        role="list"
      >
        {photos.map((p) => (
          <li key={p.src}>
            <Link
              href="/gallery"
              className="group rr-interactive-lift relative block h-[5.25rem] w-[5.25rem] overflow-hidden rounded-full border-2 border-[#faf8f4] shadow-[var(--rr-shadow-card-soft)] ring-2 ring-[#E2E0D8]/90 hover:ring-[#4F6B52]/25 sm:h-[5.75rem] sm:w-[5.75rem]"
            >
              <Image
                src={p.src}
                alt={p.alt}
                title={p.title}
                fill
                sizes="(max-width: 640px) 92px, 100px"
                className="object-cover object-center transition-[transform] duration-[var(--rr-motion-duration-hover)] ease-[var(--rr-motion-ease-hover)] motion-reduce:transition-none group-hover:scale-[1.03]"
              />
              <span className="sr-only">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
