import { describe, expect, it } from "vitest";

import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows requests up to the limit and blocks the next one", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1_000 });
    expect(check("a", 0).allowed).toBe(true);
    expect(check("a", 10).allowed).toBe(true);
    const blocked = check("a", 20);
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) expect(blocked.retryAfterSeconds).toBe(1);
  });

  it("tracks clients independently", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1_000 });
    expect(check("a", 0).allowed).toBe(true);
    expect(check("b", 0).allowed).toBe(true);
    expect(check("a", 1).allowed).toBe(false);
  });

  it("resets after the window expires", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1_000 });
    expect(check("a", 0).allowed).toBe(true);
    expect(check("a", 500).allowed).toBe(false);
    expect(check("a", 1_001).allowed).toBe(true);
  });
});
