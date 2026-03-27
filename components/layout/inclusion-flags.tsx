"use client";

import { Leaf, Sprout } from "lucide-react";
import { useId } from "react";

/**
 * Compact Pride, ally, trans, and Vermont-forward nature marks beside the wordmark.
 * Decorative; paired aria-label on the parent link covers meaning.
 */
export function InclusionFlags({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");

  return (
    <span className={className} aria-hidden>
      <span className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Classic rainbow pride */}
        <svg
          width={20}
          height={15}
          viewBox="0 0 22 16"
          className="shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10"
        >
          <rect width="22" height="2.67" fill="#E40303" y="0" />
          <rect width="22" height="2.67" fill="#FF8C00" y="2.67" />
          <rect width="22" height="2.67" fill="#FFED00" y="5.34" />
          <rect width="22" height="2.67" fill="#008026" y="8.01" />
          <rect width="22" height="2.67" fill="#004DFF" y="10.68" />
          <rect width="22" height="2.65" fill="#732982" y="13.35" />
        </svg>
        {/* Straight ally */}
        <svg
          width={20}
          height={15}
          viewBox="0 0 22 16"
          className="shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10"
        >
          <defs>
            <linearGradient id={`rr-ally-rainbow-${uid}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#E40303" />
              <stop offset="20%" stopColor="#FF8C00" />
              <stop offset="40%" stopColor="#FFED00" />
              <stop offset="60%" stopColor="#008026" />
              <stop offset="80%" stopColor="#004DFF" />
              <stop offset="100%" stopColor="#732982" />
            </linearGradient>
          </defs>
          <rect width="7" height="16" fill={`url(#rr-ally-rainbow-${uid})`} />
          <rect x="7" width="15" height="5.33" fill="#ffffff" />
          <rect x="7" y="5.33" width="15" height="5.34" fill="#1a1a1a" />
          <rect x="7" y="10.67" width="15" height="5.33" fill="#f5f5f5" />
        </svg>
        {/* Trans pride */}
        <svg
          width={20}
          height={15}
          viewBox="0 0 22 16"
          className="shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10"
        >
          <rect width="22" height="3.2" fill="#5BCEFA" y="0" />
          <rect width="22" height="3.2" fill="#F5A9B8" y="3.2" />
          <rect width="22" height="3.2" fill="#FFFFFF" y="6.4" />
          <rect width="22" height="3.2" fill="#F5A9B8" y="9.6" />
          <rect width="22" height="3.2" fill="#5BCEFA" y="12.8" />
        </svg>
        {/* Vermont / Green Mountains cue */}
        <Leaf
          className="h-[15px] w-[15px] shrink-0 text-[#4F6B52]"
          strokeWidth={2}
          aria-hidden
        />
        <Sprout
          className="h-[17px] w-[17px] shrink-0 text-[#6d8574]"
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </span>
  );
}
