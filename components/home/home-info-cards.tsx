"use client";

export function HomeInfoCards() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="reveal-up rounded-2xl border border-[#c2d0c6] bg-[#f8f8f3] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_26px_80px_-55px_rgba(24,49,43,0.72)]">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[#4d6d61] uppercase">
            Today near the river
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#36584c]">
            Cool morning air, softer light in the gorge, and patchy wet
            stones near the lower bends after overnight rain.
          </p>
        </article>
        <article
          className="reveal-up rounded-2xl border border-[#c3ced1] bg-[#f4f7f8] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_26px_80px_-55px_rgba(24,49,43,0.72)]"
          style={{ animationDelay: "80ms" }}
        >
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[#4e6870] uppercase">
            Visitor note
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#38515a]">
            Stay on marked paths where possible, keep voices low, and pack
            out everything you bring in.
          </p>
        </article>
        <article
          className="reveal-up rounded-2xl border border-[#d5d0c3] bg-[#f7f3ea] p-5 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a8c4ab] hover:shadow-[0_26px_80px_-55px_rgba(24,49,43,0.72)]"
          style={{ animationDelay: "160ms" }}
        >
          <h3 className="text-sm font-semibold tracking-[0.14em] text-[#6c6350] uppercase">
            Local reminder
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5a5140]">
            Conditions can change quickly; always use your judgment and avoid
            entering fast or unclear water.
          </p>
        </article>
      </div>
    </section>
  );
}

