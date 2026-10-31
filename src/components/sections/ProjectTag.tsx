import Link from "next/link";

import { company, project } from "@/content/site";

type Props = {
  /** "overlay" floats over the hero photo; "inline" sits on the ivory page below it. */
  variant?: "overlay" | "inline";
  className?: string;
};

// Rows tick in one by one after the tag has settled and the trace line has run.
const ROW_START = 1.55;
const ROW_STAGGER = 0.07;

const rows = [
  { label: "Area", value: `${project.acreage.value} ${project.acreage.unit}` },
  { label: "Crop standard", value: "≤ 0.3% THC, dry weight" },
  { label: "Framework", value: "Act 1100 · L.I. 2475" },
  { label: "Incorporated", value: `${company.incorporation.year}, Ghana` },
  { label: "Traceability", value: "Seed to delivery" },
];

/**
 * The hero's signature: a field tag carrying the Phase 1 project record. It echoes the
 * batch tags that make agricultural produce traceable, the company's core promise.
 */
export function ProjectTag({ variant = "overlay", className = "" }: Props) {
  const isOverlay = variant === "overlay";
  // The eyelet shows whatever is behind the tag: the dark photo, or the ivory page.
  const holeColour = isOverlay ? "bg-evergreen" : "bg-ivory";

  return (
    // The overlay tag "hangs" into place on load; the inline tag sits below the fold, so it
    // uses the scroll-driven reveal instead of an entrance nobody would see.
    // drop-shadow (not box-shadow) so the shadow follows the chamfered clip-path outline.
    <div
      className={`${isOverlay ? "tag-hang" : "reveal"} group relative [filter:drop-shadow(0_18px_32px_rgb(16_43_33/0.28))_drop-shadow(0_2px_4px_rgb(16_43_33/0.08))] ${className}`}
    >
      {isOverlay && (
        <span aria-hidden="true" className="absolute -top-20 left-1/2 z-10 flex h-[5.8rem] -translate-x-1/2 flex-col items-center">
          <span className="w-px flex-1 bg-gradient-to-b from-ivory/0 via-ivory/55 to-ivory/80" />
          <span className="-mt-px size-1.5 rounded-full bg-ivory/80" />
        </span>
      )}
      <article
        aria-labelledby={`project-tag-title-${variant}`}
        className={`tag-shape relative px-6 pb-6 pt-10 text-ink transition-transform duration-300 ease-out group-hover:-translate-y-[3px] ${
          isOverlay ? "bg-ivory/95 backdrop-blur-md" : "bg-white"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute left-1/2 top-3.5 size-3.5 -translate-x-1/2 rounded-full ring-2 ring-gold ${holeColour}`}
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-ink">HWG · Phase 1</p>
          <span className="rounded-full border border-forest/25 px-2.5 py-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-moss">
            Planned
          </span>
        </div>
        <div aria-hidden="true" className="relative mt-4 border-t border-dashed border-forest/25">
          {isOverlay && <span className="tag-trace absolute inset-x-0 -top-px h-0.5 bg-gold" />}
        </div>
        <h2 id={`project-tag-title-${variant}`} className="mt-4 font-display text-[1.45rem] leading-tight text-forest">
          {project.location.town}, {project.location.region}
        </h2>
        <dl className="mt-4 divide-y divide-forest/10 border-y border-forest/10 text-[0.84rem]">
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={`flex items-baseline justify-between gap-4 py-2 ${isOverlay ? "tag-row" : ""}`}
              style={isOverlay ? { animationDelay: `${ROW_START + ROW_STAGGER * index}s` } : undefined}
            >
              <dt className="text-muted">{row.label}</dt>
              <dd className="text-right font-medium tabular-nums text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[0.72rem] leading-snug text-muted">
          Development-stage plan. Licensing status is shared in due diligence.
        </p>
        <Link
          href="/cultivation"
          className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-moss hover:text-forest"
        >
          View the project
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </article>
    </div>
  );
}
