import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { Container } from "@/components/shared/container";
import { PhotoAccentRow } from "@/components/shared/photo-accent-row";

type ArticleShellProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  photoAccentSeed?: string;
  children: ReactNode;
};

/**
 * Light stone panel on the atmospheric shell — readable, editorial.
 */
export function ArticleShell({
  eyebrow,
  title,
  lead,
  photoAccentSeed,
  children,
}: ArticleShellProps) {
  return (
    <>
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] rr-body pb-20">
        <Container className="py-10 sm:py-12">
          <article className="rr-panel-light mx-auto max-w-3xl px-6 py-8 sm:px-10 sm:py-10">
            <header>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--rr-mint)]">
                {eyebrow}
              </p>
              <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--rr-ink)] sm:text-4xl">
                {title}
              </h1>
              {lead ? (
                <p className="rr-prose-muted mt-4 text-base leading-relaxed sm:text-lg">{lead}</p>
              ) : null}
              {photoAccentSeed ?
                <PhotoAccentRow seed={photoAccentSeed} className="mt-8" />
              : null}
            </header>
            <div className="mt-8 space-y-8 text-[var(--rr-ink)] [&_a]:font-medium [&_a]:text-[var(--rr-link)] [&_a]:underline-offset-2 [&_a]:hover:underline [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[var(--rr-ink)] [&_h2]:sm:text-2xl [&_p]:leading-relaxed [&_p]:text-[var(--rr-ink-muted)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-[var(--rr-ink-muted)]">
              {children}
            </div>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
