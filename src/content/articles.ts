import type { ImageKey } from "./images";

/**
 * Insights library. Articles are structured content so they can move to a CMS later
 * without changing page components. Each article cites its sources; publication and
 * review dates are real. Articles are published under the company name, not a
 * personal byline, until named authors are confirmed.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite: string };

export type ArticleSource = {
  title: string;
  publisher: string;
  url: string;
};

export type ArticleCategory = "Regulation" | "Industry" | "Applications";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  publishedAt: string;
  reviewedAt: string;
  image: ImageKey;
  body: ArticleBlock[];
  sources: ArticleSource[];
};

const EC_HEMP: ArticleSource = {
  title: "Hemp: crop productions and plant-based products",
  publisher: "European Commission, Directorate-General for Agriculture and Rural Development",
  url: "https://agriculture.ec.europa.eu/farming/crop-productions-and-plant-based-products/hemp_en",
};

export const articles: Article[] = [
  {
    slug: "ghana-cannabis-licensing-framework-explained",
    title: "Ghana's cannabis licensing framework, explained",
    dek: "How Act 1019, Act 1100 and L.I. 2475 fit together, what a licence covers, and why licensing is a matter of evidence, not assumption.",
    category: "Regulation",
    publishedAt: "2026-10-31",
    reviewedAt: "2026-10-31",
    image: "fieldWide",
    body: [
      {
        type: "p",
        text: "Ghana now has a working legal route for growing low-THC cannabis for industrial and medicinal purposes. It took six years and a Supreme Court case to get here. Anyone assessing a Ghanaian hemp business, whether as an investor, a buyer or a partner, needs to understand how the framework fits together and what it does and does not authorise.",
      },
      { type: "h2", text: "Three instruments, one regime" },
      {
        type: "p",
        text: "The starting point is the Narcotics Control Commission Act, 2020 (Act 1019), which created the Narcotics Control Commission. As enacted, section 43 of the Act allowed the Minister for the Interior to license cultivation of cannabis with no more than 0.3% tetrahydrocannabinol (THC) for industrial or medicinal purposes.",
      },
      {
        type: "p",
        text: "In July 2022 the Supreme Court struck section 43 down. Its reasoning was procedural: the provision had not been debated in Parliament as Article 106 of the Constitution requires. The Court dismissed the Attorney-General's review application in May 2023. In July 2023 Parliament debated and passed the Narcotics Control Commission (Amendment) Act, 2023 (Act 1100), restoring the licensing power.",
      },
      {
        type: "p",
        text: "The operational detail sits in the Narcotics Control Commission (Cultivation and Management of Cannabis) Regulations, 2023 (L.I. 2475). Licence fees are set separately, under fees regulations approved by Parliament in 2025.",
      },
      { type: "h2", text: "What a licence covers" },
      {
        type: "p",
        text: "L.I. 2475 does not create a single cannabis licence. It creates eleven, one for each activity: cultivation, processing, breeding, research and development, laboratory testing, storage, transportation, import, export, sales and distribution, and advertising and promotion. Licences are site-specific, last three years, are renewable, and cannot be transferred without the Minister's approval.",
      },
      {
        type: "ul",
        items: [
          "Only cannabis with no more than 0.3% THC on a dry weight basis may be cultivated.",
          "Use is limited to industrial (including fibre and seed) and medicinal purposes. Recreational use remains illegal.",
          "Corporate applicants must be at least 50% Ghanaian-owned, with a majority of Ghanaian directors.",
          "Cultivation sites may not be within 100 metres of a school or residential area.",
          "Licensees are subject to unannounced inspections and must file quarterly returns.",
        ],
      },
      { type: "h2", text: "From law to practice" },
      {
        type: "p",
        text: "The Ministry of the Interior and the Commission launched the licensing programme in February 2026, and online applications opened in March. In July 2026 the Minister told Parliament that eight companies had applied for cultivation licences. On 1 August 2026 the Commission presented its first three-year cultivation licences to two companies.",
      },
      { type: "h2", text: "Why this matters for due diligence" },
      {
        type: "p",
        text: "Because licences are activity- and site-specific, a business's regulatory position cannot be inferred from the existence of the law. A company may hold a cultivation licence and still need separate storage, transport or export licences before it can supply a buyer, and any medicinal product made downstream is also subject to Food and Drugs Authority requirements.",
      },
      {
        type: "quote",
        text: "The law makes licensed cultivation possible. Whether a particular company may carry out a particular activity at a particular site is a question for its licence documents.",
        cite: "HempWealth Ghana",
      },
      {
        type: "p",
        text: "HempWealth Ghana provides its regulatory documentation to qualified counterparties as part of due diligence. This article is general information, not legal advice. Anyone acting on the framework should take advice from a Ghanaian legal practitioner and check the Commission's current guidance.",
      },
    ],
    sources: [
      {
        title: "Ghana launches Medicinal Cannabis Regulatory Programme under strict legal framework",
        publisher: "Ghana News Agency, 27 February 2026",
        url: "https://gna.org.gh/2026/02/ghana-launches-medicinal-cannabis-regulatory-programme-under-strict-legal-framework/",
      },
      {
        title: "NCC opens online applications for cannabis cultivation and business licences",
        publisher: "Graphic Online, 11 March 2026",
        url: "https://www.graphic.com.gh/news/general-news/online-applications-open-for-cannabis-business-licences-in-ghana.html",
      },
      {
        title: "Eight companies apply to cultivate industrial cannabis in Ghana",
        publisher: "Ghana News Agency, 7 July 2026",
        url: "https://gna.org.gh/2026/07/eight-companies-apply-to-cultivate-weed-in-ghana/",
      },
      {
        title: "NACOC presents first cannabis cultivation licences to two companies",
        publisher: "Ghana News Agency, 1 August 2026",
        url: "https://gna.org.gh/2026/08/nacoc-presents-first-cannabis-cultivation-licences-to-two-companies/",
      },
      {
        title: "Cannabis law in Ghana: Supreme Court dismisses review application",
        publisher: "Graphic Online, 24 May 2023",
        url: "https://www.graphic.com.gh/news/general-news/wee-law-supreme-court-dismisses-review-application",
      },
      {
        title: "Narcotics Control Commission (Cultivation and Management of Cannabis) Regulations, 2023 (L.I. 2475)",
        publisher: "Judy.Legal",
        url: "https://www.judy.legal/legislation/akn/gh/act/li/2023/2475",
      },
    ],
  },
  {
    slug: "industrial-hemp-and-the-thc-threshold",
    title: "Industrial hemp and the 0.3% THC threshold",
    dek: "Why one number separates an agricultural commodity from a controlled substance, and how Ghana's limit compares with the EU and the United States.",
    category: "Industry",
    publishedAt: "2026-10-31",
    reviewedAt: "2026-10-31",
    image: "plantDetail",
    body: [
      {
        type: "p",
        text: "Industrial hemp and other forms of cannabis are the same plant species, Cannabis sativa L. What separates them in law is chemistry, above all the concentration of delta-9-tetrahydrocannabinol (THC), the compound mainly responsible for the plant's psychoactive effect. Varieties bred for fibre, seed and industrial biomass carry very low THC levels.",
      },
      { type: "h2", text: "Ghana's limit" },
      {
        type: "p",
        text: "Under Ghana's licensing regime, only cannabis with a THC content of no more than 0.3% on a dry weight basis may be cultivated, and only for industrial or medicinal purposes. Plants above that threshold may not be grown under a licence, and recreational use remains a criminal offence.",
      },
      { type: "h2", text: "International comparisons" },
      {
        type: "p",
        text: "The same figure appears in the two largest regulated hemp markets. In the United States, federal law defines hemp as Cannabis sativa L. with a delta-9 THC concentration of not more than 0.3 percent on a dry weight basis. In the European Union, hemp varieties cultivated with support under the Common Agricultural Policy must have a THC content below 0.3%, and must appear on the EU's common catalogue of varieties.",
      },
      {
        type: "p",
        text: "The shared threshold is useful but does not make products freely tradeable. Each jurisdiction sets its own rules on sampling, testing methods, permitted plant parts, and the status of extracts and finished goods.",
      },
      { type: "h2", text: "What it means in practice" },
      {
        type: "ul",
        items: [
          "Variety selection: growers rely on certified seed of low-THC varieties with a documented history of staying under the limit.",
          "Testing: THC levels must be measured by a competent laboratory using recognised methods, and records kept for regulators and buyers.",
          "Climate and timing: THC levels can vary with growing conditions and harvest timing, so monitoring has to run through the growing season, not only at harvest.",
          "Documentation: buyers in regulated markets typically expect a certificate of analysis for each batch.",
        ],
      },
      {
        type: "p",
        text: "For an agricultural business, staying under the threshold is a matter of operating discipline, not a single test. It shapes seed sourcing, field monitoring and record-keeping from the start.",
      },
    ],
    sources: [
      {
        title: "Ghana launches Medicinal Cannabis Regulatory Programme under strict legal framework",
        publisher: "Ghana News Agency, 27 February 2026",
        url: "https://gna.org.gh/2026/02/ghana-launches-medicinal-cannabis-regulatory-programme-under-strict-legal-framework/",
      },
      {
        title: "7 U.S. Code § 1639o: Definitions (hemp)",
        publisher: "Legal Information Institute, Cornell Law School",
        url: "https://www.law.cornell.edu/uscode/text/7/1639o",
      },
      EC_HEMP,
    ],
  },
  {
    slug: "how-the-hemp-plant-is-used",
    title: "From stalk to seed: how each part of the hemp plant is used",
    dek: "Fibre, hurd, seed and biomass lead to different industries, each with its own processing needs and buyers.",
    category: "Applications",
    publishedAt: "2026-10-31",
    reviewedAt: "2026-10-31",
    image: "stalkFibre",
    body: [
      {
        type: "p",
        text: "Industrial hemp is often described as a multi-purpose crop. That is accurate, but it can mislead. Each part of the plant feeds a different value chain, and a farm rarely serves all of them at once. Variety, planting density and harvest method depend on which market the crop is grown for.",
      },
      { type: "h2", text: "Bast fibre" },
      {
        type: "p",
        text: "The long fibres in the outer stalk are the plant's oldest commercial product. Once separated from the woody core, they are used in textiles, ropes, technical papers, insulation and natural-fibre composites. The European Commission notes their use in textiles comparable to linen, in construction products, in paper, and as plastic substitutes in vehicle manufacturing.",
      },
      { type: "h2", text: "Hurd, or shiv" },
      {
        type: "p",
        text: "The woody inner core makes up much of the stalk by weight. It is light and absorbent, and is used as animal bedding, as a horticultural mulch and, mixed with lime binders, in hempcrete for building.",
      },
      { type: "h2", text: "Seed" },
      {
        type: "p",
        text: "Hemp seed is pressed for oil or hulled for food. The European Commission lists de-hulled seed for human food and whole seed for animal feed. Seed oil is also used in cosmetics and, as a drying oil, in some coatings. Each of these uses is regulated as food, feed or cosmetics in the market where it is sold.",
      },
      { type: "h2", text: "Flowering tops and leaf" },
      {
        type: "p",
        text: "The upper plant is the raw material for extracting plant compounds, including for research and pharmaceutical supply chains. It is the most tightly regulated part of the plant. Supplying it requires the right licences at every step and laboratory documentation for each batch.",
      },
      { type: "h2", text: "Scale in an established market" },
      {
        type: "p",
        text: "The European Union shows how a hemp sector can grow under a stable rulebook. According to the European Commission, the EU area under hemp for fibre rose from 20,540 hectares in 2015 to 33,020 hectares in 2022, and production rose from 97,130 to 179,020 tonnes over the same period.",
      },
      {
        type: "ul",
        items: [
          "Fibre and hurd markets need primary processing (decortication) close to the farm.",
          "Seed markets need suitable varieties, harvest equipment and drying capacity.",
          "Biomass for extraction needs licensed storage, transport and laboratory testing.",
        ],
      },
      {
        type: "p",
        text: "For a new producer the strategic question is not whether hemp has many uses. It is which of those uses the business can serve reliably, legally and profitably from its own location.",
      },
    ],
    sources: [EC_HEMP],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 2): Article[] {
  return articles.filter((article) => article.slug !== slug).slice(0, limit);
}

const WORDS_PER_MINUTE = 220;

export function readingMinutes(article: Article): number {
  const words = article.body
    .flatMap((block) => (block.type === "ul" ? block.items : [block.text]))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
