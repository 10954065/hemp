/**
 * Company identity, contact details and navigation.
 *
 * Every company-specific claim carries a `status`:
 *   - "confirmed"       verified against documentary evidence
 *   - "company-stated"  taken from the company's previous website; publish only with qualified wording
 *   - "pending"         not yet supplied; do not publish
 * See docs/CLIENT_CONTENT_CHECKLIST.md before changing any status to "confirmed".
 */

export type VerificationStatus = "confirmed" | "company-stated" | "pending";

export type NavItem = {
  label: string;
  href: string;
};

export type Phone = {
  display: string;
  href: string;
};

export const company = {
  name: "HempWealth Ghana",
  shortName: "HempWealth",
  tagline: "Cultivating nature, growing wealth.",
  summary:
    "HempWealth Ghana is a Ghanaian agricultural enterprise developing a regulated industrial hemp cultivation project in the Ashanti Region, with a focus on supplying licensed industrial and pharmaceutical processors.",
  incorporation: {
    year: 2024,
    statute: "Companies Act, 2019 (Act 992)",
    status: "company-stated" as VerificationStatus,
  },
  ownership: {
    text: "Ghanaian-owned",
    status: "company-stated" as VerificationStatus,
  },
  contact: {
    email: "hempwealthgh@gmail.com",
    phones: [
      { display: "+233 20 720 2905", href: "tel:+233207202905" },
      { display: "+233 24 986 1352", href: "tel:+233249861352" },
    ] satisfies Phone[],
    postal: {
      lines: ["P. O. Box LT 349", "Latebiokorshie", "Accra, Ghana"],
      streetAddress: "P. O. Box LT 349, Latebiokorshie",
      locality: "Accra",
      country: "GH",
    },
    status: "company-stated" as VerificationStatus,
  },
} as const;

/** The proposed Phase 1 project, as described by the company. */
export const project = {
  acreage: { value: 50, unit: "acres", status: "company-stated" as VerificationStatus },
  location: {
    town: "Drobonso",
    // The previous website said "Sekyere East District". Drobonso has been the capital of the
    // Sekyere Afram Plains District since that district was created in 2012 (L.I. 2114).
    district: "Sekyere Afram Plains District",
    region: "Ashanti Region",
    status: "company-stated" as VerificationStatus,
  },
  cyclesPerYear: { value: 3, status: "company-stated" as VerificationStatus },
  stage: "Project development",
  licensingStatus: { status: "pending" as VerificationStatus },
} as const;

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Cultivation", href: "/cultivation" },
  { label: "Applications", href: "/applications" },
  { label: "Regulation", href: "/regulation" },
  { label: "Governance", href: "/governance" },
  { label: "Insights", href: "/insights" },
  { label: "Opportunity", href: "/opportunity" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About the company", href: "/about" },
      { label: "Cultivation & operations", href: "/cultivation" },
      { label: "Corporate governance", href: "/governance" },
      { label: "Regulation & compliance", href: "/regulation" },
    ],
  },
  {
    heading: "Work with us",
    items: [
      { label: "Investment & partnerships", href: "/opportunity" },
      { label: "Pharmaceutical supply", href: "/pharmaceutical-supply" },
      { label: "Industrial applications", href: "/applications" },
      { label: "Insights", href: "/insights" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Image credits", href: "/credits" },
];
