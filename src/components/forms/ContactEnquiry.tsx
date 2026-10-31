"use client";

import { useSearchParams } from "next/navigation";

import { ENQUIRY_CATEGORIES } from "@/lib/enquiry-schema";
import type { EnquiryCategory } from "@/lib/enquiry-schema";

import { EnquiryForm } from "./EnquiryForm";

function isCategory(value: string | null): value is EnquiryCategory {
  return value !== null && (ENQUIRY_CATEGORIES as readonly string[]).includes(value);
}

/** Contact-page form that preselects the enquiry type from links such as /contact?type=investor. */
export function ContactEnquiry() {
  const type = useSearchParams().get("type");
  const defaultCategory = isCategory(type) ? type : "general";
  return <EnquiryForm key={defaultCategory} categories={ENQUIRY_CATEGORIES} defaultCategory={defaultCategory} />;
}

export function ContactEnquiryFallback() {
  return <EnquiryForm categories={ENQUIRY_CATEGORIES} defaultCategory="general" />;
}
