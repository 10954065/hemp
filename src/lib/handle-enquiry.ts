import { antiSpamSchema, enquirySchema, toFieldErrors } from "./enquiry-schema";
import type { Enquiry, EnquiryResponse } from "./enquiry-schema";
import type { DeliveryResult } from "./email";
import type { RateLimitResult } from "./rate-limit";

/**
 * Request-independent enquiry processing, kept separate from the route handler so it
 * can be unit tested with injected dependencies.
 */

export const MIN_FILL_TIME_MS = 3_000;
const MAX_BODY_BYTES = 20_000;

export type EnquiryDeps = {
  rateLimit: (key: string) => RateLimitResult;
  deliver: (enquiry: Enquiry, reference: string) => Promise<DeliveryResult>;
  createReference: () => string;
  now: () => number;
  log: (event: string, detail: Record<string, string | number>) => void;
};

export type EnquiryInput = {
  clientKey: string;
  rawBody: string;
  originAllowed: boolean;
};

export type EnquiryOutcome = {
  status: number;
  body: EnquiryResponse;
  headers?: Record<string, string>;
};

const GENERIC_DELIVERY_ERROR =
  "We could not send your enquiry just now. Please try again shortly, or email hempwealthgh@gmail.com directly.";

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export async function processEnquiry(input: EnquiryInput, deps: EnquiryDeps): Promise<EnquiryOutcome> {
  if (!input.originAllowed) {
    return { status: 403, body: { ok: false, error: "This request could not be accepted." } };
  }

  if (input.rawBody.length > MAX_BODY_BYTES) {
    return { status: 413, body: { ok: false, error: "Your message is too long to send." } };
  }

  const limit = deps.rateLimit(input.clientKey);
  if (!limit.allowed) {
    return {
      status: 429,
      body: {
        ok: false,
        error: "You have sent several enquiries in a short time. Please wait a few minutes and try again.",
      },
      headers: { "Retry-After": String(limit.retryAfterSeconds) },
    };
  }

  const json = parseJson(input.rawBody);
  if (typeof json !== "object" || json === null) {
    return { status: 400, body: { ok: false, error: "The enquiry could not be read. Please try again." } };
  }

  const spam = antiSpamSchema.safeParse(json);
  const honeypotFilled = spam.success && Boolean(spam.data.website);
  const tooFast =
    spam.success && spam.data.startedAt !== undefined && deps.now() - spam.data.startedAt < MIN_FILL_TIME_MS;
  if (!spam.success || honeypotFilled) {
    deps.log("enquiry.rejected", { reason: "honeypot" });
    // Respond as a normal rejection without revealing which check failed.
    return { status: 400, body: { ok: false, error: "The enquiry could not be accepted." } };
  }
  if (tooFast) {
    deps.log("enquiry.rejected", { reason: "too-fast" });
    return {
      status: 400,
      body: { ok: false, error: "That was submitted very quickly. Please check your details and submit again." },
    };
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    return {
      status: 422,
      body: {
        ok: false,
        error: "Please correct the highlighted fields.",
        fieldErrors: toFieldErrors(parsed.error),
      },
    };
  }

  const reference = deps.createReference();
  const delivery = await deps.deliver(parsed.data, reference);

  if (!delivery.ok) {
    deps.log("enquiry.delivery_failed", { reason: delivery.reason, category: parsed.data.category });
    return { status: delivery.reason === "not-configured" ? 503 : 502, body: { ok: false, error: GENERIC_DELIVERY_ERROR } };
  }

  deps.log("enquiry.delivered", { category: parsed.data.category });
  return { status: 200, body: { ok: true, reference } };
}
