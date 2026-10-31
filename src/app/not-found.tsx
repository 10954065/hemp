import type { Metadata } from "next";
import Link from "next/link";

import { LogoMark } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const suggestions = [
  { label: "About the company", href: "/about" },
  { label: "Cultivation and operations", href: "/cultivation" },
  { label: "Investment and partnerships", href: "/opportunity" },
  { label: "Regulation in Ghana", href: "/regulation" },
  { label: "Insights", href: "/insights" },
];

export default function NotFound() {
  return (
    <section className="bg-ivory py-24 lg:py-32" aria-labelledby="not-found-title">
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="font-display text-[clamp(4.5rem,3rem+6vw,8rem)] leading-none text-moss/40" aria-hidden="true">
            404
          </p>
          <h1 id="not-found-title" className="mt-6 text-h1 text-forest">
            This page could not be found
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            The address may be mistyped, or the page may have moved. These links may help you find what you were looking
            for.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/" withArrow>
              Return home
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Suggested pages" className="rounded-md border border-line bg-white p-8 lg:col-span-4 lg:col-start-9">
          <LogoMark className="size-12" />
          <ul className="mt-6 space-y-3">
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline font-medium text-moss">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
