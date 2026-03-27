import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Footprints,
  Heart,
  Leaf,
  MapPin,
  ShieldCheck,
  Trees,
  Users,
} from "lucide-react";

import { HomeSectionHeader } from "@/components/home/home-section-header";

const MORE_LINKS: {
  href: string;
  label: string;
  sub: string;
  icon: typeof BookOpen;
  iconBg: string;
}[] = [
  {
    href: "/visitor-guide",
    label: "Visitor guide",
    sub: "Long read · context & safety",
    icon: BookOpen,
    iconBg: "bg-[#e8f0ec] text-[#2d5a42]",
  },
  {
    href: "/visit",
    label: "Visit",
    sub: "Parking · seasons · first trip",
    icon: Footprints,
    iconBg: "bg-[#e8eef5] text-[#2a4a6e]",
  },
  {
    href: "/guidelines",
    label: "Guidelines",
    sub: "Etiquette · respectful use",
    icon: ShieldCheck,
    iconBg: "bg-[#f0ebe6] text-[#5a4a2a]",
  },
  {
    href: "/local",
    label: "Local area",
    sub: "Newfane · Brattleboro",
    icon: MapPin,
    iconBg: "bg-[#ede8f5] text-[#4a3a6e]",
  },
  {
    href: "/resources",
    label: "Resources",
    sub: "Maps · links",
    icon: Trees,
    iconBg: "bg-[#e6f2ea] text-[#2d5a42]",
  },
  {
    href: "/community",
    label: "Community",
    sub: "Shoreline · stewardship",
    icon: Users,
    iconBg: "bg-[#e8eef0] text-[#3a4a52]",
  },
  {
    href: "/discoveries",
    label: "Discoveries",
    sub: "Stones · plants · seasons",
    icon: Leaf,
    iconBg: "bg-[#e6f0ea] text-[#2d5a42]",
  },
  {
    href: "/preservation",
    label: "Preservation",
    sub: "Land · access",
    icon: Heart,
    iconBg: "bg-[#f5e8ec] text-[#6b3a4a]",
  },
];

export function HomeGuideShort() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="home-guide-short-heading"
    >
      <div className="rounded-2xl border border-[#E2E0D8] bg-white p-6 shadow-sm sm:p-8">
        <HomeSectionHeader
          eyebrow="Explore"
          icon={BookOpen}
          id="home-guide-short-heading"
          title="Where to next"
          titleClassName="text-[#1F2A24] text-xl font-bold sm:text-2xl"
          eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
          eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
          description="Tap a card—full guides open in one click."
          descriptionClassName="text-[#6B6F68]"
          className="mb-6 border-b border-[#E2E0D8]/80 pb-6 text-center sm:mb-8 sm:pb-8 sm:text-left"
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MORE_LINKS.map(({ href, label, sub, icon: Icon, iconBg }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-[#E2E0D8] bg-[#fafaf8] px-4 py-4 text-left shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-[#4F6B52]/35 hover:shadow-md sm:px-5 sm:py-4"
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E2E0D8]/80 shadow-sm ${iconBg}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-heading text-base font-semibold text-[#1F2A24] group-hover:text-[#2d5a42]">
                        {label}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-[#4F6B52] transition group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-[#6B6F68]">{sub}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
