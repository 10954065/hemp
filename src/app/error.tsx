"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/ui/Container";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Route-level error state. Shows no internal details; the digest lets support correlate server logs. */
export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error("Route error", error.digest ?? "no-digest");
  }, [error]);

  return (
    <section className="bg-ivory py-24 lg:py-32" aria-labelledby="error-title">
      <Container className="max-w-3xl">
        <p className="text-eyebrow font-semibold uppercase text-gold-ink">Something went wrong</p>
        <h1 id="error-title" className="mt-5 text-h1 text-forest">
          We could not load this page
        </h1>
        <p className="mt-6 text-lead text-muted">
          This is usually temporary. Please try again. If the problem continues, email{" "}
          <a href="mailto:hempwealthgh@gmail.com" className="text-moss underline underline-offset-4">
            hempwealthgh@gmail.com
          </a>
          {error.digest ? ` and quote reference ${error.digest}` : ""}.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center rounded-sm bg-forest px-6 font-semibold text-ivory hover:bg-evergreen"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-sm border border-forest/30 px-6 font-semibold text-forest hover:border-forest">
            Return home
          </Link>
        </div>
      </Container>
    </section>
  );
}
