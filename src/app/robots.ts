import type { MetadataRoute } from "next";

import { absoluteUrl, configuredSiteUrl } from "@/lib/site-url";

/** Crawling is allowed only once a production domain is configured, so previews are not indexed. */
export default function robots(): MetadataRoute.Robots {
  if (!configuredSiteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
