"use client";

export function HomeInfoCards() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          Gentle reminders
        </p>
        <h2 className="font-heading mt-1.5 text-lg font-bold tracking-tight text-white sm:text-xl">
          Before you lace up
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="reveal-up rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/30 hover:shadow-[0_26px_80px_-55px_rgba(62,207,142,0.2)]">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[var(--rr-mint)] uppercase">
            Pace &amp; footing
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            The gorge cools faster than the fields; wet rock after rain wants slow steps
            and free hands. Use the live tools above as a first glance—then let the trail
            tell you what’s true today.
          </p>
        </article>
        <article
          className="reveal-up rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/30 hover:shadow-[0_26px_80px_-55px_rgba(62,207,142,0.2)]"
          style={{ animationDelay: "80ms" }}
        >
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[var(--rr-mint)] uppercase">
            Room for everyone
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Quiet voices, durable paths, consent before photos, and nothing left behind.
            Those small choices keep the banks kind for families, LGBTQ+ visitors,
            locals, and out-of-towners sharing the same water.
          </p>
        </article>
        <article
          className="reveal-up rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--rr-glow)]/30 hover:shadow-[0_26px_80px_-55px_rgba(62,207,142,0.2)]"
          style={{ animationDelay: "160ms" }}
        >
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[var(--rr-mint)] uppercase">
            Rising water
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            After warm days or heavy rain, flow and current can shift quickly—especially
            in spring. Favor a safe view over a doubtful crossing, and head out early if
            the river starts asking harder questions.
          </p>
        </article>
      </div>
    </section>
  );
}
