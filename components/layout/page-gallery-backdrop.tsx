"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { getStableGalleryImageForPath } from "@/lib/page-gallery-accents";

/**
 * Full-viewport, low-opacity gallery still behind interior content (not the photo grid page).
 */
export function PageGalleryBackdrop() {
  const pathname = usePathname() ?? "/";

  if (pathname === "/gallery" || pathname.startsWith("/trading")) return null;

  const img = getStableGalleryImageForPath(pathname);
  if (!img) return null;

  const isHome = pathname === "/";
  const opacity = isHome ? "opacity-[0.09]" : "opacity-[0.11]";
  const wash = isHome ? "bg-[#faf8f4]/86" : "bg-[#faf8f4]/84";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <Image
        src={img.src}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover ${opacity}`}
        priority={false}
      />
      <div className={`absolute inset-0 ${wash}`} />
    </div>
  );
}
