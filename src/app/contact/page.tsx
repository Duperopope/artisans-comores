import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Demander un devis",
  description:
    "Contactez nos artisans aux Comores. Formulaire en ligne ou WhatsApp direct. Réponse sous 48h, devis gratuit et sans engagement.",
};

const whatsappLinks = [
  { label: "Plombier", icon: "🔧", number: "2697700001" },
  { label: "Électricien", icon: "⚡", number: "2697700002" },
  { label: "Gros œuvre", icon: "🏗️", number: "2697700003" },
  { label: "Finitions", icon: "🎨", number: "2697700004" },
];

export default function ContactPage() {
  return (
    <>
      <section
        className="section text-white text-center"
        style={{ background: "linear-gradient(135deg, var(--color-ocean-dark), var(--color-ocean))" }}
      >
        <div className="container-site">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Devis gratuit, sans engagement. Réponse garantie sous 48 heures ouvrées.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez votre demande</h2>
            <form
              action="https://formsubmit.co/contact@artisans-comores.com"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value="Nouvelle demande de devis — Artisans Comores" />
              <input type="hidden" name="_captcha" value="false" />

              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Votre nom et prénom"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-900"
                  style={{ "--tw-ring-color": "var(--color-ocean)" } as React.CSSProperties}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone / WhatsApp
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+33 6 XX XX XX XX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="specialite" className="block text-sm font-medium text-gray-700 mb-1">
                  Spécialité souhaitée *
                </label>
                <select
                  id="specialite"
                  name="specialite"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-900"
                >
                  <option value="">— Choisissez un métier —</option>
                  <option value="plomberie">Plomberie</option>
                  <option value="electricite">Électricité</option>
                  <option value="gros-oeuvre">Gros œuvre</option>
                  <option value="finitions">Finitions</option>
                  <option value="multi">Plusieurs métiers</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Description du projet *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre projet : type de travaux, surface, localisation, contraintes particulières..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-base"
              >
                Envoyer ma demande →
              </button>
              <p className="text-xs text-gray-500 text-center">
                Vos données sont utilisées uniquement pour répondre à votre demande.
              </p>
            </form>
          </div>

          {/* WhatsApp + infos */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact direct WhatsApp</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Préférez-vous un contact direct ? Choisissez l&apos;artisan selon votre besoin et
                envoyez-lui un message WhatsApp maintenant.
              </p>
              <div className="space-y-3">
                {whatsappLinks.map((w) => (
                  <a
                    key={w.label}
                    href={`https://wa.me/${w.number}?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20${encodeURIComponent(w.label)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-colors"
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{w.label}</p>
                      <p className="text-xs text-gray-500">+{w.number}</p>
                    </div>
                    <span className="text-2xl">📱</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="artisan-card">
              <h3 className="font-semibold text-gray-900 mb-3">Informations pratiques</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📍 <strong>Localisation :</strong> Grande Comore, Anjouan, Mohéli</li>
                <li>⏰ <strong>Réponse :</strong> Sous 48h ouvrées</li>
                <li>💶 <strong>Devis :</strong> Gratuit, sans engagement</li>
                <li>🌐 <strong>Langues :</strong> Français, Comorien, Arabe</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
