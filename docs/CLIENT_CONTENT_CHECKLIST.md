# Client content checklist

Information HempWealth Ghana should confirm or supply. Items marked **Essential** should be resolved before the site goes live. Optional items improve the site but are not required for launch. The site already has polished layouts for every item, so supplying information means editing `src/content/`, not redesigning.

## Essential before launch

| # | Item | What the site says now | Where it lives | What we need |
| --- | --- | --- | --- | --- |
| 1 | Official company name | "HempWealth Ghana" | `site.ts` | Exact registered name (e.g. "HempWealth Ghana Limited") |
| 2 | Incorporation | 2024, Companies Act, 2019 (Act 992) | `site.ts`, home, about, governance | Certificate of incorporation or ORC record |
| 3 | Ghanaian ownership | "Ghanaian-owned" | about, governance | Confirmation (L.I. 2475 needs ≥50% Ghanaian ownership) |
| 4 | Contact details | Email, two phone numbers, P. O. Box LT 349, Latebiokorshie, Accra | `site.ts`, footer, contact | Confirm each is current and monitored. A business email on the company domain is strongly recommended over Gmail. |
| 5 | Phase 1 acreage | "Proposed 50 acres" | `site.ts`, home, cultivation, opportunity | Confirm the figure and whether land is secured, leased or proposed |
| 6 | Location | "Drobonso, **Sekyere Afram Plains District**", Ashanti Region | `site.ts` | The old site said "Sekyere East District". Drobonso has been in Sekyere Afram Plains District since 2012. Please confirm. |
| 7 | Licensing status | Not stated; "shared in due diligence" | regulation, opportunity, pharma | Which L.I. 2475 licences (if any) are held, applied for, or planned. **The old site claimed licences were issued. Public reports name the first two licensees (August 2026) and HempWealth is not among them.** Do not reinstate a licensing claim without the licence documents. |
| 8 | Cropping cycles | "Plan targets up to 3 cycles a year", qualified | cultivation | Agronomic basis for three harvests, or a revised figure |
| 9 | Board composition | "Spans banking, law, medicine, accountancy and agribusiness" | governance | Confirmation that this is accurate |
| 10 | Quality Control and Environmental Officer | Role described as designated | governance | Confirm the role exists or is planned |
| 11 | Legal review | Regulation page, privacy policy, terms, disclaimer | `regulation.ts`, legal pages | Review by a Ghanaian legal practitioner |
| 12 | Privacy and data retention | General statement ("no longer than necessary") | privacy page | A specific retention period, and who handles data requests |
| 13 | Production domain | None; site is `noindex` until set | `NEXT_PUBLIC_SITE_URL` | The domain to launch on |
| 14 | Email delivery account | Not configured | env vars | Resend (or other) account, verified sending domain and recipient inbox |
| 15 | Logo | Vector redraw of the existing raster logo | `components/layout/Logo.tsx` | Approval of the redraw, or the original vector artwork |

## Claims removed from the previous website

These appeared on the old site and are **not** published on the new site, because no evidence was available:

- "Supplying pharmaceutical-grade hemp to domestic and international markets"
- "Contracted supply of industrial hemp to pharmaceutical companies"
- "Operating with licenses issued by the Interior Minister under Act 1019"
- "Cannabis industry estimated to reach USD 11.42 billion by end of 2025" (no source)
- "Permanent staff of 16 and seasonal workforce"
- "Investment Prospectus · Ghana · 2026" label

Each can be restored, with appropriate wording, once evidence is supplied.

## Optional improvements

| Item | Benefit |
| --- | --- |
| Approved photographs of the actual site, team and operations | Replace illustrative stock with documentary evidence; remove "illustrative" captions |
| Director and management names, roles and short biographies | Fill the governance profile section, with consent |
| Product specifications and quality procedures | Strengthen the pharmaceutical supply page |
| Confirmed partnerships or supply agreements | Announce them, with the counterparty's consent |
| Company milestones (dates) | Add a verified timeline to the About page |
| Formal environmental and social policies | Publish on the governance page |
| Named article authors | Add bylines to Insights articles |
| Official social media accounts | Link from the footer (none are linked now) |
