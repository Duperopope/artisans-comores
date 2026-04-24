import type { Metadata } from "next";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Galerie de réalisations — Artisans Comores",
  description:
    "Découvrez nos réalisations aux Comores : plomberie, électricité, gros œuvre et finition. Photos de chantiers avant/après.",
};

const categories = [
  { id: "all", label: "Tous les projets" },
  { id: "plomberie", label: "Plomberie" },
  { id: "electricite", label: "Électricité" },
  { id: "gros-oeuvre", label: "Gros œuvre" },
  { id: "finition", label: "Finition" },
];

const catColors: Record<string, string> = {
  plomberie: "bg-ocean-100 text-ocean-700",
  electricite: "bg-tropical-100 text-tropical-700",
  "gros-oeuvre": "bg-terracotta-100 text-terracotta-700",
  finition: "bg-sand-200 text-ocean-700",
};

const catLabels: Record<string, string> = {
  plomberie: "Plomberie",
  electricite: "Électricité",
  "gros-oeuvre": "Gros œuvre",
  finition: "Finition",
};

export default function GaleriePage() {
  const cms = getCmsContent();
  const projets = cms.gallery;
  const delai = cms.contact.responseTime || "1 semaine";

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-ocean-950 text-white">
        <div className="container-custom max-w-2xl">
          <span className="inline-block text-sm font-inter font-semibold text-terracotta-400 uppercase tracking-wider mb-3">
            Nos réalisations
          </span>
          <h1 className="font-outfit font-bold text-white mb-4">
            Des chantiers menés avec soin aux Comores
          </h1>
          <p className="text-white/70 font-inter leading-relaxed">
            Découvrez une sélection de projets réalisés par notre collectif d&apos;artisans.
            Chaque projet est unique, chaque détail compte.
          </p>
        </div>
      </section>

      {/* Category nav (static — filtrage côté client possible en v2) */}
      <nav aria-label="Filtrer par catégorie" className="bg-white border-b border-sand-200 sticky top-16 z-40">
        <div className="container-custom py-3">
          <ul className="flex gap-2 flex-wrap" role="list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-inter font-medium bg-sand-100 text-neutral-600 cursor-default">
                  {cat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Masonry grid */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom">
          {projets.length === 0 ? (
            <p className="text-center text-neutral-500 font-inter">
              Les réalisations seront bientôt disponibles.
            </p>
          ) : (
            <div className="masonry-grid">
              {projets.map((projet, index) => {
                const img = projet.imageUrl?.trim();
                return (
                  <article key={projet.id} className="masonry-item artisan-card overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-br from-ocean-100 to-sand-200 flex items-center justify-center relative"
                      style={{ aspectRatio: index % 3 === 0 ? "4/5" : "4/3" }}
                    >
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={projet.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-ocean-300 font-outfit font-bold text-3xl" aria-hidden="true">
                          AC
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-inter font-semibold px-2.5 py-1 rounded-full ${catColors[projet.category]}`}>
                          {catLabels[projet.category]}
                        </span>
                        <span className="text-xs text-neutral-400 font-inter">{projet.location}</span>
                      </div>
                      <h2 className="font-outfit font-semibold text-ocean-900 text-base mb-1">{projet.title}</h2>
                      <p className="text-sm text-neutral-500 font-inter leading-relaxed">{projet.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center max-w-xl mx-auto">
          <h2 className="font-outfit font-bold text-ocean-900 text-2xl mb-4">
            Votre projet sera notre prochaine réalisation
          </h2>
          <p className="text-neutral-500 font-inter mb-8 leading-relaxed">
            Décrivez-nous vos travaux. Nous vous répondons avec un devis gratuit sous {delai}.
          </p>
          <a href="/contact" className="btn-primary">
            Demander un devis gratuit
          </a>
        </div>
      </section>
    </>
  );
}
