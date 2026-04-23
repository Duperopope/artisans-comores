import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie de réalisations",
  description:
    "Découvrez nos réalisations : plomberie, électricité, gros œuvre et finitions aux Comores. Photos et vidéos de chantiers terminés.",
};

const categories = [
  {
    label: "Plomberie",
    color: "var(--color-ocean)",
    items: [
      { title: "Installation sanitaire complète", lieu: "Moroni", desc: "Salle de bain neuve, robinetterie importée" },
      { title: "Réfection réseau eau", lieu: "Mitsamiouli", desc: "Remplacement tuyauterie ancienne, PVC" },
      { title: "Cuisine équipée", lieu: "Mbeni", desc: "Évier double bac, mitigeur, raccordements" },
    ],
  },
  {
    label: "Électricité",
    color: "var(--color-tropical)",
    items: [
      { title: "Mise aux normes villa", lieu: "Itsandra", desc: "Nouveau tableau, câblage complet 6 pièces" },
      { title: "Installation solaire", lieu: "Foumbouni", desc: "6 panneaux + onduleur 3kW, autonomie 48h" },
      { title: "Éclairage LED extérieur", lieu: "Moroni", desc: "20 points lumineux, détecteurs de présence" },
    ],
  },
  {
    label: "Gros œuvre",
    color: "var(--color-terracotta)",
    items: [
      { title: "Construction villa R+1", lieu: "Fumbuni", desc: "Fondations, structure béton armé, toiture" },
      { title: "Extension cuisine", lieu: "Moroni", desc: "Dalle, murs parpaings, toit terrasse" },
      { title: "Mur de clôture", lieu: "Koimbani", desc: "120m linéaires, blocs creux + portail métallique" },
    ],
  },
  {
    label: "Finitions",
    color: "var(--color-sand-dark)",
    items: [
      { title: "Carrelage salon + chambre", lieu: "Moroni", desc: "80m² format 60×60, joints époxy blancs" },
      { title: "Peinture intérieure complète", lieu: "Mitsamiouli", desc: "8 pièces, 2 couches, finition mate" },
      { title: "Salle de bain sur mesure", lieu: "Ngazidja", desc: "Faïence décorée, niche douche, vasque encastrée" },
    ],
  },
];

export default function GaleriePage() {
  return (
    <>
      <section
        className="section text-white text-center"
        style={{ background: "linear-gradient(135deg, var(--color-ocean-dark), var(--color-tropical))" }}
      >
        <div className="container-site">
          <h1 className="text-4xl font-bold mb-4">Galerie de réalisations</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Parcourez nos chantiers terminés. Chaque projet est une preuve concrète de notre savoir-faire.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site space-y-16">
          {categories.map((cat) => (
            <div key={cat.label}>
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b-2"
                style={{ color: cat.color, borderColor: cat.color }}
              >
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <div key={item.title} className="artisan-card">
                    <div
                      className="h-40 rounded-lg mb-4 flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: cat.color + "20", color: cat.color, border: `1px dashed ${cat.color}` }}
                      aria-label={`Photo de chantier : ${item.title}`}
                    >
                      📷 Photo chantier
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">📍 {item.lieu}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 text-center" style={{ backgroundColor: "var(--color-sand)" }}>
        <div className="container-site">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Votre projet pourrait être ici
          </p>
          <a
            href="/contact"
            className="btn-primary inline-flex"
          >
            Demander un devis gratuit
          </a>
        </div>
      </section>
    </>
  );
}
