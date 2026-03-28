/**
 * Deterministic shuffle for a browser session so photo order varies without
 * reshuffling on every render.
 */
export function sessionSeededShuffle<T>(items: readonly T[], storageKey: string): T[] {
  if (items.length <= 1) return [...items];
  if (typeof window === "undefined") return [...items];

  let seedStr = sessionStorage.getItem(storageKey);
  if (!seedStr) {
    seedStr = `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem(storageKey, seedStr);
  }

  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash * 31 + seedStr.charCodeAt(i)) | 0;
  }

  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    const j = hash % (i + 1);
    const t = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = t;
  }
  return arr;
}
