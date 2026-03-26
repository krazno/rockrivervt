import type { ReactNode } from "react";

function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = /^\*\*([^*]+)\*\*$/.exec(part);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-[#1F2A24]">
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** Renders knowledge-base markdown bodies: paragraphs split on blank lines; `- ` blocks as lists. */
export function KnowledgeSectionProse({ content }: { content: string }) {
  const trimmed = content.trim();
  if (!trimmed) return null;

  const blocks = trimmed.split(/\n\n+/);

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trimEnd());
        const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
        if (
          nonEmpty.length > 0 &&
          nonEmpty.every((l) => l.startsWith("- "))
        ) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {nonEmpty.map((l, j) => (
                <li key={j}>
                  <Inline text={l.slice(2).trim()} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className={i > 0 ? "mt-3" : undefined}>
            <Inline text={block.trim()} />
          </p>
        );
      })}
    </>
  );
}
