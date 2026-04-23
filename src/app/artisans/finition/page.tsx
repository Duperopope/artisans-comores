import type { Metadata } from "next";
import ArtisanPage from "@/components/artisan-page";

export const metadata: Metadata = {
  title: "Artisan finitions aux Comores",
  description:
    "Artisan finitions aux Comores. Carrelage, peinture, enduit, plâtrerie, menuiserie. Travaux soignés pour intérieurs et extérieurs. Devis gratuit.",
};

export default function FinitionPage() {
  return (
    <ArtisanPage
      icon="🎨"
      specialty="Finitions"
      tagline="Des finitions impeccables pour des intérieurs qui vous ressemblent"
      description="Notre artisan en finitions apporte la touche finale qui fait toute la différence. Précis et méticuleux, il transforme votre construction brute en un espace de vie confortable et esthétique, aux standards modernes."
      services={[
        { title: "Carrelage sol et mur", desc: "Pose, découpe et jointoiement pour toutes surfaces." },
        { title: "Peinture intérieure et extérieure", desc: "Préparation, enduit de rebouchage et application." },
        { title: "Enduit et plâtrerie", desc: "Lissage des murs, traitement des fissures, finition parfaite." },
        { title: "Faux plafonds", desc: "Pose de plafonds en placo, dalles ou lambris." },
        { title: "Menuiserie intérieure", desc: "Pose de portes, placards, boiseries et parquets." },
        { title: "Faïence et mosaïque", desc: "Décoration murale artisanale pour salles de bain et cuisines." },
      ]}
      whatsapp="2697700004"
      accentColor="#7a5c2e"
    />
  );
}
