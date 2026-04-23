import type { Metadata } from "next";
import ArtisanPage from "@/components/artisan-page";

export const metadata: Metadata = {
  title: "Électricien aux Comores",
  description:
    "Électricien qualifié aux Comores. Mise aux normes, tableau électrique, éclairage, câblage. Devis gratuit, contact WhatsApp.",
};

export default function ElectricienPage() {
  return (
    <ArtisanPage
      icon="⚡"
      specialty="Électricité"
      tagline="Installation et mise aux normes électrique, du simple au complexe"
      description="Notre électricien intervient pour tous vos besoins en installation électrique aux Comores. Habitué aux coupures fréquentes et aux contraintes locales, il propose des solutions adaptées incluant onduleurs et énergie solaire."
      services={[
        { title: "Tableau électrique", desc: "Installation, mise aux normes et remplacement de tableaux." },
        { title: "Câblage complet", desc: "Tirage de câbles pour construction neuve ou rénovation." },
        { title: "Éclairage intérieur/extérieur", desc: "Pose de points lumineux, spots, LED et détecteurs." },
        { title: "Prises et interrupteurs", desc: "Installation conforme aux normes, finitions soignées." },
        { title: "Onduleur et groupe électrogène", desc: "Protection contre les coupures, installation et câblage." },
        { title: "Panneaux solaires", desc: "Étude de faisabilité et installation photovoltaïque." },
      ]}
      whatsapp="2697700002"
      accentColor="#2d8a4e"
    />
  );
}
