# HempWealth Ghana website

The corporate website for HempWealth Ghana: Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4 and Zod.

## Commands

```bash
npm install            # install dependencies
npm run dev            # development server at http://localhost:3000
npm run build          # production build
npm start              # serve the production build
npm run lint           # ESLint
npm run typecheck      # generate route types and run tsc
npm test               # unit and integration tests (Vitest)
npm run test:coverage  # tests with coverage report
npm run test:e2e       # Playwright end-to-end tests (run `npm run build` first)
npm run check          # lint, typecheck, test and build
```

First run of the end-to-end tests may need `npx playwright install chromium`.

## Configuration

Copy `.env.example` to `.env.local` and fill in values. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for what each variable does. Without email credentials the enquiry forms show an error and never a false success.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/content/` | All company information, articles, regulation summary, applications and image credits. Edit content here, not in components. |
| `src/app/` | Routes, metadata, sitemap, robots and the `/api/enquiry` endpoint |
| `src/components/` | Layout, section, form and UI components |
| `src/lib/` | Validation schema, enquiry processing, email delivery, rate limiting, SEO helpers |
| `public/images/` | Optimised, openly licensed photography (credits on `/credits`) |
| `tests/` | Vitest unit tests and Playwright end-to-end tests |
| `docs/` | Audits, deployment guide and the client content checklist |

## Before launch

Work through [docs/CLIENT_CONTENT_CHECKLIST.md](docs/CLIENT_CONTENT_CHECKLIST.md). Several company statements are taken from the previous website and must be confirmed by the company before the site goes live.
