import { describe, expect, it, vi } from "vitest";

import { formatEnquiryText, readEmailConfig, sendEnquiryEmail } from "@/lib/email";
import type { Enquiry } from "@/lib/enquiry-schema";

const enquiry: Enquiry = {
  category: "pharmaceutical",
  fullName: "Esi Owusu",
  email: "esi@example.com",
  organisation: "Example Labs",
  country: "Ghana",
  message: "We are a licensed processor interested in future supply.",
  consent: true,
  productInterest: "Fibre or hurd",
  targetMarket: "Ghana",
};

const config = { apiKey: "test-key", from: "Website <web@example.com>", to: ["team@example.com"] };

describe("readEmailConfig", () => {
  it("returns null when any required variable is missing", () => {
    expect(readEmailConfig({ RESEND_API_KEY: "k", ENQUIRY_FROM_EMAIL: "a@b.c" })).toBeNull();
  });

  it("parses comma-separated recipients", () => {
    const parsed = readEmailConfig({
      RESEND_API_KEY: "k",
      ENQUIRY_FROM_EMAIL: "Web <web@example.com>",
      ENQUIRY_TO_EMAIL: "a@example.com, b@example.com",
    });
    expect(parsed?.to).toEqual(["a@example.com", "b@example.com"]);
  });
});

describe("formatEnquiryText", () => {
  it("includes category-specific answers and the reference", () => {
    const text = formatEnquiryText(enquiry, "HWG-1");
    expect(text).toContain("Reference: HWG-1");
    expect(text).toContain("Product of interest: Fibre or hurd");
    expect(text).toContain("Intended market: Ghana");
  });
});

describe("sendEnquiryEmail", () => {
  it("reports not-configured without calling the provider", async () => {
    const fetchImpl = vi.fn();
    const result = await sendEnquiryEmail(enquiry, "HWG-1", null, fetchImpl as unknown as typeof fetch);
    expect(result).toEqual({ ok: false, reason: "not-configured" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts a plain-text email with reply-to and an idempotency key", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ id: "abc" }), { status: 200 }));
    const result = await sendEnquiryEmail(enquiry, "HWG-1", config, fetchImpl as unknown as typeof fetch);
    expect(result).toEqual({ ok: true, id: "abc" });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer test-key");
    expect(headers["Idempotency-Key"]).toBe("enquiry/HWG-1");
    const body = JSON.parse(String(init.body));
    expect(body.reply_to).toBe("esi@example.com");
    expect(body.to).toEqual(["team@example.com"]);
    expect(body.html).toBeUndefined();
  });

  it("reports a provider error on a non-2xx response", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 500 }));
    const result = await sendEnquiryEmail(enquiry, "HWG-1", config, fetchImpl as unknown as typeof fetch);
    expect(result).toEqual({ ok: false, reason: "provider-error" });
  });

  it("reports a provider error when the request throws", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network down");
    });
    const result = await sendEnquiryEmail(enquiry, "HWG-1", config, fetchImpl as unknown as typeof fetch);
    expect(result).toEqual({ ok: false, reason: "provider-error" });
  });
});
