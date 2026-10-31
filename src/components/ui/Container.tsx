import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
};

/** Site-wide content width with responsive gutters (16px minimum on phones). */
export function Container({ children, className = "", as: Tag = "div" }: Props) {
  return <Tag className={`mx-auto w-full max-w-site px-4 sm:px-8 lg:px-12 ${className}`}>{children}</Tag>;
}
