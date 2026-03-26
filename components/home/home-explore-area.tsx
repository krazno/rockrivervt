import Link from "next/link";
import { Compass } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";

const LINKS: { href: string; label: string; sub: string }[] = [
  {
    href: "/visit",
    label: "Newfane Vermont",
    sub: "Parking, trail access, what to expect",
  },
  {
    href: "/local",
    label: "Brattleboro",
    sub: "Groceries, cafés, lodging nearby",
  },
  {
    href: "/land-river",
    label: "West River",
    sub: "Watershed Rock River joins",
  },
  {
    href: "/rock-river-vermont",
    label: "Windham County",
    sub: "Regional overview & planning",
  },
  {
    href: "/rock-river-swimming-hole",
    label: "Southern Vermont swimming holes",
    sub: "How this river fits the region",
  },
];

export function HomeExploreArea() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="explore-area-heading"
    >
      <SectionEyebrow icon={Compass} iconClassName="h-4 w-4 text-[#4F6B52]">
        Nearby
      </SectionEyebrow>
      <h2
        id="explore-area-heading"
        className="font-heading mt-2 text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.65rem]"
      >
        Explore the area
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LINKS.map(({ href, label, sub }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex h-full flex-col justify-center rounded-2xl border border-[#E2E0D8] bg-white px-5 py-4 text-left shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="font-heading text-base font-semibold text-[#1F2A24]">{label}</span>
              <span className="mt-1 text-[13px] leading-snug text-[#6B6F68]">{sub}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
