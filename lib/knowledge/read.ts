import "server-only";

import fs from "node:fs";
import path from "node:path";

import { parseKnowledgeMarkdown } from "@/lib/knowledge/parse";

export const KNOWLEDGE_SLUGS = [
  "geology",
  "river",
  "preservation",
  "history",
  "wildlife",
  "seasons",
  "local",
  "culture",
] as const;

export type KnowledgeSlug = (typeof KNOWLEDGE_SLUGS)[number];

/** Canonical section headings in `data/knowledge/*.md` (optional `preamble` if file has leading text). */
export type KnowledgeSectionKey =
  | "preamble"
  | "overview"
  | "notes"
  | "visitor_context"
  | "cautions"
  | "sources";

const cacheRaw = new Map<KnowledgeSlug, string>();
const cacheParsed = new Map<KnowledgeSlug, Record<string, string>>();

function knowledgeDir(): string {
  return path.join(process.cwd(), "data", "knowledge");
}

function filePath(slug: KnowledgeSlug): string {
  return path.join(knowledgeDir(), `${slug}.md`);
}

export function getKnowledgeRaw(slug: KnowledgeSlug): string {
  const hit = cacheRaw.get(slug);
  if (hit !== undefined) return hit;
  const raw = fs.readFileSync(filePath(slug), "utf8");
  cacheRaw.set(slug, raw);
  return raw;
}

/** All sections for a slug; keys are normalized heading names. */
export function getKnowledgeSections(slug: KnowledgeSlug): Record<string, string> {
  const hit = cacheParsed.get(slug);
  if (hit !== undefined) return hit;
  const parsed = parseKnowledgeMarkdown(getKnowledgeRaw(slug));
  cacheParsed.set(slug, parsed);
  return parsed;
}

export function getKnowledgeSection(
  slug: KnowledgeSlug,
  section: KnowledgeSectionKey,
): string | undefined {
  const sections = getKnowledgeSections(slug);
  return sections[section];
}

export function assertKnowledgeSlug(s: string): KnowledgeSlug {
  if ((KNOWLEDGE_SLUGS as readonly string[]).includes(s)) {
    return s as KnowledgeSlug;
  }
  throw new Error(`Unknown knowledge slug: ${s}`);
}
