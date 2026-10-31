import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ImageKey } from "@/content/images";
import { images } from "@/content/images";

type Props = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  actions: ReactNode;
  image?: ImageKey;
};

/** Dark closing call to action, optionally over a muted photographic texture. */
export function CtaBand({ id, eyebrow, title, children, actions, image }: Props) {
  return (
    <section aria-labelledby={id} className="on-dark relative isolate overflow-hidden bg-forest text-ivory">
      {image && (
        <Image
          src={images[image].src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-20 mix-blend-luminosity"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-forest via-forest/95 to-evergreen/90" />
      <Container className="grid gap-10 py-20 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-end lg:py-28">
        <div className="max-w-2xl">
          {eyebrow && (
            <Eyebrow tone="light" className="mb-5">
              {eyebrow}
            </Eyebrow>
          )}
          <h2 id={id} className="text-h2">
            {title}
          </h2>
          {children && <div className="mt-6 text-lead text-sage-soft">{children}</div>}
        </div>
        <div className="flex flex-wrap gap-4">{actions}</div>
      </Container>
    </section>
  );
}
