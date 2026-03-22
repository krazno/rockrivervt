import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Conditions",
  description:
    "River and trail conditions, spring safety, and links to live weather and updates for Rock River, Vermont.",
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: "Conditions | Rock River VT",
    description:
      "River and trail conditions, spring safety, and planning tools for Rock River, Vermont.",
    url: "https://rockrivervt.com/conditions",
    type: "website",
  },
};

export default function ConditionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] text-[#20342c]">
        <Container className="py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
              Plan your visit
            </p>
            <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
              Conditions
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#38594f] sm:text-lg">
              Rock River changes with the season and the weather. Use this hub to check
              updates, review safety notes, and open the live tools on the homepage.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-[#c9b896]/60 bg-[#faf6ed] p-5 shadow-sm sm:p-6">
            <h2 className="text-sm font-semibold tracking-tight text-[#5a4a1a]">
              Spring trail and river conditions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4a4538]">
              Please use extra caution in spring. As sun and warmer afternoon temperatures
              melt snow and ice upriver, water levels can rise and currents can become very
              swift. Crossing the river later in the day may be much harder than a calm
              morning crossing. Consider limiting your visit to the southern bank so you
              are not caught on the wrong side. Wear sturdy footwear, keep your hands free
              on steep or slippery parts of the access trail, and turn back if conditions
              feel uncertain.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/#today-at-rock-river"
              className="rounded-2xl border border-[#c2d0c6] bg-white/70 p-5 shadow-[0_8px_28px_-22px_rgba(24,49,43,0.3)] transition hover:border-[#a8c4ab]"
            >
              <h2 className="text-sm font-semibold text-[#224035]">Live weather & river</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4d6a5f]">
                Homepage widgets for local weather, river context, and gentle crowd
                check-ins.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[#35584c]">
                Open homepage widgets →
              </span>
            </Link>
            <Link
              href="/daily-updates"
              className="rounded-2xl border border-[#c2d0c6] bg-white/70 p-5 shadow-[0_8px_28px_-22px_rgba(24,49,43,0.3)] transition hover:border-[#a8c4ab]"
            >
              <h2 className="text-sm font-semibold text-[#224035]">Daily updates</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4d6a5f]">
                Short local notes on trail footing, flow, and season shifts as we post
                them.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[#35584c]">
                View updates →
              </span>
            </Link>
            <Link
              href="/map"
              className="rounded-2xl border border-[#c2d0c6] bg-white/70 p-5 shadow-[0_8px_28px_-22px_rgba(24,49,43,0.3)] transition hover:border-[#a8c4ab]"
            >
              <h2 className="text-sm font-semibold text-[#224035]">Map</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4d6a5f]">
                Parking, trails, beaches, and the river corridor in one interactive view.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[#35584c]">
                Open map →
              </span>
            </Link>
            <Link
              href="/guidelines"
              className="rounded-2xl border border-[#c2d0c6] bg-white/70 p-5 shadow-[0_8px_28px_-22px_rgba(24,49,43,0.3)] transition hover:border-[#a8c4ab]"
            >
              <h2 className="text-sm font-semibold text-[#224035]">Visitor guidelines</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4d6a5f]">
                Respect for community, land, and each other—before you go.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[#35584c]">
                Read guidelines →
              </span>
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-[#6d8a7e] sm:text-left">
            Detailed weather-only view:{" "}
            <Link href="/weather" className="font-medium text-[#35584c] underline-offset-2 hover:underline">
              Weather
            </Link>
            .
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
