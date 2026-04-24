import type { Metadata } from "next";
import Link from "next/link";
import { artisans } from "@/lib/artisans";

export const metadata: Metadata = {
  title: "À propos — Artisans Comores",
  description:
    "Découvrez l'histoire d'Artisans Comores : un collectif d'artisans expérimentés aux Comores, au service de la diaspora comorienne en France.",
};

const engagements = [
  {
    numero: "01",
    titre: "Transparence totale",
    description: "Chaque devis est détaillé poste par poste. Pas de frais cachés, pas de surprise en fin de chantier.",
  },
  {
    numero: "02",
    titre: "Communication régulière",
    description: "Photos d'avancement, comptes rendus hebdomadaires — vous suivez votre chantier depuis la France.",
  },
  {
    numero: "03",
    titre: "Délais respectés",
    description: "Chaque projet est planifié avec un calendrier précis. Nous tenons nos engagements.",
  },
  {
    numero: "04",
    titre: "Qualité garantie",
    description: "Nos artisans maîtrisent leur métier depuis plus de 8 ans. Chaque prestation est soignée et durable.",
  },
  {
    numero: "05",
    titre: "Prix justes",
    description: "Tarifs adaptés aux Comores, sans marges abusives. Notre modèle repose sur la confiance à long terme.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-ocean-950 text-white">
        <div className="container-custom max-w-2xl">
          <span className="inline-block text-sm font-inter font-semibold text-terracotta-400 uppercase tracking-wider mb-3">
            Notre histoire
          </span>
          <h1 className="font-outfit font-bold text-white mb-4">
            Un collectif né de la confiance entre compatriotes
          </h1>
          <p className="text-white/70 font-inter leading-relaxed">
            Artisans Comores a été fondé pour répondre à un problème concret : la difficulté
            pour la diaspora comorienne en France de trouver des artisans fiables aux Comores.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="prose-like space-y-5 text-neutral-600 font-inter leading-relaxed text-base">
              <p>
                Tout a commencé par une frustration partagée. Des membres de la diaspora
                comorienne, installés en France depuis des années, souhaitaient rénover ou
                construire leur maison aux Comores — mais se heurtaient systématiquement au
                même problème : comment trouver des artisans compétents, honnêtes, et joignables
                à distance ?
              </p>
              <p>
                La réponse était là : un réseau d'artisans que nous connaissions
                personnellement, liés par des années d'amitié et un code professionnel commun.
                Nous avons formalisé ce collectif, structuré notre façon de travailler,
                et créé Artisans Comores.
              </p>
              <p>
                Aujourd'hui, nous accompagnons la diaspora de A à Z : de la prise de contact
                au Zoom de réception de chantier, en passant par le devis, le suivi hebdomadaire
                et la livraison. Tout en français, tout en transparence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-inter font-semibold text-terracotta-600 uppercase tracking-wider mb-3">
              Ce qui nous distingue
            </span>
            <h2 className="section-heading">Nos 5 engagements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {engagements.map((e) => (
              <div key={e.numero} className="artisan-card p-6">
                <div className="text-4xl font-outfit font-bold text-ocean-100 mb-4 leading-none">
                  {e.numero}
                </div>
                <h3 className="font-outfit font-semibold text-ocean-900 text-lg mb-2">{e.titre}</h3>
                <p className="text-sm text-neutral-500 font-inter leading-relaxed">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Les artisans */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-inter font-semibold text-terracotta-600 uppercase tracking-wider mb-3">
              L'équipe
            </span>
            <h2 className="section-heading">Quatre experts, une seule équipe</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisans.map((artisan) => (
              <Link
                key={artisan.slug}
                href={`/artisans/${artisan.slug}`}
                className="artisan-card p-6 text-center group block"
              >
                <div className="w-16 h-16 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center text-2xl font-outfit font-bold mx-auto mb-4 group-hover:bg-ocean-600 group-hover:text-white transition-colors duration-300">
                  {artisan.prenom[0]}
                </div>
                <h3 className="font-outfit font-semibold text-ocean-900 text-lg mb-1">{artisan.prenom}</h3>
                <p className="text-sm text-terracotta-600 font-inter font-semibold mb-2">{artisan.specialty}</p>
                <p className="text-xs text-neutral-400 font-inter">{artisan.experience}</p>
                <div className="mt-4 text-sm font-inter text-ocean-600 group-hover:underline underline-offset-2">
                  Voir ses prestations →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ocean-950 text-white">
        <div className="container-custom text-center max-w-xl mx-auto">
          <h2 className="font-outfit font-bold text-white text-2xl mb-4">
            Discutons de votre projet
          </h2>
          <p className="text-white/65 font-inter mb-8">
            Un devis gratuit, une réponse sous 1 semaine. Sans engagement.
          </p>
          <Link href="/contact" className="btn-primary bg-terracotta-600 hover:bg-terracotta-700">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
