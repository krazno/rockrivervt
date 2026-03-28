"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type LeafSpec = {
  v: string;
  vSide: "top" | "bottom";
  h: string;
  hSide: "left" | "right";
  w: string;
  hPx: string;
  rotate: number;
  opacity: number;
  blurPx: number;
  radius: string;
  driftSec: number;
  delaySec: number;
  desktopOnly?: boolean;
};

/**
 * Extremely soft “leaf / canopy shadow” blobs behind homepage content.
 * Tuned for barely-there depth — if these read as graphics, reduce opacity further.
 */
const LEAVES: LeafSpec[] = [
  {
    v: "min(9vh, 5.5rem)",
    vSide: "top",
    h: "47%",
    hSide: "left",
    w: "min(240px, 42vw)",
    hPx: "min(320px, 48vh)",
    rotate: -16,
    opacity: 0.02,
    blurPx: 58,
    radius: "62% 38% 54% 46% / 48% 42% 58% 52%",
    driftSec: 128,
    delaySec: 0,
  },
  {
    v: "18%",
    vSide: "top",
    h: "3%",
    hSide: "right",
    w: "min(180px, 36vw)",
    hPx: "min(260px, 38vh)",
    rotate: 22,
    opacity: 0.016,
    blurPx: 50,
    radius: "44% 56% 72% 28% / 52% 38% 62% 48%",
    driftSec: 142,
    delaySec: -40,
    desktopOnly: true,
  },
  {
    v: "34%",
    vSide: "top",
    h: "58%",
    hSide: "left",
    w: "min(200px, 38vw)",
    hPx: "min(300px, 42vh)",
    rotate: 8,
    opacity: 0.017,
    blurPx: 64,
    radius: "38% 62% 46% 54% / 60% 44% 56% 40%",
    driftSec: 112,
    delaySec: -18,
  },
  {
    v: "52%",
    vSide: "top",
    h: "78%",
    hSide: "left",
    w: "min(160px, 34vw)",
    hPx: "min(220px, 36vh)",
    rotate: -24,
    opacity: 0.014,
    blurPx: 48,
    radius: "55% 45% 33% 67% / 41% 59% 51% 49%",
    driftSec: 134,
    delaySec: -55,
    desktopOnly: true,
  },
  {
    v: "min(62vh, 28rem)",
    vSide: "top",
    h: "6%",
    hSide: "left",
    w: "min(220px, 40vw)",
    hPx: "min(280px, 44vh)",
    rotate: 19,
    opacity: 0.019,
    blurPx: 56,
    radius: "48% 52% 63% 37% / 36% 64% 42% 58%",
    driftSec: 122,
    delaySec: -72,
  },
  {
    v: "8%",
    vSide: "bottom",
    h: "12%",
    hSide: "right",
    w: "min(190px, 36vw)",
    hPx: "min(250px, 40vh)",
    rotate: -11,
    opacity: 0.016,
    blurPx: 52,
    radius: "71% 29% 51% 49% / 47% 53% 44% 56%",
    driftSec: 138,
    delaySec: -22,
    desktopOnly: true,
  },
  {
    v: "22%",
    vSide: "bottom",
    h: "68%",
    hSide: "left",
    w: "min(170px, 32vw)",
    hPx: "min(240px, 38vh)",
    rotate: 14,
    opacity: 0.013,
    blurPx: 62,
    radius: "52% 48% 41% 59% / 55% 45% 63% 37%",
    driftSec: 104,
    delaySec: -8,
  },
  /** Wide, whisper-light canopy wash — spine-adjacent, often masked by bands */
  {
    v: "36%",
    vSide: "top",
    h: "42%",
    hSide: "left",
    w: "min(360px, 62vw)",
    hPx: "min(150px, 22vh)",
    rotate: -5,
    opacity: 0.009,
    blurPx: 82,
    radius: "48% 52% 58% 42% / 62% 38% 54% 46%",
    driftSec: 156,
    delaySec: -44,
    desktopOnly: true,
  },
];

function wrapperStyle(spec: LeafSpec): CSSProperties {
  return {
    [spec.vSide]: spec.v,
    [spec.hSide]: spec.h,
    width: spec.w,
    height: spec.hPx,
    transform: `rotate(${spec.rotate}deg)`,
  };
}

function blobStyle(spec: LeafSpec): CSSProperties {
  return {
    borderRadius: spec.radius,
    opacity: spec.opacity,
    filter: `blur(${spec.blurPx}px)`,
    backgroundColor: "rgb(54 68 58 / 0.78)",
    animationDuration: `${spec.driftSec}s`,
    animationDelay: `${spec.delaySec}s`,
  };
}

export function HomeLeafAtmosphere() {
  return (
    <div
      className="home-leaf-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {LEAVES.map((spec, i) => (
        <div
          key={i}
          className={cn("absolute", spec.desktopOnly && "hidden lg:block")}
          style={wrapperStyle(spec)}
        >
          <div
            className="home-leaf-atmosphere__blob motion-safe:home-leaf-atmosphere-drift absolute"
            style={blobStyle(spec)}
          />
        </div>
      ))}
    </div>
  );
}
