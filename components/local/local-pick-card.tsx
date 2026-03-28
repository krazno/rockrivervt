"use client";

import Link from "next/link";
import {
  Coffee,
  MapPin,
  Mountain,
  Music,
  Store,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { LocalPickCategory, LocalPickEntry } from "@/content/local-ecosystem";
import { trackRrInteraction } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function outboundHost(href: string): string {
  try {
    return new URL(href).hostname;
  } catch {
    return "unknown";
  }
}

const CATEGORY_ICON: Record<LocalPickCategory, LucideIcon> = {
  food: UtensilsCrossed,
  coffee: Coffee,
  town: MapPin,
  scenic: Mountain,
  culture: Store,
  evening: Music,
  practical: Wrench,
};

const CATEGORY_LABEL: Record<LocalPickCategory, string> = {
  food: "Food",
  coffee: "Coffee",
  town: "Town",
  scenic: "Scenic",
  culture: "Local",
  evening: "Evening",
  practical: "Practical",
};

type LocalPickCardProps = {
  pick: LocalPickEntry;
  className?: string;
  /** When false, card is static (teaser grids that link elsewhere). */
  linkable?: boolean;
};

function CardInner({ pick }: { pick: LocalPickEntry }) {
  const Icon = CATEGORY_ICON[pick.category];
  const catLabel = CATEGORY_LABEL[pick.category];

  return (
    <>
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E2E0D8]/80 bg-white text-[#4F6B52] shadow-sm">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a918c]">
            {catLabel} · {pick.area}
          </p>
          <h3 className="font-heading mt-1 text-base font-semibold tracking-tight text-[#1F2A24] group-hover:text-[#2d5a42]">
            {pick.title}
          </h3>
        </div>
      </div>
      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[#5a6258] sm:text-sm">
        {pick.description}
      </p>
      {pick.hint ?
        <p className="mt-2 text-[12px] leading-snug text-[#8a918c]">{pick.hint}</p>
      : null}
      <p className="mt-3 text-[12px] font-medium text-[#4F6B52] opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100 sm:opacity-90">
        {pick.extUrl?.startsWith("/") ? "Open →"
        : pick.mapsUrl ? "Open map →"
        : pick.extUrl ? "Open link →"
        : ""}
      </p>
    </>
  );
}

/**
 * Reusable editorial card for local picks — calm border, icon chip, optional outbound links.
 */
export function LocalPickCard({ pick, className, linkable = true }: LocalPickCardProps) {
  const shell = cn(
    "group flex h-full flex-col rounded-2xl border border-[#E2E0D8] bg-[#fafaf8] p-4 shadow-sm transition duration-300 hover:border-[#4F6B52]/30 hover:shadow-md sm:p-5",
    linkable && (pick.mapsUrl || pick.extUrl) && "cursor-pointer",
    className,
  );

  if (!linkable || (!pick.mapsUrl && !pick.extUrl)) {
    return (
      <article className={shell}>
        <CardInner pick={pick} />
      </article>
    );
  }

  if (pick.extUrl?.startsWith("/")) {
    return (
      <Link
        href={pick.extUrl}
        className={shell}
        onClick={() =>
          trackRrInteraction("local_pick", pick.id, {
            pick_category: pick.category,
            destination: "internal",
          })
        }
      >
        <article className="flex h-full flex-col">
          <CardInner pick={pick} />
        </article>
      </Link>
    );
  }

  const href = pick.extUrl ?? pick.mapsUrl!;
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={shell}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => {
        if (external) {
          trackRrInteraction("outbound", pick.id, {
            pick_category: pick.category,
            link_domain: outboundHost(href),
          });
        } else {
          trackRrInteraction("local_pick", pick.id, { pick_category: pick.category });
        }
      }}
    >
      <article className="flex h-full flex-col">
        <CardInner pick={pick} />
      </article>
    </a>
  );
}
