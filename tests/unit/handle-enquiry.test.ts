import { describe, expect, it, vi } from "vitest";

import type { EnquiryDeps } from "@/lib/handle-enquiry";
import { MIN_FILL_TIME_MS, processEnquiry } from "@/lib/handle-enquiry";

const NOW = 1_000_000;

const validBody = {
  category: "general",
  fullName: "Kofi Boateng",
  email: "kofi@example.com",
  country: "Ghana",
  message: "Please send more information about your cultivation project.",
  consent: true,
  website: "",
  startedAt: NOW - 10_000,
};

function deps(overrides: Partial<EnquiryDeps> = {}): EnquiryDeps {
  return {
    rateLimit: () => ({ allowed: true, remaining: 4 }),
    deliver: vi.fn(async () => ({ ok: true as const, id: "email-id" })),
    createReference: () => "HWG-TEST-0001",
    now: () => NOW,
    log: vi.fn(),
    ...overrides,
  };
}

function input(body: unknown, originAllowed = true) {
  return { clientKey: "203.0.113.1", rawBody: JSON.stringify(body), originAllowed };
}

describe("processEnquiry", () => {
  it("delivers a valid enquiry and returns a reference only after delivery succeeds", async () => {
    const d = deps();
    const outcome = await processEnquiry(input(validBody), d);
    expect(outcome.status).toBe(200);
    expect(outcome.body).toEqual({ ok: true, reference: "HWG-TEST-0001" });
    expect(d.deliver).toHaveBeenCalledOnce();
  });

  it("never reports success when the email service is not configured", async () => {
    const outcome = await processEnquiry(
      input(validBody),
      deps({ deliver: async () => ({ ok: false, reason: "not-configured" }) }),
    );
    expect(outcome.status).toBe(503);
    expect(outcome.body.ok).toBe(false);
  });

  it("returns 502 when the email provider fails", async () => {
    const outcome = await processEnquiry(
      input(validBody),
      deps({ deliver: async () => ({ ok: false, reason: "provider-error" }) }),
    );
    expect(outcome.status).toBe(502);
    expect(outcome.body.ok).toBe(false);
  });

  it("rejects cross-origin requests", async () => {
    const d = deps();
    const outcome = await processEnquiry(input(validBody, false), d);
    expect(outcome.status).toBe(403);
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions with a Retry-After header", async () => {
    const outcome = await processEnquiry(
      input(validBody),
      deps({ rateLimit: () => ({ allowed: false, retryAfterSeconds: 120 }) }),
    );
    expect(outcome.status).toBe(429);
    expect(outcome.headers?.["Retry-After"]).toBe("120");
  });

  it("returns field errors for an empty submission", async () => {
    const outcome = await processEnquiry(input({ category: "investor" }), deps());
    expect(outcome.status).toBe(422);
    if (!outcome.body.ok) {
      expect(outcome.body.fieldErrors?.fullName).toBeDefined();
      expect(outcome.body.fieldErrors?.email).toBeDefined();
      expect(outcome.body.fieldErrors?.organisation).toBeDefined();
    }
  });

  it("rejects malformed JSON", async () => {
    const outcome = await processEnquiry({ clientKey: "x", rawBody: "{not json", originAllowed: true }, deps());
    expect(outcome.status).toBe(400);
  });

  it("rejects oversized payloads before parsing", async () => {
    const outcome = await processEnquiry({ clientKey: "x", rawBody: "x".repeat(25_000), originAllowed: true }, deps());
    expect(outcome.status).toBe(413);
  });

  it("silently refuses submissions that fill the honeypot field", async () => {
    const d = deps();
    const outcome = await processEnquiry(input({ ...validBody, website: "https://spam.example" }), d);
    expect(outcome.status).toBe(400);
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it("refuses submissions completed faster than a person could", async () => {
    const d = deps();
    const outcome = await processEnquiry(input({ ...validBody, startedAt: NOW - (MIN_FILL_TIME_MS - 1) }), d);
    expect(outcome.status).toBe(400);
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it("logs no personal data", async () => {
    const log = vi.fn();
    await processEnquiry(input(validBody), deps({ log }));
    const logged = JSON.stringify(log.mock.calls);
    expect(logged).not.toContain(validBody.email);
    expect(logged).not.toContain(validBody.fullName);
  });
});
