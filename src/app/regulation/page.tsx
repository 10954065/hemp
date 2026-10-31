import { PageHero } from "@/components/sections/PageHero";
import { SourceList } from "@/components/sections/SourceList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getSources,
  institutions,
  instruments,
  keyConditions,
  lastReviewed,
  licenceCategories,
  sources,
  timeline,
} from "@/content/regulation";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Regulation and compliance in Ghana",
  description:
    "A sourced summary of how Ghana regulates industrial hemp and low-THC cannabis: Act 1019, Act 1100, L.I. 2475, licence categories, institutions, and what each licence does and does not authorise.",
  path: "/regulation",
});

const distinctions = [
  {
    heading: "What the law permits",
    text: "Licensed cultivation and handling of cannabis with no more than 0.3% THC on a dry weight basis, strictly for industrial and medicinal purposes. Recreational use remains prohibited.",
  },
  {
    heading: "What a business must obtain",
    text: "A separate, site-specific licence for each activity it performs, granted by the Minister for the Interior on the Commission's recommendation, plus any product approvals required downstream.",
  },
  {
    heading: "What HempWealth Ghana has demonstrated",
    text: "The company does not publish licence documents on this website. Its licensing status, and the activities and sites it covers, is provided to qualified parties during due diligence.",
  },
  {
    heading: "What remains subject to verification",
    text: "Any statement about a specific company's authorisation, including ours. Check it against the licence documents and, where appropriate, with the Narcotics Control Commission.",
  },
];

const categoryDistinctions = [
  {
    title: "Industrial hemp (low-THC)",
    text: "Cannabis sativa varieties with no more than 0.3% THC, grown under licence for fibre, seed, biomass or medicinal raw material. This is the category HempWealth Ghana works in.",
  },
  {
    title: "Medicinal products",
    text: "Finished products intended for medical use. Beyond cultivation licensing, they are subject to product approval and manufacturing requirements, including those of the Food and Drugs Authority.",
  },
  {
    title: "Other cannabis",
    text: "Cannabis above the 0.3% THC limit, and any recreational sale, purchase, possession or use without lawful authority, remains a criminal offence in Ghana.",
  },
];

const complianceConsiderations = [
  "Product specifications: a licence permits an activity. The material produced must still meet the THC limit and any buyer or market specification, supported by laboratory testing.",
  "Site conditions: licences are site-specific, and sites must respect the regulations' distance rules from schools and residential areas.",
  "Records and reporting: licensees must keep records, accept inspections and submit quarterly returns to the Commission.",
  "Transfers: licences cannot be transferred without the Minister's express approval.",
  "Cross-border trade: export and import each require a licence in Ghana, as well as the counterparty country's permits.",
];

export default function RegulationPage() {
  return (
    <>
      <PageHero
        variant="plain"
        eyebrow="Regulation and compliance"
        title="How Ghana regulates industrial hemp"
        intro={
          <>
            <p>
              A plain-language summary of the legal framework for low-THC cannabis in Ghana, with links to the sources it
              draws on. It is general information, not legal advice.
            </p>
            <p className="mt-4 text-[0.95rem]">
              <span className="font-semibold text-ink">Last reviewed:</span>{" "}
              <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time>
            </p>
          </>
        }
        breadcrumbs={[{ label: "Regulation", href: "/regulation" }]}
      />

      <section aria-labelledby="distinctions-title" className="bg-white py-20 lg:py-24">
        <Container>
          <SectionHeader
            id="distinctions-title"
            eyebrow="Read this first"
            title="A law existing is not the same as a licence being held"
            intro="Discussions of Ghana's hemp sector often blur four different questions. We keep them separate."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {distinctions.map((item, index) => (
              <li key={item.heading} className="bg-white p-7">
                <span className="font-display text-3xl text-gold-ink">{index + 1}</span>
                <h3 className="mt-4 font-display text-xl text-forest">{item.heading}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="legislation-title" className="bg-ivory py-20 lg:py-28">
        <Container>
          <SectionHeader id="legislation-title" eyebrow="Legislation" title="The instruments that make up the framework" />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {instruments.map((instrument) => (
              <article key={instrument.short} className="grid gap-4 py-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
                <div>
                  <p className="text-eyebrow font-semibold uppercase text-gold-ink">{instrument.short}</p>
                  <h3 className="mt-2 font-display text-xl leading-snug text-forest">{instrument.name}</h3>
                </div>
                <div>
                  <p className="text-ink/90">{instrument.summary}</p>
                  <p className="mt-3 text-[0.85rem] text-muted">
                    Source{instrument.sourceIds.length > 1 ? "s" : ""}:{" "}
                    {getSources(instrument.sourceIds).map((source, index) => (
                      <span key={source.id}>
                        {index > 0 && "; "}
                        <a href={source.url} rel="noopener noreferrer" className="text-moss underline underline-offset-4">
                          {source.publisher}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="timeline-title" className="on-dark bg-evergreen py-20 text-ivory lg:py-28">
        <Container>
          <SectionHeader id="timeline-title" tone="light" eyebrow="Timeline" title="From Act 1019 to the first licences" />
          <ol className="mt-14 grid gap-10 border-l border-ivory/20 pl-8 lg:grid-cols-3 lg:border-l-0 lg:pl-0">
            {timeline.map((entry) => (
              <li key={entry.label} className="relative lg:border-t lg:border-ivory/20 lg:pt-6">
                <span aria-hidden="true" className="absolute -left-[2.3rem] top-1.5 size-2.5 rounded-full bg-gold lg:-top-[0.35rem] lg:left-0" />
                <p className="text-eyebrow font-semibold uppercase text-gold">{entry.date}</p>
                <h3 className="mt-2 font-display text-xl">{entry.label}</h3>
                <p className="mt-2 text-[0.95rem] text-sage-soft">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="licensing-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Licensing and authorisation</Eyebrow>
            <h2 id="licensing-title" className="mt-5 text-h2 text-forest">
              Eleven licence categories under L.I. 2475
            </h2>
            <p className="mt-6 text-muted">
              Each activity needs its own licence. Holding one does not authorise the others.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {licenceCategories.map((category) => (
                <li key={category} className="rounded-full border border-forest/20 bg-ivory px-4 py-1.5 text-[0.9rem] text-forest">
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-h3 text-forest">Key conditions</h3>
            <ul className="mt-6 space-y-4">
              {keyConditions.map((condition) => (
                <li key={condition} className="flex gap-4 border-b border-line pb-4">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-gold" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="categories-title" className="bg-parchment py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="categories-title"
            eyebrow="Legal categories"
            title="Industrial hemp, medicinal products and other cannabis are different things"
            intro="They come from the same plant species but are treated differently in law. Treating them as interchangeable leads to serious misunderstanding."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {categoryDistinctions.map((item) => (
              <article key={item.title} className="rounded-md bg-white p-8 shadow-soft">
                <h3 className="font-display text-xl text-forest">{item.title}</h3>
                <p className="mt-3 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="institutions-title" className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeader id="institutions-title" eyebrow="Institutions" title="Who does what" />
          <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {institutions.map((institution) => (
              <div key={institution.name} className="border-t border-forest/20 pt-6">
                <dt className="font-display text-xl text-forest">
                  {institution.url ? (
                    <a href={institution.url} rel="noopener noreferrer" className="underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
                      {institution.name}
                    </a>
                  ) : (
                    institution.name
                  )}
                </dt>
                <dd className="mt-3 text-muted">{institution.role}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="compliance-title" className="bg-ivory py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Documentation and compliance</Eyebrow>
            <h2 id="compliance-title" className="mt-5 text-h2 text-forest">
              What compliance looks like in practice
            </h2>
          </div>
          <ul className="space-y-5 lg:col-span-7">
            {complianceConsiderations.map((item) => {
              const [lead, ...rest] = item.split(": ");
              return (
                <li key={item} className="rounded-md border border-line bg-white p-6">
                  <p>
                    <span className="font-semibold text-ink">{lead}.</span> <span className="text-muted">{rest.join(": ")}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-label="Sources and disclaimer" className="bg-white py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SourceList
              heading="Official and published sources"
              id="regulation-sources"
              sources={sources.map((source) => ({
                title: source.title,
                publisher: source.official ? `${source.publisher} (official)` : source.publisher,
                url: source.url,
                date: source.date ? formatDate(source.date) : undefined,
              }))}
            />
          </div>
          <aside className="h-fit rounded-md bg-parchment p-8 lg:col-span-4 lg:col-start-9" aria-labelledby="not-advice">
            <h2 id="not-advice" className="font-display text-xl text-forest">
              Not legal advice
            </h2>
            <p className="mt-3 text-[0.95rem] text-muted">
              This summary may not reflect later amendments, regulatory guidance or court decisions. Anyone planning
              activity under the framework should take advice from a qualified Ghanaian legal practitioner and confirm
              requirements with the Narcotics Control Commission.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact?type=institutional" variant="secondary">
                Institutional enquiries
              </ButtonLink>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
