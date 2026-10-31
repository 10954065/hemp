import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ImageKey } from "@/content/images";
import { images } from "@/content/images";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  breadcrumbs: Crumb[];
  image?: ImageKey;
  /** "photo" = full-bleed image with dark overlay; "split" = ivory with an inset image; "plain" = typography only. */
  variant?: "photo" | "split" | "plain";
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, intro, breadcrumbs, image, variant = "split", children }: Props) {
  if (variant === "photo" && image) {
    const data = images[image];
    return (
      <section className="on-dark relative isolate overflow-hidden bg-evergreen text-ivory" aria-labelledby="page-title">
        <Image src={data.src} alt="" fill preload quality={60} sizes="100vw" className="-z-10 object-cover opacity-55" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-evergreen via-evergreen/85 to-evergreen/30"
        />
        <Container className="pb-20 pt-10 sm:pb-24 lg:pb-32 lg:pt-14">
          <Breadcrumbs items={breadcrumbs} tone="light" />
          <div className="mt-14 max-w-3xl lg:mt-20">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1 id="page-title" className="mt-6 text-h1">
              {title}
            </h1>
            <div className="mt-7 max-w-2xl text-lead text-sage-soft">{intro}</div>
            {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-line bg-ivory" aria-labelledby="page-title">
      <Container className="pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Breadcrumbs items={breadcrumbs} />
        <div
          className={`mt-12 grid gap-12 lg:mt-16 ${
            variant === "split" && image ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16" : ""
          }`}
        >
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="page-title" className="mt-6 text-h1 text-forest">
              {title}
            </h1>
            <div className="mt-7 max-w-2xl text-lead text-muted">{intro}</div>
            {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
          </div>
          {variant === "split" && image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-parchment lg:aspect-[4/5]">
              <Image
                src={images[image].src}
                alt={images[image].alt}
                fill
                preload
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
