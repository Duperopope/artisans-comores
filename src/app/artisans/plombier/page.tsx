import type { Metadata } from "next";
import ArtisanPage from "@/components/artisan-page";

export const metadata: Metadata = {
  title: "Plombier aux Comores",
  description:
    "Artisan plombier qualifié aux Comores. Installation sanitaire, réparation fuite, robinetterie, chauffe-eau. Devis gratuit, contact WhatsApp.",
};

export default function PlombierPage() {
  return (
    <ArtisanPage
      icon="🔧"
      specialty="Plomberie"
      tagline="Installation et réparation plomberie aux Comores, qualité certifiée"
      description="Notre plombier intervient sur tous vos chantiers aux Comores. Que ce soit pour une construction neuve, une rénovation ou une urgence, il maîtrise les installations sanitaires modernes adaptées aux conditions locales."
      services={[
        { title: "Installation sanitaire complète", desc: "Salle de bain, cuisine, WC — tout équipé et aux normes." },
        { title: "Réparation de fuites", desc: "Détection et réparation rapide, même en urgence." },
        { title: "Robinetterie et mitigeurs", desc: "Pose, remplacement et réglage de tous types de robinets." },
        { title: "Chauffe-eau et ballons", desc: "Installation électrique et solaire selon disponibilité." },
        { title: "Tuyauterie PVC / acier", desc: "Pose de canalisations pour bâtiments neufs et réhabilitation." },
        { title: "Évacuation et assainissement", desc: "Réseaux d'eaux usées pour maisons individuelles." },
      ]}
      whatsapp="2697700001"
      accentColor="#1e6eb5"
    />
  );
}
