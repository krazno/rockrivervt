import { ListChecks } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";

const ITEMS = [
  "Parking stays limited on warm weekends—carpool if you can, and avoid blocking the road.",
  "Water is cold well into late spring; wade before you commit to a full swim.",
  "The trail is uneven stone and roots; sturdy shoes beat flip-flops for the walk in.",
  "Signed clothing-optional areas are part of the local mix—read the posts and give others space.",
  "No lifeguards—river swimming is always on you and your group.",
  "Leave no trace: pack out food scraps, dog waste, and anything you carried in.",
] as const;

export function HomeKnowBeforeYouGo() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="know-before-heading"
    >
      <SectionEyebrow icon={ListChecks} iconClassName="h-4 w-4 text-[#4F6B52]">
        Field notes
      </SectionEyebrow>
      <h2
        id="know-before-heading"
        className="font-heading mt-2 text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.65rem]"
      >
        Know before you go
      </h2>
      <ul className="mt-6 space-y-3 rounded-2xl border border-[#E2E0D8] bg-white p-6 shadow-sm sm:p-7">
        {ITEMS.map((text) => (
          <li
            key={text}
            className="flex gap-3 text-sm leading-relaxed text-[#3f4840] sm:text-base"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F6B52]"
              aria-hidden
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
