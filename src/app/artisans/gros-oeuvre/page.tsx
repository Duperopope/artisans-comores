import type { Metadata } from "next";
import ArtisanPage from "@/components/artisan-page";

export const metadata: Metadata = {
  title: "Maçon gros œuvre aux Comores",
  description:
    "Artisan maçon gros œuvre aux Comores. Fondations, béton armé, maçonnerie, charpente. Construction neuve et rénovation. Devis gratuit.",
};

export default function GrosOeuvrePage() {
  return (
    <ArtisanPage
      icon="🏗️"
      specialty="Gros œuvre"
      tagline="Construire solide sur les fondations de la tradition comorienne"
      description="Notre maçon spécialisé en gros œuvre assure la solidité de vos constructions aux Comores. Formé aux techniques modernes tout en maîtrisant les matériaux locaux, il garantit des structures durables adaptées au climat tropical."
      services={[
        { title: "Fondations et terrassement", desc: "Étude du sol, fouilles, semelles filantes et radiers." },
        { title: "Béton armé", desc: "Coulage de dalles, poteaux, poutres et planchers." },
        { title: "Maçonnerie de blocs", desc: "Montage de murs en parpaings, briques ou pierres locales." },
        { title: "Charpente bois et métal", desc: "Structure de toiture robuste et adaptée au climat." },
        { title: "Couverture et toiture", desc: "Pose de tuiles, tôles ou dalles selon le projet." },
        { title: "Réhabilitation et extension", desc: "Renforcement de structures existantes et agrandissements." },
      ]}
      whatsapp="2697700003"
      accentColor="#c0511a"
    />
  );
}
