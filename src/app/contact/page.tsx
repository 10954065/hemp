import { Suspense } from "react";

import { ContactEnquiry, ContactEnquiryFallback } from "@/components/forms/ContactEnquiry";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact HempWealth Ghana: investor, pharmaceutical buyer, strategic, agricultural, institutional and general enquiries. Email, telephone and postal address.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = company;
  return (
    <>
      <PageHero
        variant="plain"
        eyebrow="Contact"
        title="Talk to HempWealth Ghana"
        intro={
          <p>
            Choose the enquiry type that fits best so your message reaches the right person. You can also reach us directly
            by email or telephone.
          </p>
        }
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section aria-label="Contact details and enquiry form" className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4" aria-labelledby="details-title">
            <div className="lg:sticky lg:top-28">
              <h2 id="details-title" className="text-h3 text-forest">
                Contact details
              </h2>
              <dl className="mt-8 space-y-7">
                <div>
                  <dt className="text-eyebrow font-semibold uppercase text-gold-ink">Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${contact.email}`} className="break-all text-lg text-moss underline decoration-moss/30 underline-offset-4 hover:decoration-moss">
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow font-semibold uppercase text-gold-ink">Telephone</dt>
                  {contact.phones.map((phone) => (
                    <dd key={phone.href} className="mt-2">
                      <a href={phone.href} className="text-lg text-moss underline decoration-moss/30 underline-offset-4 hover:decoration-moss">
                        {phone.display}
                      </a>
                    </dd>
                  ))}
                </div>
                <div>
                  <dt className="text-eyebrow font-semibold uppercase text-gold-ink">Postal address</dt>
                  <dd className="mt-2">
                    <address className="not-italic leading-relaxed">
                      {contact.postal.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
              </dl>
              <div className="mt-10 rounded-md bg-parchment p-6 text-[0.92rem] text-muted">
                <p className="font-semibold text-ink">Before you write</p>
                <p className="mt-2">
                  We do not sell products to individuals, and we cannot give legal, medical or investment advice. Please do
                  not send confidential documents until we have agreed how they will be handled.
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="rounded-md border border-line bg-ivory p-6 sm:p-10">
              <h2 className="text-h3 text-forest">Send an enquiry</h2>
              <p className="mt-2 text-muted">Fields marked with an asterisk are required.</p>
              <div className="mt-8">
                <Suspense fallback={<ContactEnquiryFallback />}>
                  <ContactEnquiry />
                </Suspense>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
