import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "light" | "outline-light";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-6 py-3 text-[0.95rem] font-semibold tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-offset-4";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-ivory hover:bg-evergreen shadow-soft",
  secondary: "border border-forest/30 text-forest hover:border-forest hover:bg-forest/5",
  light: "bg-ivory text-evergreen hover:bg-white",
  "outline-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  withArrow?: boolean;
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({ href, children, variant = "primary", className = "", withArrow = false }: Props) {
  return (
    <Link href={href} className={`${base} ${buttonVariants[variant]} ${className}`}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold text-moss underline decoration-moss/30 decoration-1 underline-offset-[0.3em] transition-colors hover:text-forest hover:decoration-forest ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
