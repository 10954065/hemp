import { z } from "zod";

/** Shared by the client form and the API route so both validate identically. */

// Zod otherwise probes `new Function()` to enable JIT parsing, which the site's
// Content Security Policy (no 'unsafe-eval') correctly blocks.
z.config({ jitless: true });

export const ENQUIRY_CATEGORIES = [
  "investor",
  "pharmaceutical",
  "strategic",
  "agricultural",
  "institutional",
  "general",
] as const;

export type EnquiryCategory = (typeof ENQUIRY_CATEGORIES)[number];

export const categoryLabels: Record<EnquiryCategory, { label: string; hint: string }> = {
  investor: { label: "Investor enquiry", hint: "Institutional investors, family offices and lenders" },
  pharmaceutical: {
    label: "Pharmaceutical buyer",
    hint: "Licensed manufacturers, processors and supply-chain partners",
  },
  strategic: { label: "Strategic partnership", hint: "Commercial, processing and technology partners" },
  agricultural: { label: "Agricultural partnership", hint: "Landowners, outgrowers, inputs and agronomy" },
  institutional: { label: "Institutional enquiry", hint: "Government, research, development partners and media" },
  general: { label: "General enquiry", hint: "Anything else" },
};

export const investorTypes = [
  "Institutional investor",
  "Family office",
  "Development finance institution",
  "Bank or lender",
  "Other",
] as const;

export const productInterests = [
  "Hemp biomass (flowering tops and leaf)",
  "Hemp seed or grain",
  "Fibre or hurd",
  "Not yet defined",
] as const;

export const agriculturalPartnershipTypes = [
  "Land access or leasing",
  "Outgrower or contract farming",
  "Inputs, seed or equipment",
  "Agronomy or extension services",
  "Other",
] as const;

export const institutionTypes = [
  "Government or regulator",
  "Academic or research institution",
  "Development partner or NGO",
  "Media",
  "Other",
] as const;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 3000;

const requiredText = (label: string, max: number) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .trim()
    .min(1, { error: `Please enter your ${label}.` })
    .max(max, { error: `Please keep your ${label} under ${max} characters.` });

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Please keep this under ${max} characters.` })
    .optional();

const PHONE_PATTERN = /^[+()\d\s.-]{6,24}$/;

const baseFields = {
  fullName: requiredText("full name", 120),
  email: z
    .string({ error: "Please enter your email address." })
    .trim()
    .min(1, { error: "Please enter your email address." })
    .max(200, { error: "Please enter a shorter email address." })
    .pipe(z.email({ error: "Please enter a valid email address, for example name@company.com." })),
  organisation: optionalText(160),
  jobTitle: optionalText(120),
  country: requiredText("country", 80),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || PHONE_PATTERN.test(value), {
      error: "Please enter a valid phone number, including the country code.",
    })
    .optional(),
  message: z
    .string({ error: "Please tell us about your enquiry." })
    .trim()
    .min(MESSAGE_MIN, { error: `Please give a little more detail (at least ${MESSAGE_MIN} characters).` })
    .max(MESSAGE_MAX, { error: `Please keep your message under ${MESSAGE_MAX} characters.` }),
  consent: z.literal(true, {
    error: "Please confirm you have read the Privacy Policy so we can respond to you.",
  }),
};

const organisationRequired = requiredText("organisation", 160);

export const enquirySchema = z.discriminatedUnion(
  "category",
  [
    z.object({
      ...baseFields,
      category: z.literal("investor"),
      organisation: organisationRequired,
      investorType: z.enum(investorTypes, { error: "Please choose the option that best describes you." }),
    }),
    z.object({
      ...baseFields,
      category: z.literal("pharmaceutical"),
      organisation: organisationRequired,
      productInterest: z.enum(productInterests, { error: "Please choose a product of interest." }),
      targetMarket: requiredText("intended market or country of use", 120),
    }),
    z.object({
      ...baseFields,
      category: z.literal("strategic"),
      organisation: organisationRequired,
    }),
    z.object({
      ...baseFields,
      category: z.literal("agricultural"),
      partnershipType: z.enum(agriculturalPartnershipTypes, { error: "Please choose a partnership type." }),
    }),
    z.object({
      ...baseFields,
      category: z.literal("institutional"),
      organisation: organisationRequired,
      institutionType: z.enum(institutionTypes, { error: "Please choose your institution type." }),
    }),
    z.object({
      ...baseFields,
      category: z.literal("general"),
    }),
  ],
  { error: "Please choose an enquiry type." },
);

export type Enquiry = z.infer<typeof enquirySchema>;

/** Anti-spam fields sent alongside the enquiry; never shown to users. */
export const antiSpamSchema = z.object({
  website: z.string().max(200).optional(),
  startedAt: z.number().int().nonnegative().optional(),
});

export type FieldErrors = Partial<Record<string, string>>;

/** Maps Zod issues to one message per top-level field, keeping the first message for each. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  return error.issues.reduce<FieldErrors>((errors, issue) => {
    const field = String(issue.path[0] ?? "form");
    return errors[field] ? errors : { ...errors, [field]: issue.message };
  }, {});
}

export type EnquiryResponse =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };
