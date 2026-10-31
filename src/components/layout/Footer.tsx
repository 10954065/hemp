import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { company, footerNav, legalNav } from "@/content/site";

import { CopyrightYear } from "./CopyrightYear";
import { Logo } from "./Logo";

export function Footer() {
  const { contact } = company;

  return (
    <footer className="on-dark bg-evergreen text-sage-soft" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site information
      </h2>
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] lg:gap-10 lg:py-20">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-6 text-[0.95rem] leading-relaxed">{company.summary}</p>
          <p className="mt-5 font-display text-lg italic text-gold">{company.tagline}</p>
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h3 className="font-sans text-eyebrow font-semibold uppercase text-gold">{group.heading}</h3>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-ivory/90 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="font-sans text-eyebrow font-semibold uppercase text-gold">Contact</h3>
          <address className="mt-5 space-y-3 text-[0.95rem] not-italic">
            <p>
              <a href={`mailto:${contact.email}`} className="link-underline text-ivory/90 hover:text-ivory">
                {contact.email}
              </a>
            </p>
            {contact.phones.map((phone) => (
              <p key={phone.href}>
                <a href={phone.href} className="link-underline text-ivory/90 hover:text-ivory">
                  {phone.display}
                </a>
              </p>
            ))}
            <p className="pt-1 leading-relaxed">
              {contact.postal.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </address>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center rounded-sm border border-ivory/30 px-5 text-sm font-semibold text-ivory transition-colors hover:border-ivory"
          >
            Send an enquiry
          </Link>
        </div>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col gap-4 py-6 text-[0.85rem] md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {company.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
