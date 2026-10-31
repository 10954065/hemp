import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** Small uppercase label preceded by a fine gold rule. */
export function Eyebrow({ children, tone = "dark", className = "" }: Props) {
  const colour = tone === "dark" ? "text-gold-ink" : "text-gold";
  return (
    <p className={`flex items-center gap-3 text-eyebrow font-semibold uppercase ${colour} ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}
