"use client";

import Image from "next/image";

export function HomeVermontView() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
          Vermont view
        </h2>
        <p className="mt-1 text-sm text-[#4f6d63]">
          A quick look at the Green Mountain landscape around Newfane.
        </p>
      </div>
      <figure className="reveal-up overflow-hidden rounded-3xl border border-[#c7d5cd] bg-[#eef4f2] shadow-[0_16px_44px_-30px_rgba(24,49,43,0.65)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-55px_rgba(24,49,43,0.75)] hover:border-[#a8c4ab]">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Vermont mountain landscape with forest and lake"
          width={1600}
          height={1067}
          unoptimized
          className="h-64 w-full object-cover sm:h-72 lg:h-80"
        />
        <figcaption className="border-t border-[#cbd8d1] bg-[#f4f7f5] px-4 py-2 text-xs text-[#4f6f63]">
          Vermont landscape inspiration.
        </figcaption>
      </figure>
    </section>
  );
}

