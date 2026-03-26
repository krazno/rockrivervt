/**
 * Local knowledge base (`data/knowledge/*.md`) for reviewed factual and contextual copy.
 *
 * Server-only — use from Server Components, Route Handlers, or `generateMetadata`.
 * For the markdown parser alone (e.g. tests), import `@/lib/knowledge/parse`.
 */

export {
  KNOWLEDGE_SLUGS,
  assertKnowledgeSlug,
  getKnowledgeRaw,
  getKnowledgeSection,
  getKnowledgeSections,
  type KnowledgeSectionKey,
  type KnowledgeSlug,
} from "@/lib/knowledge/read";
