import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ImageKey } from "@/content/images";

import { Figure } from "./Figure";

type Props = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  image: ImageKey;
  caption?: string;
  illustrative?: boolean;
  reverse?: boolean;
  aspect?: string;
  tone?: "ivory" | "white" | "parchment";
};

const backgrounds = { ivory: "bg-ivory", white: "bg-white", parchment: "bg-parchment" };

/** Editorial image-and-text composition with an asymmetric grid. */
export function ImageText({
  id,
  eyebrow,
  title,
  children,
  image,
  caption,
  illustrative,
  reverse = false,
  aspect = "aspect-[4/5]",
  tone = "ivory",
}: Props) {
  return (
    <section aria-labelledby={id} className={`${backgrounds[tone]} py-20 lg:py-28`}>
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Figure
          image={image}
          caption={caption}
          illustrative={illustrative}
          aspect={aspect}
          sizes="(min-width: 1024px) 42vw, 100vw"
          className={`reveal lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : ""}`}
        />
        <div className={`lg:col-span-6 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
          {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
          <h2 id={id} className="text-h2 text-forest">
            {title}
          </h2>
          <div className="mt-7 space-y-5 text-[1.05rem] text-ink/90">{children}</div>
        </div>
      </Container>
    </section>
  );
}
