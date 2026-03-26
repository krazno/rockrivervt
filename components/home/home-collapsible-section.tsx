import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type HomeCollapsibleSectionProps = {
  /** For `aria-controls` / region id */
  panelId: string;
  className?: string;
  summaryClassName?: string;
  summaryContent: ReactNode;
  children: ReactNode;
  panelClassName?: string;
};

/**
 * Homepage section pattern: summary always visible; body hidden until opened.
 * Native `<details>` — closed by default (no `open` attribute).
 */
export function HomeCollapsibleSection({
  panelId,
  className,
  summaryClassName,
  summaryContent,
  children,
  panelClassName,
}: HomeCollapsibleSectionProps) {
  return (
    <details className={cn("group w-full", className)}>
      <summary
        aria-controls={panelId}
        className={cn(
          "flex cursor-pointer list-none items-start justify-between gap-3 py-0.5 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F6B52]/30",
          "[&::-webkit-details-marker]:hidden",
          summaryClassName,
        )}
      >
        <div className="min-w-0 flex-1 text-left">{summaryContent}</div>
        <ChevronDown
          className="mt-1 h-5 w-5 shrink-0 text-[#6B6F68] transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div id={panelId} className={cn(panelClassName)}>
        {children}
      </div>
    </details>
  );
}
