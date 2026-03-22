import Link from "next/link";

import { Container } from "@/components/shared/container";

const footerLinks = [
  { href: "/map", label: "Map" },
  { href: "/conditions", label: "Conditions" },
  { href: "/land-river", label: "Land & River" },
  { href: "/history", label: "History" },
  { href: "/guidelines", label: "Guidelines" },
  { href: "/preservation", label: "Preservation" },
  { href: "/gallery", label: "Photos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-[#c4d8c5] bg-[#eef2ea]">
      <Container className="py-8">
        <nav
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-[#35544a]"
          aria-label="Footer"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-[#163128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2ea]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-4 text-center text-sm leading-relaxed text-[#4d6a5f]">
          Rock River VT · Unofficial community guide ·{" "}
          <span className="font-medium text-[#35544a]">All are welcome</span>
        </p>
      </Container>
    </footer>
  );
}
