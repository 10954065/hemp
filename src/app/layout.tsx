import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header, SkipLink } from "@/components/layout/Header";
import { JsonLd } from "@/components/layout/JsonLd";
import { company } from "@/content/site";
import { absoluteUrl, configuredSiteUrl, siteUrl } from "@/lib/site-url";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HempWealth Ghana | Industrial hemp, built for Ghana",
    template: "%s | HempWealth Ghana",
  },
  description: company.summary,
  applicationName: company.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: configuredSiteUrl ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#173d2d",
  colorScheme: "light",
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
  email: company.contact.email,
  telephone: company.contact.phones.map((phone) => phone.display),
  address: {
    "@type": "PostalAddress",
    streetAddress: company.contact.postal.streetAddress,
    addressLocality: company.contact.postal.locality,
    addressCountry: company.contact.postal.country,
  },
  areaServed: "GH",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.name,
  url: absoluteUrl("/"),
  inLanguage: "en",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={organisationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </body>
    </html>
  );
}
