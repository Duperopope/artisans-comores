import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Artisans Comores : qui sommes-nous ? Notre histoire, notre mission, notre engagement envers la diaspora comorienne et les clients locaux.",
};

const team = [
  { name: "Abdou", role: "Plombier", xp: "12 ans", icon: "🔧" },
  { name: "Moustafa", role: "Électricien", xp: "9 ans", icon: "⚡" },
  { name: "Saïd", role: "Maçon gros œuvre", xp: "15 ans", icon: "🏗️" },
  { name: "Farouk", role: "Artisan finitions", xp: "8 ans", icon: "🎨" },
];

export default function AProposPage() {
  return (
    <>
      <section
        className="section text-white"
        style={{ background: "linear-gradient(135deg, var(--color-ocean-dark), var(--color-tropical))" }}
      >
        <div className="container-site max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">À propos d&apos;Artisans Comores</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Nous sommes un collectif de quatre artisans comoriens passionnés, engagés à offrir une qualité
            d&apos;exécution qui respecte à la fois les standards modernes et les savoir-faire traditionnels de nos îles.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre histoire</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Artisans Comores est né d&apos;un constat simple : des milliers de membres de la diaspora comorienne
                en France ont des projets de construction ou de rénovation aux Comores, mais peinent à trouver
                des artisans fiables à distance.
              </p>
              <p>
                Nous avons réuni quatre artisans de confiance — plombier, électricien, maçon et peintre —
                pour créer une offre transparente, communicante et adaptée aux contraintes de la diaspora :
                suivi photo, échanges WhatsApp, devis clairs et respect des délais.
              </p>
              <p>
                Basés sur Grande Comore et intervenant sur Anjouan et Mohéli, nous sommes votre interlocuteur
                local de confiance pour tous vos travaux, quelle que soit la distance.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos engagements</h2>
            <ul className="space-y-4">
              {[
                ["✅", "Transparence", "Devis détaillé, pas de surprises en fin de chantier."],
                ["📷", "Suivi régulier", "Photos et comptes-rendus d'avancement à chaque étape."],
                ["💬", "Communication", "Réponse sous 48h, contact WhatsApp direct."],
                ["🏆", "Qualité", "Matériaux conformes, finitions soignées, satisfaction garantie."],
                ["🤝", "Réseau local", "Accès aux meilleurs fournisseurs et tarifs locaux."],
              ].map(([icon, titre, desc]) => (
                <li key={titre as string} className="flex gap-3">
                  <span className="text-xl flex-none">{icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{titre}</p>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section" style={{ backgroundColor: "var(--color-sand)" }}>
        <div className="container-site">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Notre équipe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="artisan-card text-center">
                <div className="text-4xl mb-3">{m.icon}</div>
                <p className="font-bold text-gray-900">{m.name}</p>
                <p className="text-sm font-medium" style={{ color: "var(--color-ocean)" }}>{m.role}</p>
                <p className="text-xs text-gray-500 mt-1">{m.xp} d&apos;expérience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 text-center" style={{ backgroundColor: "var(--color-ocean-dark)" }}>
        <div className="container-site">
          <h2 className="text-2xl font-bold text-white mb-4">Travaillons ensemble</h2>
          <Link href="/contact" className="btn-primary" style={{ backgroundColor: "var(--color-sand)", color: "var(--color-gray-900)" }}>
            Contacter notre équipe
          </Link>
        </div>
      </section>
    </>
  );
}
