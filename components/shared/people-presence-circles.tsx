import Image from "next/image";
import Link from "next/link";

import type { MediaItem } from "@/data/media";
import { cn } from "@/lib/utils";

type ImageItem = MediaItem & { type: "image"; width: number; height: number };

type PeoplePresenceCirclesProps = {
  items: ImageItem[];
  /** Negative margin overlap between circles (tailwind scale). */
  overlapClassName?: string;
  sizeClassName?: string;
  className?: string;
  galleryHref?: string;
};

/**
 * Small circular crops — editorial cluster for “real visitors” without a heavy gallery block.
 */
export function PeoplePresenceCircles({
  items,
  overlapClassName = "-ml-2.5 first:ml-0 sm:-ml-3",
  sizeClassName = "h-11 w-11 sm:h-12 sm:w-12",
  className,
  galleryHref = "/gallery",
}: PeoplePresenceCirclesProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex shrink-0" role="list" aria-label="Visitor photos">
        {items.map((img, i) => (
          <Link
            key={img.src}
            href={galleryHref}
            role="listitem"
            className={cn(
              "rr-interactive-lift relative overflow-hidden rounded-full border-2 border-[#faf8f4] bg-[#eef0ec] shadow-[var(--rr-shadow-card-soft)] ring-2 ring-[#E2E0D8]/80 hover:z-[2] hover:ring-[#4F6B52]/30",
              sizeClassName,
              overlapClassName,
              i === 0 && "z-[1]",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              title={img.title}
              fill
              sizes="48px"
              className="object-cover object-center"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

type PeoplePresenceSplitProps = {
  primary: ImageItem;
  secondary: ImageItem;
  className?: string;
};

/** Two stacked circles — calm editorial column for sidebars. */
export function PeoplePresenceStackedPair({ primary, secondary, className }: PeoplePresenceSplitProps) {
  const ring =
    "rr-interactive-lift relative block overflow-hidden rounded-full border-2 border-[#faf8f4] shadow-[var(--rr-shadow-card-soft)] ring-2 ring-[#E2E0D8]/85 hover:ring-[#4F6B52]/25";

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Link
        href="/gallery"
        className={cn(ring, "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]")}
        aria-label={`${primary.title} — open gallery`}
      >
        <Image
          src={primary.src}
          alt={primary.alt}
          title={primary.title}
          fill
          sizes="72px"
          className="object-cover object-center"
        />
      </Link>
      <Link
        href="/gallery"
        className={cn(ring, "-mt-5 h-14 w-14 sm:-mt-6 sm:h-16 sm:w-16")}
        aria-label={`${secondary.title} — open gallery`}
      >
        <Image
          src={secondary.src}
          alt={secondary.alt}
          title={secondary.title}
          fill
          sizes="64px"
          className="object-cover object-center"
        />
      </Link>
    </div>
  );
}
