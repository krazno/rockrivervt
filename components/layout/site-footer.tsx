import Link from "next/link";

import { Container } from "@/components/shared/container";
import { primaryNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#040a08]/90">
      <Container className="py-10">
        <nav
          className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm font-medium text-white/75"
          aria-label="Footer"
        >
          {primaryNav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-2.5 py-1 transition hover:text-[var(--rr-mint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-center text-sm leading-relaxed text-white/55">
          Rock River VT · Unofficial community guide ·{" "}
          <span className="font-medium text-[var(--rr-mint)]/90">All are welcome</span>
        </p>
      </Container>
    </footer>
  );
}
