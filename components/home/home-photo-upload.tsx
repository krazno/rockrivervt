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
      <div className="reveal-up rounded-3xl border border-[#c6d3ca] bg-[#f3f7f2] p-5 shadow-[0_14px_34px_-28px_rgba(21,40,33,0.7)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-55px_rgba(21,40,33,0.72)] sm:p-6">
        <h2 className="text-xl font-semibold text-[#224035] sm:text-2xl">
          Share a moment (preview)
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4e6c62]">
          Try the flow: open your camera, grab a shot, preview it here. Saving to the site
          isn’t wired up yet—this is a gentle placeholder for a future community photo
          lane.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="rounded-full bg-[#31584b] px-5 py-2.5 text-sm font-medium text-[#edf4ef] shadow-[0_14px_34px_-30px_rgba(49,88,75,0.85)] transition duration-200 hover:bg-[#284a3f] hover:shadow-[0_22px_60px_-45px_rgba(49,88,75,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31584b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f7f2]"
          >
            Open Camera
          </button>
          <button
            type="button"
            onClick={() => {
              if (!selectedPhoto) return;
              window.alert("Photo send mock complete. Backend coming soon.");
            }}
            className="rounded-full border border-[#8ea497] bg-[#f3f6f2] px-5 py-2.5 text-sm font-medium text-[#35584c] transition duration-200 hover:bg-[#e7ede8] hover:shadow-[0_18px_45px_-35px_rgba(20,36,31,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ea497]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f6f2] disabled:cursor-not-allowed disabled:opacity-60"
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
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#c7d4cb] bg-[#e9f0eb]">
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

