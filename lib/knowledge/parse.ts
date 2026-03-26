/**
 * Split knowledge-base markdown on `## heading` lines.
 * Headings are normalized to lowercase snake_case keys (e.g. "visitor context" → visitor_context).
 * Any content before the first `##` is stored under `preamble` when non-empty.
 */
export function normalizeKnowledgeHeading(heading: string): string {
  return heading.trim().toLowerCase().replace(/\s+/g, "_");
}

export function parseKnowledgeMarkdown(raw: string): Record<string, string> {
  const text = raw.replace(/\r\n/g, "\n");
  const parts = text.split(/^##\s+/m);
  const out: Record<string, string> = {};

  const first = parts[0]?.trim() ?? "";
  if (first.length > 0) {
    out.preamble = first;
  }

  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i] ?? "";
    const nl = chunk.indexOf("\n");
    const headingRaw = nl === -1 ? chunk : chunk.slice(0, nl);
    const body = (nl === -1 ? "" : chunk.slice(nl + 1)).trim();
    const key = normalizeKnowledgeHeading(headingRaw);
    if (key.length > 0) {
      out[key] = body;
    }
  }

  return out;
}
