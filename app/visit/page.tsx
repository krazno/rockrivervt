import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

export default function VisitPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-[#eef2ea] via-[#eef2ea] to-[#eaf4e7] text-[#20342c]">
        <Container className="py-10">
          <section className="rounded-3xl border border-[#c8d6cb] bg-white/65 p-6 shadow-[0_18px_55px_-25px_rgba(24,49,43,0.42)] ring-1 ring-black/5 sm:p-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight text-[#1a2f27] sm:text-4xl">
                Visiting Rock River
              </h1>
              <p className="mt-3 text-base leading-7 text-[#38594f] sm:text-lg">
                Rock River is best visited with a calm walk from the Newfane
                area down toward the water—take your time, watch your footing,
                and enjoy the river at a human pace.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5">
              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Getting there
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Plan your route ahead of time and give yourself a little
                  buffer for parking and changing conditions near the river.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Where to park
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Park in designated areas when available and follow local
                  guidance for pull-offs. Avoid blocking access for other
                  visitors and residents.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Walking to the river
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Use stable paths and watch for slippery stones and uneven
                  ground, especially after rain. Keep a relaxed pace and
                  pause where it feels safe.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Respectful visiting
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Be mindful of privacy and access, keep noise low, and leave
                  no trace. If you see sensitive areas, give them space.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#4d6d61] uppercase">
                  Safety notes
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#38594f]">
                  Check conditions before you go and avoid fast or unclear
                  water. If the river looks different than expected, choose a
                  safer viewpoint and turn back early.
                </p>
              </section>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

