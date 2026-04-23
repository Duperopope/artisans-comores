export type Artisan = {
  slug: string;
  prenom: string;
  specialty: string;
  specialtySlug: string;
  tagline: string;
  description: string;
  whatsapp: string;
  zone: string;
  experience: string;
  services: { title: string; detail: string }[];
  color: "ocean" | "tropical" | "terracotta";
};

export const artisans: Artisan[] = [
  {
    slug: "plombier",
    prenom: "Abou",
    specialty: "Plomberie",
    specialtySlug: "plomberie",
    tagline: "Installation, réparation et maintenance de tous vos réseaux d'eau",
    description:
      "Avec plus de 12 ans d'expérience aux Comores, Abou intervient sur tous types de chantiers : villas, maisons familiales, immeubles. Il maîtrise les installations sanitaires modernes et les réseaux traditionnels.",
    whatsapp: "2697700001",
    zone: "Grande-Comore",
    experience: "12 ans d'expérience",
    color: "ocean",
    services: [
      { title: "Installation sanitaire", detail: "Pose de baignoires, douches, WC, lavabos et robinetterie." },
      { title: "Réseau d'alimentation", detail: "Mise en place et réparation des canalisations d'eau froide et chaude." },
      { title: "Chauffe-eau", detail: "Installation et remplacement de chauffe-eau électrique et solaire." },
      { title: "Évacuations et colonnes", detail: "Pose de colonnes d'évacuation, siphons, regards et puisards." },
      { title: "Dépannage urgence", detail: "Intervention rapide sur fuites, ruptures de canalisation et bouchons." },
      { title: "Mise aux normes", detail: "Vérification et conformité des installations avant vente ou réception de travaux." },
    ],
  },
  {
    slug: "electricien",
    prenom: "Karim",
    specialty: "Électricité",
    specialtySlug: "electricite",
    tagline: "Installations électriques sûres, conformes et modernes",
    description:
      "Karim est électricien qualifié avec 10 ans d'expérience dans les installations basse tension. Il intervient du tableau électrique jusqu'aux prises, et propose également des solutions solaires adaptées aux Comores.",
    whatsapp: "2697700002",
    zone: "Grande-Comore",
    experience: "10 ans d'expérience",
    color: "tropical",
    services: [
      { title: "Tableau électrique", detail: "Installation et mise aux normes de tableaux divisionnaires et principaux." },
      { title: "Câblage complet", detail: "Tirage de câbles, goulottes, conduits encastrés dans murs et plafonds." },
      { title: "Prises et éclairage", detail: "Pose de prises, interrupteurs, luminaires et spots encastrés." },
      { title: "Énergie solaire", detail: "Installation de panneaux photovoltaïques et batteries de stockage adaptés aux Comores." },
      { title: "Domotique basique", detail: "Minuteries, détecteurs de présence, éclairage extérieur automatique." },
      { title: "Mise aux normes", detail: "Diagnostic et mise en conformité pour la vente ou la location." },
    ],
  },
  {
    slug: "gros-oeuvre",
    prenom: "Saïd",
    specialty: "Gros œuvre",
    specialtySlug: "gros-oeuvre",
    tagline: "Fondations solides, murs porteurs, structure béton armé",
    description:
      "Saïd dirige une équipe spécialisée dans le gros œuvre depuis 15 ans. Des fondations à la charpente, il assure la solidité structurelle de votre bien immobilier aux Comores.",
    whatsapp: "2697700003",
    zone: "Grande-Comore",
    experience: "15 ans d'expérience",
    color: "terracotta",
    services: [
      { title: "Fondations", detail: "Étude du sol, coulage de semelles filantes ou isolées selon le terrain." },
      { title: "Murs porteurs", detail: "Maçonnerie en parpaings, briques ou béton banché." },
      { title: "Dalles et planchers", detail: "Coulage de dalles pleines ou en hourdis, avec ferraillage adapté." },
      { title: "Colonnes et poteaux", detail: "Structure béton armé pour maisons R+1 et R+2." },
      { title: "Toiture et charpente", detail: "Pose de charpente bois ou métal, couverture tuile ou tôle." },
      { title: "Démolition et réhabilitation", detail: "Démolition contrôlée, renforcement de structures existantes." },
    ],
  },
  {
    slug: "finition",
    prenom: "Ibrahim",
    specialty: "Finition",
    specialtySlug: "finition",
    tagline: "L'élégance des détails qui transforment un chantier en foyer",
    description:
      "Ibrahim apporte la touche finale qui fait toute la différence. Carrelage, peinture, enduit, menuiserie — chaque espace est traité avec soin et précision pour un rendu impeccable.",
    whatsapp: "2697700004",
    zone: "Grande-Comore",
    experience: "8 ans d'expérience",
    color: "ocean",
    services: [
      { title: "Carrelage et faïence", detail: "Pose de carrelage sol et mural, joints, plinthes et finitions d'angle." },
      { title: "Peinture intérieure", detail: "Préparation des supports, application de peinture mate ou satinée, enduit lissé." },
      { title: "Enduit de façade", detail: "Enduit de finition et peinture extérieure résistant aux UV et à l'humidité." },
      { title: "Faux plafonds", detail: "Pose de faux plafonds en placo ou PVC, intégration de l'éclairage." },
      { title: "Menuiserie intérieure", detail: "Pose de portes, fenêtres, garde-corps et placards sur mesure." },
      { title: "Revêtements de sol", detail: "Parquet stratifié, vinyle et résine coulée pour sols lisses et durables." },
    ],
  },
];

export function getArtisan(slug: string): Artisan | undefined {
  return artisans.find((a) => a.slug === slug);
}
