import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";

const ogDescription =
  "Geography, ecology, and respectful visitor context for Rock River, Vermont.";

export const metadata: Metadata = {
  title: "Land & River",
  description:
    "Geography, ecology, and human connection along Rock River in Windham County, Vermont—from Dover to Newfane and the West River.",
  alternates: { canonical: "/land-river" },
  openGraph: {
    title: "Land & River | Rock River VT",
    description: ogDescription,
    url: "https://rockrivervt.com/land-river",
    type: "website",
    siteName: "Rock River VT",
    images: [
      {
        url: "/rock-river-hero.png",
        width: 1200,
        height: 630,
        alt: "Rock River near Newfane, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Land & River | Rock River VT",
    description: ogDescription,
    images: ["/rock-river-hero.png"],
  },
};

export default function LandRiverPage() {
  return (
    <>
      <SiteHeader />
      <main className="rr-body text-[#e8f4ef]">
        <Container className="py-10">
          <article className="rr-glass-strong mx-auto max-w-3xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              The place itself
            </p>
            <h1 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Land & River
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
              Rock River is a tributary of the West River, flowing entirely within Windham
              County, Vermont. It rises in the Green Mountain National Forest in Dover and
              joins the West River in Newfane. When people say “Rock River,” they often
              mean the trails, pools, and riverbanks along its lower reaches—places shaped
              by water, stone, and generations of careful use.
            </p>

            <h2
              id="geography-context"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Geography & context
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              The river cuts through southern Vermont forest and hillside. Public access
              is tied to woodland trails and the town trail system; conditions vary with
              season, rain, and snowmelt. Understanding the whole watershed—not just a
              single swimming hole—helps explain why flows can change quickly on a warm
              spring afternoon.
            </p>

            <h2
              id="ecology-habitat"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Ecology & habitat
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Banks and slopes support eastern hemlock, northern red oak, yellow birch,
              and underbrush including mountain laurel, wild azalea, and other wildflowers
              that feed wildlife through the year. Bear, bobcat, deer, foxes, and many
              birds, fish, and aquatic species depend on clean, steady habitat. Volunteers
              and partners have documented native plants and invasive species to guide
              careful stewardship. Water quality monitoring by the Connecticut River
              Conservancy has consistently found Rock River suitable for swimming during
              warmer months.
            </p>

            <h2
              id="human-experience"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Human experience—many traditions, one river
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Swimmers, sunbathers, and paddlers value the cool water and sun-warmed
              stone. The river has long offered quiet and community to many kinds of
              visitors. From a town path starting at the end of Williamsville Road in
              Newfane, people first reach a family-oriented beach known as{" "}
              <strong className="font-medium text-[var(--rr-mint)]">Indian Love Call</strong>,
              enjoyed by generations of children and teens. Farther from the road, a
              separate clothing-optional area known as{" "}
              <strong className="font-medium text-[var(--rr-mint)]">Third Beach</strong> welcomes
              a mixed crowd; signage marks expectations at the site. At the end of the
              trails, a sandy bank known as{" "}
              <strong className="font-medium text-[var(--rr-mint)]">Fifth Beach</strong> has been
              a traditional gathering place for gay and bisexual men and their friends.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              <strong className="font-medium text-[var(--rr-mint)]">All are welcome</strong> on
              this site and at the river when we meet each other with respect—for
              neighbors, for the land, and for the many communities who share this
              corridor.
            </p>

            <h2
              id="preservation-on-the-ground"
              className="mt-10 scroll-mt-28 text-sm font-semibold tracking-[0.12em] text-[var(--rr-mint)] uppercase"
            >
              Preservation on the ground
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Rock River Preservation, Inc. formed in 2005 to conserve publicly
              accessible land along the river. In 2007, the organization purchased about
              4.5 acres along roughly 1.2 miles of frontage, including land up to the
              Jersey barriers on Williamsville Road—an alternate entry if access from the
              town path off Depot Road becomes difficult. That parcel reaches the family
              beach and the bend many people call Third Beach. In late 2018, Rock River
              Preservation added about 21.32 acres from longtime neighbors, bringing total
              protected holdings to roughly 25.82 acres, with management plans updated for
              the whole property. See{" "}
              <Link
                href="/history"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                History
              </Link>{" "}
              and{" "}
              <Link
                href="/preservation"
                className="font-medium text-[var(--rr-mint)] underline-offset-2 hover:underline"
              >
                Preservation
              </Link>{" "}
              for the full story and stewardship framework.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
