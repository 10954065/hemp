import Image from "next/image";

import type { ImageKey } from "@/content/images";
import { images } from "@/content/images";

type Props = {
  image: ImageKey;
  sizes: string;
  caption?: string;
  /** Marks photographs that could be mistaken for the company's own site or facilities. */
  illustrative?: boolean;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
  aspect?: string;
};

/** Semantic figure with optional caption; full attribution lives on /credits. */
export function Figure({
  image,
  sizes,
  caption,
  illustrative = false,
  preload = false,
  className = "",
  imageClassName = "",
  aspect = "aspect-[4/3]",
}: Props) {
  const data = images[image];
  const captionText = [caption, illustrative ? "Illustrative image, not a HempWealth Ghana site." : null]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-md bg-parchment ${aspect}`}>
        <Image
          src={data.src}
          alt={data.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={`object-cover ${imageClassName}`}
        />
      </div>
      {captionText && (
        <figcaption className="mt-3 text-[0.8rem] leading-snug text-muted">
          {captionText} Photo: {data.credit.author}.
        </figcaption>
      )}
    </figure>
  );
}
