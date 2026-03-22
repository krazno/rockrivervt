"use client";

export function HomeInfoCards() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-5 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c786e]">
          Gentle reminders
        </p>
        <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-[#1a2f27] sm:text-xl">
          Before you lace up
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="reveal-up rounded-2xl border border-[#c2d0c6] bg-[#f8f8f3] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_26px_80px_-55px_rgba(24,49,43,0.72)]">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[#4d6d61] uppercase">
            Pace &amp; footing
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#36584c]">
            The gorge cools faster than the fields; wet rock after rain wants slow steps
            and free hands. Use the live tools above as a first glance—then let the trail
            tell you what’s true today.
          </p>
        </article>
        <article
          className="reveal-up rounded-2xl border border-[#c3ced1] bg-[#f4f7f8] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_26px_80px_-55px_rgba(24,49,43,0.72)]"
          style={{ animationDelay: "80ms" }}
        >
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[#4e6870] uppercase">
            Room for everyone
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#38515a]">
            Quiet voices, durable paths, consent before photos, and nothing left behind.
            Those small choices keep the banks kind for families, LGBTQ+ visitors,
            locals, and out-of-towners sharing the same water.
          </p>
        </article>
        <article
          className="reveal-up rounded-2xl border border-[#d5d0c3] bg-[#f7f3ea] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_26px_80px_-55px_rgba(24,49,43,0.72)]"
          style={{ animationDelay: "160ms" }}
        >
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[#6c6350] uppercase">
            Rising water
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5a5140]">
            After warm days or heavy rain, flow and current can shift quickly—especially
            in spring. Favor a safe view over a doubtful crossing, and head out early if
            the river starts asking harder questions.
          </p>
        </article>
      </div>
    </section>
  );
}

