import "server-only";

import type { Enquiry } from "./enquiry-schema";
import { categoryLabels } from "./enquiry-schema";

/**
 * Delivers enquiries by email through the Resend REST API.
 * Required server-side environment variables (see docs/DEPLOYMENT.md):
 *   RESEND_API_KEY      API key with sending access
 *   ENQUIRY_TO_EMAIL    inbox that receives enquiries (comma-separated for several)
 *   ENQUIRY_FROM_EMAIL  verified sender, e.g. "HempWealth Ghana <enquiries@your-domain>"
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 10_000;

export type EmailConfig = {
  apiKey: string;
  to: string[];
  from: string;
};

export type DeliveryResult = { ok: true; id: string } | { ok: false; reason: "not-configured" | "provider-error" };

export function readEmailConfig(env: Record<string, string | undefined> = process.env): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.ENQUIRY_FROM_EMAIL?.trim();
  const to = (env.ENQUIRY_TO_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!apiKey || !from || to.length === 0) {
    return null;
  }
  return { apiKey, from, to };
}

const fieldLabels: Record<string, string> = {
  investorType: "Investor type",
  productInterest: "Product of interest",
  targetMarket: "Intended market",
  partnershipType: "Partnership type",
  institutionType: "Institution type",
};

/** Plain-text body: no HTML is built from user input, so nothing needs escaping. */
export function formatEnquiryText(enquiry: Enquiry, reference: string): string {
  const categorySpecific = Object.entries(fieldLabels)
    .filter(([key]) => key in enquiry)
    .map(([key, label]) => `${label}: ${String((enquiry as Record<string, unknown>)[key])}`);

  return [
    `New website enquiry (${categoryLabels[enquiry.category].label})`,
    `Reference: ${reference}`,
    "",
    `Name: ${enquiry.fullName}`,
    `Email: ${enquiry.email}`,
    `Organisation: ${enquiry.organisation ?? "Not provided"}`,
    `Job title: ${enquiry.jobTitle ?? "Not provided"}`,
    `Country: ${enquiry.country}`,
    `Phone: ${enquiry.phone || "Not provided"}`,
    ...categorySpecific,
    "",
    "Message:",
    enquiry.message,
    "",
    "The sender confirmed they had read the website Privacy Policy.",
  ].join("\n");
}

export async function sendEnquiryEmail(
  enquiry: Enquiry,
  reference: string,
  config: EmailConfig | null = readEmailConfig(),
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  if (!config) {
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `enquiry/${reference}`,
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: enquiry.email,
        subject: `[Website] ${categoryLabels[enquiry.category].label}: ${enquiry.organisation ?? enquiry.fullName}`,
        text: formatEnquiryText(enquiry, reference),
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { ok: false, reason: "provider-error" };
    }
    const payload: unknown = await response.json();
    const id =
      typeof payload === "object" && payload !== null && "id" in payload && typeof payload.id === "string"
        ? payload.id
        : reference;
    return { ok: true, id };
  } catch {
    return { ok: false, reason: "provider-error" };
  }
}
