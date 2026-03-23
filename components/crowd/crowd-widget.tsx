"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Users, X } from "lucide-react";

import {
  CROWD_AREA_KEYS,
  CROWD_LEVELS,
  CROWD_LEVEL_LABEL,
  CROWD_LEVEL_TONE,
  CROWD_WIDGET_AREA_LABEL,
  type CrowdAreaKey,
  type CrowdLevel,
} from "@/lib/crowd/constants";
import {
  getCrowdSubmittedReportDate,
  getOrCreateCrowdDeviceId,
  setCrowdSubmittedReportDate,
} from "@/lib/crowd/device-id";
import { buildCrowdSummaries } from "@/lib/crowd/summary";
import type { CrowdAreaSummary, CrowdSummaryResponse } from "@/lib/crowd/types";
import { cn } from "@/lib/utils";

type LoadState = "loading" | "ready" | "error";

const IS_DEV = process.env.NODE_ENV === "development";

const BACKEND_UNAVAILABLE_NOTE =
  "Check-ins aren’t live here yet—the levels below are the guide’s starting points for today.";

type CrowdApiJson = {
  error?: string;
  detail?: string;
  envIssues?: string[];
  reportDate?: string;
  areas?: unknown;
};

async function readCrowdResponseJson(res: Response): Promise<CrowdApiJson | null> {
  const text = await res.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as CrowdApiJson;
  } catch {
    return null;
  }
}

function fallbackSummaries(): CrowdAreaSummary[] {
  return buildCrowdSummaries(
    {},
    {
      parking: [],
      trails: [],
      family_beach: [],
      third_beach: [],
      fifth_beach: [],
    },
  ).map((a) => ({
    ...a,
    label: CROWD_WIDGET_AREA_LABEL[a.areaKey],
  }));
}

function rowSubtitle(row: CrowdAreaSummary): string {
  if (row.blendSource === "baseline_only" || row.reportCount === 0) {
    return "Guide baseline for today";
  }
  const n = row.reportCount;
  return n === 1
    ? "1 check-in blended in today"
    : `${n} check-ins blended in today`;
}

export function CrowdWidget() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [summary, setSummary] = useState<CrowdSummaryResponse | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selections, setSelections] = useState<
    Partial<Record<CrowdAreaKey, CrowdLevel>>
  >({});
  const [displayName, setDisplayName] = useState("");

  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "thanks" | "already_today" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  /** Dev-only: extra context from API (never secrets). */
  const [submitDevHint, setSubmitDevHint] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  /** When true, closing the modal (timer or user) should show the inline thanks state. */
  const pendingWidgetThanksRef = useRef(false);

  const deviceId = useMemo(() => getOrCreateCrowdDeviceId(), []);

  const backendReady = loadState === "ready";

  const refreshSummary = useCallback(async () => {
    setLoadState("loading");
    try {
      const res = await fetch("/api/crowd", { cache: "no-store" });
      const json = await readCrowdResponseJson(res);

      if (!res.ok) {
        setSummary(null);
        setLoadState("error");
        if (IS_DEV && json?.error) {
          console.warn("[crowd] GET /api/crowd failed:", res.status, json);
        }
        return;
      }

      if (!json || !Array.isArray(json.areas)) {
        setSummary(null);
        setLoadState("error");
        if (IS_DEV) console.warn("[crowd] GET /api/crowd: unexpected JSON shape");
        return;
      }

      setSummary(json as CrowdSummaryResponse);
      setLoadState("ready");

      const submitted = getCrowdSubmittedReportDate();
      if (submitted && submitted === json.reportDate) {
        setSubmitState("thanks");
        setModalOpen(false);
      }
    } catch {
      setSummary(null);
      setLoadState("error");
      if (IS_DEV) console.warn("[crowd] GET /api/crowd: network or parse error");
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void refreshSummary();
    }, 0);
    return () => window.clearTimeout(id);
  }, [refreshSummary]);

  const closeModal = useCallback(() => {
    const promoteThanks = pendingWidgetThanksRef.current;
    pendingWidgetThanksRef.current = false;
    setModalSuccess(false);
    setModalOpen(false);
    setSelections({});
    setDisplayName("");
    setSubmitMessage(null);
    setSubmitDevHint(null);
    if (promoteThanks) {
      setSubmitState("thanks");
    } else {
      setSubmitState((prev) => (prev === "error" ? "idle" : prev));
    }
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && submitState !== "submitting") {
        closeModal();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen, submitState, closeModal]);

  useEffect(() => {
    if (!modalSuccess) return;
    const t = window.setTimeout(() => {
      closeModal();
    }, 1600);
    return () => window.clearTimeout(t);
  }, [modalSuccess, closeModal]);

  const areasForDisplay: CrowdAreaSummary[] =
    loadState === "ready" && summary
      ? summary.areas.map((a) => ({
          ...a,
          label: CROWD_WIDGET_AREA_LABEL[a.areaKey],
        }))
      : loadState === "error"
        ? fallbackSummaries()
        : [];

  const showSummarySkeleton = loadState === "loading";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitMessage(null);
    setSubmitDevHint(null);

    const areas: Partial<Record<CrowdAreaKey, CrowdLevel>> = {};
    for (const key of CROWD_AREA_KEYS) {
      const v = selections[key];
      if (v) areas[key] = v;
    }
    if (Object.keys(areas).length === 0) {
      setSubmitMessage("Choose a level for at least one area.");
      return;
    }

    if (!deviceId) {
      setSubmitMessage("This browser couldn’t save an anonymous id. Please try again.");
      return;
    }

    pendingWidgetThanksRef.current = false;
    setModalSuccess(false);
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/crowd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          displayName: displayName.trim() || undefined,
          areas,
        }),
      });

      const json = await readCrowdResponseJson(res);

      if (res.status === 409) {
        const rd = json?.reportDate ?? summary?.reportDate;
        if (rd) setCrowdSubmittedReportDate(rd);
        setSubmitState("already_today");
        setSubmitMessage(null);
        setSubmitDevHint(null);
        setModalOpen(false);
        void refreshSummary();
        return;
      }

      if (!res.ok) {
        setSubmitState("error");
        if (res.status === 400 && json?.error) {
          setSubmitMessage(json.error);
        } else if (res.status === 503) {
          setSubmitMessage(
            "Saving isn’t available right now—the site needs its database connection configured.",
          );
          if (IS_DEV && json?.envIssues?.length) {
            setSubmitDevHint(`Env: ${json.envIssues.join(", ")}`);
          }
        } else if (res.status === 502) {
          setSubmitMessage(
            "We couldn’t reach the database to save your check-in. Please try again in a moment.",
          );
          if (IS_DEV && json?.detail) {
            setSubmitDevHint(json.detail);
          }
        } else if (!json) {
          setSubmitMessage(
            "We couldn’t save your check-in. The server sent an unexpected response.",
          );
        } else {
          setSubmitMessage(
            json.error ??
              "We couldn’t save your check-in. Please try again in a moment.",
          );
          if (IS_DEV && json.detail) {
            setSubmitDevHint(json.detail);
          }
        }
        if (IS_DEV) {
          console.warn("[crowd] POST /api/crowd failed:", res.status, json);
        }
        return;
      }

      const rd = json?.reportDate ?? summary?.reportDate;
      if (!rd) {
        setSubmitState("error");
        setSubmitMessage(
          "Your check-in may have saved, but we couldn’t confirm the date. Please refresh the page.",
        );
        if (IS_DEV) {
          setSubmitDevHint("Missing reportDate in success JSON");
        }
        void refreshSummary();
        return;
      }

      setCrowdSubmittedReportDate(rd);
      setSelections({});
      setDisplayName("");
      setSubmitState("idle");
      pendingWidgetThanksRef.current = true;
      setModalSuccess(true);
      void refreshSummary();
    } catch {
      setSubmitState("error");
      setSubmitMessage("We couldn’t reach the server. Check your connection and try again.");
      if (IS_DEV) {
        setSubmitDevHint("Network error or invalid response body");
        console.warn("[crowd] POST /api/crowd: fetch threw or body unreadable");
      }
    }
  }

  const modalFormDisabled =
    submitState === "submitting" ||
    submitState === "thanks" ||
    submitState === "already_today" ||
    modalSuccess ||
    !backendReady;

  const showReportButton =
    submitState !== "thanks" && submitState !== "already_today";

  return (
    <div className="rounded-2xl border border-[#c0cad2] bg-white/65 p-4 shadow-[0_6px_26px_-20px_rgba(22,38,48,0.3)] backdrop-blur-[2px] sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d0d8e0] bg-[#f4f6f8] text-[#4f6d7a] sm:h-10 sm:w-10 sm:rounded-xl">
            <Users className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#4f6d7a] uppercase">
              How full it feels
            </h3>
            <p className="mt-1 max-w-md text-[12px] leading-snug text-[#5f737f] sm:text-[13px]">
              Anonymous check-ins nudge these labels—a vibe check, not a count.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 sm:mt-4">
        {showSummarySkeleton
          ? CROWD_AREA_KEYS.map((key) => (
              <div
                key={key}
                className="flex animate-pulse items-center justify-between gap-3 rounded-lg border border-[#e4e8eb] bg-[#f4f6f8] px-3 py-2.5"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="h-3.5 w-32 rounded bg-[#dce0e4]" />
                  <div className="h-2.5 w-24 rounded bg-[#e8eaeb]" />
                </div>
                <div className="h-7 w-[4.5rem] shrink-0 rounded-full bg-[#dce0e4]" />
              </div>
            ))
          : areasForDisplay.map((row) => {
              const tone = CROWD_LEVEL_TONE[row.displayedLevel];
              return (
                <div
                  key={row.areaKey}
                  className="rounded-lg border border-[#d6dce2] bg-[#f5f7f8] px-3 py-2 sm:py-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium leading-tight text-[#2a3842] sm:text-sm">
                        {row.label}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-snug text-[#6b7f88] sm:text-[11px]">
                        {rowSubtitle(row)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold sm:px-3 sm:py-1 sm:text-sm",
                        tone.bg,
                        tone.border,
                        tone.text,
                      )}
                    >
                      {CROWD_LEVEL_LABEL[row.displayedLevel]}
                    </span>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="mt-4 border-t border-[#dce2e6]/80 pt-3.5 sm:mt-5 sm:pt-4">
        {submitState === "thanks" ? (
          <div className="rounded-lg border border-[#c5ced4] bg-[#f4f6f8] px-3 py-3 text-center sm:px-4 sm:py-3.5">
            <p className="text-[13px] font-medium text-[#2a3842] sm:text-sm">
              Thanks for sharing
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#5a6b78] sm:text-[13px]">
              Thanks—come back tomorrow if you want to update.
            </p>
          </div>
        ) : submitState === "already_today" ? (
          <div className="rounded-lg border border-[#d8d6d0] bg-[#f8f7f4] px-3 py-3 text-center sm:px-4 sm:py-3.5">
            <p className="text-[13px] font-medium text-[#2a3842] sm:text-sm">
              You’re all set for today
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#5a6b78] sm:text-[13px]">
              One check-in per browser per day.
            </p>
          </div>
        ) : (
          showReportButton ? (
            <div className="flex flex-col items-stretch gap-2 sm:items-center">
              <button
                type="button"
                disabled={!backendReady || submitState === "submitting"}
                onClick={() => {
                  if (!backendReady) return;
                  setModalOpen(true);
                  setSubmitMessage(null);
                  setSubmitDevHint(null);
                  setSubmitState((s) => (s === "error" ? "idle" : s));
                }}
                className={cn(
                  "w-full rounded-full border px-5 py-2.5 text-sm font-medium transition sm:max-w-sm sm:self-center sm:py-3",
                  backendReady
                    ? "border-[#3d5a68] bg-[#3d5a68] text-[#f3f5f6] shadow-[0_8px_24px_-20px_rgba(22,38,48,0.45)] hover:bg-[#334e5c]"
                    : "cursor-not-allowed border-[#c9d0d6] bg-[#eef0f4] text-[#8a9a8e]",
                )}
              >
                Report today’s crowd
              </button>
              {!backendReady && loadState !== "loading" ? (
                <p className="text-center text-[12px] leading-relaxed text-[#6b7f88]">
                  {BACKEND_UNAVAILABLE_NOTE}
                </p>
              ) : null}
            </div>
          ) : null
        )}
      </div>

      {modalOpen && backendReady ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          aria-hidden={false}
        >
          <button
            type="button"
            aria-label="Close dialog"
            disabled={submitState === "submitting"}
            onClick={() => {
              if (submitState !== "submitting") closeModal();
            }}
            className="absolute inset-0 bg-[#1a2832]/35 backdrop-blur-[1px] transition-opacity disabled:pointer-events-none"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="crowd-report-modal-title"
            className="relative z-10 flex max-h-[min(85dvh,560px)] w-full max-w-md flex-col rounded-t-2xl border border-[#c0cad2] border-b-0 bg-[#fafbf9] shadow-[0_-6px_32px_-10px_rgba(22,38,48,0.3)] sm:max-h-[min(82dvh,520px)] sm:rounded-2xl sm:border-b sm:shadow-[0_16px_40px_-22px_rgba(22,38,48,0.38)]"
          >
            <div className="flex shrink-0 items-start justify-between gap-2 border-b border-[#e0e4e8] px-3 pb-2.5 pt-3 sm:px-4 sm:pb-3 sm:pt-4">
              <div className="min-w-0 pr-1">
                <h4
                  id="crowd-report-modal-title"
                  className="text-[15px] font-semibold tracking-tight text-[#2a3842] sm:text-base"
                >
                  Quick check-in
                </h4>
                <p className="mt-0.5 text-[11px] leading-snug text-[#6b7f88] sm:text-[12px]">
                  Tap how busy each spot felt. One anonymous save per browser, per day.
                </p>
              </div>
              <button
                type="button"
                disabled={submitState === "submitting"}
                onClick={closeModal}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8e0d8] bg-white/80 text-[#4f6d7a] transition hover:bg-[#f4f6f8] disabled:opacity-50"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {modalSuccess ? (
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:py-10">
                <p className="text-sm font-medium text-[#2a3842]">Thanks for sharing</p>
                <p className="mt-1.5 max-w-[16rem] text-[12px] leading-relaxed text-[#5a6b78]">
                  Your check-in helps visitors get a feel for today’s activity.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-3.5"
              >
                <div className="space-y-2">
                  {CROWD_AREA_KEYS.map((areaKey) => (
                    <div
                      key={areaKey}
                      className="rounded-lg border border-[#e2e6ea] bg-white/80 px-2.5 py-2"
                    >
                      <p className="text-[12px] font-medium text-[#3d4f5c]">
                        {CROWD_WIDGET_AREA_LABEL[areaKey]}
                      </p>
                      <div
                        className="mt-1.5 flex flex-wrap gap-1"
                        role="group"
                        aria-label={`Crowd level for ${CROWD_WIDGET_AREA_LABEL[areaKey]}`}
                      >
                        {CROWD_LEVELS.map((level) => {
                          const selected = selections[areaKey] === level;
                          const tone = CROWD_LEVEL_TONE[level];
                          return (
                            <button
                              key={level}
                              type="button"
                              disabled={modalFormDisabled}
                              onClick={() =>
                                setSelections((prev) => ({
                                  ...prev,
                                  [areaKey]: selected ? undefined : level,
                                }))
                              }
                              className={cn(
                                "min-h-[40px] min-w-0 flex-1 rounded-full border px-1.5 py-1.5 text-center text-[10px] font-medium leading-tight transition sm:min-h-[42px] sm:px-2 sm:text-[11px]",
                                selected
                                  ? cn(
                                      tone.bg,
                                      tone.border,
                                      tone.text,
                                      "ring-1 ring-[#3d5a68]/25",
                                    )
                                  : "border-[#d5dae0] bg-[#fafbfc] text-[#4f6d7a] hover:bg-[#f3f5f7]",
                                modalFormDisabled && "opacity-50",
                              )}
                            >
                              {CROWD_LEVEL_LABEL[level]}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

                <div className="mt-3 rounded-lg border border-dashed border-[#d5dae0] bg-[#f5f7f8]/80 px-2.5 py-2">
                  <label
                    htmlFor="crowd-display-name-modal"
                    className="text-[10px] font-medium uppercase tracking-wide text-[#8a9d94]"
                  >
                    Nickname{" "}
                    <span className="font-normal normal-case text-[#6b7f88]">— optional</span>
                  </label>
                  <input
                    id="crowd-display-name-modal"
                    type="text"
                    maxLength={64}
                    autoComplete="nickname"
                    disabled={modalFormDisabled}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="River regular"
                    className="mt-1 w-full rounded-md border border-[#d2dcd3] bg-white px-2 py-1.5 text-[13px] text-[#2a3842] placeholder:text-[#9cb0a4] focus:border-[#5a8a9a] focus:outline-none focus:ring-1 focus:ring-[#5a8a9a]/35"
                  />
                </div>

                {submitMessage ? (
                  <div className="mt-2 space-y-1">
                    <p className="text-[11px] leading-relaxed text-[#8b5a42]" role="alert">
                      {submitMessage}
                    </p>
                    {submitDevHint ? (
                      <p className="text-[10px] leading-snug text-[#6b7f88]">
                        {submitDevHint}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-3.5 flex flex-col gap-1.5 sm:flex-row-reverse sm:justify-end sm:gap-2">
                  <button
                    type="submit"
                    disabled={modalFormDisabled}
                    className="min-h-[44px] w-full rounded-full border border-[#3d5a68] bg-[#3d5a68] px-3 py-2.5 text-sm font-medium text-[#f3f5f6] shadow-[0_6px_20px_-14px_rgba(22,38,48,0.5)] transition hover:bg-[#334e5c] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[9rem]"
                  >
                    {submitState === "submitting" ? "Sending…" : "Submit"}
                  </button>
                  <button
                    type="button"
                    disabled={submitState === "submitting"}
                    onClick={closeModal}
                    className="min-h-[44px] w-full rounded-full border border-[#cfd9d0] bg-white px-3 py-2.5 text-sm font-medium text-[#4f6d7a] transition hover:bg-[#f4f6f8] disabled:opacity-50 sm:w-auto sm:min-w-[6.5rem]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
