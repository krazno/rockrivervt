"use client";

import Link from "next/link";

type QuickLink = {
  title: string;
  description: string;
  href: string;
};

type HomeQuickLinksProps = {
  links: QuickLink[];
};

export function HomeQuickLinks({ links }: HomeQuickLinksProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5 max-w-2xl">
        <h2 className="text-xl font-semibold tracking-tight text-[#224035] sm:text-2xl">
          Explore the guide
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[#4d6a5f]">
          Land, history, rules, and tools—pick what you need before you head to the trail.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="group reveal-up rounded-2xl border border-[#c4d3ca] bg-[#f4f6f2] p-4 shadow-[0_8px_26px_-18px_rgba(22,45,36,0.55)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[#99b0a4] hover:shadow-[0_14px_40px_-22px_rgba(22,45,36,0.62)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f6f2]"
          >
            <p className="text-base font-semibold leading-6 text-[#224136] group-hover:text-[#163128]">
              {link.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4b695f]">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

