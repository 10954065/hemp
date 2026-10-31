import type { ImageKey } from "./images";

/**
 * "established": a recognised, commercially practised use of industrial hemp internationally.
 * "emerging":    a use under active development or limited commercial scale.
 *
 * `relevance` describes HempWealth Ghana's stated position, not a product offer:
 * "stated-focus" is the company's declared business focus; "prospective" is under
 * evaluation; "context" is general industry information only.
 */
export type ApplicationMaturity = "established" | "emerging";
export type ApplicationRelevance = "stated-focus" | "prospective" | "context";

export type Application = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  body: string[];
  plantParts: string[];
  useCases: string[];
  considerations: string[];
  maturity: ApplicationMaturity;
  relevance: ApplicationRelevance;
  image: ImageKey;
};

export const relevanceLabel: Record<ApplicationRelevance, string> = {
  "stated-focus": "HempWealth stated focus",
  prospective: "Under evaluation",
  context: "Industry context",
};

export const maturityLabel: Record<ApplicationMaturity, string> = {
  established: "Established industrial use",
  emerging: "Emerging use",
};

export const applications: Application[] = [
  {
    slug: "pharmaceutical",
    title: "Pharmaceutical and medical research supply chains",
    shortTitle: "Pharmaceutical supply",
    summary:
      "Low-THC hemp biomass is a raw material for licensed processors that extract and study plant compounds under pharmaceutical controls.",
    body: [
      "Manufacturers working with plant-derived compounds need a traceable, consistent and lawfully produced starting material. In this chain the grower's role is agricultural: producing biomass to an agreed specification, documenting how it was grown and handled, and passing it to a licensed processor for extraction, testing and formulation.",
      "Any finished medicinal product is the responsibility of the manufacturer and its regulator, not the grower. Supplying biomass does not make a farm a pharmaceutical manufacturer, and HempWealth Ghana does not make or sell medicines.",
    ],
    plantParts: ["Flowering tops and leaf (biomass)"],
    useCases: [
      "Raw material for licensed extraction and analytical laboratories",
      "Research and development by licensed institutions",
      "Reference material for quality and specification work",
    ],
    considerations: [
      "Requires the relevant L.I. 2475 licences for each activity, such as cultivation, storage, transport and export",
      "Buyers typically expect batch-level certificates of analysis from accredited laboratories",
      "Medicinal products are separately regulated, including by Ghana's Food and Drugs Authority",
    ],
    maturity: "established",
    relevance: "stated-focus",
    image: "laboratory",
  },
  {
    slug: "textiles",
    title: "Textiles and clothing",
    shortTitle: "Textiles",
    summary:
      "The long bast fibres in the hemp stalk can be processed into yarns and fabrics, often blended with cotton or other fibres.",
    body: [
      "Bast fibre runs along the outer stalk of the hemp plant. After harvest, stalks are retted (partially broken down) and decorticated to separate the fibre from the woody core. Further cleaning, softening and spinning produce yarn for woven and knitted textiles.",
      "Textile-grade fibre depends on variety selection, planting density and timely harvesting. A fibre value chain also needs processing infrastructure, which is a significant investment in its own right.",
    ],
    plantParts: ["Bast fibre from the stalk"],
    useCases: ["Apparel and blended fabrics", "Canvas, twine and cordage", "Home textiles"],
    considerations: [
      "Requires decortication and fibre-processing capacity",
      "Fibre quality depends on variety and harvest timing",
    ],
    maturity: "established",
    relevance: "prospective",
    image: "bastFibre",
  },
  {
    slug: "construction",
    title: "Construction and building materials",
    shortTitle: "Construction",
    summary:
      "The woody core of the stalk, known as hurd or shiv, is mixed with lime binders to make hempcrete, and fibres are used in insulation products.",
    body: [
      "Hempcrete is a bio-composite of hemp shiv and a lime-based binder. It is generally used as non-load-bearing infill and insulation within a structural frame, and is valued for its thermal and moisture-buffering properties.",
      "Hemp fibre is also used in insulation batts and fibre-reinforced boards. Construction uses carry their own building codes and product-testing requirements, which differ by market.",
    ],
    plantParts: ["Hurd / shiv (woody core)", "Bast fibre"],
    useCases: ["Hempcrete walls and blocks", "Insulation batts and boards", "Plasters and renders"],
    considerations: [
      "Needs consistent shiv grading and dust control",
      "Building products must meet local construction standards",
    ],
    maturity: "established",
    relevance: "context",
    image: "hempcrete",
  },
  {
    slug: "paper-and-fibre",
    title: "Paper, composites and fibre products",
    shortTitle: "Paper & fibre",
    summary:
      "Hemp pulp is used in speciality papers, and the fibre reinforces composites and non-woven materials.",
    body: [
      "Hemp fibre has long been used for strong, thin speciality papers. Today it is also used in non-woven mats, filters, and natural-fibre composites, including some automotive interior components.",
      "These markets reward a consistent supply of clean fibre at volume, which depends on reliable primary processing close to where the crop is grown.",
    ],
    plantParts: ["Bast fibre", "Hurd / shiv"],
    useCases: ["Speciality and technical papers", "Non-woven mats and filters", "Natural-fibre composites"],
    considerations: [
      "Requires pulping or fibre-processing partners",
      "Volume and consistency matter more than individual batch quality",
    ],
    maturity: "established",
    relevance: "context",
    image: "stalkFibre",
  },
  {
    slug: "oils-and-seed",
    title: "Industrial oils and seed products",
    shortTitle: "Oils & seed",
    summary:
      "Hemp seed is pressed for oil used in foods, cosmetics, paints and varnishes; the remaining seed cake can be used in feed.",
    body: [
      "Hemp seed contains a high proportion of oil. Cold-pressed hemp seed oil is used in food products, in personal-care formulations and, as a drying oil, in some paints, varnishes and wood finishes.",
      "Seed products intended for food, cosmetics or feed are regulated by the authorities for those product categories, and each market sets its own limits and labelling rules.",
    ],
    plantParts: ["Seed (grain)", "Seed oil and press cake"],
    useCases: [
      "Personal-care and cosmetic formulations",
      "Drying oils for coatings and finishes",
      "Hulled seed and press cake for food and feed markets",
    ],
    considerations: [
      "Seed varieties and harvest methods differ from biomass-focused cultivation",
      "Food, cosmetic and feed uses each require separate product approvals",
    ],
    maturity: "established",
    relevance: "prospective",
    image: "seedOil",
  },
  {
    slug: "agricultural",
    title: "Animal bedding and agricultural uses",
    shortTitle: "Bedding & agriculture",
    summary:
      "Absorbent hemp shiv is used as bedding for horses and poultry and as mulch. Hemp is also studied as a rotation crop.",
    body: [
      "Hemp shiv is light and highly absorbent, which makes it a common bedding material for horses and poultry in some markets. Lower grades are also used as garden and horticultural mulch.",
      "Agronomists study hemp as a rotation crop because of its growth habit and canopy. Any benefit depends on local soils, climate and management, and should be confirmed by field trials rather than assumed.",
    ],
    plantParts: ["Hurd / shiv", "Whole-plant residues"],
    useCases: ["Equine and poultry bedding", "Horticultural mulch", "Crop rotation research"],
    considerations: [
      "Bedding markets are price-sensitive and favour local supply",
      "Agronomic benefits must be demonstrated in local trials",
    ],
    maturity: "established",
    relevance: "context",
    image: "rawMaterials",
  },
  {
    slug: "bioenergy-and-biomaterials",
    title: "Bioenergy and bio-based materials",
    shortTitle: "Bio-based materials",
    summary:
      "Hemp biomass and residues are being researched as feedstock for solid biofuels, bio-plastics and other bio-based materials.",
    body: [
      "Researchers and manufacturers are testing hemp residues as feedstock for pellets, biochar, bio-composites and bio-based plastics. Most of these uses are still at an early commercial stage.",
      "We present them as context for long-term planning. HempWealth Ghana is not developing products in these categories.",
    ],
    plantParts: ["Whole-plant biomass", "Processing residues"],
    useCases: ["Solid biofuel and pellets", "Biochar research", "Bio-composite and bio-plastic research"],
    considerations: ["Commercial viability varies widely by technology and market"],
    maturity: "emerging",
    relevance: "context",
    image: "canopyAerial",
  },
];

export function getApplication(slug: string): Application | undefined {
  return applications.find((application) => application.slug === slug);
}
