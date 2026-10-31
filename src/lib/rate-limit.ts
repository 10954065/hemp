/**
 * Fixed-window, in-memory rate limiter.
 *
 * Limitation: state lives in the server instance's memory, so on serverless hosting
 * each instance keeps its own counts and they reset on cold starts. It reliably slows
 * repeated submissions from one client against a warm instance. For stronger guarantees,
 * add a platform firewall rule or a shared store such as Redis (see docs/DEPLOYMENT.md).
 */

export type RateLimitResult = { allowed: true; remaining: number } | { allowed: false; retryAfterSeconds: number };

type Window = { readonly count: number; readonly resetAt: number };

const MAX_TRACKED_KEYS = 5_000;

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const windows = new Map<string, Window>();

  function prune(now: number): void {
    for (const [key, window] of windows) {
      if (window.resetAt <= now) windows.delete(key);
    }
  }

  return function check(key: string, now: number = Date.now()): RateLimitResult {
    if (windows.size > MAX_TRACKED_KEYS) prune(now);

    const current = windows.get(key);
    const window: Window =
      current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + windowMs };
    windows.set(key, window);

    if (window.count > limit) {
      return { allowed: false, retryAfterSeconds: Math.ceil((window.resetAt - now) / 1000) };
    }
    return { allowed: true, remaining: limit - window.count };
  };
}
