import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Artisans Comores — Expertise locale, qualité garantie",
  description:
    "Mise en relation avec les meilleurs artisans des Comores. Plomberie, électricité, gros œuvre, finitions. Devis rapide, qualité certifiée.",
};

const specialties = [
  {
    href: "/artisans/plombier",
    icon: "🔧",
    title: "Plomberie",
    desc: "Installation, réparation et entretien de tous systèmes de plomberie.",
    color: "var(--color-ocean)",
  },
  {
    href: "/artisans/electricien",
    icon: "⚡",
    title: "Électricité",
    desc: "Mise aux normes, installation électrique résidentielle et commerciale.",
    color: "var(--color-tropical)",
  },
  {
    href: "/artisans/gros-oeuvre",
    icon: "🏗️",
    title: "Gros œuvre",
    desc: "Fondations, maçonnerie, charpente et structures robustes.",
    color: "var(--color-terracotta)",
  },
  {
    href: "/artisans/finition",
    icon: "🎨",
    title: "Finitions",
    desc: "Carrelage, peinture, enduits et finitions soignées pour vos intérieurs.",
    color: "var(--color-sand-dark)",
  },
];

const stats = [
  { value: "4", label: "Artisans certifiés" },
  { value: "100+", label: "Chantiers réalisés" },
  { value: "2 jours", label: "Délai de réponse moyen" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="section text-white text-center"
        style={{ background: "linear-gradient(135deg, var(--color-ocean-dark) 0%, var(--color-ocean) 60%, var(--color-tropical) 100%)" }}
      >
        <div className="container-site max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-80">
            Comores — France · Mise en relation directe
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Des artisans de confiance,<br />à votre service aux Comores
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Vous êtes de la diaspora et avez un projet de construction ou de rénovation aux Comores ?
            Nous vous mettons en relation avec des artisans locaux qualifiés, vérifiés et disponibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base">
              Demander un devis gratuit
            </Link>
            <Link
              href="/galerie"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white transition-colors"
              style={{ color: "white" }}
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="container-site grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold" style={{ color: "var(--color-ocean)" }}>{s.value}</p>
              <p className="text-sm text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nos spécialités */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos spécialités</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Quatre métiers couverts par des artisans expérimentés, formés et habitués aux conditions locales.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((s) => (
              <Link key={s.href} href={s.href} className="artisan-card group text-center block hover:no-underline">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:underline" style={{ color: s.color }}>
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="section" style={{ backgroundColor: "var(--color-sand)" }}>
        <div className="container-site grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pourquoi choisir Artisans Comores ?
            </h2>
            <ul className="space-y-4">
              {[
                ["🤝", "Artisans vérifiés", "Chaque professionnel est sélectionné pour ses compétences et son sérieux."],
                ["📞", "Contact direct", "Vous échangez directement avec l'artisan, sans intermédiaire supplémentaire."],
                ["💬", "WhatsApp inclus", "Communication facile depuis la France grâce à WhatsApp."],
                ["📷", "Suivi photo", "Recevez des photos d'avancement régulières de votre chantier."],
              ].map(([icon, titre, desc]) => (
                <li key={titre as string} className="flex gap-4">
                  <span className="text-2xl flex-none">{icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{titre}</p>
                    <p className="text-gray-600 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <p className="text-lg font-semibold text-gray-900 mb-4">Démarrez votre projet</p>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Que vous soyez en France ou aux Comores, décrivez-nous votre projet et nous vous mettons
              en relation avec le bon artisan sous 48h.
            </p>
            <Link href="/contact" className="btn-primary w-full text-center">
              Contacter un artisan
            </Link>
            <p className="text-center text-xs text-gray-500 mt-3">Gratuit et sans engagement</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section text-center" style={{ backgroundColor: "var(--color-ocean-dark)" }}>
        <div className="container-site">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à lancer votre projet ?</h2>
          <p className="text-white opacity-80 mb-8 max-w-xl mx-auto">
            Un devis gratuit, une réponse rapide. Nos artisans sont disponibles pour vos projets.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-gray-900 transition-colors hover:opacity-90" style={{ backgroundColor: "var(--color-sand)" }}>
            Obtenir un devis gratuit →
          </Link>
        </div>
      </section>
    </>
  );
}
