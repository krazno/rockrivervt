import {
  breadcrumbListJsonLd,
  defaultBreadcrumbItems,
} from "@/lib/seo";

type BreadcrumbJsonLdProps = {
  path: string;
};

/**
 * Renders BreadcrumbList JSON-LD for the current path (Home → … → leaf).
 */
export function BreadcrumbJsonLd({ path }: BreadcrumbJsonLdProps) {
  const json = breadcrumbListJsonLd(defaultBreadcrumbItems(path));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
