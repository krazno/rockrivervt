const STORAGE_KEY = "rockrivervt_crowd_device_id";

export function getOrCreateCrowdDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id || id.length < 8) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `rr-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `rr-fallback-${Date.now()}`;
  }
}

const SUBMIT_DATE_KEY = "rockrivervt_crowd_submitted_date";

export function getCrowdSubmittedReportDate(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(SUBMIT_DATE_KEY);
  } catch {
    return null;
  }
}

export function setCrowdSubmittedReportDate(reportDate: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SUBMIT_DATE_KEY, reportDate);
  } catch {
    /* ignore */
  }
}
