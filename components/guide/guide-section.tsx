import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GuideSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/** Card-style section aligned with homepage (#E2E0D8 borders, white panel). */
export function GuideSection({
  id,
  eyebrow,
  title,
  children,
  className,
}: GuideSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 rounded-2xl border border-[#E2E0D8] bg-white p-6 shadow-sm sm:p-7",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6F68]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-xl font-semibold tracking-tight text-[#1F2A24] sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#3f4840] sm:text-[15px] sm:leading-[1.7] [&_a]:font-semibold [&_a]:text-[#4F6B52] [&_a]:underline-offset-2 [&_a]:hover:underline [&_strong]:text-[#1F2A24] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-[#3f4840]">
        {children}
      </div>
    </section>
  );
}
