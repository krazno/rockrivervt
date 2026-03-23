"use client";

import Link from "next/link";

import { WeatherWidget } from "@/components/conditions/weather-widget";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

export default function WeatherPage() {
  return (
    <>
      <SiteHeader />
      <main className="rr-body text-[#e8f4ef]">
        <Container className="py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Local snapshot
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Weather
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Same neighborhood weather tool as the homepage—use it alongside{" "}
              <Link
                href="/conditions"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>{" "}
              for river context and trail notes.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <div className="rr-glass-strong p-5 sm:p-7">
              <WeatherWidget />
            </div>
            <p className="mt-6 text-center text-sm text-white/50 sm:text-left">
              <Link
                href="/#today-at-rock-river"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Full conditions row on the home page
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
