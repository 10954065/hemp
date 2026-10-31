# Tool audit

Audit date: 31 October 2026. Environment: Windows 11, Node 24.18, npm 11.16, with MCP servers and plugins.

## Used

| Tool | Status | How it was used |
| --- | --- | --- |
| `create-next-app` 16.4.3 | Worked | Scaffolded Next.js 16, TypeScript, Tailwind 4, ESLint |
| Next.js bundled docs (`node_modules/next/dist/docs`) | Worked | Cache Components, `ensureStatic`, Image `preload`, `dynamicParams` replacement |
| Context7 MCP | Worked | Confirmed the Resend REST API payload (`reply_to`, `Idempotency-Key`) |
| WebSearch / WebFetch | Worked | Ghana regulatory research (Act 1019, Act 1100, L.I. 2475, 2026 licensing news), EU and US hemp definitions, Drobonso district |
| `curl` | Worked | Downloaded the original site, checked every external source URL resolves |
| Wikimedia Commons API (via Node `fetch`) | Worked, rate-limited (429) | Searched and downloaded openly licensed photographs with licence metadata |
| `sharp` | Worked | Resized/recompressed photos, built the Open Graph image, contact sheets and screenshot segments |
| Playwright MCP | Worked | Live inspection, screenshots, mobile menu and form interaction tests |
| Playwright library + `@playwright/test` | Worked | 9-width × 18-route audit script; 60-test e2e suite |
| Vitest + v8 coverage | Worked | 45 unit/integration tests |
| Lighthouse CLI 13.6 (via `npx`, Playwright Chromium) | Worked | Performance, accessibility, best-practices and SEO scores |
| Chrome DevTools Protocol (`Audits` domain) | Worked | Found the Zod `Function()` probe that triggered a CSP issue |

## Discovered but not used

| Tool | Reason |
| --- | --- |
| Firecrawl MCP | Keyless access refused; replaced by `curl` |
| Image generation | No image-generation API key in the environment. Local ComfyUI is installed but has no model files and the GPU has 4 GB VRAM. **No images were AI-generated.** Openly licensed photography was used instead and is credited on `/credits`. |
| Stitch, 21st.dev, Magic MCP (UI generators) | Not needed: the design system was built directly in code against the brief. Generated UI would have needed heavy rework to meet the content and accessibility constraints. |
| Chrome DevTools MCP `lighthouse_audit` | Excludes performance; the Lighthouse CLI was used instead |
| Vercel MCP / Vercel CLI, Netlify | Deployment needs account authorisation and a decision about the live site; see `DEPLOYMENT.md` |
| Postgres MCP | Failed to connect; not needed (no database required) |

## Limitations to note

- Commons rate-limited downloads; two candidate images were skipped.
- Lighthouse scores were measured locally with simulated throttling and vary between runs by several points.
