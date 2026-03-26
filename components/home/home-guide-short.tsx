import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { HomeCollapsibleSection } from "@/components/home/home-collapsible-section";
import { HomeSectionHeader } from "@/components/home/home-section-header";

const MORE_LINKS: { href: string; label: string; sub: string }[] = [
  { href: "/visitor-guide", label: "Visitor guide", sub: "Long-form context & SEO notes" },
  { href: "/visit", label: "Visit", sub: "Seasons, parking, first-trip planning" },
  { href: "/guidelines", label: "Guidelines", sub: "Etiquette & respectful use" },
  { href: "/local", label: "Local area", sub: "Newfane, Brattleboro, Windham County" },
  { href: "/resources", label: "Resources", sub: "Maps, links, references" },
  { href: "/preservation", label: "Preservation", sub: "Land, access, stewardship" },
];

export function HomeGuideShort() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="home-guide-short-heading"
    >
      <div className="rounded-2xl border border-[#E2E0D8] bg-white p-7 shadow-sm sm:p-9">
        <HomeCollapsibleSection
          panelId="home-guide-short-panel"
          summaryContent={
            <HomeSectionHeader
              eyebrow="Guide"
              icon={BookOpen}
              id="home-guide-short-heading"
              title="Plan your day"
              titleClassName="text-[#1F2A24] text-xl font-bold sm:text-2xl"
              eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
              eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
              description="Independent, neighbor-written context—not a town or agency site. Use the snapshot and map above for today; open these pages for depth."
              descriptionClassName="text-[#6B6F68]"
              className="mb-8 border-b border-[#E2E0D8]/80 pb-8 text-center sm:text-left"
            />
          }
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_LINKS.map(({ href, label, sub }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex h-full flex-col justify-center rounded-2xl border border-[#E2E0D8] bg-[#F6F4EF]/50 px-5 py-4 text-left shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-heading text-base font-semibold text-[#1F2A24]">{label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#4F6B52]" aria-hidden />
                </span>
                <span className="mt-1 text-[13px] leading-snug text-[#6B6F68]">{sub}</span>
              </Link>
            </li>
          ))}
        </ul>
        </HomeCollapsibleSection>
      </div>
    </section>
  );
}
