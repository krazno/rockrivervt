import { Heart } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";

const REASONS = [
  "Clear pools on a calm day—you can read the bottom in the right light",
  "Stone ledges that warm in the sun between dips",
  "Quiet woods along the trail—hardwoods, hemlock, normal forest sounds",
  "A mixed crowd; most folks keep to themselves if you give them room",
  "A short walk from the car when you travel light",
  "Cold water that still feels right after a humid afternoon",
  "A local favorite—people come back summer after summer",
] as const;

export function HomeWhyLoveRockRiver() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="why-love-heading"
    >
      <SectionEyebrow icon={Heart} iconClassName="h-4 w-4 text-[#4F6B52]">
        On the ground
      </SectionEyebrow>
      <h2
        id="why-love-heading"
        className="font-heading mt-2 text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.65rem]"
      >
        Why people love Rock River
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {REASONS.map((line) => (
          <li
            key={line}
            className="rounded-2xl border border-[#E2E0D8] bg-[#F6F4EF]/60 px-4 py-3 text-sm leading-relaxed text-[#1F2A24] sm:px-5 sm:py-4 sm:text-[15px]"
          >
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
