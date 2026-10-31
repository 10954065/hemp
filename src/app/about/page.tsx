import { CtaBand } from "@/components/sections/CtaBand";
import { ImageText } from "@/components/sections/ImageText";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About the company",
  description:
    "HempWealth Ghana is a Ghanaian-owned agricultural company, incorporated in 2024, building a regulated industrial hemp business for licensed industrial and pharmaceutical supply chains.",
  path: "/about",
});

const principles = [
  {
    title: "Compliance before scale",
    text: "We grow only what our licences allow, where they allow it. Expansion follows regulatory approval and committed demand, not the other way round.",
  },
  {
    title: "Evidence over claims",
    text: "Partners should be able to verify what we say. We document cultivation, testing and handling so that our statements can be checked.",
  },
  {
    title: "Agronomy first",
    text: "Hemp is a demanding crop in a new environment. We will learn from field trials and local conditions rather than assume yields from other climates.",
  },
  {
    title: "Rooted in community",
    text: "Our first project is in a farming district. We aim to create skilled rural employment and to work with local landowners and leaders transparently.",
  },
];

const objectives = [
  {
    horizon: "Near term",
    title: "Establish a compliant first phase",
    text: "Secure the required licences, prepare the planned 50-acre site and complete initial cultivation cycles with full documentation.",
  },
  {
    horizon: "Medium term",
    title: "Become a reliable supply partner",
    text: "Build supply relationships with licensed processors, supported by consistent quality, independent testing and dependable logistics.",
  },
  {
    horizon: "Long term",
    title: "Help build a Ghanaian value chain",
    text: "Contribute to processing, research and skills in Ghana, so that more of the value created by the crop stays in the country.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the company"
        title="A Ghanaian enterprise for a newly regulated crop"
        intro={
          <p>
            HempWealth Ghana was formed to build a serious, compliant industrial hemp business in Ghana. We focus on
            cultivation done properly, with the documentation that regulators and industrial buyers expect.
          </p>
        }
        breadcrumbs={[{ label: "About", href: "/about" }]}
        image="ashantiLandscape"
      />

      <section aria-labelledby="background-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Background</Eyebrow>
            <h2 id="background-title" className="mt-5 text-h2 text-forest">
              Why HempWealth Ghana exists
            </h2>
          </div>
          <div className="space-y-6 text-[1.05rem] lg:col-span-7 lg:col-start-6">
            <p className="text-lead text-ink">
              For years, cannabis of any kind could not be grown lawfully in Ghana. That changed when Parliament created a
              licensing route for low-THC cannabis grown strictly for industrial and medicinal purposes.
            </p>
            <p>
              HempWealth Ghana was incorporated in {company.incorporation.year} under the {company.incorporation.statute}{" "}
              to take part in that new sector from the start. The company is Ghanaian-owned, a requirement for licensed
              operators under the Cultivation and Management of Cannabis Regulations, 2023 (L.I. 2475).
            </p>
            <p>
              Our business is agricultural. We intend to grow and supply industrial hemp to licensed processors, both
              industrial and pharmaceutical. We do not make or sell consumer cannabis products, and the law does not allow
              recreational use.
            </p>
            <TextLink href="/regulation">Read our summary of Ghana&apos;s regulatory framework</TextLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="purpose-title" className="on-dark bg-evergreen py-20 text-ivory lg:py-28">
        <Container>
          <h2 id="purpose-title" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow tone="light">Our mission</Eyebrow>
              <p className="mt-6 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] leading-snug">
                To grow industrial hemp in Ghana to a standard that regulated buyers can trust, and document every step of
                it.
              </p>
              <p className="mt-6 text-sage-soft">
                Our mission is deliberately operational. Industrial and pharmaceutical buyers do not buy promises. They
                buy consistent material with records they can rely on.
              </p>
            </div>
            <div className="lg:border-l lg:border-ivory/15 lg:pl-20">
              <Eyebrow tone="light">Our vision</Eyebrow>
              <p className="mt-6 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] leading-snug">
                A Ghanaian hemp sector that competes internationally on quality, transparency and responsible practice.
              </p>
              <p className="mt-6 text-sage-soft">
                We want to show that a West African grower can meet the standards of the world&apos;s most demanding
                markets, and to help build the local capability to do so.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="bg-ivory py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="principles-title"
            eyebrow="Operating philosophy"
            title="Four principles guide how we work"
            align="split"
            intro="They are commitments we expect partners to hold us to, and the basis on which we make decisions about growth."
          />
          <ol className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {principles.map((principle, index) => (
              <li key={principle.title} className="reveal grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-8">
                <span className="font-display text-3xl text-gold-ink">{index + 1}</span>
                <div>
                  <h3 className="text-h3 text-forest">{principle.title}</h3>
                  <p className="mt-3 text-muted">{principle.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ImageText
        id="responsible-title"
        eyebrow="Responsible cultivation"
        title="Responsibility is designed in, not added later"
        image="soilHealth"
        aspect="aspect-[4/3]"
        caption="Field soil assessment."
        illustrative
        reverse
        tone="white"
      >
        <p>
          Responsible cultivation starts with site selection. Under L.I. 2475, cultivation sites must be at least 100
          metres from schools and residential areas, and licences are tied to a specific site. We plan around those
          rules from the outset.
        </p>
        <p>
          It continues in the field: certified low-THC seed, monitoring through the season, careful use of inputs, and
          attention to soil and water. After harvest it depends on secure storage, batch identification and controlled
          transport.
        </p>
        <p>
          We will also report openly to the Narcotics Control Commission, which inspects licensed premises and requires
          quarterly returns, and to partners who need assurance about how material was produced.
        </p>
      </ImageText>

      <section aria-labelledby="objectives-title" className="bg-parchment py-20 lg:py-28">
        <Container>
          <SectionHeader id="objectives-title" eyebrow="Long-term objectives" title="Where we are heading" />
          <ol className="mt-14 grid gap-6 lg:grid-cols-3">
            {objectives.map((objective) => (
              <li key={objective.title} className="reveal rounded-md bg-white p-8 shadow-soft">
                <p className="text-eyebrow font-semibold uppercase text-gold-ink">{objective.horizon}</p>
                <h3 className="mt-4 text-h3 text-forest">{objective.title}</h3>
                <p className="mt-4 text-muted">{objective.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-[0.92rem] text-muted">
            These are objectives, not forecasts. Progress depends on licensing decisions, field results and commercial
            agreements, and we report it as it happens.
          </p>
        </Container>
      </section>

      <CtaBand
        id="about-cta"
        eyebrow="Work with us"
        title="Talk to us about the opportunity"
        image="cropSummer"
        actions={
          <>
            <ButtonLink href="/opportunity" variant="light" withArrow>
              Investment and partnerships
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Contact our team
            </ButtonLink>
          </>
        }
      >
        <p>We welcome enquiries from investors, licensed processors, agricultural partners and institutions.</p>
      </CtaBand>
    </>
  );
}
