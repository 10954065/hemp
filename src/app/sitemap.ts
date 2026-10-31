import type { MetadataRoute } from "next";

import { articles } from "@/content/articles";
import { absoluteUrl } from "@/lib/site-url";

/** Content dates are fixed so the sitemap is deterministic and prerenderable. Update when pages change materially. */
const SITE_CONTENT_DATE = "2026-10-31";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/cultivation", priority: 0.8 },
  { path: "/applications", priority: 0.7 },
  { path: "/pharmaceutical-supply", priority: 0.8 },
  { path: "/regulation", priority: 0.8 },
  { path: "/governance", priority: 0.7 },
  { path: "/opportunity", priority: 0.9 },
  { path: "/insights", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/disclaimer", priority: 0.2 },
  { path: "/credits", priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: SITE_CONTENT_DATE,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}`),
      lastModified: article.reviewedAt,
      priority: 0.6,
    })),
  ];
}
