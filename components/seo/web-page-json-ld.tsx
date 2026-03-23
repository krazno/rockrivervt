import { webPageJsonLd } from "@/lib/seo";

type WebPageJsonLdProps = {
  name: string;
  description: string;
  path: string;
};

export function WebPageJsonLd({ name, description, path }: WebPageJsonLdProps) {
  const json = webPageJsonLd({ name, description, path });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
