import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { mainNav } from "@/content/site";

import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-line/80 bg-ivory/92 backdrop-blur-md supports-[backdrop-filter]:bg-ivory/80">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden xl:block">
          <NavLinks items={mainNav} />
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-sm bg-forest px-5 text-[0.9rem] font-semibold text-ivory transition-colors hover:bg-evergreen sm:inline-flex"
          >
            Contact us
          </Link>
          <div className="xl:hidden">
            <MobileNav items={mainNav} />
          </div>
        </div>
      </Container>
    </header>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-sm bg-forest px-4 py-3 font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[var(--z-skip)]"
    >
      Skip to main content
    </a>
  );
}
