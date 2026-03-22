import Link from "next/link";

import { Container } from "@/components/shared/container";

const navLinks = [
  { href: "/map", label: "Map" },
  { href: "/conditions", label: "Conditions" },
  { href: "/land-river", label: "Land & River" },
  { href: "/history", label: "History" },
  { href: "/guidelines", label: "Guidelines" },
  { href: "/preservation", label: "Preservation" },
  { href: "/gallery", label: "Photos" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#c4d8c5] bg-[#eef2ea]/75 backdrop-blur-xl shadow-[0_10px_30px_-25px_rgba(23,45,36,0.6)]">
      <Container className="flex flex-col gap-3 py-3 sm:h-auto sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0 sm:pb-0">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-tight text-[#1a2f27] transition hover:text-[#163128] sm:text-lg"
        >
          Rock River VT
        </Link>

        <nav
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium sm:justify-end sm:gap-x-4 sm:text-sm"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[#35544a] transition duration-200 hover:text-[#163128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]"
            >
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
