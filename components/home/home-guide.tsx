import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";

import { HomeSectionHeader } from "@/components/home/home-section-header";

function GuideCallout({
  kind,
  children,
}: {
  kind: "tip" | "note" | "reminder";
  children: ReactNode;
}) {
  const label = { tip: "Tip", note: "Note", reminder: "Reminder" }[kind];
  return (
    <aside
      className="my-10 rounded-xl border border-[#E2E0D8] bg-[#F6F4EF] px-5 py-5 sm:px-6 sm:py-6"
      aria-label={label}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F6B52]">{label}</p>
      <div className="mt-2 text-sm leading-[1.75] text-[#1F2A24] sm:text-base">{children}</div>
    </aside>
  );
}

function ProseLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-semibold text-[#4F6B52] underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  );
}

/**
 * Long-form guide for the homepage (SEO + visitors). All body copy preserved; structure aids scanning.
 */
export function HomeGuide() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="guide-about-rock-river"
    >
      <div className="rounded-2xl border border-[#E2E0D8] bg-white p-7 shadow-sm sm:p-10 md:p-12">
        <HomeSectionHeader
          eyebrow="Guide"
          icon={BookOpen}
          id="guide-top"
          title="Rock River visitor guide"
          titleClassName="text-[#1F2A24] text-2xl font-bold sm:text-[1.75rem]"
          eyebrowClassName="text-[9px] tracking-[0.22em] text-[#6B6F68]"
          eyebrowIconClassName="h-4 w-4 text-[#4F6B52]"
          description="Plain-language notes on where things are, how the seasons feel, safety, and how people share the river."
          descriptionClassName="text-[#6B6F68]"
          className="mb-12 border-b border-[#E2E0D8]/80 pb-10 text-center sm:mb-14 sm:text-left"
        />

        <div className="mx-auto max-w-2xl space-y-10 text-[#1F2A24]">
          <h2
            id="guide-about-rock-river"
            className="font-heading scroll-mt-28 text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.6875rem]"
          >
            About Rock River
          </h2>
          <p className="leading-[1.85] text-[#3f4840]">
            <strong className="font-semibold text-[#1F2A24]">Rock River</strong> runs through{" "}
            <strong className="font-semibold text-[#1F2A24]">Newfane</strong> in{" "}
            <strong className="font-semibold text-[#1F2A24]">Windham County</strong>, Vermont—part
            of <strong className="font-semibold text-[#1F2A24]">southern Vermont</strong> between
            the Greens and the Connecticut River valley. People come for clear pools, sun-warmed stone,
            and a trail that follows the water. This is a volunteer-run{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River VT guide</strong> with a{" "}
            <ProseLink href="/map">Rock River VT map</ProseLink>,{" "}
            <ProseLink href="/conditions">Rock River conditions</ProseLink>,{" "}
            <ProseLink href="/gallery">Rock River photos</ProseLink>, and neighbor-to-neighbor context. It is not
            run by a town or park agency. The main recreation stretch sits west of Vermont Route 30;
            parking appears on the map. From{" "}
            <strong className="font-semibold text-[#1F2A24]">Brattleboro</strong>, it is a short
            drive north—enough for a half-day swim or hike. Land here includes the{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River Preserve</strong> and
            neighbors; treat every visit as a guest.
          </p>

          <GuideCallout kind="note">
            <p>It is not run by a town or park agency.</p>
          </GuideCallout>

          <h2 className="scroll-mt-28 border-t border-[#E2E0D8]/70 pt-12 font-heading text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.6875rem]">
            Swimming holes
          </h2>
          <p className="leading-[1.85] text-[#3f4840]">
            In summer, Rock River is one of the region’s known{" "}
            <strong className="font-semibold text-[#1F2A24]">swimming holes in Vermont</strong>—a
            mix of deep pools and wading shallows on rounded stone. Spring means cold, fast water from
            snowmelt; late summer can bring lower flow and warmer pockets. The{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River trail</strong> connects
            parking to beaches along the corridor; footing is uneven and can be slick. For a{" "}
            <strong className="font-semibold text-[#1F2A24]">Brattleboro swimming hole</strong>{" "}
            alternative with more room to spread out, this river is a common choice. Use the conditions page and your own eyes on the water—this write-up is not a substitute for posted notices or your judgment.
          </p>

          <GuideCallout kind="tip">
            <p>
              Cell service can be spotty in the hollows; tell someone where you are headed if you are
              hiking alone.
            </p>
          </GuideCallout>

          <h2 className="scroll-mt-28 border-t border-[#E2E0D8]/70 pt-12 font-heading text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.6875rem]">
            Trail &amp; access
          </h2>
          <p className="leading-[1.85] text-[#3f4840]">
            If you are searching for{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River Newfane VT</strong> or{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River Newfane Vermont</strong>,
            you are in the right place: the same corridor shows up on maps and in local word of mouth
            as the Rock River recreation area. A{" "}
            <strong className="font-semibold text-[#1F2A24]">Newfane Vermont swimming hole</strong>{" "}
            day often means a towel, water shoes, and a cooler—plus patience on busy weekends. Compared
            with busier town parks, this stretch feels more like a river walk than a pool: you choose
            your own spot, watch the water, and share the banks with wildlife and other visitors.
          </p>

          <h2 className="scroll-mt-28 border-t border-[#E2E0D8]/70 pt-12 font-heading text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.6875rem]">
            When to visit
          </h2>
          <p className="leading-[1.85] text-[#3f4840]">
            Across{" "}
            <strong className="font-semibold text-[#1F2A24]">southern Vermont swimming hole</strong>{" "}
            options, Rock River stands out for clear water and a trail that stays close to the stream.
            The <strong className="font-semibold text-[#1F2A24]">Rock River trail Vermont</strong>{" "}
            experience is shorter than a long summit hike—think river time, not peak bagging. History
            here is local and ongoing: gravel bars shift, trees fall in and get swept away, and people
            keep showing up because the place holds a steady rhythm—cold water, warm rock, and a little
            distance from the highway. Use this guide alongside{" "}
            <ProseLink href="/land-river">land &amp; river</ProseLink> and{" "}
            <ProseLink href="/history">history</ProseLink> for more depth on how the corridor fits the
            valley.
          </p>

          <h2 className="scroll-mt-28 border-t border-[#E2E0D8]/70 pt-12 font-heading text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.6875rem]">
            Safety notes
          </h2>
          <p className="leading-[1.85] text-[#3f4840]">
            Planning around <strong className="font-semibold text-[#1F2A24]">Rock River photos</strong>{" "}
            you have seen online? Lighting and water level change every week. The{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River preserve</strong> and
            adjoining conservation land help buffer the banks, but they do not turn the river into a
            pool: you still read current, check rocks before you step, and expect cold water even when
            the air feels hot. Cell service can be spotty in the hollows; tell someone where you are
            headed if you are hiking alone.
          </p>
          <p className="leading-[1.85] text-[#3f4840]">
            People compare notes on{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River conditions</strong> because
            upper tributaries can change the main stem after rain. This site shows weather and a
            regional flow context so you are not guessing from a forecast alone. It does not replace
            watching the water in person: if it looks fast, brown, or loud, wait for another day.
            That same caution applies anywhere in{" "}
            <strong className="font-semibold text-[#1F2A24]">Windham County</strong> stream
            recreation—Rock River is one chapter in a valley full of brooks and trails worth
            respecting.
          </p>

          <GuideCallout kind="reminder">
            <p>If it looks fast, brown, or loud, wait for another day.</p>
          </GuideCallout>

          <h2
            id="guide-community"
            className="scroll-mt-28 border-t border-[#E2E0D8]/70 pt-12 font-heading text-2xl font-bold tracking-tight text-[#1F2A24] sm:text-[1.6875rem]"
          >
            Local culture
          </h2>
          <p className="leading-[1.85] text-[#3f4840]">
            For generations, Newfane and nearby towns have cooled off in this water. Volunteers and
            advocates helped protect access and land, including areas tied to the preserve. Floods move
            stone and change crossings; what felt easy last year may not be the same after high water.
            On a busy day you will see a mixed crowd—families, hikers, long-time visitors, and people
            using the signed clothing-optional areas. That pattern is part of the local culture and
            well known to locals; most people keep to themselves when voices stay low, you ask before
            taking photos, <strong className="font-semibold text-[#1F2A24]">leave no trace</strong>, give
            others space, and stay respectful. Read the full <ProseLink href="/guidelines">guidelines</ProseLink>
            , then <ProseLink href="/visit">visiting Rock River</ProseLink> for parking and access,{" "}
            <ProseLink href="/community">community</ProseLink> for stewardship, and{" "}
            <ProseLink href="/resources">resources</ProseLink> for maps and links. Exploring{" "}
            <strong className="font-semibold text-[#1F2A24]">Windham County</strong> and{" "}
            <strong className="font-semibold text-[#1F2A24]">southern Vermont</strong> beyond the
            river? Start with <ProseLink href="/local">local context</ProseLink> and branch from
            there.
          </p>
          <p className="leading-[1.85] text-[#3f4840]">
            Seasonal rhythm matters: autumn color brings photographers and hikers; winter limits access
            and cold water risk; mud season softens trails in spring. Summer weekends draw the widest
            mix of visitors from{" "}
            <strong className="font-semibold text-[#1F2A24]">southern Vermont</strong> and beyond.
            Arriving early, carrying out everything you carry in, and giving other groups room on
            narrow paths keeps things calm. If you are new to the area, pairing this guide with a
            paper map screenshot and the <ProseLink href="/map">interactive map</ProseLink> makes it
            easier to orient before you lose signal. The goal is simple: enjoy{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River Vermont</strong> on its
            terms, leave it as you found it, and come back when the water invites you again.
          </p>
          <p className="leading-[1.85] text-[#3f4840]">
            Questions or corrections about access, names, or safety can be sent by email (see the
            footer)—this is a volunteer-maintained{" "}
            <strong className="font-semibold text-[#1F2A24]">Rock River VT guide</strong>, not
            emergency services. For life-safety issues, call local authorities. Thank you for treating
            the river, the trail, and each other with care.
          </p>
        </div>
      </div>
    </section>
  );
}
