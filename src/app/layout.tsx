import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artisans-comores.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Artisans Comores — Expertise locale, qualité garantie",
    template: "%s | Artisans Comores",
  },
  description:
    "Trouvez les meilleurs artisans des Comores : plomberie, électricité, gros œuvre et finitions. Mise en relation rapide pour la diaspora et les résidents.",
  openGraph: {
    title: "Artisans Comores — Expertise locale, qualité garantie",
    description:
      "Trouvez les meilleurs artisans des Comores : plomberie, électricité, gros œuvre et finitions.",
    url: BASE_URL,
    siteName: "Artisans Comores",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Artisans Comores",
      url: BASE_URL,
      description:
        "Plateforme de mise en relation entre artisans des Comores et la diaspora.",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Artisans Comores",
      inLanguage: "fr",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/artisans/plombier", label: "Plomberie" },
  { href: "/artisans/electricien", label: "Électricité" },
  { href: "/artisans/gros-oeuvre", label: "Gros œuvre" },
  { href: "/artisans/finition", label: "Finitions" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>

        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
          <nav
            aria-label="Navigation principale"
            className="container-site flex items-center justify-between py-4"
          >
            <Link href="/" className="text-xl font-bold" style={{ color: "var(--color-ocean-dark)" }}>
              Artisans<span style={{ color: "var(--color-tropical)" }}>Comores</span>
            </Link>
            <div className="hidden md:flex items-center gap-5 text-sm font-medium">
              {navLinks.slice(1).map((l) => (
                <Link key={l.href} href={l.href} className="text-gray-700 hover:text-blue-700 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <Link href="/contact" className="btn-primary text-sm px-4 py-2 hidden md:inline-flex">
              Demander un devis
            </Link>
          </nav>
        </header>

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container-site grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-white font-bold text-lg mb-2">
                Artisans<span style={{ color: "var(--color-tropical-light)" }}>Comores</span>
              </p>
              <p className="text-sm leading-relaxed">
                La plateforme de confiance pour trouver des artisans qualifiés aux Comores.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Nos métiers</p>
              <ul className="space-y-1 text-sm">
                <li><Link href="/artisans/plombier" className="hover:text-white transition-colors">Plomberie</Link></li>
                <li><Link href="/artisans/electricien" className="hover:text-white transition-colors">Électricité</Link></li>
                <li><Link href="/artisans/gros-oeuvre" className="hover:text-white transition-colors">Gros œuvre</Link></li>
                <li><Link href="/artisans/finition" className="hover:text-white transition-colors">Finitions</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Informations</p>
              <ul className="space-y-1 text-sm">
                <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/galerie" className="hover:text-white transition-colors">Galerie de travaux</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="container-site mt-8 pt-6 border-t border-gray-700 text-sm text-center">
            © {new Date().getFullYear()} Artisans Comores. Tous droits réservés.
          </div>
        </footer>
      </body>
    </html>
  );
}
