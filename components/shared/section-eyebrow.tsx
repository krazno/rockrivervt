import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: ReactNode;
  icon?: LucideIcon;
  /** Center the label + icon (mobile sections); pair with sm:text-left on the parent for desktop. */
  align?: "start" | "center";
  className?: string;
};

/** Small caps label + optional nature icon — use across sections for rhythm. */
export function SectionEyebrow({
  children,
  icon: Icon,
  align = "start",
  className,
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--rr-mint)]",
        align === "center" && "w-full justify-center",
        className,
      )}
    >
      {Icon ? (
        <Icon className="h-3.5 w-3.5 shrink-0 opacity-[0.72]" strokeWidth={1.6} aria-hidden />
      ) : null}
      {children}
    </p>
  );
}
