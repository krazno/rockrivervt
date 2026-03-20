"use client";

import Image from "next/image";

export function HomeFinalImage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <figure className="reveal-up overflow-hidden rounded-3xl border border-[#c8d6cb] bg-[#e6eee7] shadow-[0_18px_50px_-30px_rgba(23,45,36,0.6)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_28px_90px_-55px_rgba(23,45,36,0.75)] hover:border-[#a8c4ab]">
        <Image
          src="/rock-river-hero.png"
          alt="Rock River in Newfane, Vermont with afternoon light"
          width={1536}
          height={2048}
          className="h-[44svh] min-h-[290px] w-full object-cover object-center sm:h-[50svh] lg:h-[56svh]"
        />
        <figcaption className="border-t border-[#c6d3ca] bg-[#f2f5f1] px-4 py-2 text-xs text-[#4f6f63]">
          Rock River near Newfane, Vermont.
        </figcaption>
      </figure>
    </section>
  );
}

