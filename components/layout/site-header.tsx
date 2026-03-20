import Link from "next/link";

import { Container } from "@/components/shared/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#c4d8c5] bg-[#eef2ea]/75 backdrop-blur-xl shadow-[0_10px_30px_-25px_rgba(23,45,36,0.6)]">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[#1a2f27] transition hover:text-[#163128] sm:text-lg"
        >
          RockRiverVT
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link
            href="/map"
            className="text-[#35544a] transition duration-200 hover:text-[#163128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]"
          >
            Map
          </Link>
          <Link
            href="/daily-updates"
            className="text-[#35544a] transition duration-200 hover:text-[#163128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]"
          >
            Updates
          </Link>
          <Link
            href="/weather"
            className="text-[#35544a] transition duration-200 hover:text-[#163128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]"
          >
            Weather
          </Link>
          <Link
            href="/photos"
            className="text-[#35544a] transition duration-200 hover:text-[#163128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]"
          >
            Photos
          </Link>
        </nav>
      </Container>
    </header>
  );
}

