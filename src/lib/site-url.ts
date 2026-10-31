/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL to the confirmed production domain.
 * Until it is set, canonical tags are omitted rather than pointing at a guessed domain.
 */

const FALLBACK_ORIGIN = "http://localhost:3000";

function normalise(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return null;
  }
}

export const configuredSiteUrl: string | null = normalise(process.env.NEXT_PUBLIC_SITE_URL);

export const siteUrl: string = configuredSiteUrl ?? FALLBACK_ORIGIN;

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
