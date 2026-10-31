import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "neutral" | "gold" | "light";
};

const tones = {
  neutral: "border-forest/20 text-moss bg-white/60",
  gold: "border-gold/50 text-gold-ink bg-gold/10",
  light: "border-ivory/25 text-sage-soft bg-ivory/5",
};

/** Text label for status (e.g. "Planned", "Under evaluation"). Meaning is carried by the words, never colour alone. */
export function Tag({ children, tone = "neutral" }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
