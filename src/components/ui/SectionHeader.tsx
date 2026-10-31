import type { ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  align?: "left" | "split";
  className?: string;
};

/**
 * Section heading. "split" places the intro beside the title on large screens,
 * which gives long editorial sections a less uniform rhythm.
 */
export function SectionHeader({ eyebrow, title, intro, id, tone = "dark", align = "left", className = "" }: Props) {
  const titleColour = tone === "dark" ? "text-forest" : "text-ivory";
  const introColour = tone === "dark" ? "text-muted" : "text-sage-soft";
  const layout =
    align === "split" ? "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16" : "max-w-3xl";

  return (
    <div className={`${layout} ${className}`}>
      <div>
        {eyebrow && (
          <Eyebrow tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 id={id} className={`text-h2 ${titleColour}`}>
          {title}
        </h2>
      </div>
      {intro && (
        <div className={`text-lead ${introColour} ${align === "left" ? "mt-6" : ""}`}>
          {typeof intro === "string" ? <p>{intro}</p> : intro}
        </div>
      )}
    </div>
  );
}
