import Link from "next/link";
import type { ReactNode } from "react";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export type AuthorityLandingProps = {
  path: string;
  /** JSON-LD `WebPage` name */
  jsonName: string;
  jsonDescription: string;
  /** Visible breadcrumb leaf (often shorter than `jsonName`) */
  breadcrumbLabel: string;
  h1: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
};

/**
 * Minimal article shell matching existing interior pages (map, etc.) — no layout redesign.
 */
export function AuthorityLanding({
  path,
  jsonName,
  jsonDescription,
  breadcrumbLabel,
  h1,
  intro,
  children,
}: AuthorityLandingProps) {
  return (
    <>
      <WebPageJsonLd name={jsonName} description={jsonDescription} path={path} />
      <BreadcrumbJsonLd path={path} />
      <SiteHeader />
      <main className="rr-body pb-20 text-[var(--rr-text)]">
        <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-[var(--rr-text-muted)]">
              <li>
                <Link
                  href="/"
                  className="font-medium text-[var(--rr-link)] underline-offset-4 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-[var(--rr-widget-border)]">
                /
              </li>
              <li className="text-[var(--rr-ink)]">{breadcrumbLabel}</li>
            </ol>
          </nav>
          <Link
            href="/"
            className="mt-5 inline-block text-sm font-medium text-[var(--rr-link)] underline-offset-4 hover:underline"
          >
            ← Back to home
          </Link>

          <article>
            <header className="mt-8">
              <h1 className="font-heading text-[clamp(1.5rem,2vw+1rem,2.25rem)] font-semibold tracking-tight text-[var(--rr-ink)]">
                {h1}
              </h1>
              <div className="rr-lead mt-4 max-w-xl space-y-4 text-[var(--rr-text)]">{intro}</div>
            </header>
            {children ?
              <div className="mt-8 space-y-4 text-[var(--rr-text)]">{children}</div>
            : null}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
