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
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] text-[#20342c]">
        <Container className="py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
              Local snapshot
            </p>
            <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
              Weather
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#38594f]">
              Same neighborhood weather tool as the homepage—use it alongside{" "}
              <Link
                href="/conditions"
                className="font-medium text-[#31584b] underline-offset-2 hover:underline"
              >
                Conditions
              </Link>{" "}
              for river context and trail notes.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <div className="rounded-[1.75rem] border border-[#b5c7bb] bg-gradient-to-b from-white/75 to-[#f2f6f0]/95 p-5 shadow-[0_14px_48px_-32px_rgba(24,49,43,0.38)] sm:p-7">
              <WeatherWidget />
            </div>
            <p className="mt-6 text-center text-sm text-[#6d8a7e] sm:text-left">
              <Link
                href="/#today-at-rock-river"
                className="font-medium text-[#35584c] underline-offset-2 hover:underline"
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
