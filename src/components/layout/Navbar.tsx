"use client";

import { useState } from "react";
import Link from "next/link";

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "https://kairosforge-platform.vercel.app";

const navLinks = [
  { href: "/#services", label: "Nos services" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand-200 shadow-sm">
      <nav
        className="container-custom flex items-center justify-between h-16"
        aria-label="Navigation principale"
      >
        <Link href="/" className="font-outfit font-bold text-xl text-ocean-900 tracking-tight inline-flex items-center py-1">
          Artisans<span className="text-terracotta-600">Comores</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-inter text-neutral-600 hover:text-ocean-600 transition-colors duration-200 text-sm font-medium inline-flex items-center py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`${PLATFORM_URL}/login`}
            className="font-inter text-sm font-medium text-ocean-600 hover:text-ocean-800 transition-colors inline-flex items-center gap-1.5 py-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Connexion
          </Link>
          <Link href="/contact" className="btn-primary text-sm py-2 px-5">
            Devis gratuit
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-ocean-900 hover:bg-sand-100 transition-colors"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white">
          <ul className="container-custom py-4 flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block font-inter text-neutral-700 hover:text-ocean-600 py-3 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 flex flex-col gap-2">
              <Link
                href={`${PLATFORM_URL}/login`}
                className="flex items-center justify-center gap-2 text-sm font-medium text-ocean-600 border border-ocean-200 rounded-xl py-2.5 hover:bg-ocean-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Connexion
              </Link>
              <Link
                href="/contact"
                className="btn-primary text-sm w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                Devis gratuit
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
