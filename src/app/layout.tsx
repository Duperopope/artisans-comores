import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artisans-comores.com"),
  title: "Artisans Comores — Travaux de rénovation aux Comores",
  description:
    "Connectez-vous avec des artisans qualifiés aux Comores pour vos projets de rénovation. Plomberie, électricité, gros œuvre et finition. Devis gratuit sous 1 semaine.",
  openGraph: {
    title: "Artisans Comores",
    description:
      "Des artisans qualifiés aux Comores pour vos projets de rénovation — au service de la diaspora comorienne.",
    type: "website",
    locale: "fr_FR",
    url: "https://artisans-comores.com",
    siteName: "Artisans Comores",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisans Comores",
    description: "Des artisans qualifiés aux Comores pour vos projets de rénovation — au service de la diaspora comorienne.",
  },
  alternates: {
    canonical: "https://artisans-comores.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://artisans-comores.com/#organization",
      name: "Artisans Comores",
      url: "https://artisans-comores.com",
      description:
        "Collectif d'artisans qualifiés aux Comores — plomberie, électricité, gros œuvre et finition — au service de la diaspora comorienne en France.",
      areaServed: { "@type": "Country", name: "Comoros" },
      knowsAbout: ["Plomberie", "Électricité", "Gros œuvre", "Finition"],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://artisans-comores.com/#business",
      name: "Artisans Comores",
      url: "https://artisans-comores.com",
      description:
        "Artisans qualifiés aux Comores pour vos projets de rénovation : plomberie, électricité, gros œuvre et finition. Devis gratuit sous 1 semaine.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KM",
        addressLocality: "Moroni",
        addressRegion: "Grande-Comore",
      },
      areaServed: { "@type": "Country", name: "Comoros" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de rénovation",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plomberie" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Électricité" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gros œuvre" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Finition" } },
        ],
      },
      priceRange: "€€",
      inLanguage: "fr",
    },
    {
      "@type": "WebSite",
      "@id": "https://artisans-comores.com/#website",
      url: "https://artisans-comores.com",
      name: "Artisans Comores",
      publisher: { "@id": "https://artisans-comores.com/#organization" },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Passer au contenu principal
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
