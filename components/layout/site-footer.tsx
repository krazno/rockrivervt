import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  X as XIcon,
  Youtube,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { CONTACT_FORM_EMAIL, socialLinks } from "@/lib/site";
import { primaryNav, secondaryNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/[0.1] bg-gradient-to-b from-[#080c12] to-[#06090e]">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-white/[0.08] pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pb-14">
          <div className="lg:col-span-4">
            <p className="font-heading text-lg font-semibold tracking-tight text-white">
              Rock River
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Newfane · Windham County VT
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Unofficial field guide to a rocky swimming river in southern Vermont—near
              Brattleboro, shaped by neighbors and volunteers. Not affiliated with any town
              or land agency.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-[var(--rr-glow)]/35 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/50"
            >
              Contact
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:col-span-2 lg:col-span-8 lg:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Explore
              </p>
              <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer primary">
                {primaryNav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/45"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Also
              </p>
              <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer secondary">
                {secondaryNav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/45"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Connect
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                Use the contact form on the home page—we’ll route mail appropriately.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {socialLinks.map(({ label, href }) => {
                  const Icon =
                    label === "Instagram"
                      ? Instagram
                      : label === "Facebook"
                        ? Facebook
                        : label === "YouTube"
                          ? Youtube
                          : label === "X"
                            ? XIcon
                            : Linkedin;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/50 transition hover:border-[var(--rr-glow)]/35 hover:bg-white/[0.07] hover:text-[var(--rr-mint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/45"
                      aria-label={label}
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                    </a>
                  );
                })}
                <a
                  href={`mailto:${CONTACT_FORM_EMAIL}?subject=${encodeURIComponent("Rock River VT")}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/50 transition hover:border-[var(--rr-glow)]/35 hover:bg-white/[0.07] hover:text-[var(--rr-mint)]"
                  aria-label="Email the project"
                >
                  <Mail className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs leading-relaxed text-white/38">
            Everyone belongs here—families, visitors, LGBTQ+ folks, clothing-optional
            beaches where signed. Be kind, leave no trace.
          </p>
          <p className="mt-4 text-[11px] text-white/32">
            © {new Date().getFullYear()} Rock River VT · Community-maintained guide ·{" "}
            <span className="text-white/45">Not official signage or legal advice</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
