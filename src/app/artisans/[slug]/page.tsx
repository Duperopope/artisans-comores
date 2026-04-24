import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { artisans, getArtisan } from "@/lib/artisans";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return artisans.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artisan = getArtisan(slug);
  if (!artisan) return {};
  return {
    title: `${artisan.specialty} aux Comores — Artisans Comores`,
    description: artisan.tagline,
    openGraph: {
      title: `${artisan.specialty} aux Comores`,
      description: artisan.tagline,
      locale: "fr_FR",
    },
  };
}

const colorMap = {
  ocean: {
    badge: "bg-ocean-100 text-ocean-700",
    icon: "bg-ocean-100 text-ocean-600",
    accent: "text-ocean-600",
    btn: "bg-ocean-600 hover:bg-ocean-900",
    border: "border-ocean-200",
  },
  tropical: {
    badge: "bg-tropical-100 text-tropical-700",
    icon: "bg-tropical-100 text-tropical-600",
    accent: "text-tropical-600",
    btn: "bg-tropical-600 hover:bg-tropical-700",
    border: "border-tropical-100",
  },
  terracotta: {
    badge: "bg-terracotta-100 text-terracotta-700",
    icon: "bg-terracotta-100 text-terracotta-600",
    accent: "text-terracotta-600",
    btn: "bg-terracotta-600 hover:bg-terracotta-700",
    border: "border-terracotta-100",
  },
};

export default async function ArtisanPage({ params }: Props) {
  const { slug } = await params;
  const artisan = getArtisan(slug);
  if (!artisan) notFound();

  const c = colorMap[artisan.color];
  const whatsappUrl = `https://wa.me/${artisan.whatsapp}?text=${encodeURIComponent(
    `Bonjour ${artisan.prenom}, j'ai trouvé vos coordonnées sur Artisans Comores. Je souhaite un devis pour des travaux de ${artisan.specialty.toLowerCase()}.`
  )}`;

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Fil d'ariane" className="bg-sand-50 border-b border-sand-200">
        <div className="container-custom py-3 flex items-center gap-2 text-sm font-inter text-neutral-500">
          <Link href="/" className="hover:text-ocean-600 transition-colors">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#services" className="hover:text-ocean-600 transition-colors">Nos services</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ocean-900 font-medium" aria-current="page">{artisan.specialty}</span>
        </div>
      </nav>

      {/* Hero artisan */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className={`inline-block text-xs font-inter font-semibold px-3 py-1 rounded-full mb-4 ${c.badge}`}>
              {artisan.specialty}
            </span>
            <h1 className="font-outfit font-bold text-ocean-900 mb-4">
              {artisan.specialty} aux Comores
            </h1>
            <p className="text-lg text-neutral-600 font-inter leading-relaxed mb-6 max-w-2xl">
              {artisan.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-primary ${c.btn} focus-visible:ring-offset-2 gap-2`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contacter {artisan.prenom} sur WhatsApp
              </a>
              <Link href="/contact" className="btn-secondary">
                Demander un devis par email
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan profile */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Profile card */}
            <div className="artisan-card p-6 self-start">
              <div className={`w-16 h-16 rounded-full ${c.icon} flex items-center justify-center text-2xl font-outfit font-bold mb-4`}>
                {artisan.prenom[0]}
              </div>
              <h2 className="font-outfit font-bold text-ocean-900 text-xl mb-1">{artisan.prenom}</h2>
              <p className={`font-inter text-sm font-semibold mb-3 ${c.accent}`}>{artisan.specialty}</p>
              <ul className="space-y-2 text-sm font-inter text-neutral-500">
                <li className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="w-4 h-4 flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {artisan.zone}
                </li>
                <li className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="w-4 h-4 flex-shrink-0">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {artisan.experience}
                </li>
              </ul>
              <div className={`mt-5 pt-5 border-t ${c.border}`}>
                <p className="text-sm text-neutral-600 font-inter leading-relaxed">{artisan.description}</p>
              </div>
            </div>

            {/* Services grid */}
            <div className="lg:col-span-2">
              <h2 className="font-outfit font-bold text-ocean-900 text-2xl mb-6">Nos prestations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artisan.services.map((service) => (
                  <div key={service.title} className="bg-white rounded-2xl p-5 shadow-card">
                    <div className={`w-8 h-8 rounded-lg ${c.icon} flex items-center justify-center mb-3`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="font-outfit font-semibold text-ocean-900 text-base mb-1">{service.title}</h3>
                    <p className="text-sm text-neutral-500 font-inter leading-relaxed">{service.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="section-padding bg-ocean-950 text-white">
        <div className="container-custom text-center max-w-xl mx-auto">
          <h2 className="font-outfit font-bold text-white text-2xl mb-4">
            Prêt à lancer votre projet ?
          </h2>
          <p className="text-white/65 font-inter mb-8">
            {artisan.prenom} vous répond sous 1 semaine avec un devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-terracotta-600 hover:bg-terracotta-700"
            >
              WhatsApp — Réponse immédiate
            </a>
            <Link href="/contact" className="btn-secondary border-white/30 text-white hover:bg-white/10">
              Formulaire de contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
