import Image from "next/image";

import { cn } from "@/lib/utils";

export type MediaImageProps = {
  src: string;
  alt: string;
  title: string;
  className?: string;
  /** Default gallery grid sizing hint */
  sizes?: string;
  priority?: boolean;
  /** Next/Image quality 1–100; higher = sharper for large displays */
  quality?: number;
} & (
  | {
      fill: true;
      sizes: string;
      width?: never;
      height?: never;
    }
  | {
      fill?: false;
      width: number;
      height: number;
    }
);

/**
 * SEO-oriented wrapper around next/image: alt, title, lazy loading, dimensions when known.
 */
export function MediaImage(props: MediaImageProps) {
  const {
    src,
    alt,
    title,
    className,
    sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    priority = false,
    quality = 82,
  } = props;

  if (props.fill) {
    return (
      <Image
        src={src}
        alt={alt}
        title={title}
        fill
        sizes={props.sizes}
        priority={priority}
        quality={quality}
        loading={priority ? undefined : "lazy"}
        className={cn(className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      width={props.width}
      height={props.height}
      priority={priority}
      quality={quality}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      className={cn(className)}
    />
  );
}
