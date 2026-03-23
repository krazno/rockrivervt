"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Send } from "lucide-react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { CONTACT_FORM_EMAIL } from "@/lib/site";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Rock River VT — note from ${name || "site"}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name ? `Name: ${name}\n` : ""}${email ? `Reply-to: ${email}` : ""}`,
    );
    window.location.href = `mailto:${CONTACT_FORM_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="rr-section mx-auto w-full max-w-6xl scroll-mt-28 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="rounded-[var(--rr-radius-xl)] border border-[var(--rr-widget-border)] bg-[var(--rr-widget-bg)]/75 p-7 shadow-[var(--rr-shadow-card)] backdrop-blur-md sm:p-9"
      >
        <SectionEyebrow icon={Mail}>Contact</SectionEyebrow>
        <h2 className="rr-h2 mt-3">Say hello</h2>
        <p className="rr-lead mt-3 max-w-lg">
          Opens your email.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--rr-text-muted)]">
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="mt-1.5 w-full rounded-xl border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 px-4 py-3 text-sm text-[var(--rr-ink)] placeholder:text-[var(--rr-text-muted)]/70 focus:border-[var(--rr-glow)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--rr-glow)]/25"
                placeholder="Optional"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--rr-text-muted)]">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-1.5 w-full rounded-xl border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 px-4 py-3 text-sm text-[var(--rr-ink)] placeholder:text-[var(--rr-text-muted)]/70 focus:border-[var(--rr-glow)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--rr-glow)]/25"
                placeholder="If you want a reply"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--rr-text-muted)]">
              Message
            </span>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1.5 w-full resize-y rounded-xl border border-[var(--rr-widget-border)] bg-[#faf8f4]/90 px-4 py-3 text-sm text-[var(--rr-ink)] placeholder:text-[var(--rr-text-muted)]/70 focus:border-[var(--rr-glow)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--rr-glow)]/25"
              placeholder="A few lines is enough."
            />
          </label>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              className="rr-btn-primary inline-flex items-center gap-2 px-8"
            >
              <Send className="h-4 w-4 opacity-90" aria-hidden />
              Send
            </button>
            <span className="text-xs text-[var(--rr-text-muted)]">Uses your mail app</span>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
