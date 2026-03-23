import Link from "next/link";

/**
 * Long-form guide for the homepage (SEO + visitors). Two h2s, rest is body copy.
 */
export function HomeGuide() {
  return (
    <section
      className="rr-section mx-auto w-full max-w-3xl px-4 text-[var(--rr-text)] sm:px-6 lg:px-8"
      aria-labelledby="guide-about"
    >
      <div className="rr-panel-light space-y-5 px-6 py-8 sm:px-10 sm:py-10">
        <h2
          id="guide-about"
          className="font-heading text-[clamp(1.35rem,2vw,1.75rem)] font-semibold tracking-tight text-[var(--rr-ink)]"
        >
          About Rock River &amp; where to find it
        </h2>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River</strong> runs through{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Newfane</strong> in{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Windham County</strong>, Vermont—part
          of <strong className="font-semibold text-[var(--rr-ink)]">southern Vermont</strong> between
          the Greens and the Connecticut River valley. People come for clear pools, sun-warmed stone,
          and a trail that follows the water. This site is an independent{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River VT guide</strong> with a{" "}
          <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            Rock River VT map
          </Link>
          ,{" "}
          <Link href="/conditions" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            Rock River conditions
          </Link>
          ,{" "}
          <Link href="/gallery" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            Rock River photos
          </Link>
          , and visitor context. It is not run by a town or park agency. The main recreation stretch
          sits west of Vermont Route 30; parking appears on the map. From{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Brattleboro</strong>, it is a short
          drive north—enough for a half-day swim or hike. Land here includes the{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River Preserve</strong> and
          neighbors; treat every visit as a guest.
        </p>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          In summer, Rock River is one of the region’s known{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">swimming holes in Vermont</strong>—a
          mix of deep pools and wading shallows on rounded stone. Spring means cold, fast water from
          snowmelt; late summer can bring lower flow and warmer pockets. The{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River trail</strong> connects
          parking to beaches along the corridor; footing is uneven and can be slick. For a{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Brattleboro swimming hole</strong>{" "}
          alternative with more room to spread out, this river is a common choice. Nothing here
          replaces official safety notices—use the conditions page and your own judgment.
        </p>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          If you are searching for{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River Newfane VT</strong> or{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River Newfane Vermont</strong>,
          you are in the right place: the same corridor shows up on maps and in local word of mouth as
          the Rock River recreation area. A{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Newfane Vermont swimming hole</strong>{" "}
          day often means a towel, water shoes, and a cooler—plus patience on busy weekends. Compared
          with busier town parks, this stretch feels more like a river walk than a pool: you choose
          your own spot, watch the water, and share the banks with wildlife and other visitors.
        </p>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          Across <strong className="font-semibold text-[var(--rr-ink)]">southern Vermont swimming hole</strong>{" "}
          options, Rock River stands out for clear water and a trail that stays close to the stream.
          The <strong className="font-semibold text-[var(--rr-ink)]">Rock River trail Vermont</strong>{" "}
          experience is shorter than a long summit hike—think river time, not peak bagging. History
          here is local and ongoing: gravel bars shift, trees fall in and get swept away, and people
          keep showing up because the place holds a steady rhythm—cold water, warm rock, and a little
          distance from the highway. Use this guide alongside{" "}
          <Link href="/land-river" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            land &amp; river
          </Link>{" "}
          and{" "}
          <Link href="/history" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            history
          </Link>{" "}
          for more depth on how the corridor fits the valley.
        </p>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          Planning around <strong className="font-semibold text-[var(--rr-ink)]">Rock River photos</strong> you
          have seen online? Lighting and water level change every week. The{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River preserve</strong> and
          adjoining conservation land help buffer the banks, but they do not turn the river into a
          pool: you still read current, check rocks before you step, and expect cold water even when
          the air feels hot. Cell service can be spotty in the hollows; tell someone where you are
          headed if you are hiking alone.
        </p>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          People compare notes on <strong className="font-semibold text-[var(--rr-ink)]">Rock River conditions</strong>{" "}
          because upper tributaries can change the main stem after rain. This
          site shows weather and a regional flow context so you are not guessing from a forecast
          alone. It does not replace watching the water in person: if it looks fast, brown, or loud,
          wait for another day. That same caution applies anywhere in{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Windham County</strong> stream
          recreation—Rock River is one chapter in a valley full of brooks and trails worth respecting.
        </p>

        <h2 className="pt-4 font-heading text-[clamp(1.35rem,2vw,1.75rem)] font-semibold tracking-tight text-[var(--rr-ink)]">
          Community use, respect &amp; the wider area
        </h2>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          For generations, Newfane and nearby towns have cooled off in this water. Volunteers and
          advocates helped protect access and land, including areas tied to the preserve. Floods move
          stone and change crossings; what felt easy last year may not be the same after high water.
          The mix of families, neighbors, travelers, and queer-friendly beach culture—including signed
          clothing-optional spots—is part of the place. Quiet voices, consent before photos, and{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">leave no trace</strong> habits keep it
          workable for everyone. Read the full{" "}
          <Link href="/guidelines" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            guidelines
          </Link>
          , then{" "}
          <Link href="/visit" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            visiting Rock River
          </Link>{" "}
          for parking and access,{" "}
          <Link href="/community" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            community
          </Link>{" "}
          for stewardship, and{" "}
          <Link href="/resources" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            resources
          </Link>{" "}
          for maps and links. Exploring{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Windham County</strong> and{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">southern Vermont</strong> beyond the
          river? Start with{" "}
          <Link href="/local" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            local context
          </Link>{" "}
          and branch from there.
        </p>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          Seasonal rhythm matters: autumn color brings photographers and hikers; winter limits access
          and cold water risk; mud season softens trails in spring. Summer weekends draw the widest
          mix of visitors from <strong className="font-semibold text-[var(--rr-ink)]">southern Vermont</strong>{" "}
          and beyond. Arriving early, carrying out everything you carry in, and giving other groups
          space on narrow paths keeps friction low. If you are new to the area, pairing this guide
          with a paper map screenshot and the{" "}
          <Link href="/map" className="font-medium text-[var(--rr-link)] underline-offset-2 hover:underline">
            interactive map
          </Link>{" "}
          makes it easier to orient before you lose signal. The goal is simple: enjoy{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River Vermont</strong> on its
          terms, leave it as you found it, and come back when the water invites you again.
        </p>
        <p className="leading-relaxed text-[var(--rr-ink-muted)]">
          Questions or corrections about access, names, or safety can be sent by email (see the
          footer)—this is a volunteer-maintained{" "}
          <strong className="font-semibold text-[var(--rr-ink)]">Rock River VT guide</strong>, not
          emergency services. For life-safety issues, call local authorities. Thank you for treating
          the river, the trail, and each other with care.
        </p>
      </div>
    </section>
  );
}
