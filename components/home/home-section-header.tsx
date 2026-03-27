import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { cn } from "@/lib/utils";

type HomeSectionHeaderProps = {
  eyebrow: string;
  icon?: LucideIcon;
  title: ReactNode;
  /** Shown under title; centered on small screens when align is default. */
  description?: ReactNode;
  id?: string;
  titleClassName?: string;
  /** Passed to `SectionEyebrow` (e.g. homepage label tone). */
  eyebrowClassName?: string;
  eyebrowIconClassName?: string;
  /** Merged onto the description wrapper (defaults to theme muted). */
  descriptionClassName?: string;
  className?: string;
};

/**
 * Homepage section title stack: centered on mobile, left-aligned from sm up (matches widget rhythm).
 */
export function HomeSectionHeader({
  eyebrow,
  icon: Icon,
  title,
  description,
  id,
  titleClassName,
  eyebrowClassName,
  eyebrowIconClassName,
  descriptionClassName,
  className,
}: HomeSectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 text-center sm:mb-8 sm:text-left",
        className,
      )}
    >
      <SectionEyebrow
        icon={Icon}
        align="center"
        className={cn("sm:justify-start", eyebrowClassName)}
        iconClassName={eyebrowIconClassName}
      >
        {eyebrow}
      </SectionEyebrow>
      <h2
        id={id}
        className={cn(
          "font-heading mt-2.5 text-balance text-[clamp(1.2rem,2vw,1.85rem)] font-semibold tracking-tight text-[var(--rr-ink)] sm:mt-3",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ?
        <div
          className={cn(
            "mx-auto mt-2 max-w-xl text-[13px] leading-relaxed sm:mx-0 sm:mt-3 sm:text-[0.9375rem]",
            descriptionClassName ?? "text-[var(--rr-text-muted)]",
          )}
        >
          {description}
        </div>
      : null}
    </header>
  );
}
