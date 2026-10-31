import Link from "next/link";

type Props = {
  tone?: "dark" | "light";
  className?: string;
};

/** Leaf-over-field emblem, redrawn from the company's existing logo as a crisp vector. */
export function LogoMark({ className = "size-10", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const stroke = tone === "dark" ? "var(--color-forest)" : "var(--color-ivory)";
  const accent = tone === "dark" ? "var(--color-moss)" : "var(--color-sage)";
  const leaflet = (angle: number, tipY: number, width: number) => (
    <path
      key={angle}
      transform={`rotate(${angle} 24 27)`}
      d={`M24 27 C ${24 - width} ${(27 + tipY) / 1.9}, ${24 - width * 0.7} ${tipY + 4}, 24 ${tipY} C ${24 + width * 0.7} ${tipY + 4}, ${24 + width} ${(27 + tipY) / 1.9}, 24 27 Z`}
      fill={accent}
    />
  );

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22.25" fill="none" stroke={stroke} strokeWidth="1.5" />
      <g>
        {leaflet(-68, 16, 2.1)}
        {leaflet(68, 16, 2.1)}
        {leaflet(-34, 10, 2.6)}
        {leaflet(34, 10, 2.6)}
        {leaflet(0, 6, 3)}
      </g>
      <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round">
        <path d="M7.5 33.5 Q24 26.5 40.5 33.5" />
        <path d="M10 38.5 Q24 32.5 38 38.5" />
        <path d="M14.5 42.6 Q24 38.4 33.5 42.6" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: Props) {
  const wordColour = tone === "dark" ? "text-forest" : "text-ivory";
  const subColour = tone === "dark" ? "text-gold-ink" : "text-gold";

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`} aria-label="HempWealth Ghana, home">
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] tracking-[-0.01em] ${wordColour}`}>HempWealth</span>
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.32em] ${subColour}`}>Ghana</span>
      </span>
    </Link>
  );
}
