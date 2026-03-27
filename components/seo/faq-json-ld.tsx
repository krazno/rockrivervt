import type { FaqItem } from "@/content/visitor-faq";

type FaqJsonLdProps = {
  items: FaqItem[];
};

/**
 * FAQPage structured data — pair with visible FAQ markup on the same URL.
 */
export function FaqJsonLd({ items }: FaqJsonLdProps) {
  if (!items.length) return null;

  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
