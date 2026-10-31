/**
 * Regulatory summary for Ghana. General information only, not legal advice.
 * Update `lastReviewed` whenever any entry below is re-checked against its source.
 * Must be reviewed by a Ghanaian legal practitioner before launch (see docs/CLIENT_CONTENT_CHECKLIST.md).
 */

export type Source = {
  id: string;
  title: string;
  publisher: string;
  date?: string;
  url: string;
  official: boolean;
};

export type Instrument = {
  name: string;
  short: string;
  summary: string;
  sourceIds: string[];
};

export type Institution = {
  name: string;
  role: string;
  url?: string;
};

export type TimelineEntry = {
  date: string;
  label: string;
  detail: string;
  sourceIds: string[];
};

export const lastReviewed = "2026-10-31";

export const sources: Source[] = [
  {
    id: "ncc",
    title: "Narcotics Control Commission: official website and licensing portal",
    publisher: "Narcotics Control Commission",
    url: "https://www.ncc.gov.gh/",
    official: true,
  },
  {
    id: "li2475",
    title: "Narcotics Control Commission (Cultivation and Management of Cannabis) Regulations, 2023 (L.I. 2475)",
    publisher: "Judy.Legal (text of the legislative instrument)",
    url: "https://www.judy.legal/legislation/akn/gh/act/li/2023/2475",
    official: false,
  },
  {
    id: "mint",
    title: "Ministry of the Interior",
    publisher: "Government of Ghana",
    url: "https://www.mint.gov.gh/",
    official: true,
  },
  {
    id: "fda",
    title: "Food and Drugs Authority",
    publisher: "Government of Ghana",
    url: "https://fdaghana.gov.gh/",
    official: true,
  },
  {
    id: "orc",
    title: "Office of the Registrar of Companies",
    publisher: "Government of Ghana",
    url: "https://orc.gov.gh/",
    official: true,
  },
  {
    id: "gna-programme",
    title: "Ghana launches Medicinal Cannabis Regulatory Programme under strict legal framework",
    publisher: "Ghana News Agency",
    date: "2026-02-27",
    url: "https://gna.org.gh/2026/02/ghana-launches-medicinal-cannabis-regulatory-programme-under-strict-legal-framework/",
    official: false,
  },
  {
    id: "graphic-portal",
    title: "NCC opens online applications for cannabis cultivation and business licences",
    publisher: "Graphic Online",
    date: "2026-03-11",
    url: "https://www.graphic.com.gh/news/general-news/online-applications-open-for-cannabis-business-licences-in-ghana.html",
    official: false,
  },
  {
    id: "gna-applications",
    title: "Eight companies apply to cultivate industrial cannabis in Ghana",
    publisher: "Ghana News Agency",
    date: "2026-07-07",
    url: "https://gna.org.gh/2026/07/eight-companies-apply-to-cultivate-weed-in-ghana/",
    official: false,
  },
  {
    id: "gna-first-licences",
    title: "NACOC presents first cannabis cultivation licences to two companies",
    publisher: "Ghana News Agency",
    date: "2026-08-01",
    url: "https://gna.org.gh/2026/08/nacoc-presents-first-cannabis-cultivation-licences-to-two-companies/",
    official: false,
  },
  {
    id: "graphic-supreme-court",
    title: "Cannabis law in Ghana: Supreme Court dismisses review application",
    publisher: "Graphic Online",
    date: "2023-05-24",
    url: "https://www.graphic.com.gh/news/general-news/wee-law-supreme-court-dismisses-review-application",
    official: false,
  },
  {
    id: "africanews-amendment",
    title: "Parliament passes NACOC bill to allow cannabis cultivation for industrial and medicinal purposes",
    publisher: "Africanews",
    date: "2023-07-13",
    url: "https://www.africanews.com/2023/07/13/parliament-passes-nacoc-bill-to-allow-cannabis-cultivation-for-industrial-and-medicinal-pu/",
    official: false,
  },
];

export const instruments: Instrument[] = [
  {
    name: "Narcotics Control Commission Act, 2020 (Act 1019)",
    short: "Act 1019",
    summary:
      "Ghana's principal narcotics law. It established the Narcotics Control Commission and its enforcement powers. As enacted, section 43 allowed the Minister for the Interior to license cultivation of cannabis with no more than 0.3% THC for industrial or medicinal purposes. In 2022 the Supreme Court struck that section down on procedural grounds, holding that it had not been debated as Article 106 of the Constitution requires. The Court dismissed a review application in May 2023.",
    sourceIds: ["graphic-supreme-court"],
  },
  {
    name: "Narcotics Control Commission (Amendment) Act, 2023 (Act 1100)",
    short: "Act 1100",
    summary:
      "Passed by Parliament in July 2023 after debate. It restores the Minister's power to license cultivation of cannabis with no more than 0.3% THC strictly for industrial or medicinal purposes. Recreational use remains prohibited.",
    sourceIds: ["africanews-amendment", "gna-programme"],
  },
  {
    name: "Narcotics Control Commission (Cultivation and Management of Cannabis) Regulations, 2023 (L.I. 2475)",
    short: "L.I. 2475",
    summary:
      "The detailed licensing framework. It sets out eleven licence categories and applicant eligibility rules, and makes licences site-specific, renewable every three years and non-transferable without ministerial approval. It also sets siting restrictions, inspection powers and quarterly reporting obligations for licensees.",
    sourceIds: ["li2475", "gna-programme"],
  },
  {
    name: "Fees and Charges (Miscellaneous Provisions) (Amendment) Regulations, 2025",
    short: "Fees regulations",
    summary: "Sets the fees payable for cannabis licences, as approved by Parliament.",
    sourceIds: ["gna-programme"],
  },
  {
    name: "Public Health Act, 2012 (Act 851)",
    short: "Act 851",
    summary:
      "Gives the Food and Drugs Authority its mandate over medicines, food and cosmetics, including product registration and manufacturing standards. How these requirements apply to specific cannabis-derived products should be confirmed with the Authority.",
    sourceIds: ["fda"],
  },
  {
    name: "Companies Act, 2019 (Act 992)",
    short: "Act 992",
    summary:
      "Governs company incorporation and corporate governance in Ghana. It is administered by the Office of the Registrar of Companies.",
    sourceIds: ["orc"],
  },
];

export const institutions: Institution[] = [
  {
    name: "Minister for the Interior",
    role: "The only authority that may grant, suspend, modify or cancel cannabis licences, acting on the Commission's recommendation.",
    url: "https://www.mint.gov.gh/",
  },
  {
    name: "Narcotics Control Commission",
    role: "Receives and assesses licence applications through its online portal, recommends licensing decisions, and carries out inspections. Licensees file quarterly returns with the Commission, and it enforces compliance.",
    url: "https://www.ncc.gov.gh/",
  },
  {
    name: "Food and Drugs Authority",
    role: "Regulates medicines, food, cosmetics and related products, including registration of products intended for those markets.",
    url: "https://fdaghana.gov.gh/",
  },
  {
    name: "Office of the Registrar of Companies",
    role: "Maintains the companies register. It is the public record for a company's incorporation and registered details.",
    url: "https://orc.gov.gh/",
  },
];

export const licenceCategories = [
  "Cultivation",
  "Processing",
  "Breeding",
  "Research and development",
  "Laboratory testing",
  "Storage",
  "Transportation",
  "Import",
  "Export",
  "Sales and distribution",
  "Advertising and promotion",
];

export const keyConditions = [
  "THC content must not exceed 0.3% on a dry weight basis.",
  "Use is restricted to industrial (including fibre and seed) and medicinal purposes. Recreational use remains a criminal offence.",
  "Individual applicants must be Ghanaian citizens or permanent residents aged 18 or over. Corporate applicants must be at least 50% Ghanaian-owned, with a majority of Ghanaian directors.",
  "Licences are activity-specific and site-specific. They last three years, are renewable, and cannot be transferred without the Minister's approval.",
  "Cultivation sites may not be within 100 metres of a school or residential area.",
  "Applications are made directly to the Commission through its online portal. The Commission states that no intermediary is authorised to issue or facilitate licences.",
];

export const timeline: TimelineEntry[] = [
  {
    date: "2020",
    label: "Act 1019 enacted",
    detail: "The Narcotics Control Commission Act creates the Commission and, in section 43, a licensing route for low-THC cannabis.",
    sourceIds: ["graphic-supreme-court"],
  },
  {
    date: "July 2022 – May 2023",
    label: "Section 43 struck down",
    detail: "The Supreme Court holds section 43 unconstitutional on procedural grounds and later dismisses the review application.",
    sourceIds: ["graphic-supreme-court"],
  },
  {
    date: "July 2023",
    label: "Act 1100 passed",
    detail: "Parliament debates and passes an amendment restoring the licensing power for industrial and medicinal cultivation.",
    sourceIds: ["africanews-amendment"],
  },
  {
    date: "2023",
    label: "L.I. 2475 made",
    detail: "The Cultivation and Management of Cannabis Regulations set out the detailed licensing regime.",
    sourceIds: ["li2475"],
  },
  {
    date: "February – March 2026",
    label: "Licensing programme launched",
    detail: "The Ministry of the Interior and the Commission launch the regulatory programme and open online applications.",
    sourceIds: ["gna-programme", "graphic-portal"],
  },
  {
    date: "August 2026",
    label: "First cultivation licences issued",
    detail: "The Commission presents its first three-year cultivation licences to two companies.",
    sourceIds: ["gna-first-licences"],
  },
];

export function getSources(ids: string[]): Source[] {
  return ids
    .map((id) => sources.find((source) => source.id === id))
    .filter((source): source is Source => source !== undefined);
}
