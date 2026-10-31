import { CtaBand } from "@/components/sections/CtaBand";
import { Figure } from "@/components/sections/Figure";
import { ImageText } from "@/components/sections/ImageText";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { project } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cultivation and operations",
  description:
    "HempWealth Ghana's proposed 50-acre industrial hemp project at Drobonso, Ashanti Region: site, cultivation stages, harvest planning, quality control and traceability.",
  path: "/cultivation",
});

type StatusRow = { item: string; detail: string; status: "Planned" | "In preparation" | "Shared in due diligence" };

const projectStatus: StatusRow[] = [
  { item: "Phase 1 area", detail: `${project.acreage.value} acres`, status: "Planned" },
  {
    item: "Cultivation site",
    detail: `${project.location.town}, ${project.location.district}, ${project.location.region}`,
    status: "Planned",
  },
  { item: "Licensing under L.I. 2475", detail: "Cultivation and related activity licences", status: "Shared in due diligence" },
  { item: "Seed and variety selection", detail: "Certified low-THC varieties suited to local conditions", status: "In preparation" },
  { item: "Processing and storage", detail: "Drying, storage and handling infrastructure", status: "In preparation" },
];

const stages = [
  {
    title: "Site and soil preparation",
    text: "Soil testing, land clearing where needed, drainage and access planning, and confirming that the site meets the regulations' distance requirements.",
  },
  {
    title: "Variety selection and planting",
    text: "Certified seed of low-THC varieties, with planting density and timing chosen for the intended end use, whether biomass, fibre or seed.",
  },
  {
    title: "Crop management",
    text: "Monitoring growth, pests, disease and nutrient status, with field records kept for each planting block.",
  },
  {
    title: "Pre-harvest testing",
    text: "Sampling and laboratory testing to confirm that THC content remains within the 0.3% legal limit before harvest.",
  },
  {
    title: "Harvest and post-harvest handling",
    text: "Timed harvesting, drying to a stable moisture content, and secure storage with batch identification.",
  },
  {
    title: "Documentation and dispatch",
    text: "Batch records, certificates of analysis and licensed transport to the receiving processor.",
  },
];

const qualityControls = [
  { title: "Seed provenance", text: "Certified seed, with supplier documentation retained for every lot planted." },
  { title: "Field records", text: "Planting dates, inputs applied, weather events and observations logged per block." },
  { title: "THC compliance testing", text: "Testing before harvest by a competent laboratory, with results kept on file." },
  { title: "Batch identification", text: "Each harvest lot carries an identifier that links it back to its field records." },
  { title: "Secure storage", text: "Controlled, licensed storage that protects quality and prevents diversion." },
  { title: "Chain of custody", text: "Documented hand-over at every transfer, from field to processor." },
];

export default function CultivationPage() {
  return (
    <>
      <PageHero
        variant="photo"
        image="fieldWide"
        eyebrow="Cultivation and operations"
        title="A documented first phase in the Ashanti Region"
        intro={
          <p>
            HempWealth Ghana&apos;s first project is a proposed 50-acre cultivation site at {project.location.town}. Here
            we set out what is planned, how the operation is designed to work, and the controls that make a harvest
            traceable.
          </p>
        }
        breadcrumbs={[{ label: "Cultivation", href: "/cultivation" }]}
      >
        <ButtonLink href="/contact?type=agricultural" variant="light" withArrow>
          Agricultural partnerships
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="overview-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="overview-title"
              eyebrow="Project overview"
              title="What is planned, and what comes next"
              intro="This is a project in development. We label each element by its status, so the difference between established operations and plans is always clear."
            />
          </div>
          <div className="lg:col-span-7">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Phase 1 project elements and their current status</caption>
              <thead>
                <tr className="border-b border-forest/30 text-[0.8rem] uppercase tracking-[0.14em] text-muted">
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Element
                  </th>
                  <th scope="col" className="hidden py-3 pr-4 font-semibold sm:table-cell">
                    Detail
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectStatus.map((row) => (
                  <tr key={row.item} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-4 font-semibold text-ink">
                      {row.item}
                      <span className="mt-1 block text-[0.9rem] font-normal text-muted sm:hidden">{row.detail}</span>
                    </th>
                    <td className="hidden py-5 pr-4 text-muted sm:table-cell">{row.detail}</td>
                    <td className="py-5">
                      <Tag tone={row.status === "Planned" ? "gold" : "neutral"}>{row.status}</Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <ImageText
        id="location-title"
        eyebrow="Geographic context"
        title="Drobonso, on the edge of the Afram Plains"
        image="ashantiLandscape"
        aspect="aspect-[4/3]"
        caption="Forest and woodland in the Ashanti Region."
        tone="parchment"
      >
        <p>
          Drobonso is the district capital of the Sekyere Afram Plains District in the north-east of the Ashanti Region.
          It is a predominantly agricultural area at the transition between Ghana&apos;s forest belt and the savannah of
          the Afram Plains.
        </p>
        <p>
          The district&apos;s farming base, land availability and access to the regional centre at Kumasi informed the
          company&apos;s choice of site. Field trials in the first seasons will establish how different hemp varieties
          perform in its soils and rainfall pattern.
        </p>
        <p className="text-[0.95rem] text-muted">
          We do not publish exact site coordinates. Licensed cultivation sites are subject to security and regulatory
          requirements. Site details are available to qualified parties during due diligence.
        </p>
      </ImageText>

      <section aria-labelledby="stages-title" className="bg-ivory py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="stages-title"
            eyebrow="Cultivation stages"
            title="From prepared ground to documented delivery"
            align="split"
            intro="Each stage produces records that travel with the harvest, which is how a regulated buyer can trust what they receive."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage, index) => (
              <li key={stage.title} className="reveal bg-ivory p-8">
                <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-gold-ink">
                  STAGE {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-h3 text-forest">{stage.title}</h3>
                <p className="mt-3 text-muted">{stage.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="harvest-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Figure
            image="harvestMachinery"
            sizes="(min-width: 1024px) 50vw, 100vw"
            caption="Mechanised hemp harvest."
            illustrative
            className="lg:col-span-6"
          />
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>Harvest planning</Eyebrow>
            <h2 id="harvest-title" className="mt-5 text-h2 text-forest">
              Planning for multiple cycles, proving them in the field
            </h2>
            <div className="mt-7 space-y-5">
              <p>
                Ghana&apos;s climate makes more than one cropping cycle a year possible. The company&apos;s plan targets up
                to {project.cyclesPerYear.value} cycles a year at the Phase 1 site.
              </p>
              <p>
                The number of harvests we achieve in practice will depend on variety, rainfall, irrigation and the
                intended end use. We will report actual harvest outcomes from field results, not from projections.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="quality-title" className="on-dark bg-evergreen py-20 text-ivory lg:py-28">
        <Container>
          <SectionHeader
            id="quality-title"
            tone="light"
            eyebrow="Quality control and traceability"
            title="Six controls that make a harvest verifiable"
            align="split"
            intro="These controls form the operating design for Phase 1. They are what licensed processors and regulators will ask to see."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {qualityControls.map((control) => (
              <li key={control.title} className="border-t border-ivory/15 pt-6">
                <h3 className="font-display text-xl">{control.title}</h3>
                <p className="mt-3 text-sage-soft">{control.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="environment-title" className="bg-parchment py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Environmental considerations</Eyebrow>
            <h2 id="environment-title" className="mt-5 text-h2 text-forest">
              Farming the land for the long term
            </h2>
          </div>
          <div className="space-y-5">
            <p>
              The site should be in better condition after each cycle, not worse. Our plans include baseline soil testing,
              measured use of fertilisers and crop-protection products, attention to erosion on cleared land, and
              responsible handling of crop residues.
            </p>
            <p>
              Hemp is studied internationally as a rotation crop, and its residues have potential uses as bedding, mulch
              and building material. We will assess these opportunities on the basis of local trial results.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="expansion-title" className="bg-white py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Infrastructure and expansion</Eyebrow>
            <h2 id="expansion-title" className="mt-5 text-h2 text-forest">
              Growing in step with licences and demand
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            <p>
              A cultivation licence covers one site and one activity. Drying, storage, transport and any processing each
              need suitable facilities and, under L.I. 2475, their own licences. We will develop this infrastructure in
              phases, alongside partners where that makes sense.
            </p>
            <p>
              Expansion beyond the first 50 acres will depend on field results, regulatory approval for additional sites,
              and committed demand from licensed buyers.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        id="cultivation-cta"
        eyebrow="Partner with us"
        title="Agricultural and strategic partners"
        image="canopyAerial"
        actions={
          <>
            <ButtonLink href="/contact?type=agricultural" variant="light" withArrow>
              Agricultural partnership enquiry
            </ButtonLink>
            <ButtonLink href="/contact?type=strategic" variant="outline-light">
              Strategic partnership
            </ButtonLink>
          </>
        }
      >
        <p>
          We are interested in working with landowners, input and equipment suppliers, agronomy specialists and
          processing partners.
        </p>
      </CtaBand>
    </>
  );
}
