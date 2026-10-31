# Deployment

The site is a standard Next.js 16 application. Most pages are prerendered static HTML; `/api/enquiry` is the only server function.

## Recommended hosting

The current site is on **Netlify**. Netlify supports Next.js 16 (App Router, route handlers, image optimisation) through its Next.js runtime, which it detects automatically, so staying there avoids a provider change. **Vercel** is an equally suitable alternative with native Next.js support. Choose based on who will own the account.

Do not replace the live `hempwealthgh.netlify.app` site until the company has completed the essential items in `CLIENT_CONTENT_CHECKLIST.md` and approved the new site. Deploy first to a preview URL or a separate site.

| Setting | Value |
| --- | --- |
| Node version | 20.9 or later (tested on 24) |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command (self-hosted) | `npm start` |
| Output | `.next` (handled automatically by Netlify/Vercel) |

## Environment variables

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Yes, for production | Confirmed origin, e.g. `https://www.hempwealthghana.com`. Enables canonical URLs, absolute Open Graph URLs, indexing and the sitemap reference in `robots.txt`. **While unset, every page is `noindex` and crawling is disallowed.** |
| `RESEND_API_KEY` | Server only | Yes, for forms | Resend API key with sending permission |
| `ENQUIRY_FROM_EMAIL` | Server only | Yes, for forms | Sender on a domain verified in Resend, e.g. `HempWealth Ghana <enquiries@your-domain>` |
| `ENQUIRY_TO_EMAIL` | Server only | Yes, for forms | Recipient inbox(es), comma-separated |

Set these in the hosting dashboard. Never commit them; `.env*` is git-ignored apart from `.env.example`.

## Form delivery

1. Create a Resend account and verify the company's sending domain (DNS records for SPF/DKIM).
2. Create an API key and set the three server variables above.
3. Redeploy, submit a test enquiry from the live site, and confirm it arrives. The success message shows a reference such as `HWG-20261031-a1b2c3`.

Without these variables the form validates input and then shows an error with the company email address. It never shows a false success. Delivery failures are logged as `enquiry.delivery_failed` without personal data.

## Domain

1. Confirm the production domain with the company.
2. Add it in the hosting dashboard and create the DNS records the provider shows.
3. Set `NEXT_PUBLIC_SITE_URL` to the `https://` origin and redeploy.
4. Submit `https://<domain>/sitemap.xml` in Google Search Console.

## Security configuration

`next.config.ts` sets on every response: Content-Security-Policy (production only), `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` and `Permissions-Policy`. These are applied by Next.js and work on Netlify, Vercel and self-hosting.

Rate limiting on `/api/enquiry` (5 submissions per 10 minutes per IP) is held in memory per server instance. On serverless hosting, add a platform rule for stronger protection: a Netlify rate-limit rule, Vercel Firewall rate limiting, or a shared Redis store. Spam is also filtered by a honeypot field, a minimum fill time and a same-origin check.

## Verification after each deploy

```bash
npm run check                                   # locally, before deploying
PLAYWRIGHT_BASE_URL=https://<preview-url> npx playwright test  # optional, against the deployment
```

Then manually:

- [ ] Home, a few inner pages and `/does-not-exist` (404) load over HTTPS
- [ ] `/robots.txt` allows crawling and lists the sitemap (production only)
- [ ] View source shows the correct canonical URL
- [ ] Mobile menu opens and closes
- [ ] A test enquiry arrives in the company inbox
- [ ] Response headers include `content-security-policy` and `strict-transport-security`

## Rollback

Netlify and Vercel both keep previous deployments. Roll back by publishing (Netlify) or promoting (Vercel) the last good deployment from the dashboard. No database or migrations are involved, so rollback is immediate.
