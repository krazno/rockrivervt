import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { HomeSectionHeader } from "@/components/home/home-section-header";
import { LocalPickCard } from "@/components/local/local-pick-card";
import { LocalPicksCuratedFooter } from "@/components/local/local-picks-curated-footer";
import { getHomeFeaturedPicks } from "@/lib/local-ecosystem";

/**
 * Homepage slice: featured local picks + CTA to full after-river guide.
 */
export function HomeLocalEcosystemTeaser() {
  const picks = getHomeFeaturedPicks(3);

  return (
    <section
      className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="local-ecosystem-teaser-heading"
    >
      <HomeSectionHeader
        eyebrow="Local ecosystem"
        icon={Compass}
        id="local-ecosystem-teaser-heading"
        title="After Rock River · nearby picks"
        titleClassName="text-[#1F2A24] text-xl font-bold tracking-tight sm:text-2xl"
        eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
        eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
        description="Hand-picked ideas—not ads or paid rankings. Food, coffee, towns, and slow drives worth pairing with a river day."
        descriptionClassName="text-[#6B6F68]"
        className="mb-5 text-center sm:mb-6 sm:text-left"
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((pick) => (
          <li key={pick.id}>
            <LocalPickCard pick={pick} />
          </li>
        ))}
      </ul>
      <LocalPicksCuratedFooter placement="home_teaser" />
      <div className="mt-5 flex justify-center sm:justify-start">
        <Link
          href="/after-the-river"
          className="inline-flex items-center gap-2 rounded-full border border-[#4F6B52]/35 bg-[#4F6B52] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d5640]"
        >
          Full after-river guide
          <ArrowRight className="h-4 w-4 opacity-90" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
