"use client";

import Image from "next/image";
import { Leaf } from "lucide-react";
import { useState } from "react";

import type { AnimalSpottingEntry } from "@/data/animals";
import { animals } from "@/data/animals";
import { cn } from "@/lib/utils";

function AnimalCard({ animal }: { animal: AnimalSpottingEntry }) {
  const [imageBroken, setImageBroken] = useState(false);

  return (
    <button
      type="button"
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-2xl border border-[#c4d2c7] bg-white/65 text-left shadow-[0_6px_26px_-20px_rgba(24,49,43,0.3)] backdrop-blur-[2px] transition",
        "hover:border-[#a8c4ab] hover:shadow-[0_12px_36px_-22px_rgba(24,49,43,0.38)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35584c]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]",
      )}
      aria-label={`${animal.name}: seen ${animal.sightings} times, last seen ${animal.lastSeen}. Details coming soon.`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e4ebe4]">
        {imageBroken ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#e8eee8] to-[#d8e4dc] px-4 py-6"
            aria-hidden
          >
            <Leaf className="h-10 w-10 text-[#8aa396]/50" strokeWidth={1.25} />
            <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wider text-[#6d8a7e]">
              Image unavailable
            </p>
          </div>
        ) : (
          <Image
            src={animal.image}
            alt={animal.imageAlt}
            title={animal.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            onError={() => setImageBroken(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
          <h3 className="text-[15px] font-semibold tracking-tight text-[#1a2f27] sm:text-base">
            {animal.name}
          </h3>
          {animal.wildNeighborBadge ? (
            <span className="inline-flex rounded-full border border-[#a8bdae] bg-[#eef4ef] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#3d5c50]">
              Wild Neighbor
            </span>
          ) : null}
        </div>
        <p className="text-[12px] text-[#4d6a5f] sm:text-[13px]">
          Seen <span className="font-semibold tabular-nums text-[#35584c]">{animal.sightings}</span>{" "}
          times
        </p>
        <p className="text-[11px] leading-snug text-[#6d8a7e] sm:text-xs">
          Last seen: <span className="font-medium text-[#56756a]">{animal.lastSeen}</span>
        </p>
      </div>
    </button>
  );
}

export function AnimalSpottingWidget() {
  return (
    <div className="rounded-[1.75rem] border border-[#b5c7bb] bg-gradient-to-b from-white/75 to-[#f2f6f0]/95 p-5 shadow-[0_14px_48px_-32px_rgba(24,49,43,0.38)] sm:p-7">
      <header className="mb-5 max-w-2xl sm:mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
          Wild neighbors
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-[#1a2f27] sm:text-2xl">
          Who’s been seen lately
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[#4d6a5f] sm:text-sm">
          A soft ledger of creatures people have noticed near Rock River—celebrate from a
          distance and never crowd wildlife.
        </p>
      </header>

      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        role="list"
      >
        {animals.map((animal) => (
          <li key={animal.id}>
            <AnimalCard animal={animal} />
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-[#6d8a7e] sm:text-left">
        Sample counts for now—real sightings will plug in later. Card details are on the
        way.
      </p>
    </div>
  );
}
