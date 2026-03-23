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
    <footer className="mt-auto border-t border-[var(--rr-widget-border)] bg-gradient-to-b from-[#f0ebe6]/90 to-[#e8e4db]/50">
      <Container className="py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 border-b border-[var(--rr-widget-border)] pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pb-12">
          <div className="lg:col-span-4">
            <p className="font-heading text-lg font-semibold tracking-tight text-[var(--rr-ink)]">
              Rock River
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
              Newfane · Windham County VT
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--rr-text-muted)]">
              Unofficial guide to the river—neighbors and volunteers. Not a town or agency site.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4] px-5 py-2.5 text-sm font-medium text-[var(--rr-link)] shadow-sm transition hover:border-[var(--rr-glow)]/35 hover:bg-[#f5f2eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/35"
            >
              Contact
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:col-span-2 lg:col-span-8 lg:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--rr-text-muted)]/80">
                Explore
              </p>
              <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer primary">
                {primaryNav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-medium text-[var(--rr-text-muted)] transition hover:text-[var(--rr-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/35"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--rr-text-muted)]/80">
                Also
              </p>
              <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer secondary">
                {secondaryNav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-medium text-[var(--rr-text-muted)] transition hover:text-[var(--rr-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/35"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--rr-text-muted)]/80">
                Connect
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--rr-text-muted)]">
                Home page contact form.
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
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4] text-[var(--rr-text-muted)] shadow-sm transition hover:border-[var(--rr-glow)]/35 hover:bg-[#f5f2eb] hover:text-[var(--rr-link)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]/35"
                      aria-label={label}
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                    </a>
                  );
                })}
                <a
                  href={`mailto:${CONTACT_FORM_EMAIL}?subject=${encodeURIComponent("Rock River VT")}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rr-widget-border)] bg-[#faf8f4] text-[var(--rr-text-muted)] shadow-sm transition hover:border-[var(--rr-glow)]/35 hover:bg-[#f5f2eb] hover:text-[var(--rr-link)]"
                  aria-label="Email the project"
                >
                  <Mail className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs leading-relaxed text-[var(--rr-text-muted)]">
            Be kind. Leave no trace. Signed clothing-optional areas—everyone welcome.
          </p>
          <p className="mt-4 text-[11px] text-[var(--rr-text-muted)]/80">
            © {new Date().getFullYear()} Rock River VT · Community guide ·{" "}
            <span className="text-[var(--rr-text-muted)]">Not official or legal advice</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
