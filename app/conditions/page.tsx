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

const cardClass =
  "rounded-2xl border border-white/12 bg-white/[0.05] p-5 shadow-[0_8px_28px_-22px_rgba(0,0,0,0.45)] transition hover:border-[var(--rr-glow)]/40 hover:bg-white/[0.07]";

export default function ConditionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="rr-body text-[#e8f4ef]">
        <Container className="py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Plan your visit
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Conditions
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
              Rock River changes with the season and the weather. Use this hub to check
              updates, review safety notes, and open the live tools on the homepage.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-amber-400/25 bg-amber-500/10 p-5 sm:p-6">
            <h2 className="text-sm font-semibold tracking-tight text-amber-100">
              Spring trail and river conditions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-amber-50/85">
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
            <Link href="/#today-at-rock-river" className={cardClass}>
              <h2 className="text-sm font-semibold text-white">Live weather & river</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Homepage widgets for local weather, river context, and gentle crowd
                check-ins.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-mint)]">
                Open homepage widgets →
              </span>
            </Link>
            <Link href="/daily-updates" className={cardClass}>
              <h2 className="text-sm font-semibold text-white">Daily updates</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Short local notes on trail footing, flow, and season shifts as we post
                them.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-mint)]">
                View updates →
              </span>
            </Link>
            <Link href="/map" className={cardClass}>
              <h2 className="text-sm font-semibold text-white">Map</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Parking, trails, beaches, and the river corridor in one interactive view.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-mint)]">
                Open map →
              </span>
            </Link>
            <Link href="/guidelines" className={cardClass}>
              <h2 className="text-sm font-semibold text-white">Visitor guidelines</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Respect for community, land, and each other—before you go.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--rr-mint)]">
                Read guidelines →
              </span>
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-white/50 sm:text-left">
            Detailed weather-only view:{" "}
            <Link
              href="/weather"
              className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
            >
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
