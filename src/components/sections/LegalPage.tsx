import type { ReactNode } from "react";

import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  path: string;
  label: string;
  updated: string;
  children: ReactNode;
};

/** Shared shell for long-form legal and reference pages. */
export function LegalPage({ eyebrow, title, intro, path, label, updated, children }: Props) {
  return (
    <>
      <PageHero
        variant="plain"
        eyebrow={eyebrow}
        title={title}
        intro={
          <>
            <p>{intro}</p>
            <p className="mt-4 text-[0.95rem]">
              <span className="font-semibold text-ink">Last updated:</span> <time dateTime={updated}>{formatDate(updated)}</time>
            </p>
          </>
        }
        breadcrumbs={[{ label, href: path }]}
      />
      <div className="bg-white py-16 lg:py-24">
        <Container>
          <div className="prose-hw">{children}</div>
        </Container>
      </div>
    </>
  );
}
