import Link from "next/link";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Faq } from "@/components/sections/Faq";
import type { FaqItem } from "@/components/sections/Faq";
import { ImageText } from "@/components/sections/ImageText";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { project } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Investment and strategic partnerships",
  description:
    "The business case for HempWealth Ghana: an early-stage, regulated industrial hemp project in the Ashanti Region. Partnership categories, development stage, due diligence and how to enquire.",
  path: "/opportunity",
});

const marketContext = [
  {
    figure: "2026",
    label: "Ghana's licensing programme launched",
    detail: "Online applications opened in March 2026 under Act 1100 and L.I. 2475.",
  },
  {
    figure: "Aug 2026",
    label: "First cultivation licences issued",
    detail: "Two companies received the first three-year cultivation licences. The sector is at its very beginning.",
  },
  {
    figure: "+60%",
    label: "Growth in EU hemp fibre area, 2015–2022",
    detail: "From 20,540 to 33,020 hectares, according to the European Commission. An indication of demand in a mature market.",
  },
];

type StageRow = { label: string; text: string; status: "Existing" | "Proposed" | "Under evaluation" | "Not yet in place" };

const stage: StageRow[] = [
  { label: "Company", text: "Incorporated in Ghana in 2024, Ghanaian-owned.", status: "Existing" },
  { label: "Phase 1 cultivation", text: `${project.acreage.value} acres at ${project.location.town}, ${project.location.region}.`, status: "Proposed" },
  { label: "Licensing", text: "Activity and site licences under L.I. 2475. Status shared in due diligence.", status: "Under evaluation" },
  { label: "Processing and storage", text: "Drying, storage and handling infrastructure for the first harvests.", status: "Proposed" },
  { label: "Supply agreements", text: "No supply or offtake contracts are publicly announced. Confirmed agreements will be announced with counterparties' consent.", status: "Not yet in place" },
];

const partnershipTypes = [
  { title: "Equity investment", text: "Long-term investors seeking exposure to an early-stage, regulated agricultural business in Ghana." },
  { title: "Debt and asset finance", text: "Banks, lenders and development finance institutions financing land preparation, equipment and infrastructure." },
  { title: "Offtake and supply", text: "Licensed processors and manufacturers interested in future supply under agreed specifications." },
  { title: "Processing partnerships", text: "Partners able to establish or operate drying, decortication or extraction capacity in Ghana." },
  { title: "Agricultural partnerships", text: "Landowners, outgrowers, input suppliers and agronomy specialists." },
  { title: "Research and development", text: "Universities and research institutes working on varieties, agronomy and applications in West Africa." },
];

const diligence = [
  { title: "Introductory call", text: "We discuss your mandate and our current stage." },
  { title: "Confidentiality agreement", text: "A mutual NDA before detailed information is shared." },
  { title: "Information review", text: "Incorporation, ownership, licensing, site, business plan and financial information." },
  { title: "Site and management meetings", text: "Visits and meetings with directors and management." },
  { title: "Terms", text: "Any agreement is documented with independent legal and financial advice on both sides." },
];

const faqs: FaqItem[] = [
  {
    question: "Can I invest through this website?",
    answer:
      "No. This website does not offer shares, securities or any investment product, and it does not accept funds. It is a way to start a professional conversation. Any investment would be subject to due diligence, formal documentation and applicable law.",
  },
  {
    question: "What returns can investors expect?",
    answer:
      "We do not publish return projections on this website. HempWealth Ghana is an early-stage business in a newly regulated sector, and any investment carries significant risk, including the risk of losing capital. Financial information is shared with qualified parties under a confidentiality agreement.",
  },
  {
    question: "Is there a minimum investment?",
    answer:
      "We have not set a public minimum. The scale and structure of any participation depends on the partner, the purpose and the development stage, and is discussed directly.",
  },
  {
    question: "Does HempWealth Ghana hold a cultivation licence?",
    answer:
      "We provide our licensing status, and the documents that evidence it, to qualified parties during due diligence. Please read our regulation page to understand how activity- and site-specific licensing works in Ghana.",
  },
  {
    question: "Who should I contact first?",
    answer: "Use the enquiry form on this page. Choose the enquiry type that fits best and we will route it to the right person.",
  },
];

export default function OpportunityPage() {
  return (
    <>
      <PageHero
        variant="photo"
        image="cropSummer"
        eyebrow="Investment and strategic partnerships"
        title="An early position in a newly regulated sector"
        intro={
          <p>
            Ghana has only just begun licensing industrial hemp. HempWealth Ghana is building a compliant cultivation
            business in that sector and is looking for partners with the patience and standards it demands.
          </p>
        }
        breadcrumbs={[{ label: "Opportunity", href: "/opportunity" }]}
      >
        <ButtonLink href="#partner-enquiry" variant="light" withArrow>
          Make an enquiry
        </ButtonLink>
        <ButtonLink href="#due-diligence" variant="outline-light">
          Due diligence process
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="context-title" className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="context-title"
            eyebrow="The opportunity"
            title="Why industrial hemp, why Ghana, why now"
            align="split"
            intro="Industrial hemp feeds established international value chains in fibre, building materials, seed and pharmaceutical raw material. Ghana now has a legal route into them, and very few licensed producers so far."
          />
          <dl className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
            {marketContext.map((item) => (
              <div key={item.label} className="flex flex-col bg-white p-8">
                <dt className="order-2 mt-4 font-semibold text-ink">{item.label}</dt>
                <dd className="order-1 font-display text-[2.6rem] leading-none text-forest">{item.figure}</dd>
                <dd className="order-3 mt-2 text-[0.92rem] text-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[0.85rem] text-muted">
            Sources: Ghana News Agency and Graphic Online (2026); European Commission, DG Agriculture and Rural Development.
            Full references are on our <TextLink href="/regulation" className="text-[0.85rem]">regulation page</TextLink> and in{" "}
            <Link href="/insights/how-the-hemp-plant-is-used" className="text-moss underline underline-offset-4">
              Insights
            </Link>
            .
          </p>
        </Container>
      </section>

      <ImageText
        id="model-title"
        eyebrow="Business model"
        title="Grow well, document everything, supply licensed buyers"
        image="hulledSeed"
        aspect="aspect-square"
        tone="parchment"
      >
        <p>
          HempWealth Ghana&apos;s model is agricultural. We grow low-THC hemp under licence and supply plant material to
          licensed processors under agreed specifications, starting with biomass for pharmaceutical and industrial
          processing.
        </p>
        <p>
          Revenue would come from supply contracts. Fibre, hurd and seed markets may be developed as processing capacity in
          Ghana grows. The model depends on reliable agronomy, strict compliance and documentation that buyers can verify.
        </p>
        <p>
          <TextLink href="/about">Company background</TextLink>
        </p>
      </ImageText>

      <section aria-labelledby="stage-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="stage-title"
              eyebrow="Current development stage"
              title="Where the project stands"
              intro="We distinguish what exists today from what is proposed or under evaluation."
            />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {stage.map((row) => (
              <li key={row.label} className="grid gap-3 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-start sm:gap-8">
                <span className="font-semibold text-ink">{row.label}</span>
                <span className="text-muted">{row.text}</span>
                <span>
                  <Tag tone={row.status === "Existing" ? "neutral" : "gold"}>{row.status}</Tag>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="priorities-title" className="on-dark bg-evergreen py-20 text-ivory lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow tone="light">Development priorities</Eyebrow>
            <h2 id="priorities-title" className="mt-5 text-h2">
              What capital and partnership would build
            </h2>
          </div>
          <ol className="space-y-6">
            {[
              "Completing licensing for cultivation and the related activities the first phase requires",
              "Site preparation, irrigation and security for the 50-acre Phase 1 area",
              "Drying, storage and handling capacity for documented, stable harvests",
              "Variety trials and agronomic data under local conditions",
              "Quality systems, laboratory relationships and buyer documentation",
            ].map((priority, index) => (
              <li key={priority} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ivory/10 pb-6">
                <span className="font-display text-2xl text-gold">{index + 1}</span>
                <span className="text-sage-soft">{priority}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="partners-title" className="bg-ivory py-20 lg:py-28">
        <Container>
          <SectionHeader id="partners-title" eyebrow="Partnership categories" title="Ways to work with HempWealth Ghana" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnershipTypes.map((type) => (
              <li key={type.title} className="reveal rounded-md border border-line bg-white p-7">
                <h3 className="font-display text-xl text-forest">{type.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{type.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="due-diligence" aria-labelledby="diligence-title" className="scroll-mt-24 bg-white py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="diligence-title"
            eyebrow="Due diligence"
            title="A process built for scrutiny"
            intro="We expect serious partners to verify everything we tell them, and we prepare for it."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {diligence.map((step, index) => (
              <li key={step.title} className="border-t-2 border-gold pt-6">
                <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-gold-ink">STEP {index + 1}</span>
                <h3 className="mt-3 font-display text-xl text-forest">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="bg-parchment py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-title" className="mt-5 text-h2 text-forest">
              Frequently asked questions
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      <section id="partner-enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Investor and partner enquiries</Eyebrow>
            <h2 id="enquiry-title" className="mt-5 text-h2 text-forest">
              Start a conversation
            </h2>
            <p className="mt-6 text-muted">
              Tell us who you are and what you are looking for. We respond to qualified enquiries personally.
            </p>
            <div className="mt-8 rounded-md bg-parchment p-6 text-[0.9rem] text-muted">
              <p className="font-semibold text-ink">Important notice</p>
              <p className="mt-2">
                Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security or investment.
                It is not investment advice. Read our{" "}
                <Link href="/disclaimer" className="text-moss underline underline-offset-4">
                  disclaimer
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="rounded-md border border-line bg-ivory p-6 sm:p-10 lg:col-span-8">
            <EnquiryForm categories={["investor", "strategic", "agricultural"]} defaultCategory="investor" />
          </div>
        </Container>
      </section>
    </>
  );
}
