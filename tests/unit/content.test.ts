import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { applications } from "@/content/applications";
import { articles, readingMinutes } from "@/content/articles";
import { images } from "@/content/images";
import { getSources, instruments, timeline } from "@/content/regulation";
import { footerNav, legalNav, mainNav } from "@/content/site";

const ROOT = join(__dirname, "..", "..");

function routeExists(href: string): boolean {
  const path = href.split(/[?#]/)[0];
  const file = path === "/" ? "src/app/page.tsx" : `src/app${path}/page.tsx`;
  return existsSync(join(ROOT, file));
}

describe("content integrity", () => {
  it("every registered image exists on disk and has alt text and a credit", () => {
    for (const image of Object.values(images)) {
      expect(existsSync(join(ROOT, "public", image.src)), image.src).toBe(true);
      expect(image.alt.length).toBeGreaterThan(10);
      expect(image.credit.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
    }
  });

  it("every navigation link points to an implemented route", () => {
    const links = [...mainNav, ...footerNav.flatMap((group) => group.items), ...legalNav];
    for (const link of links) expect(routeExists(link.href), link.href).toBe(true);
  });

  it("articles have unique slugs, sources and valid ISO dates", () => {
    const slugs = new Set(articles.map((article) => article.slug));
    expect(slugs.size).toBe(articles.length);
    for (const article of articles) {
      expect(article.sources.length).toBeGreaterThan(0);
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(readingMinutes(article)).toBeGreaterThan(0);
    }
  });

  it("every regulatory statement references a known source", () => {
    for (const entry of [...instruments, ...timeline]) {
      expect(getSources(entry.sourceIds)).toHaveLength(entry.sourceIds.length);
    }
  });

  it("only one application is marked as the company's stated focus", () => {
    expect(applications.filter((application) => application.relevance === "stated-focus")).toHaveLength(1);
  });
});
