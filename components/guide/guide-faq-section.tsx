import type { FaqItem } from "@/content/visitor-faq";
import { cn } from "@/lib/utils";

type GuideFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  items: FaqItem[];
  className?: string;
};

/**
 * Compact FAQ list — semantic dl/dt/dd for accessibility; mirrors FAQPage JSON-LD text.
 */
export function GuideFaqSection({
  id = "visitor-faq",
  eyebrow = "Common questions",
  title,
  items,
  className,
}: GuideFaqSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 rounded-2xl border border-[#E2E0D8] bg-[#fafaf8] p-6 sm:p-8",
        className,
      )}
      aria-labelledby={`${id}-heading`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6F68]">
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="font-heading mt-2 text-xl font-bold tracking-tight text-[#1F2A24] sm:text-2xl"
      >
        {title}
      </h2>
      <dl className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="text-sm font-semibold text-[#1F2A24]">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#3f4840]">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
