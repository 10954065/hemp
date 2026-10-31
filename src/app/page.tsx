import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/sections/ArticleCard";
import { ImageText } from "@/components/sections/ImageText";
import { LandingHero } from "@/components/sections/LandingHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { applications, maturityLabel } from "@/content/applications";
import { articles } from "@/content/articles";
import { images } from "@/content/images";
import { project } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "HempWealth Ghana | Industrial hemp, built for Ghana",
    description:
      "HempWealth Ghana is developing a regulated industrial hemp cultivation project in Ghana's Ashanti Region, built for traceable supply to industrial and pharmaceutical processors.",
    path: "/",
  }),
  title: { absolute: "HempWealth Ghana | Industrial hemp, built for Ghana" },
};

const opportunityPoints = [
  {
    title: "A newly regulated sector",
    text: "Ghana opened cannabis licensing in 2026 under Act 1100 and L.I. 2475. The first cultivation licences were issued in August 2026, so the sector is at its earliest stage.",
  },
  {
    title: "A crop with industrial depth",
    text: "Fibre, hurd, seed and biomass each serve established international markets, from textiles and building materials to oils and pharmaceutical supply chains.",
  },
  {
    title: "Buyers who need traceable supply",
    text: "Regulated processors need growers who can document every batch, from certified seed to laboratory results. That discipline is what HempWealth Ghana is built around.",
  },
];

const cultivationStages = [
  { step: "01", title: "Licensing and site readiness", text: "Regulatory approvals, land preparation and soil assessment." },
  { step: "02", title: "Cultivation", text: "Certified low-THC seed, field monitoring and record-keeping." },
  { step: "03", title: "Harvest and handling", text: "Timed harvests, drying, storage and batch identification." },
  { step: "04", title: "Supply", text: "Documented delivery to licensed processors and partners." },
];

const commitments = [
  "Operate strictly within the scope of the licences we hold, at the sites they cover",
  "Grow only certified low-THC varieties and monitor THC levels through the season",
  "Keep batch-level records from seed to delivery",
  "Use independent, competent laboratories for testing",
  "Share documentation openly with regulators and qualified partners",
];

const ambitions = [
  "Good agricultural and collection practice (GACP) aligned with buyer requirements",
  "Documented quality management across cultivation and post-harvest handling",
  "Environmental monitoring of soil and water at cultivation sites",
];

const partnerRoutes = [
  {
    audience: "Investors and lenders",
    text: "Understand the business, its development stage and our due-diligence process.",
    href: "/opportunity",
    cta: "Explore the opportunity",
  },
  {
    audience: "Pharmaceutical buyers",
    text: "Discuss specifications, documentation and the regulatory steps required for supply.",
    href: "/pharmaceutical-supply",
    cta: "Pharmaceutical supply",
  },
  {
    audience: "Strategic and agricultural partners",
    text: "Processing, land, outgrower, research and technology partnerships.",
    href: "/contact?type=strategic",
    cta: "Start a conversation",
  },
];

function Opportunity() {
  return (
    <section aria-labelledby="opportunity-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader
          id="opportunity-title"
          eyebrow="Why now, why Ghana"
          title="A new industry, opening under clear rules"
          align="split"
          intro="Ghana has moved from prohibition to a licensed framework for low-THC cannabis grown for industrial and medicinal use. For agricultural businesses that can meet its standards, it opens a new crop and new export-oriented value chains."
        />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {opportunityPoints.map((point, index) => (
            <li key={point.title} className="reveal bg-white p-8 lg:p-10">
              <span className="font-display text-[2.6rem] leading-none text-gold-ink">0{index + 1}</span>
              <h3 className="mt-6 text-h3 text-forest">{point.title}</h3>
              <p className="mt-4 text-muted">{point.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          <TextLink href="/opportunity">The investment and partnership case</TextLink>
          <TextLink href="/regulation">How Ghana regulates industrial hemp</TextLink>
        </div>
      </Container>
    </section>
  );
}

function Cultivation() {
  return (
    <section aria-labelledby="cultivation-title" className="on-dark relative overflow-hidden bg-evergreen py-20 text-ivory lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow tone="light">Cultivation and operations</Eyebrow>
          <h2 id="cultivation-title" className="mt-5 text-h2">
            A 50-acre first phase in the Ashanti Region
          </h2>
          <p className="mt-6 text-lead text-sage-soft">
            The company&apos;s initial project is planned on {project.acreage.value} acres at {project.location.town} in
            the {project.location.district}. The operating model is designed around documented, licensed cultivation from
            the first season.
          </p>
          <div className="mt-10 rounded-md border border-ivory/15 bg-ivory/5 p-6">
            <p className="text-eyebrow font-semibold uppercase text-gold">Planned cultivation site</p>
            <p className="mt-3 font-display text-2xl">{project.location.town}</p>
            <p className="mt-1 text-sage-soft">
              {project.location.district}, {project.location.region}, Ghana
            </p>
          </div>
          <div className="mt-10">
            <ButtonLink href="/cultivation" variant="light" withArrow>
              Cultivation and operations
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md">
            <Image
              src={images.canopyAerial.src}
              alt={images.canopyAerial.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-[0.78rem] text-sage">
            Illustrative image: hemp canopy from above. Not a HempWealth Ghana site.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2">
            {cultivationStages.map((stage) => (
              <li key={stage.step} className="border-t border-ivory/15 pt-5">
                <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-gold">{stage.step}</span>
                <h3 className="mt-2 font-display text-xl">{stage.title}</h3>
                <p className="mt-2 text-[0.95rem] text-sage-soft">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Applications() {
  // Lead tile spans two rows on large screens; five tiles complete a balanced 3x2 grid.
  const featured = applications.slice(0, 5);
  return (
    <section aria-labelledby="applications-title" className="bg-ivory py-20 lg:py-28">
      <Container>
        <SectionHeader
          id="applications-title"
          eyebrow="Industrial applications"
          title="One crop, many value chains"
          align="split"
          intro="Each part of the hemp plant serves a different industry. These are the uses of industrial hemp worldwide, not a list of products HempWealth Ghana sells."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((application, index) => {
            const image = images[application.image];
            const isLead = index === 0;
            return (
              <li key={application.slug} className={`reveal group relative ${isLead ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}>
                <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-white transition-shadow duration-300 hover:shadow-lift">
                  <div className={`relative overflow-hidden ${isLead ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[16/10]"}`}>
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${isLead ? "object-[80%_50%]" : ""}`}
                    />
                  </div>
                  <div className="flex flex-col p-6">
                    <div>
                      <Tag tone={application.relevance === "stated-focus" ? "gold" : "neutral"}>
                        {application.relevance === "stated-focus" ? "Our stated focus" : maturityLabel[application.maturity]}
                      </Tag>
                    </div>
                    <h3 className="mt-4 text-h3 text-forest">
                      <Link href={`/applications#${application.slug}`} className="after:absolute after:inset-0">
                        {application.shortTitle}
                      </Link>
                    </h3>
                    <p className="mt-3 text-[0.95rem] text-muted">{application.summary}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <div className="mt-10">
          <TextLink href="/applications">All industrial applications</TextLink>
        </div>
      </Container>
    </section>
  );
}

function Quality() {
  return (
    <section aria-labelledby="quality-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader
          id="quality-title"
          eyebrow="Quality and compliance"
          title="Traceability is the product"
          intro="For regulated buyers, the value of a harvest depends on the evidence behind it. We separate the commitments we operate by from the standards we are working towards."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-md border border-line p-8 lg:p-10">
            <h3 className="text-h3 text-forest">How we will operate</h3>
            <ul className="mt-6 space-y-4">
              {commitments.map((item) => (
                <li key={item} className="flex gap-4">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-moss" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-parchment p-8 lg:p-10">
            <h3 className="text-h3 text-forest">Standards we are working towards</h3>
            <ul className="mt-6 space-y-4">
              {ambitions.map((item) => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-gold-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.92rem] text-muted">
              We do not display certification marks. Certifications will be listed here once they are formally awarded.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Partnership() {
  return (
    <section aria-labelledby="partnership-title" className="on-dark relative isolate overflow-hidden bg-forest text-ivory">
      <Image src={images.fieldWide.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-15" />
      <Container className="py-20 lg:py-28">
        <div className="max-w-3xl">
          <Eyebrow tone="light">Partnerships</Eyebrow>
          <h2 id="partnership-title" className="mt-5 text-h2">
            Building Ghana&apos;s industrial hemp future
          </h2>
          <p className="mt-6 text-lead text-sage-soft">
            We are looking for serious partners who share a long-term view of a regulated, export-ready Ghanaian hemp
            sector.
          </p>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {partnerRoutes.map((route) => (
            <li
              key={route.audience}
              className="group relative flex flex-col rounded-md border border-ivory/15 bg-evergreen/40 p-7 transition-colors hover:border-gold/60"
            >
              <h3 className="font-display text-2xl">{route.audience}</h3>
              <p className="mt-3 flex-1 text-sage-soft">{route.text}</p>
              <Link href={route.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-gold after:absolute after:inset-0">
                {route.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Insights() {
  return (
    <section aria-labelledby="insights-title" className="bg-ivory py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="insights-title" eyebrow="Insights" title="Research and regulatory notes" />
          <TextLink href="/insights">All insights</TextLink>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <ImageText
        id="intro-title"
        eyebrow="Who we are"
        title="A Ghanaian company, built for a regulated industry"
        image="plantDetail"
        aspect="aspect-[4/5]"
        tone="parchment"
      >
        <p>
          HempWealth Ghana was incorporated in 2024 to build an industrial hemp business in Ghana under the country&apos;s
          new legal framework. Our ambition is to become a dependable domestic source of low-THC hemp for licensed
          industrial and pharmaceutical processors.
        </p>
        <p>
          We are agricultural first. Our work is growing a demanding crop well, documenting every stage, and meeting the
          conditions that regulators and buyers set, so that partners can build products and supply chains on top of it.
        </p>
        <div className="pt-3">
          <TextLink href="/about">About the company</TextLink>
        </div>
      </ImageText>
      <Opportunity />
      <Cultivation />
      <Applications />
      <Quality />
      <section aria-labelledby="governance-title" className="border-y border-line bg-parchment py-16 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-2xl">
            <Eyebrow>Governance</Eyebrow>
            <h2 id="governance-title" className="mt-4 text-h3 text-forest lg:text-[2rem]">
              Governed for accountability, structured for scrutiny
            </h2>
            <p className="mt-4 text-muted">
              A Ghanaian-owned company incorporated under the Companies Act, 2019, with a board, executive management and
              designated responsibility for quality and environmental compliance.
            </p>
          </div>
          <div>
            <ButtonLink href="/governance" variant="secondary" withArrow>
              Corporate governance
            </ButtonLink>
          </div>
        </Container>
      </section>
      <Partnership />
      <Insights />
    </>
  );
}
