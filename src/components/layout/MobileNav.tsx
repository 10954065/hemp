"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import type { NavItem } from "@/content/site";
import { company } from "@/content/site";

import { LogoMark } from "./Logo";
import { isActivePath } from "./NavLinks";

/**
 * Mobile and tablet navigation built on the native <dialog> element: showModal()
 * provides the focus trap, Escape-to-close and an inert background, and focus returns
 * to the menu button when the dialog closes.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function handleOpen() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function handleClose() {
    dialogRef.current?.close();
  }

  const allItems: NavItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="inline-flex min-h-11 items-center gap-2.5 rounded-sm border border-forest/20 px-4 text-sm font-semibold text-forest transition-colors hover:border-forest"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
        </svg>
        Menu
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label="Site navigation"
        onClose={() => setIsOpen(false)}
        className="on-dark m-0 h-dvh max-h-none w-full max-w-none bg-evergreen p-0 text-ivory backdrop:bg-evergreen/60"
      >
        <div className="flex min-h-full flex-col px-4 pb-10 pt-4 sm:px-8">
          <div className="flex h-14 items-center justify-between">
            <span className="inline-flex items-center gap-3">
              <LogoMark tone="light" />
              <span className="font-display text-xl">HempWealth Ghana</span>
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-ivory/30 px-4 text-sm font-semibold hover:border-ivory"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
              {allItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-14 items-center justify-between py-3 font-display text-[1.65rem] leading-tight transition-colors ${
                        active ? "text-gold" : "text-ivory hover:text-sage-soft"
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span aria-hidden="true" className="font-sans text-xs uppercase tracking-[0.18em]">
                          Current
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-10 space-y-4">
            <Link
              href="/contact"
              onClick={handleClose}
              className="flex min-h-12 items-center justify-center rounded-sm bg-ivory px-6 font-semibold text-evergreen"
            >
              Contact our team
            </Link>
            <p className="text-center text-sm text-sage">
              <a href={`mailto:${company.contact.email}`} className="underline underline-offset-4">
                {company.contact.email}
              </a>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
