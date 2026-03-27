"use client";

import Link from "next/link";

import { WeatherWidget } from "@/components/conditions/weather-widget";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageGalleryBackdrop } from "@/components/layout/page-gallery-backdrop";
import { Container } from "@/components/shared/container";

export function WeatherPageClient() {
  return (
    <>
      <SiteHeader />
      <PageGalleryBackdrop />
      <main className="relative z-[1] rr-body text-[var(--rr-text)]">
        <Container className="py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Local snapshot
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-semibold tracking-tight text-[var(--rr-ink)] sm:text-4xl">
              Rock River weather
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--rr-text-muted)]">
              Same Newfane-area forecast as the home page. Use it with{" "}
              <Link
                href="/conditions"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                conditions
              </Link>{" "}
              for river context and{" "}
              <Link href="/visit" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
                visiting
              </Link>{" "}
              for access in Windham County.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <div className="rr-glass-strong p-5 sm:p-7">
              <WeatherWidget />
            </div>
            <p className="mt-6 text-center text-sm text-[var(--rr-text-muted)] sm:text-left">
              <Link
                href="/#plan-today"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Home conditions
              </Link>
              {" · "}
              <Link
                href="/map"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Map
              </Link>
              {" · "}
              <Link
                href="/visit"
                className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline"
              >
                Visit
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
