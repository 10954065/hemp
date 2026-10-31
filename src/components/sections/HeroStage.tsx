"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const LERP = 0.08;
const SETTLED = 0.0005;

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Hero frame that exposes the pointer position as CSS variables (--px, --py in -1..1),
 * eased with a lerp, so child layers can parallax with plain CSS transforms. Only active
 * for fine pointers that can hover and when reduced motion is not requested.
 */
export function HeroStage({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const canParallax = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!element || !canParallax.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const step = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      element.style.setProperty("--px", current.x.toFixed(4));
      element.style.setProperty("--py", current.y.toFixed(4));
      const settled = Math.abs(target.x - current.x) < SETTLED && Math.abs(target.y - current.y) < SETTLED;
      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const wake = () => {
      if (frame === 0) frame = requestAnimationFrame(step);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      wake();
    };

    const handleLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);
    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
