import { describe, expect, it } from "vitest";

import { enquirySchema, toFieldErrors } from "@/lib/enquiry-schema";

const base = {
  fullName: "Ama Mensah",
  email: "ama@example.com",
  country: "Ghana",
  message: "We would like to discuss a potential partnership next quarter.",
  consent: true,
};

describe("enquirySchema", () => {
  it("accepts a valid general enquiry without an organisation", () => {
    const result = enquirySchema.safeParse({ ...base, category: "general" });
    expect(result.success).toBe(true);
  });

  it("requires organisation for investor enquiries", () => {
    const result = enquirySchema.safeParse({ ...base, category: "investor", investorType: "Family office" });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).organisation).toMatch(/organisation/);
  });

  it("requires product interest and target market for pharmaceutical enquiries", () => {
    const result = enquirySchema.safeParse({ ...base, category: "pharmaceutical", organisation: "Example Pharma" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      expect(errors.productInterest).toBeDefined();
      expect(errors.targetMarket).toBeDefined();
    }
  });

  it("rejects an invalid email address with a helpful message", () => {
    const result = enquirySchema.safeParse({ ...base, category: "general", email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).email).toMatch(/valid email/);
  });

  it("rejects a submission without privacy consent", () => {
    const result = enquirySchema.safeParse({ ...base, category: "general", consent: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).consent).toMatch(/Privacy Policy/);
  });

  it("rejects messages that are too short", () => {
    const result = enquirySchema.safeParse({ ...base, category: "general", message: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown enquiry category", () => {
    const result = enquirySchema.safeParse({ ...base, category: "retail" });
    expect(result.success).toBe(false);
  });

  it("trims whitespace and allows an empty optional phone number", () => {
    const result = enquirySchema.safeParse({ ...base, category: "general", fullName: "  Ama Mensah  ", phone: "" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.fullName).toBe("Ama Mensah");
  });

  it("rejects a malformed phone number", () => {
    const result = enquirySchema.safeParse({ ...base, category: "general", phone: "call me" });
    expect(result.success).toBe(false);
  });

  it("strips fields that do not belong to the chosen category", () => {
    const result = enquirySchema.safeParse({ ...base, category: "general", investorType: "Family office" });
    expect(result.success).toBe(true);
    if (result.success) expect("investorType" in result.data).toBe(false);
  });
});
