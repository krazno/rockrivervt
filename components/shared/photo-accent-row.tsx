import Image from "next/image";

import type { MediaItem } from "@/data/media";
import { getAccentImages } from "@/lib/page-photo-accents";
import {
  getPeopleAccentImagesForPage,
  type PeopleAccentPageKey,
} from "@/lib/people-media";
import { cn } from "@/lib/utils";

type AccentImg = MediaItem & { type: "image"; width: number; height: number };

type PhotoAccentRowProps = {
  /** When set, uses this list only (e.g. homepage disjoint strips). */
  images?: AccentImg[];
  /** Stable string so the same page always picks the same photos (SSR/client match). */
  seed?: string;
  /** Curated people-forward trio for key marketing pages (overrides seed when set). */
  peoplePage?: PeopleAccentPageKey;
  className?: string;
};

/**
 * Decorative image strip — improves interior pages without duplicating hero photography.
 */
export function PhotoAccentRow({
  images,
  seed,
  peoplePage,
  className,
}: PhotoAccentRowProps) {
  const imgs: AccentImg[] =
    images && images.length > 0 ? images
    : peoplePage ? getPeopleAccentImagesForPage(peoplePage)
    : seed ? getAccentImages(seed, 3)
    : [];
  if (imgs.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-2 sm:gap-3",
        className,
      )}
      aria-hidden
    >
      {imgs.map((img, i) => (
        <div
          key={img.src}
          className={cn(
            "relative aspect-[5/3] overflow-hidden rounded-xl border border-[#e2dfd8]/90 bg-[#eef0ec]/60 shadow-sm",
            "rr-photo-accent-tile",
            i === 1 && "rr-photo-accent-tile--delay",
          )}
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(max-width:640px) 33vw, 240px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
