"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";

import {
  MESSAGE_MAX,
  agriculturalPartnershipTypes,
  categoryLabels,
  enquirySchema,
  institutionTypes,
  investorTypes,
  productInterests,
  toFieldErrors,
} from "@/lib/enquiry-schema";
import type { EnquiryCategory, EnquiryResponse, FieldErrors } from "@/lib/enquiry-schema";

import { SelectField, TextAreaField, TextField } from "./Fields";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  categories: readonly EnquiryCategory[];
  defaultCategory?: EnquiryCategory;
  messageHint?: string;
};

const ORGANISATION_OPTIONAL: readonly EnquiryCategory[] = ["agricultural", "general"];

const fieldOrder = [
  "category",
  "fullName",
  "email",
  "organisation",
  "jobTitle",
  "country",
  "phone",
  "investorType",
  "productInterest",
  "targetMarket",
  "partnershipType",
  "institutionType",
  "message",
  "consent",
];

const fieldLabels: Record<string, string> = {
  category: "Enquiry type",
  fullName: "Full name",
  email: "Work email",
  organisation: "Organisation",
  jobTitle: "Job title",
  country: "Country",
  phone: "Telephone",
  investorType: "Investor type",
  productInterest: "Product of interest",
  targetMarket: "Intended market",
  partnershipType: "Partnership type",
  institutionType: "Institution type",
  message: "Message",
  consent: "Privacy confirmation",
};

const NETWORK_ERROR =
  "We could not reach our server. Please check your connection and try again, or email hempwealthgh@gmail.com.";

export function EnquiryForm({ categories, defaultCategory, messageHint }: Props) {
  const formId = useId();
  const [category, setCategory] = useState<EnquiryCategory>(defaultCategory ?? categories[0]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [reference, setReference] = useState("");
  const startedAt = useRef<number | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const id = (name: string) => `${formId}-${name}`;
  const value = (name: string) => values[name] ?? "";
  const organisationRequired = !ORGANISATION_OPTIONAL.includes(category);

  function handleChange(name: string, next: string) {
    setValues((current) => ({ ...current, [name]: next }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleFirstInteraction() {
    if (startedAt.current === null) startedAt.current = Date.now();
  }

  function buildPayload() {
    const trimmed = Object.fromEntries(Object.entries(values).map(([key, v]) => [key, v.trim()]));
    return {
      ...trimmed,
      organisation: trimmed.organisation || undefined,
      jobTitle: trimmed.jobTitle || undefined,
      category,
      consent,
    };
  }

  function showErrors(next: FieldErrors) {
    setErrors(next);
    setStatus("error");
    setServerMessage("Please correct the highlighted fields.");
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = buildPayload();
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      showErrors(toFieldErrors(parsed.error));
      return;
    }

    setStatus("submitting");
    setErrors({});
    setServerMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          website: honeypot.current?.value ?? "",
          startedAt: startedAt.current ?? undefined,
        }),
      });
      const result = (await response.json()) as EnquiryResponse;

      if (response.ok && result.ok) {
        setReference(result.reference);
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (!result.ok && result.fieldErrors) {
        showErrors(result.fieldErrors);
        return;
      }
      setStatus("error");
      setServerMessage(result.ok ? NETWORK_ERROR : result.error);
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setStatus("error");
      setServerMessage(NETWORK_ERROR);
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-success/30 bg-white p-8 sm:p-10" role="status">
        <p className="text-eyebrow font-semibold uppercase text-success">Enquiry received</p>
        <h3 ref={successRef} tabIndex={-1} className="mt-4 text-h3 text-forest focus:outline-none">
          Thank you. Your enquiry has been sent to our team.
        </h3>
        <p className="mt-4 text-muted">
          Your reference is <strong className="font-semibold text-ink">{reference}</strong>. Please quote it if you
          follow up by email at{" "}
          <a className="text-moss underline underline-offset-4" href="mailto:hempwealthgh@gmail.com">
            hempwealthgh@gmail.com
          </a>
          .
        </p>
      </div>
    );
  }

  const errorEntries = fieldOrder.filter((name) => errors[name]);
  const isSubmitting = status === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} onFocusCapture={handleFirstInteraction} className="space-y-8" aria-busy={isSubmitting}>
      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {status === "error" && (
          <div className="rounded-md border border-danger/40 bg-danger/5 p-5">
            <p className="font-semibold text-danger">{serverMessage}</p>
            {errorEntries.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.92rem] text-danger">
                {errorEntries.map((name) => (
                  <li key={name}>
                    <a href={`#${id(name === "category" ? `category-${category}` : name)}`} className="underline underline-offset-2">
                      {fieldLabels[name]}: {errors[name]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {categories.length > 1 && (
        <fieldset>
          <legend className="text-[0.92rem] font-semibold text-ink">
            What is your enquiry about?<span className="ml-1 text-danger" aria-hidden="true">*</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {categories.map((option) => (
              <label
                key={option}
                htmlFor={id(`category-${option}`)}
                className="flex cursor-pointer items-start gap-3 rounded-sm border border-line bg-white p-4 transition-colors hover:border-sage has-[:checked]:border-moss has-[:checked]:bg-sage-soft/25 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-moss"
              >
                <input
                  id={id(`category-${option}`)}
                  type="radio"
                  name="category"
                  value={option}
                  checked={category === option}
                  onChange={() => setCategory(option)}
                  className="mt-1 size-4 accent-forest"
                />
                <span>
                  <span className="block font-semibold text-ink">{categoryLabels[option].label}</span>
                  <span className="block text-[0.85rem] text-muted">{categoryLabels[option].hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id={id("fullName")} name="fullName" label="Full name" required autoComplete="name" value={value("fullName")} onChange={handleChange} error={errors.fullName} />
        <TextField id={id("email")} name="email" type="email" label="Work email" required autoComplete="email" value={value("email")} onChange={handleChange} error={errors.email} />
        <TextField id={id("organisation")} name="organisation" label="Organisation" required={organisationRequired} autoComplete="organization" value={value("organisation")} onChange={handleChange} error={errors.organisation} />
        <TextField id={id("jobTitle")} name="jobTitle" label="Job title" autoComplete="organization-title" value={value("jobTitle")} onChange={handleChange} error={errors.jobTitle} />
        <TextField id={id("country")} name="country" label="Country" required autoComplete="country-name" value={value("country")} onChange={handleChange} error={errors.country} />
        <TextField id={id("phone")} name="phone" type="tel" label="Telephone" hint="Include the country code, e.g. +233." autoComplete="tel" value={value("phone")} onChange={handleChange} error={errors.phone} />

        {category === "investor" && (
          <SelectField id={id("investorType")} name="investorType" label="Which best describes you?" required options={investorTypes} value={value("investorType")} onChange={handleChange} error={errors.investorType} className="sm:col-span-2" />
        )}
        {category === "pharmaceutical" && (
          <>
            <SelectField id={id("productInterest")} name="productInterest" label="Product of interest" required options={productInterests} value={value("productInterest")} onChange={handleChange} error={errors.productInterest} />
            <TextField id={id("targetMarket")} name="targetMarket" label="Intended market or country of use" required value={value("targetMarket")} onChange={handleChange} error={errors.targetMarket} />
          </>
        )}
        {category === "agricultural" && (
          <SelectField id={id("partnershipType")} name="partnershipType" label="Partnership type" required options={agriculturalPartnershipTypes} value={value("partnershipType")} onChange={handleChange} error={errors.partnershipType} className="sm:col-span-2" />
        )}
        {category === "institutional" && (
          <SelectField id={id("institutionType")} name="institutionType" label="Institution type" required options={institutionTypes} value={value("institutionType")} onChange={handleChange} error={errors.institutionType} className="sm:col-span-2" />
        )}

        <TextAreaField
          id={id("message")}
          name="message"
          label="Your enquiry"
          hint={messageHint ?? "Tell us who you are, what you are looking for and any timelines. Please do not include sensitive personal information."}
          maxLength={MESSAGE_MAX}
          value={value("message")}
          onChange={handleChange}
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input ref={honeypot} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (errors.consent) setErrors((current) => ({ ...current, consent: undefined }));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? id("consent-error") : undefined}
            className="mt-1 size-5 shrink-0 accent-forest"
          />
          <label htmlFor={id("consent")} className="text-[0.95rem] text-ink">
            I have read the{" "}
            <Link href="/privacy" className="text-moss underline underline-offset-4">
              Privacy Policy
            </Link>{" "}
            and agree that HempWealth Ghana may use these details to respond to my enquiry.
            <span className="ml-1 text-danger" aria-hidden="true">*</span>
          </label>
        </div>
        {errors.consent && (
          <p id={id("consent-error")} className="mt-2 pl-8 text-[0.88rem] font-medium text-danger">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.85rem] text-muted">
          <span className="text-danger" aria-hidden="true">*</span> Required field
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-forest px-8 font-semibold text-ivory shadow-soft transition-colors hover:bg-evergreen disabled:cursor-progress disabled:opacity-80"
        >
          {isSubmitting && (
            <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
          )}
          {isSubmitting ? "Sending your enquiry…" : "Send enquiry"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {isSubmitting ? "Sending your enquiry." : ""}
      </p>
    </form>
  );
}
