import Image from "next/image";
import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { images } from "@/content/images";
import { project } from "@/content/site";

import { HeroStage } from "./HeroStage";
import { LocalTime } from "./LocalTime";
import { ProjectTag } from "./ProjectTag";

const headlineLines = [
  { text: "Industrial hemp.", className: "text-ivory" },
  { text: "Built for Ghana.", className: "text-sage-soft" },
  { text: "Grown for the world.", className: "italic text-gold" },
];

const WORD_START = 0.2;
const WORD_STAGGER = 0.06;

const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

/** Splits the headline into words and gives each a cascading delay across all lines. */
function headlineWords() {
  let index = 0;
  return headlineLines.map((line) => ({
    ...line,
    words: line.text.split(" ").map((word) => ({ word, delay: WORD_START + WORD_STAGGER * index++ })),
  }));
}

/**
 * Homepage landing hero: an inset photographic frame with a bottom-anchored editorial
 * headline and the "traceability tag" signature.
 *
 * Motion layers (all CSS, resting state fully visible, disabled for reduced motion):
 * word-by-word masked headline, photo settle, one-time sunlight glow, scroll-linked depth
 * (photo sinks, copy lifts) and, on desktop pointers, gentle parallax between photo and tag.
 */
export function LandingHero() {
  const hero = images.heroField;
  const lines = headlineWords();

  return (
    <section aria-labelledby="home-title" className="overflow-x-clip bg-ivory p-3 sm:p-4 lg:p-5">
      <HeroStage className="on-dark relative isolate flex h-[min(calc(100svh-var(--header-height)-1.5rem),58rem)] min-h-[38rem] flex-col overflow-hidden rounded-[22px] bg-evergreen text-ivory sm:h-[min(calc(100svh-var(--header-height)-2rem),58rem)] lg:h-[min(calc(100svh-var(--header-height)-2.5rem),58rem)] lg:min-h-[40rem] lg:rounded-[30px]">
        <div className="parallax-back absolute -inset-[4%] -z-10">
          <div className="scroll-depth absolute inset-0">
            {/* Portrait frames cover-crop the landscape photo, so the rendered width tracks the frame height. */}
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              preload
              quality={60}
              sizes="(min-width: 1024px) 100vw, (orientation: portrait) 160vh, 100vw"
              className="hero-settle object-cover object-[60%_70%] sm:object-[50%_62%]"
            />
          </div>
        </div>
        <div aria-hidden="true" className="sun-glow absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-evergreen via-evergreen/85 via-45% to-evergreen/25 lg:via-evergreen/80 lg:via-35% lg:to-evergreen/0 lg:to-75%" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-evergreen/90 via-evergreen/50 via-45% to-transparent to-75% lg:block" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/3 bg-gradient-to-b from-evergreen/70 to-transparent" />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

        <div className="fade-in flex items-center justify-between gap-4 border-b border-ivory/15 px-6 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ivory/75 sm:px-8 lg:px-12" style={delay(0.05)}>
          <p>
            N° 01 <span className="text-gold">·</span> Phase 1 project
            <span className="hidden sm:inline">
              {" "}
              <span className="text-gold">·</span> {project.location.region}
            </span>
          </p>
          <p>
            Accra <span className="text-gold">·</span> <LocalTime />
          </p>
        </div>
        <p className="fade-in hidden px-12 pt-3 text-right text-[0.7rem] text-ivory/60 lg:block" style={delay(0.05)}>
          Illustrative image: industrial hemp field. Photo: {hero.credit.author}
        </p>

        <div className="mt-auto grid items-end gap-10 px-6 pb-8 sm:px-8 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_21.5rem] lg:gap-16 lg:px-12 lg:pb-12">
          <div className="max-w-[46rem]">
            {/* Only the headline lifts away on scroll; the sub and CTAs stay fully opaque while visible. */}
            <div className="scroll-lift">
              <p className="fade-up flex items-center gap-3 text-eyebrow font-semibold uppercase text-gold" style={delay(0.1)}>
                <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
                Ghanaian industrial hemp enterprise
              </p>
              <h1 id="home-title" className="mt-6 font-display text-[clamp(2.55rem,1.1rem+5.6vw,6.4rem)] leading-[0.94] tracking-[-0.035em]">
                {lines.map((line) => (
                  <span key={line.text} className={`block sm:whitespace-nowrap ${line.className}`}>
                    {line.words.map(({ word, delay: wordDelay }, index) => (
                      <span key={word}>
                        {index > 0 && " "}
                        <span className="-mb-[0.12em] -mr-[0.08em] inline-block overflow-hidden pb-[0.12em] pr-[0.08em] align-top">
                          <span className="rise-word inline-block" style={delay(wordDelay)}>
                            {word}
                          </span>
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
            </div>
            <p className="fade-up mt-7 max-w-[34rem] text-[1rem] leading-relaxed text-ivory/85 sm:text-[1.1rem]" style={delay(0.8)}>
              A Ghanaian agricultural enterprise developing low-THC hemp cultivation in the Ashanti Region under the
              country&apos;s licensing framework, documented from seed to delivery for industrial and pharmaceutical
              buyers.
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3 sm:gap-4" style={delay(0.9)}>
              <ButtonLink href="/opportunity" variant="light" withArrow>
                Explore the opportunity
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-light">
                Contact our team
              </ButtonLink>
            </div>
          </div>
          <div className="parallax-front hidden lg:block">
            <ProjectTag />
          </div>
        </div>
      </HeroStage>

      <ProjectTag variant="inline" className="mx-auto mt-14 max-w-md lg:hidden" />
    </section>
  );
}
