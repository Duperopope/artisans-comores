"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

function Avatar({ name, picture }: { name: string; picture?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (picture) {
    return (
      <img
        src={picture}
        alt=""
        className="w-8 h-8 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <span className="w-8 h-8 rounded-full bg-ocean-600 text-white text-xs font-semibold flex items-center justify-center">
      {initials || "U"}
    </span>
  );
}

export default function UserMenu() {
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  if (!user) return null;

  const displayName = user.user_metadata?.full_name ?? user.email ?? "Utilisateur";
  const picture = user.user_metadata?.avatar_url;
  const email = user.email;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-ocean-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Menu utilisateur"
      >
        <Avatar name={displayName} picture={picture} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-sand-200 shadow-lg py-2 z-50 animate-fade-in"
          role="menu"
          aria-label="Menu utilisateur"
        >
          <div className="px-4 py-3 border-b border-sand-100">
            <p className="font-inter text-sm font-semibold text-ocean-900 truncate">
              {displayName}
            </p>
            {email && (
              <p className="font-inter text-xs text-neutral-500 truncate">
                {email}
              </p>
            )}
          </div>

          <div className="py-1">
            {isAdmin && (
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-sand-50 hover:text-ocean-700 transition-colors"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Dashboard
              </Link>
            )}
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-sand-50 hover:text-ocean-700 transition-colors"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profil
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-sand-50 hover:text-ocean-700 transition-colors"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Paramètres
            </Link>
          </div>

          <div className="border-t border-sand-100 pt-1">
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
              role="menuitem"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
