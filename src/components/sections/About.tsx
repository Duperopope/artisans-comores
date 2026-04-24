import Animated from "@/components/ui/Animated";

const trustPoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Un réseau de confiance",
    description:
      "Nos artisans sont sélectionnés pour leur expertise et leur sérieux. Chaque chantier est suivi de près.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Communication directe",
    description:
      "Vous échangez directement avec un interlocuteur unique. Pas d'intermédiaire superflu, pas d'opacité.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: "Devis transparent",
    description:
      "Recevez un devis détaillé sous 1 semaine. Prix clairs, sans mauvaises surprises.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Qualité garantie",
    description:
      "Chaque prestation est réalisée dans les règles de l'art. Votre satisfaction est notre priorité absolue.",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <Animated direction="left">
            <div>
              <span className="inline-block text-sm font-inter font-semibold text-terracotta-600 uppercase tracking-wider mb-3">
                Notre histoire
              </span>
              <h2 className="section-heading mb-6">
                La diaspora comorienne mérite des artisans en qui elle peut avoir confiance
              </h2>
              <div className="space-y-4 text-neutral-500 font-inter leading-relaxed">
                <p>
                  Depuis la France, gérer des travaux aux Comores est souvent un parcours du combattant :
                  distance, manque de visibilité sur l'avancement, prestataires peu fiables.
                  Artisans Comores est né pour changer ça.
                </p>
                <p>
                  Nous avons réuni des artisans expérimentés — plomberie, électricité,
                  gros œuvre et finition — unis par un même engagement : livrer un travail
                  de qualité, dans les délais convenus, à un prix juste.
                </p>
                <p>
                  Vous êtes en France, votre maison est aux Comores. Nous faisons le lien,
                  avec transparence et professionnalisme.
                </p>
              </div>

              <a href="#contact" className="btn-primary mt-8 inline-flex">
                Parler de mon projet
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Animated>

          {/* Trust grid */}
          <Animated direction="right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustPoints.map((point) => (
                <div key={point.title} className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
                  <div className="w-10 h-10 rounded-xl bg-ocean-100 text-ocean-600 flex items-center justify-center mb-4">
                    {point.icon}
                  </div>
                  <h3 className="font-outfit font-semibold text-ocean-900 text-base mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-inter leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
}
