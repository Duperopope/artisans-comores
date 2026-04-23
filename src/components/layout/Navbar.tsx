"use client";

import { useState } from "react";
import Link from "next/link";

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

        <Link href="/contact" className="hidden md:inline-flex btn-primary text-sm py-2 px-5">
          Devis gratuit
        </Link>

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
            <li className="pt-2">
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
