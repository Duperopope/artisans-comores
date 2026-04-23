import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie de réalisations — Artisans Comores",
  description:
    "Découvrez nos réalisations aux Comores : plomberie, électricité, gros œuvre et finition. Photos de chantiers avant/après.",
};

type Projet = {
  id: number;
  titre: string;
  categorie: "plomberie" | "electricite" | "gros-oeuvre" | "finition";
  lieu: string;
  description: string;
};

const projets: Projet[] = [
  { id: 1, titre: "Salle de bain complète", categorie: "plomberie", lieu: "Moroni", description: "Installation complète : douche italienne, lavabo suspendu, WC et robinetterie chromée." },
  { id: 2, titre: "Réseau eau courante", categorie: "plomberie", lieu: "Mitsamiouli", description: "Mise en place du réseau d'alimentation en eau pour une villa de 250 m²." },
  { id: 3, titre: "Tableau électrique neuf", categorie: "electricite", lieu: "Moroni", description: "Remplacement du tableau vétuste par un tableau 24 modules avec différentiels." },
  { id: 4, titre: "Pannneaux solaires", categorie: "electricite", lieu: "Domoni", description: "Installation de 8 panneaux photovoltaïques + batteries pour autonomie complète." },
  { id: 5, titre: "Fondations villa R+2", categorie: "gros-oeuvre", lieu: "Fomboni", description: "Étude de sol et coulage des semelles filantes pour une construction de 180 m²." },
  { id: 6, titre: "Extension maison familiale", categorie: "gros-oeuvre", lieu: "Moroni", description: "Ajout d'une chambre de 30 m² avec dalle, murs porteurs et toiture." },
  { id: 7, titre: "Carrelage salon et terrasse", categorie: "finition", lieu: "Mitsamiouli", description: "Pose de 90 m² de carrelage 60×60 grès cérame, joints époxy." },
  { id: 8, titre: "Peinture intérieure villa", categorie: "finition", lieu: "Moroni", description: "Enduit lissé et peinture velours pour 6 pièces, couleurs sable et blanc cassé." },
  { id: 9, titre: "Chauffe-eau solaire", categorie: "plomberie", lieu: "Ouani", description: "Installation d'un chauffe-eau solaire 300 L avec appoint électrique." },
  { id: 10, titre: "Câblage maison neuve", categorie: "electricite", lieu: "Moroni", description: "Câblage complet d'une maison de 200 m², 40 points lumineux, 30 prises." },
  { id: 11, titre: "Toiture béton armé", categorie: "gros-oeuvre", lieu: "Bangoi-Kouni", description: "Coulage d'une dalle de toiture terrasse 120 m² avec étanchéité." },
  { id: 12, titre: "Faux plafond et spots", categorie: "finition", lieu: "Moroni", description: "Installation de faux plafond PVC et 24 spots encastrés dans salon et chambres." },
];

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
            Découvrez une sélection de projets réalisés par notre collectif d'artisans.
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
          <div className="masonry-grid">
            {projets.map((projet) => (
              <article key={projet.id} className="masonry-item artisan-card overflow-hidden">
                {/* Placeholder image */}
                <div
                  className="w-full bg-gradient-to-br from-ocean-100 to-sand-200 flex items-center justify-center"
                  style={{ aspectRatio: projet.id % 3 === 0 ? "4/5" : "4/3" }}
                  aria-hidden="true"
                >
                  <span className="text-ocean-300 font-outfit font-bold text-3xl">AC</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-inter font-semibold px-2.5 py-1 rounded-full ${catColors[projet.categorie]}`}>
                      {catLabels[projet.categorie]}
                    </span>
                    <span className="text-xs text-neutral-400 font-inter">{projet.lieu}</span>
                  </div>
                  <h2 className="font-outfit font-semibold text-ocean-900 text-base mb-1">{projet.titre}</h2>
                  <p className="text-sm text-neutral-500 font-inter leading-relaxed">{projet.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center max-w-xl mx-auto">
          <h2 className="font-outfit font-bold text-ocean-900 text-2xl mb-4">
            Votre projet sera notre prochaine réalisation
          </h2>
          <p className="text-neutral-500 font-inter mb-8 leading-relaxed">
            Décrivez-nous vos travaux. Nous vous répondons avec un devis gratuit sous 48h.
          </p>
          <a href="/contact" className="btn-primary">
            Demander un devis gratuit
          </a>
        </div>
      </section>
    </>
  );
}
