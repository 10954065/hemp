import type { Metadata } from "next";

import { configuredSiteUrl } from "./site-url";

const DEFAULT_OG_IMAGE = {
  url: "/images/og/hempwealth-ghana.jpg",
  width: 1200,
  height: 630,
  alt: "HempWealth Ghana: industrial hemp, built for Ghana.",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
};

/** Builds unique, per-page metadata. Canonical links appear only once a production domain is configured. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: configuredSiteUrl ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: "HempWealth Ghana",
      locale: "en_GB",
      type,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
