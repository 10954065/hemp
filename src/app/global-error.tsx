"use client";

import "./globals.css";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Last-resort error state used when the root layout itself fails. Must render its own <html> and <body>. */
export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh items-center bg-ivory">
        <main className="mx-auto max-w-2xl px-4 py-24">
          <p className="text-eyebrow font-semibold uppercase text-gold-ink">HempWealth Ghana</p>
          <h1 className="mt-5 text-h1 text-forest">The website is temporarily unavailable</h1>
          <p className="mt-6 text-lead text-muted">
            Please try again in a moment. You can also reach us at{" "}
            <a href="mailto:hempwealthgh@gmail.com" className="text-moss underline underline-offset-4">
              hempwealthgh@gmail.com
            </a>
            {error.digest ? ` (reference ${error.digest})` : ""}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-10 inline-flex min-h-12 items-center rounded-sm bg-forest px-6 font-semibold text-ivory hover:bg-evergreen"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
