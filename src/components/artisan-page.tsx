import Link from "next/link";

interface Service {
  title: string;
  desc: string;
}

interface ArtisanPageProps {
  icon: string;
  specialty: string;
  tagline: string;
  description: string;
  services: Service[];
  whatsapp: string;
  accentColor: string;
}

export default function ArtisanPage({
  icon,
  specialty,
  tagline,
  description,
  services,
  whatsapp,
  accentColor,
}: ArtisanPageProps) {
  const whatsappUrl = `https://wa.me/${whatsapp}?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20des%20travaux%20de%20${encodeURIComponent(specialty.toLowerCase())}.`;

  return (
    <>
      <section
        className="section text-white"
        style={{ background: `linear-gradient(135deg, ${accentColor}dd 0%, ${accentColor} 100%)` }}
      >
        <div className="container-site text-center">
          <div className="text-6xl mb-4">{icon}</div>
          <h1 className="text-4xl font-bold mb-4">{specialty}</h1>
          <p className="text-xl opacity-90 mb-6 max-w-xl mx-auto">{tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white !text-gray-900 hover:!bg-gray-100">
              Demander un devis
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              📱 WhatsApp direct
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre expertise</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nos prestations</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <span className="mt-0.5 text-green-600 flex-none">✓</span>
                  <div>
                    <p className="font-medium text-gray-900">{s.title}</p>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="artisan-card flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">Zone d&apos;intervention</p>
              <p className="text-gray-900">Grande Comore, Anjouan, Mohéli</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">Langues</p>
              <p className="text-gray-900">Comorien, Français, Arabe</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">Délai de réponse</p>
              <p className="text-gray-900">Sous 1 semaine</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <Link href="/contact" className="btn-primary w-full text-center mb-3">
                Demander un devis gratuit
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: "#25D366" }}
              >
                📱 Contacter via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
