import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { Container } from "@/components/shared/container";
import { PhotoAccentRow } from "@/components/shared/photo-accent-row";
import { cn } from "@/lib/utils";

type GuidePageFrameProps = {
  eyebrow: string;
  title: string;
  lead: string;
  /** When set, shows a deterministic trio of gallery stills under the lead. */
  photoAccentSeed?: string;
  children: ReactNode;
};

/** Full-bleed guide page shell — matches homepage cream field (#F6F4EF via rr-body). */
export function GuidePageFrame({
  eyebrow,
  title,
  lead,
  photoAccentSeed,
  children,
}: GuidePageFrameProps) {
  return (
    <>
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] rr-body pb-20 text-[#1F2A24]">
        <Container className="py-10 sm:py-12">
          <header className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#6B6F68]">
              {eyebrow}
            </p>
            <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-[#1F2A24] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#3f4840] sm:text-lg">{lead}</p>
            {photoAccentSeed ?
              <PhotoAccentRow seed={photoAccentSeed} className="mt-8" />
            : null}
          </header>
          <div
            className={cn(
              "mx-auto flex max-w-3xl flex-col gap-6 sm:gap-8",
              photoAccentSeed ? "mt-8 sm:mt-10" : "mt-10",
            )}
          >
            {children}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
