"use client";

import Image from "next/image";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Camera, ImagePlus } from "lucide-react";
import { motion } from "motion/react";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";

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
    <section className="rr-section mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="rr-surface rounded-[var(--rr-radius-xl)] p-7 sm:p-9"
      >
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <SectionEyebrow icon={Camera}>Contribute</SectionEyebrow>
            <h2 className="rr-h2 mt-3">Share a frame</h2>
            <p className="rr-lead mt-3">
              Try the capture flow—preview here. Upload to the site is still in progress;
              for now this is a dry run.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="rr-btn-primary inline-flex items-center gap-2 px-6"
            >
              <Camera className="h-4 w-4" aria-hidden />
              Camera
            </button>
            <button
              type="button"
              onClick={() => {
                if (!selectedPhoto) return;
                window.alert("Upload isn’t wired yet—thanks for testing the flow.");
              }}
              disabled={!selectedPhoto}
              className="rr-btn-ghost inline-flex items-center gap-2 px-6 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ImagePlus className="h-4 w-4" aria-hidden />
              Queue send
            </button>
          </div>
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
          <div className="mt-7 overflow-hidden rounded-[var(--rr-radius-md)] border border-[var(--rr-widget-border)] bg-[#e8e4db]/60">
            <Image
              src={selectedPhoto}
              alt="Your photo preview"
              width={1200}
              height={900}
              unoptimized
              className="h-52 w-full object-cover sm:h-64"
            />
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
