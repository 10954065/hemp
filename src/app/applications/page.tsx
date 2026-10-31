import Image from "next/image";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { applications, maturityLabel, relevanceLabel } from "@/content/applications";
import type { Application } from "@/content/applications";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industrial hemp applications",
  description:
    "How industrial hemp fibre, hurd, seed and biomass are used across pharmaceutical supply, textiles, construction, paper, oils and agriculture, and where HempWealth Ghana focuses.",
  path: "/applications",
});

function ApplicationSection({ application, index }: { application: Application; index: number }) {
  const image = images[application.image];
  const reverse = index % 2 === 1;
  const ctaHref = application.slug === "pharmaceutical" ? "/pharmaceutical-supply" : "/contact?type=strategic";
  const ctaLabel = application.slug === "pharmaceutical" ? "Pharmaceutical supply" : "Discuss this application";

  return (
    <section id={application.slug} aria-labelledby={`${application.slug}-title`} className="scroll-mt-28 border-t border-line py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : ""}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-parchment lg:sticky lg:top-28">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : "lg:col-start-7"}`}>
          <div className="flex flex-wrap gap-2">
            <Tag tone={application.relevance === "stated-focus" ? "gold" : "neutral"}>
              {relevanceLabel[application.relevance]}
            </Tag>
            <Tag>{maturityLabel[application.maturity]}</Tag>
          </div>
          <h2 id={`${application.slug}-title`} className="mt-5 text-h2 text-forest">
            {application.title}
          </h2>
          <p className="mt-5 text-lead text-ink">{application.summary}</p>
          <div className="mt-5 space-y-4 text-muted">
            {application.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-eyebrow font-semibold uppercase text-gold-ink">Plant material</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5">
                  {application.plantParts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow font-semibold uppercase text-gold-ink">Typical uses</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5">
                  {application.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-eyebrow font-semibold uppercase text-gold-ink">Quality and regulatory considerations</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5 text-muted">
                  {application.considerations.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="mt-8">
            <TextLink href={ctaHref}>{ctaLabel}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrial applications"
        title="What industrial hemp is used for"
        intro={
          <p>
            Hemp is grown for its fibre, its woody core, its seed and its flowering biomass, and each one leads to a
            different industry. This page explains those uses and is clear about which ones HempWealth Ghana is pursuing.
          </p>
        }
        breadcrumbs={[{ label: "Applications", href: "/applications" }]}
        image="bastFibre"
      />

      <section aria-labelledby="key-title" className="bg-white">
        <Container className="py-12">
          <h2 id="key-title" className="text-eyebrow font-semibold uppercase text-gold-ink">
            How to read this page
          </h2>
          <dl className="mt-6 grid gap-6 md:grid-cols-3">
            {(Object.keys(relevanceLabel) as (keyof typeof relevanceLabel)[]).map((key) => (
              <div key={key} className="rounded-md border border-line p-5">
                <dt>
                  <Tag tone={key === "stated-focus" ? "gold" : "neutral"}>{relevanceLabel[key]}</Tag>
                </dt>
                <dd className="mt-3 text-[0.95rem] text-muted">
                  {key === "stated-focus" && "The company's declared business focus, subject to licensing and buyer requirements."}
                  {key === "prospective" && "An opportunity the company may evaluate in future. It is not currently offered."}
                  {key === "context" && "General industry information. HempWealth Ghana does not supply these markets."}
                </dd>
              </div>
            ))}
          </dl>
          <nav aria-label="Applications on this page" className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem]">
              {applications.map((application) => (
                <li key={application.slug}>
                  <a href={`#${application.slug}`} className="link-underline font-medium text-moss">
                    {application.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <div className="bg-white">
        <Container>
          {applications.map((application, index) => (
            <ApplicationSection key={application.slug} application={application} index={index} />
          ))}
        </Container>
      </div>

      <CtaBand
        id="applications-cta"
        eyebrow="Next steps"
        title="Discuss supply, processing or partnership"
        image="stalkFibre"
        actions={
          <>
            <ButtonLink href="/pharmaceutical-supply" variant="light" withArrow>
              Pharmaceutical supply
            </ButtonLink>
            <ButtonLink href="/opportunity" variant="outline-light">
              Investment and partnerships
            </ButtonLink>
          </>
        }
      >
        <p>
          If you process hemp fibre, seed or biomass, or plan to, we would like to understand your requirements as we plan
          future phases.
        </p>
      </CtaBand>
    </>
  );
}
