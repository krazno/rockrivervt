"use client";

import { useState, type FormEvent } from "react";

import { trackRrInteraction } from "@/lib/analytics";
import { mailtoGetFeaturedSubmission, SITE_STUDIO_BRAND } from "@/lib/site";

export function GetFeaturedForm() {
  const [contactName, setContactName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [town, setTown] = useState("");
  const [website, setWebsite] = useState("");
  const [visitorNote, setVisitorNote] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!contactName.trim() || !businessName.trim() || !town.trim() || !visitorNote.trim()) {
      setError("Please fill in name, business, town, and what visitors should know.");
      return;
    }
    if (!agreed) {
      setError("Please confirm you’ve read the editorial criteria.");
      return;
    }
    const mailto = mailtoGetFeaturedSubmission({
      contactName,
      businessName,
      town,
      website,
      visitorNote,
    });
    trackRrInteraction("partner", "get_featured_mailto_open");
    window.location.href = mailto;
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-[#E2E0D8] bg-white px-3 py-2 text-sm text-[#1F2A24] shadow-sm outline-none transition placeholder:text-[#8a918c] focus:border-[#4F6B52]/45 focus:ring-2 focus:ring-[#4F6B52]/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[#E2E0D8] bg-[#fafaf8] p-5 shadow-sm sm:p-6"
      noValidate
    >
      <p className="text-sm leading-relaxed text-[#5a6258]">
        This opens your email app with a draft to {SITE_STUDIO_BRAND}. Nothing is stored on the site
        until you send.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#1F2A24]">
          Your name
          <input
            className={inputClass}
            name="contactName"
            autoComplete="name"
            value={contactName}
            onChange={(ev) => setContactName(ev.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2A24]">
          Business or organization
          <input
            className={inputClass}
            name="businessName"
            autoComplete="organization"
            value={businessName}
            onChange={(ev) => setBusinessName(ev.target.value)}
            required
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-[#1F2A24]">
        Town
        <input
          className={inputClass}
          name="town"
          value={town}
          onChange={(ev) => setTown(ev.target.value)}
          required
        />
      </label>
      <label className="block text-sm font-medium text-[#1F2A24]">
        Website or social (optional)
        <input
          className={inputClass}
          name="website"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={website}
          onChange={(ev) => setWebsite(ev.target.value)}
        />
      </label>
      <label className="block text-sm font-medium text-[#1F2A24]">
        What should visitors know?
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          name="visitorNote"
          value={visitorNote}
          onChange={(ev) => setVisitorNote(ev.target.value)}
          required
          placeholder="Hours vibe, parking, food, how you welcome LGBTQ+ visitors, optional perk…"
        />
      </label>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-[#3f4840]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(ev) => setAgreed(ev.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-[#E2E0D8] text-[#4F6B52] focus:ring-[#4F6B52]/30"
        />
        <span>
          We fit the criteria on this page: honest copy, no pressure tactics, listings stay clearly
          labeled if they’re ever sponsored or paid.
        </span>
      </label>
      {error ?
        <p className="text-sm font-medium text-[#8b4a42]" role="alert">
          {error}
        </p>
      : null}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full border border-[#4F6B52]/35 bg-[#4F6B52] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d5640] sm:w-auto"
      >
        Open email draft
      </button>
    </form>
  );
}
