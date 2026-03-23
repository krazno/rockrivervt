"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";

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
        className="rr-glass overflow-hidden p-6 sm:p-8"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--rr-mint)]">
          Contact
        </p>
        <h2 className="font-heading mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Send a note
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55">
          Questions or corrections? This opens your email client—no account required.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--rr-glow)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--rr-glow)]/30"
                placeholder="Optional"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                Your email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--rr-glow)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--rr-glow)]/30"
                placeholder="So we can reply"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
              Message
            </span>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--rr-glow)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--rr-glow)]/30"
              placeholder="A few sentences is plenty."
            />
          </label>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              className="rr-btn-primary inline-flex items-center gap-2 px-8"
            >
              <Send className="h-4 w-4 opacity-90" aria-hidden />
              Open mail
            </button>
            <span className="text-xs text-white/35">Opens your mail app</span>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
