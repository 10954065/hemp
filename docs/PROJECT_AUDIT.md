# Project audit and design review

## Baseline (before the rebuild)

- **Working directory:** empty and not a Git repository. There was no existing code to preserve, so a new Next.js project was created.
- **Existing site:** https://hempwealthgh.netlify.app/ is a single static HTML page (about 43 KB) with five anchor sections: hero, opportunity, law, governance and contact. Its only image is a 270 × 195 px logo embedded as base64. It uses Cormorant Garamond and Jost from Google Fonts and emoji as icons. The contact block has no working form endpoint; the "Submit Enquiry" control has no backend.
- **Content kept:** brand name, tagline, headline direction, 50-acre Phase 1, Drobonso location, 2024 incorporation, Companies Act 2019, Ghanaian ownership, board expertise areas, Quality Control and Environmental Officer role, contact details and the list of hemp applications. All are marked `company-stated` in `src/content/site.ts`.

### Problems the rebuild had to solve

1. **Unsupported claims.** The old site said the company "supplies pharmaceutical-grade hemp", has "contracted supply" and operates "with licenses issued by the Interior Minister". It also cited a USD 11.42 billion market figure without a source. None of this could be verified. Public records show the first cultivation licences were presented to two other companies on 1 August 2026.
2. **Outdated legal account.** It did not mention the 2022 Supreme Court ruling, Act 1100 (2023), L.I. 2475 or the 2026 licensing programme.
3. **Factual error.** It placed Drobonso in "Sekyere East District". Drobonso has been the capital of Sekyere Afram Plains District since 2012.
4. **Single page.** There were no pages for distinct audiences, no legal pages, no SEO structure and no accessible form.
5. **Assets.** There was only a low-resolution raster logo and no photography.

## Design review of the rebuilt site

The review used real rendered pages on a production build, at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px across all 18 routes (162 combinations), with full-page screenshots at 375, 768 and 1440 px.

| Area | Finding | Action |
| --- | --- | --- |
| Brand consistency | One palette, two typefaces (Fraunces, Manrope), shared tokens and components across all pages | No change |
| Typography | Strong editorial hierarchy; display sizes clamp correctly down to 320 px | No change |
| Hero composition | Photo credit was illegible over the bright sky | Added a translucent backing chip |
| Hero on mobile | Eyebrow text had low contrast over the sky at 375 px | Stronger mobile gradient |
| Grid rhythm | Home applications grid left an orphan tile on a third row | Reduced to five tiles for a balanced grid; re-cropped lead photo |
| Overflow | `/about` overflowed horizontally at 320–1024 px because of a non-wrapping photo credit | Removed `whitespace-nowrap` |
| Content accuracy | Home page still said "Sekyere East District" | Driven from `site.ts`, now corrected |
| Content accuracy | Pharmaceutical page stated "the company holds no GACP/GMP certification", which is itself unverified | Reworded to "no certification is claimed" |
| Accessibility | Skip link relied on an off-screen transform | Switched to `sr-only` / `focus:not-sr-only` |
| Accessibility | Mobile menu's "Current" label duplicated `aria-current` for screen readers | Label hidden from assistive technology |
| Routing | Unknown article slugs returned HTTP 200 (streamed fallback shell) | Added `ensureStatic = "navigation"`; now 404 |
| Security | Zod's JIT probe triggered a CSP `eval` issue in Chrome | `z.config({ jitless: true })` |
| Performance | Deprecated Image `priority` prop | Replaced with `preload`; hero quality 60 |

## Measured results (local production build)

| Check | Result |
| --- | --- |
| Route/viewport audit | 162/162 with no horizontal overflow, no console errors, no broken images, exactly one `h1` |
| Lighthouse accessibility | 100 on all pages tested |
| Lighthouse best practices | 100 on all pages tested (after the CSP fix) |
| Lighthouse performance, desktop | 99–100 |
| Lighthouse performance, mobile | 87–98, with run-to-run variance. Photo-hero pages show a simulated LCP of about 3.5 s under slow-4G throttling. |
| Lighthouse SEO | 63–66 **by design**: pages are `noindex` until `NEXT_PUBLIC_SITE_URL` is set. The only failing audit is `is-crawlable`. |

## Known issues

- Mobile LCP on pages with full-bleed photographic heroes is above the 2.5 s target under Lighthouse's simulated slow 4G. Options: art-directed smaller mobile crops, or a typographic hero on mobile.
- The in-memory rate limiter is per server instance; see `DEPLOYMENT.md`.
- CSP allows `'unsafe-inline'` scripts because Next.js injects inline bootstrap scripts; nonce-based CSP would remove this at the cost of dynamic rendering.
