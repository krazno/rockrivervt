"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/shared/container";
import {
  HEADER_COMMUNITY,
  HEADER_PRIMARY_NAV,
  type HeaderNavLink,
  headerNavByGroup,
} from "@/lib/nav";
import {
  HOME_SEASON_STRIP,
  homeSeasonFromMonth,
  vermontCalendarMonth,
} from "@/lib/home-seasonal";
import { cn } from "@/lib/utils";

function useHeaderSeasonLine() {
  return useMemo(() => {
    const month = vermontCalendarMonth();
    const season = homeSeasonFromMonth(month);
    return HOME_SEASON_STRIP[season];
  }, []);
}

function useScrolledPast(thresholdPx: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > thresholdPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return scrolled;
}

function DesktopNavLink({
  item,
  pathname,
  tone = "default",
}: {
  item: HeaderNavLink;
  pathname: string;
  /** Softer default color for optional links (e.g. Community). */
  tone?: "default" | "soft";
}) {
  const active = item.match(pathname);
  return (
    <Link
      href={item.href}
      className={cn(
        "whitespace-nowrap rounded-full px-3 py-2 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-200",
        active ?
          "bg-[#e4dfd4]/95 text-[#243028] shadow-[inset_0_0_0_1px_rgb(176_168_154/0.45)]"
        : tone === "soft" ?
          "text-[#5c665e] hover:bg-[#ebe6dc]/80 hover:text-[#1F2A24]"
        : "text-[#3d4540] hover:bg-[#ebe6dc]/85 hover:text-[#1F2A24]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d8574]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f4]",
      )}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

function MobileNavRow({
  item,
  pathname,
  onNavigate,
}: {
  item: HeaderNavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = item.match(pathname);
  const soft = item.href === "/community";
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex min-h-[3rem] items-center rounded-xl px-4 py-3 text-[1rem] font-medium tracking-[0.01em] transition-colors",
        active ?
          "bg-[#e4dfd4]/95 text-[#1a2822]"
        : soft ?
          "text-[#5a635e] hover:bg-[#ebe6dc]/75 hover:text-[#1F2A24] active:bg-[#e5dfd4]"
        : "text-[#1F2A24] hover:bg-[#ebe6dc]/75 active:bg-[#e5dfd4]",
      )}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(10);
  const seasonLine = useHeaderSeasonLine();
  const mobileGroups = useMemo(() => headerNavByGroup(), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[padding,background-color,box-shadow,border-color] duration-300 ease-out",
          scrolled ?
            "border-[#d8d2c8]/95 bg-[#faf8f4]/94 py-2 shadow-[0_8px_28px_-10px_rgba(31,42,36,0.1)] backdrop-blur-md supports-[backdrop-filter]:bg-[#faf8f4]/91"
          : "border-[#e6dfd4]/75 bg-[#faf8f4]/85 py-3 shadow-[0_1px_0_rgb(42_38_32/0.045)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#faf8f4]/74",
        )}
      >
        <Container
          className={cn(
            "flex items-center gap-4 transition-[padding] duration-300",
            scrolled ? "lg:gap-5" : "lg:gap-6",
          )}
        >
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 flex-col leading-[1.15] transition-opacity duration-200 hover:opacity-[0.88]"
          >
            <span className="font-heading text-[1.125rem] font-semibold tracking-[-0.025em] text-[#1F2A24] sm:text-[1.2rem]">
              Rock River
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#5c6d62]">
              Vermont
            </span>
          </Link>

          <nav
            className="hidden min-h-10 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
            aria-label="Primary"
          >
            {HEADER_PRIMARY_NAV.map((item) => (
              <DesktopNavLink key={item.href} item={item} pathname={pathname} />
            ))}
            <span
              className="mx-1 hidden h-4 w-px shrink-0 bg-[#d2ccc2]/90 lg:block"
              aria-hidden
            />
            <DesktopNavLink item={HEADER_COMMUNITY} pathname={pathname} tone="soft" />
          </nav>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <p
              className="max-w-[12.5rem] text-right text-[11px] font-medium leading-snug tracking-[0.03em] text-[#6B6F68]"
              title={seasonLine}
            >
              {seasonLine}
            </p>
            <Link
              href="/map"
              className="rr-btn-primary shrink-0 px-4 py-2 text-xs font-medium tracking-[0.06em] sm:text-[0.8125rem]"
            >
              Open map
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/map"
              className="rr-btn-primary whitespace-nowrap px-3.5 py-2 text-[11px] font-medium tracking-[0.05em]"
            >
              Open map
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center rounded-2xl border border-[#dcd6cc]/95 bg-[#f7f4ed]/90 text-[#1F2A24] shadow-sm transition hover:bg-[#f0ebe2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d8574]/28"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </Container>

        <div
          className={cn(
            "border-t transition-[padding,border-color] duration-300",
            scrolled ? "border-[#e0dad0]/95 py-1" : "border-[#ebe6dc]/55 py-1.5",
          )}
        >
          <Container className="!px-4 sm:!px-6 lg:!px-8">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a918c] sm:text-[11px] sm:tracking-[0.24em]">
              Newfane · Windham County · Southern Vermont
            </p>
          </Container>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-[80] lg:hidden" key="nav-overlay">
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 bg-[#2c2a26]/30 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,24rem)] flex-col border-l border-[#dcd6cc]/90 bg-[#faf8f4] shadow-[-16px_0_48px_-20px_rgba(31,42,36,0.12)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#e5dfd4] px-5 py-5">
                <div className="min-w-0">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="inline-flex flex-col leading-tight"
                  >
                    <span className="font-heading text-[1.35rem] font-semibold tracking-[-0.02em] text-[#1F2A24]">
                      Rock River
                    </span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#5c6d62]">
                      Vermont
                    </span>
                  </Link>
                  <p className="mt-4 max-w-[18rem] text-[0.8125rem] leading-relaxed text-[#6B6F68]">
                    Independent guide to Rock River Vermont
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dcd6cc] bg-[#f5f2eb] text-[#1F2A24] transition hover:bg-[#ebe6dc]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav
                className="flex flex-1 flex-col overflow-y-auto px-3 py-4"
                aria-label="Mobile"
              >
                {mobileGroups.map(({ group, label, items }) => (
                  <div key={group} className="mb-2">
                    <p className="px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a918c]">
                      {label}
                    </p>
                    <div className="flex flex-col gap-1">
                      {items.map((item, i) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.22, delay: 0.04 + i * 0.02 }}
                        >
                          <MobileNavRow
                            item={item}
                            pathname={pathname}
                            onNavigate={() => setOpen(false)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="border-t border-[#e5dfd4] px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Link
                  href="/map"
                  onClick={() => setOpen(false)}
                  className="rr-btn-primary flex w-full justify-center py-3 text-sm font-medium tracking-[0.05em]"
                >
                  Open map
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
