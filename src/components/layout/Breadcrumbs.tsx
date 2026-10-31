import Link from "next/link";

import { absoluteUrl } from "@/lib/site-url";

import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

type Props = {
  items: Crumb[];
  tone?: "dark" | "light";
};

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. The last item is the current page. */
export function Breadcrumbs({ items, tone = "dark" }: Props) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const colour = tone === "dark" ? "text-muted" : "text-sage-soft";
  const current = tone === "dark" ? "text-forest" : "text-ivory";

  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-[0.85rem] ${colour}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className={`font-medium ${current}`}>
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.href} className="link-underline hover:opacity-80">
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: absoluteUrl(crumb.href),
          })),
        }}
      />
    </>
  );
}
