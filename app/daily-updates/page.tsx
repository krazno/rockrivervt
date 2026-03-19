import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Updates | RockRiverVT",
  description:
    "Daily trail and river condition notes for Rock River near Newfane, Vermont. Coming soon.",
};

export default function DailyUpdatesPage() {
  return (
    <main className="min-h-screen bg-[#eef2ea] px-4 py-8 text-[#20342c] sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-[#c8d6cb] bg-gradient-to-br from-[#e6efe5] via-[#dce7df] to-[#cfded9] p-6 shadow-[0_18px_55px_-25px_rgba(30,52,44,0.55)] sm:p-8">
          <p className="mb-3 inline-flex rounded-full border border-[#b7c7be] bg-[#f4f7f1] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#446258] uppercase">
            RockRiverVT
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
            Daily Updates
          </h1>
          <p className="mt-3 text-base leading-7 text-[#38594f] sm:text-lg">
            Coming soon.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#4e6c62]">
            We are preparing quick local notes on river flow, weather shifts,
            trail footing, and visitor activity so you can plan your visit with
            better context.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-[#31584b] px-5 py-2.5 text-sm font-medium text-[#edf4ef] transition hover:bg-[#284a3f]"
            >
              Back to Main Page
            </Link>
            <Link
              href="/weather"
              className="rounded-full border border-[#8ea497] bg-[#f3f6f2] px-5 py-2.5 text-sm font-medium text-[#35584c] transition hover:bg-[#e7ede8]"
            >
              Check Weather
            </Link>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <article className="rounded-2xl border border-[#c2d0c6] bg-[#f8f8f3] p-4">
            <h2 className="text-xs font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
              What to expect
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#38594f]">
              Short condition posts from local walkers and regular visitors.
            </p>
          </article>
          <article className="rounded-2xl border border-[#c3ced1] bg-[#f4f7f8] p-4">
            <h2 className="text-xs font-semibold tracking-[0.12em] text-[#4e6870] uppercase">
              Update cadence
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#38515a]">
              Intended daily in peak season, with extra notes during storms.
            </p>
          </article>
          <article className="rounded-2xl border border-[#d5d0c3] bg-[#f7f3ea] p-4">
            <h2 className="text-xs font-semibold tracking-[0.12em] text-[#6c6350] uppercase">
              Safety first
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5a5140]">
              Always verify conditions onsite and avoid entering unsafe water.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
