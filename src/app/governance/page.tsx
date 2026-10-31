import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Corporate governance",
  description:
    "How HempWealth Ghana is owned, governed and held accountable: board and management structure, compliance responsibilities, risk management and institutional contact.",
  path: "/governance",
});

const structure = [
  {
    level: "Board of Directors",
    role: "Sets strategy, approves major commitments, oversees risk and compliance, and holds management to account.",
  },
  {
    level: "Executive management",
    role: "Runs the business day to day: operations, finance, partnerships and reporting to the board.",
  },
  {
    level: "Operational functions",
    role: "Agronomy and field operations; quality control and environmental compliance; security and site management; administration.",
  },
];

const principles = [
  { title: "Legality", text: "No activity is carried out without the licence that authorises it, at the site it covers." },
  { title: "Accountability", text: "Every regulatory obligation has a named owner within the organisation." },
  { title: "Transparency", text: "Regulators, partners and investors receive accurate, documented information, including when news is unfavourable." },
  { title: "Integrity", text: "Conflicts of interest are declared and managed. We do not use intermediaries to obtain approvals." },
];

const risks = [
  {
    risk: "Regulatory",
    description: "Licences are delayed, conditioned or not granted, or the framework changes.",
    response: "Plan phases around approvals, engage regulators directly, and monitor legal developments with professional advice.",
  },
  {
    risk: "Agronomic",
    description: "Varieties underperform in local conditions, or THC levels drift towards the legal limit.",
    response: "Field trials, certified seed, in-season monitoring and pre-harvest testing.",
  },
  {
    risk: "Security and diversion",
    description: "Theft or diversion of plant material.",
    response: "Site security, controlled access, licensed storage and transport, and reconciled batch records.",
  },
  {
    risk: "Commercial",
    description: "Demand, prices or buyer requirements differ from expectations.",
    response: "Scale in step with committed demand. Develop relationships before expanding.",
  },
  {
    risk: "Environmental and social",
    description: "Harm to soil, water or community relationships.",
    response: "Baseline testing, measured input use, and open engagement with landowners and local leaders.",
  },
];

const regulatoryDuties = [
  "Hold and comply with the licences required for each activity and site under L.I. 2475",
  "Keep complete records and submit quarterly returns to the Narcotics Control Commission",
  "Allow inspection of licensed premises and cooperate with regulators",
  "Maintain THC compliance through certified seed and laboratory testing",
  "Meet company-law obligations under the Companies Act, 2019 (Act 992)",
  "Protect personal data in line with the Data Protection Act, 2012 (Act 843)",
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        variant="plain"
        eyebrow="Corporate governance"
        title="Governed for accountability, structured for scrutiny"
        intro={
          <p>
            A regulated business is only as credible as its governance. This page explains how HempWealth Ghana is owned,
            directed and held to account, and how institutional stakeholders can engage with us.
          </p>
        }
        breadcrumbs={[{ label: "Governance", href: "/governance" }]}
      />

      <section aria-labelledby="ownership-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Ownership</Eyebrow>
            <h2 id="ownership-title" className="mt-5 text-h2 text-forest">
              A Ghanaian-owned company
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            <p className="text-lead text-ink">
              {company.name} is a Ghanaian-owned private company incorporated in {company.incorporation.year} under the{" "}
              {company.incorporation.statute}.
            </p>
            <p>
              Ghanaian ownership is also a regulatory requirement. Under L.I. 2475, a corporate licence applicant must be at
              least 50% Ghanaian-owned, and a majority of its directors must be Ghanaian.
            </p>
            <p className="text-muted">
              The company&apos;s registered details are held by the Office of the Registrar of Companies. Ownership and
              incorporation documents are provided to qualified investors and partners during due diligence.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="structure-title" className="bg-parchment py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="structure-title"
            eyebrow="Leadership structure"
            title="Board, management and operating functions"
            align="split"
            intro="The board's composition spans banking, law, medicine, accountancy and agribusiness. Executive management brings operational and agronomic experience."
          />
          <ol className="mx-auto mt-14 max-w-3xl">
            {structure.map((tier, index) => (
              <li key={tier.level} className="relative">
                <div className="rounded-md border border-line bg-white p-7 text-center shadow-soft">
                  <h3 className="font-display text-xl text-forest">{tier.level}</h3>
                  <p className="mx-auto mt-3 max-w-xl text-[0.95rem] text-muted">{tier.role}</p>
                </div>
                {index < structure.length - 1 && (
                  <span aria-hidden="true" className="mx-auto block h-10 w-px bg-gold" />
                )}
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-12 max-w-3xl rounded-md border border-dashed border-forest/30 p-7 text-center">
            <p className="font-semibold text-ink">Director and management profiles</p>
            <p className="mt-2 text-[0.95rem] text-muted">
              Individual profiles will be published here once they are approved for publication. In the meantime, details
              of directors and senior management are available to qualified parties on request.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeader id="principles-title" eyebrow="Governance principles" title="The standards we hold ourselves to" />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <div key={principle.title} className="bg-white p-7">
                <dt className="font-display text-xl text-forest">{principle.title}</dt>
                <dd className="mt-3 text-[0.95rem] text-muted">{principle.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="accountability-title" className="on-dark bg-evergreen py-20 text-ivory lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow tone="light">Operational accountability</Eyebrow>
            <h2 id="accountability-title" className="mt-5 text-h2">
              A named owner for every obligation
            </h2>
            <p className="mt-6 text-sage-soft">
              Compliance is assigned, not assumed. A designated Quality Control and Environmental Officer is responsible for
              record-keeping, regulatory reporting and adherence to cultivation standards, and reports to executive
              management and the board.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl">Regulatory responsibilities</h3>
            <ul className="mt-6 space-y-4">
              {regulatoryDuties.map((duty) => (
                <li key={duty} className="flex gap-4 border-b border-ivory/10 pb-4 text-sage-soft">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-gold" />
                  {duty}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="risk-title" className="bg-ivory py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="risk-title"
            eyebrow="Risk management"
            title="The principal risks, and how we manage them"
            intro="An early-stage business in a new regulated sector carries real risks. We would rather set them out plainly."
          />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Principal risks and management responses</caption>
              <thead>
                <tr className="border-b border-forest/30 text-[0.8rem] uppercase tracking-[0.14em] text-muted">
                  <th scope="col" className="w-44 py-3 pr-6 font-semibold">
                    Risk
                  </th>
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    What could happen
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    How we manage it
                  </th>
                </tr>
              </thead>
              <tbody>
                {risks.map((row) => (
                  <tr key={row.risk} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-6 font-display text-lg font-normal text-forest">
                      {row.risk}
                    </th>
                    <td className="py-5 pr-6 text-muted">{row.description}</td>
                    <td className="py-5">{row.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section aria-labelledby="esg-title" className="bg-white py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Environmental and social responsibility</Eyebrow>
            <h2 id="esg-title" className="mt-5 text-h2 text-forest">
              Commitments we expect to be measured against
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            <p>
              We commit to protecting the soil and water at our sites, using agricultural inputs responsibly, creating fair
              rural employment, and engaging openly with the communities around our operations.
            </p>
            <p className="text-muted">
              As operations begin, we intend to adopt formal environmental and social policies and report against them.
              They will be published here when adopted.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        id="governance-cta"
        eyebrow="Institutional stakeholders"
        title="Engage with our governance"
        actions={
          <>
            <ButtonLink href="/contact?type=institutional" variant="light" withArrow>
              Institutional enquiry
            </ButtonLink>
            <ButtonLink href="/contact?type=investor" variant="outline-light">
              Investor enquiry
            </ButtonLink>
          </>
        }
      >
        <p>
          Regulators, government bodies, research institutions and development partners are welcome to contact us
          directly.
        </p>
      </CtaBand>
    </>
  );
}
