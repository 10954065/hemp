import { afterEach, describe, expect, it, vi } from "vitest";

import { getApplication } from "@/content/applications";
import { getArticle, getRelatedArticles } from "@/content/articles";
import { formatDate } from "@/lib/format";
import { logEvent } from "@/lib/logger";
import { pageMetadata } from "@/lib/metadata";
import { createRateLimiter } from "@/lib/rate-limit";
import { absoluteUrl } from "@/lib/site-url";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("formatDate", () => {
  it("formats ISO dates in British long form, independent of time zone", () => {
    expect(formatDate("2026-10-31")).toBe("31 October 2026");
    expect(formatDate("2026-01-01")).toBe("1 January 2026");
  });
});

describe("pageMetadata", () => {
  it("builds unique Open Graph and Twitter metadata for a page", () => {
    const metadata = pageMetadata({ title: "Contact", description: "Get in touch.", path: "/contact" });
    expect(metadata.title).toBe("Contact");
    expect(metadata.openGraph).toMatchObject({ title: "Contact", url: "/contact", type: "website" });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("omits canonical links until a production domain is configured", () => {
    const metadata = pageMetadata({ title: "A", description: "B", path: "/a" });
    expect(metadata.alternates).toBeUndefined();
  });

  it("passes article publication dates through", () => {
    const metadata = pageMetadata({ title: "A", description: "B", path: "/a", type: "article", publishedTime: "2026-10-31" });
    expect(metadata.openGraph).toMatchObject({ type: "article", publishedTime: "2026-10-31" });
  });
});

describe("absoluteUrl", () => {
  it("resolves paths against the site origin", () => {
    expect(absoluteUrl("/insights")).toMatch(/^https?:\/\/[^/]+\/insights$/);
  });
});

describe("logEvent", () => {
  it("logs failures as warnings and other events as info", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    logEvent("enquiry.delivery_failed", { reason: "x" });
    logEvent("enquiry.delivered");
    expect(JSON.parse(String(warn.mock.calls[0][0]))).toMatchObject({ level: "warn", event: "enquiry.delivery_failed" });
    expect(JSON.parse(String(info.mock.calls[0][0]))).toMatchObject({ level: "info", event: "enquiry.delivered" });
  });
});

describe("content lookups", () => {
  it("finds articles and applications by slug, and returns undefined for unknown slugs", () => {
    expect(getArticle("industrial-hemp-and-the-thc-threshold")?.category).toBe("Industry");
    expect(getArticle("missing")).toBeUndefined();
    expect(getApplication("textiles")?.shortTitle).toBe("Textiles");
    expect(getApplication("missing")).toBeUndefined();
  });

  it("returns related articles excluding the current one", () => {
    const related = getRelatedArticles("how-the-hemp-plant-is-used");
    expect(related.map((article) => article.slug)).not.toContain("how-the-hemp-plant-is-used");
    expect(related.length).toBeLessThanOrEqual(2);
  });
});

describe("rate limiter pruning", () => {
  it("keeps working after tracking many clients", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 10 });
    for (let index = 0; index < 5_002; index += 1) check(`client-${index}`, 0);
    expect(check("new-client", 100).allowed).toBe(true);
  });
});
