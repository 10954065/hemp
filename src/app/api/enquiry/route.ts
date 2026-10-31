import { randomBytes } from "node:crypto";

import { sendEnquiryEmail } from "@/lib/email";
import { processEnquiry } from "@/lib/handle-enquiry";
import { logEvent } from "@/lib/logger";
import { createRateLimiter } from "@/lib/rate-limit";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const rateLimit = createRateLimiter(RATE_LIMIT);

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

/** Accepts same-origin browser submissions only; a basic CSRF and cross-site abuse guard. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function createReference(): string {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `HWG-${date}-${randomBytes(3).toString("hex")}`;
}

export async function POST(request: Request): Promise<Response> {
  const outcome = await processEnquiry(
    {
      clientKey: clientKey(request),
      rawBody: await request.text(),
      originAllowed: isSameOrigin(request),
    },
    {
      rateLimit: (key) => rateLimit(key),
      deliver: (enquiry, reference) => sendEnquiryEmail(enquiry, reference),
      createReference,
      now: () => Date.now(),
      log: logEvent,
    },
  );

  return Response.json(outcome.body, {
    status: outcome.status,
    headers: { "Cache-Control": "no-store", ...outcome.headers },
  });
}
