import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Faq } from "@/components/sections/Faq";
import type { FaqItem } from "@/components/sections/Faq";
import { Figure } from "@/components/sections/Figure";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Pharmaceutical supply",
  description:
    "For licensed pharmaceutical manufacturers and processors: HempWealth Ghana's intended role as a grower of low-THC hemp biomass, documentation expectations, due diligence and how to enquire.",
  path: "/pharmaceutical-supply",
});

const weAre = [
  "A Ghanaian agricultural company developing licensed cultivation of low-THC hemp",
  "A prospective supplier of raw plant material to licensed processors and manufacturers",
  "Committed to batch documentation, independent testing and chain-of-custody records",
];

const weAreNot = [
  "A manufacturer, distributor or seller of medicines or consumer products",
  "A source of products for individuals. We supply licensed businesses only",
  "Making any claim about the therapeutic effect of hemp or its compounds",
];

type CapabilityRow = { area: string; position: string; status: "Agreed per buyer" | "Not claimed" | "Due diligence" | "Required" };

const capabilities: CapabilityRow[] = [
  {
    area: "Licensing status",
    position: "Cultivation and related licences under L.I. 2475 are shared with qualified buyers during due diligence.",
    status: "Due diligence",
  },
  {
    area: "Product specifications",
    position: "Material type, cannabinoid profile, moisture and other parameters are agreed with each buyer and set out in a written specification.",
    status: "Agreed per buyer",
  },
  {
    area: "Quality certifications",
    position: "No GACP, GMP or similar certification is claimed on this website. Certifications will be stated here only once awarded and evidenced.",
    status: "Not claimed",
  },
  {
    area: "Export",
    position: "Export requires a separate L.I. 2475 export licence and the importing country's permits. Eligibility is confirmed case by case.",
    status: "Required",
  },
];

const documentation = [
  { title: "Certificate of analysis", text: "Per batch, from a competent laboratory: THC and cannabinoid profile, moisture, and the contaminant panel the buyer requires, such as heavy metals, pesticide residues and microbial limits." },
  { title: "Batch and field records", text: "Seed lot, planting block, inputs applied, harvest date and post-harvest handling for each batch." },
  { title: "Chain of custody", text: "Records of storage and every transfer, with licensed transport details." },
  { title: "Regulatory documents", text: "Copies of the licences that cover each activity in the supply chain, and permits for cross-border shipments." },
];

const steps = [
  { title: "Enquiry", text: "Send the form below with your organisation, intended market and product interest." },
  { title: "Introductory discussion", text: "An initial call to understand requirements. A confidentiality agreement is put in place where needed." },
  { title: "Specification and documentation review", text: "We agree the material specification and the documents and testing each batch must carry." },
  { title: "Regulatory confirmation", text: "Both parties confirm the licences and permits needed for every step, in Ghana and in the destination market." },
  { title: "Supply agreement", text: "Where everything is in place, a trial lot and written supply terms." },
];

const faqs: FaqItem[] = [
  {
    question: "Can HempWealth Ghana supply pharmaceutical-grade material today?",
    answer:
      "Not as a confirmed, certified product. Supply depends on the company's licences, on cultivation results, and on the specification and certifications a buyer requires. We discuss current status openly during due diligence.",
  },
  {
    question: "Do you sell to individuals or pharmacies?",
    answer:
      "No. We intend to supply raw plant material only to licensed processors, manufacturers and research institutions. We do not sell any product to consumers.",
  },
  {
    question: "Which markets can you export to?",
    answer:
      "Export from Ghana requires a specific export licence under L.I. 2475, and every destination country has its own import rules for hemp and cannabis material. We confirm eligibility for each market case by case and make no blanket claims.",
  },
  {
    question: "How is THC compliance demonstrated?",
    answer:
      "Through laboratory testing of samples before harvest and of each batch, with results recorded on certificates of analysis. Ghana's legal limit is 0.3% THC on a dry weight basis. Buyers may also commission their own testing.",
  },
  {
    question: "Will you sign a confidentiality agreement?",
    answer: "Yes. We expect specification and commercial discussions to take place under a mutual confidentiality agreement.",
  },
];

export default function PharmaceuticalSupplyPage() {
  return (
    <>
      <PageHero
        variant="photo"
        image="laboratory"
        eyebrow="Pharmaceutical supply"
        title="Raw material for regulated supply chains"
        intro={
          <p>
            For licensed pharmaceutical manufacturers, processors and research institutions considering Ghanaian hemp as a
            source of raw material. This page sets out our intended role, what you can expect, and what must be confirmed
            before any supply.
          </p>
        }
        breadcrumbs={[{ label: "Pharmaceutical supply", href: "/pharmaceutical-supply" }]}
      >
        <ButtonLink href="#buyer-enquiry" variant="light" withArrow>
          Buyer enquiry
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="role-title" className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="role-title"
            eyebrow="Our intended role"
            title="A grower in a regulated chain, not a manufacturer"
            align="split"
            intro="We aim to grow and supply low-THC hemp biomass to an agreed specification, so that licensed processors can concentrate on extraction, formulation and product approval."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-md border border-line p-8">
              <h3 className="text-h3 text-forest">What we are</h3>
              <ul className="mt-6 space-y-4">
                {weAre.map((item) => (
                  <li key={item} className="flex gap-4">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-moss" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md bg-parchment p-8">
              <h3 className="text-h3 text-forest">What we are not</h3>
              <ul className="mt-6 space-y-4">
                {weAreNot.map((item) => (
                  <li key={item} className="flex gap-4">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-gold-ink" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="capabilities-title" className="bg-ivory py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="capabilities-title"
            eyebrow="Capabilities and confirmations"
            title="What is confirmed, and what must be verified"
            intro="Regulated buyers need precision. This is where we stand on the questions that matter most."
          />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {capabilities.map((row) => (
              <div key={row.area} className="grid gap-3 py-7 md:grid-cols-[14rem_1fr_auto] md:items-start md:gap-10">
                <h3 className="font-semibold text-ink">{row.area}</h3>
                <p className="text-muted">{row.position}</p>
                <div>
                  <Tag tone={row.status === "Not claimed" ? "gold" : "neutral"}>{row.status}</Tag>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="documentation-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Quality documentation and traceability</Eyebrow>
            <h2 id="documentation-title" className="mt-5 text-h2 text-forest">
              Every batch travels with its evidence
            </h2>
            <p className="mt-6 text-muted">
              Our operating design follows what pharmaceutical buyers typically require of a raw-material supplier. Final
              requirements are always set by the buyer&apos;s specification and its regulator.
            </p>
            <Figure image="laboratory" sizes="(min-width: 1024px) 35vw, 100vw" caption="Laboratory testing equipment." illustrative className="mt-10" />
          </div>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:self-center">
            {documentation.map((doc) => (
              <div key={doc.title} className="border-t border-forest/20 pt-5">
                <dt className="font-display text-xl text-forest">{doc.title}</dt>
                <dd className="mt-3 text-muted">{doc.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="diligence-title" className="on-dark bg-evergreen py-20 text-ivory lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow tone="light">Regulatory due diligence</Eyebrow>
            <h2 id="diligence-title" className="mt-5 text-h2">
              Both sides of the transaction must be licensed
            </h2>
          </div>
          <div className="space-y-5 text-sage-soft">
            <p>
              In Ghana, the Cultivation and Management of Cannabis Regulations, 2023 (L.I. 2475) license each activity
              separately: cultivation, storage, transportation, processing, export and others. A compliant supply chain needs
              the right licence for every step, held by the party that performs it.
            </p>
            <p>
              Finished medicinal products are regulated separately. In Ghana that includes the Food and Drugs Authority. In
              other markets it means that country&apos;s medicines regulator and import controls. We expect buyers to
              verify our licences, and we will verify theirs.
            </p>
            <TextLink href="/regulation" className="text-gold hover:text-ivory">
              Our summary of the regulatory framework
            </TextLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="bg-ivory py-20 lg:py-28">
        <Container>
          <SectionHeader id="process-title" eyebrow="Partnership process" title="How a supply relationship would progress" />
          <ol className="mt-14 grid gap-6 md:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step.title} className="relative border-t-2 border-gold pt-6">
                <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-gold-ink">STEP {index + 1}</span>
                <h3 className="mt-3 font-display text-xl text-forest">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Questions from buyers</Eyebrow>
            <h2 id="faq-title" className="mt-5 text-h2 text-forest">
              Frequently asked questions
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      <section id="buyer-enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 bg-parchment py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Pharmaceutical buyer enquiry</Eyebrow>
            <h2 id="enquiry-title" className="mt-5 text-h2 text-forest">
              Tell us about your requirements
            </h2>
            <p className="mt-6 text-muted">
              Please share your organisation, intended market and product interest. We will reply to discuss next steps.
              Do not send confidential specifications until a confidentiality agreement is in place.
            </p>
          </div>
          <div className="rounded-md bg-white p-6 shadow-soft sm:p-10 lg:col-span-8">
            <EnquiryForm
              categories={["pharmaceutical"]}
              messageHint="Briefly describe your organisation's licensed activity, the material you are interested in, indicative volumes if known, and timelines."
            />
          </div>
        </Container>
      </section>
    </>
  );
}
