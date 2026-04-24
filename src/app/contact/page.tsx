import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { artisans } from "@/lib/artisans";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact & Devis — Artisans Comores",
  description:
    "Demandez un devis gratuit pour vos travaux aux Comores. Réponse sous 48h. Contactez aussi nos artisans directement par WhatsApp.",
};

export default async function ContactPage() {
  const cms = await getCmsContent();

  return (
    <>
      <Contact email={cms.contact.email} responseTime={cms.contact.responseTime} />

      {/* WhatsApp direct par artisan */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-inter font-semibold text-terracotta-600 uppercase tracking-wider mb-3">
              Contact direct
            </span>
            <h2 className="section-heading">WhatsApp — Réponse immédiate</h2>
            <p className="text-neutral-500 font-inter mt-3 max-w-xl mx-auto">
              Vous connaissez déjà le corps de métier dont vous avez besoin ? Contactez
              directement l'artisan concerné.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {artisans.map((artisan) => {
              const url = `https://wa.me/${artisan.whatsapp}?text=${encodeURIComponent(
                `Bonjour ${artisan.prenom}, j'ai trouvé vos coordonnées sur Artisans Comores. Je souhaite un devis pour des travaux de ${artisan.specialty.toLowerCase()}.`
              )}`;
              return (
                <a
                  key={artisan.slug}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="artisan-card p-5 flex flex-col gap-3 group hover:border-tropical-500"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tropical-100 text-tropical-600 flex items-center justify-center font-outfit font-bold text-sm">
                      {artisan.prenom[0]}
                    </div>
                    <div>
                      <div className="font-outfit font-semibold text-ocean-900 text-sm">{artisan.prenom}</div>
                      <div className="text-xs text-neutral-500 font-inter">{artisan.specialty}</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-tropical-600 font-inter text-sm font-semibold group-hover:gap-3 transition-all">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4 flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contacter sur WhatsApp
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
