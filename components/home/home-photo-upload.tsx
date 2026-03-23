"use client";

import Image from "next/image";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";

type HomePhotoUploadProps = {
  selectedPhoto: string | null;
  setSelectedPhoto: Dispatch<SetStateAction<string | null>>;
  photoInputRef: MutableRefObject<HTMLInputElement | null>;
};

export function HomePhotoUpload({
  selectedPhoto,
  setSelectedPhoto,
  photoInputRef,
}: HomePhotoUploadProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="reveal-up rr-glass p-5 transition duration-300 ease-out hover:-translate-y-0.5 sm:p-6">
        <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
          Share a moment (preview)
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
          Try the flow: open your camera, grab a shot, preview it here. Saving to the site
          isn’t wired up yet—this is a gentle placeholder for a future community photo
          lane.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="rounded-full bg-[var(--rr-glow)] px-5 py-2.5 text-sm font-semibold text-[#04120e] shadow-lg shadow-[var(--rr-glow)]/25 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rr-glow)]"
          >
            Open Camera
          </button>
          <button
            type="button"
            onClick={() => {
              if (!selectedPhoto) return;
              window.alert("Photo send mock complete. Backend coming soon.");
            }}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!selectedPhoto}
          >
            Send Photo (Mock)
          </button>
        </div>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setSelectedPhoto(URL.createObjectURL(file));
          }}
        />
        {selectedPhoto ? (
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/12 bg-[#0a1210]">
            <Image
              src={selectedPhoto}
              alt="Selected Rock River upload preview"
              width={1200}
              height={900}
              unoptimized
              className="h-56 w-full object-cover sm:h-64"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

