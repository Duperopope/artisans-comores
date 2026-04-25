"use client";

import Animated from "@/components/ui/Animated";
import { useContent } from "@/components/ContentProvider";

const SERVICE_META: Record<string, {
  icon: React.ReactNode;
  accentClass: string;
  badgeClass: string;
}> = {
  plombier: {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
        <path d="M8 40V24a4 4 0 0 1 4-4h4" />
        <path d="M24 20h4a4 4 0 0 1 4 4v16" />
        <path d="M16 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
        <circle cx="24" cy="36" r="4" />
        <path d="M8 28h8M32 28h8" />
      </svg>
    ),
    accentClass: "bg-ocean-50 text-ocean-600",
    badgeClass: "bg-ocean-100 text-ocean-700",
  },
  electricien: {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
        <path d="M26 8l-10 16h12l-10 16" />
      </svg>
    ),
    accentClass: "bg-tropical-50 text-tropical-600",
    badgeClass: "bg-tropical-100 text-tropical-700",
  },
  "gros-oeuvre": {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
        <rect x="8" y="32" width="32" height="8" rx="1" />
        <rect x="12" y="22" width="10" height="10" rx="1" />
        <rect x="26" y="22" width="10" height="10" rx="1" />
        <rect x="16" y="12" width="16" height="10" rx="1" />
        <path d="M24 12V8" />
      </svg>
    ),
    accentClass: "bg-terracotta-50 text-terracotta-600",
    badgeClass: "bg-terracotta-100 text-terracotta-700",
  },
  finition: {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
        <path d="M12 36l20-20M16 40l4-4M32 12l4 4-20 20-4-4z" />
        <path d="M36 8l4 4-4-4zM8 40l4-4-2-2-2 6z" />
      </svg>
    ),
    accentClass: "bg-sand-100 text-ocean-600",
    badgeClass: "bg-sand-200 text-ocean-700",
  },
};

export default function Services() {
  const services = useContent().services;

  return (
    <section id="services" className="scroll-mt-16 section-padding bg-sand-50">
      <div className="container-custom">
        <Animated>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-sm font-inter font-semibold text-terracotta-600 uppercase tracking-wider mb-3">
              Nos expertises
            </span>
            <h2 className="section-heading mb-4">
              Quatre corps de métier, une seule équipe
            </h2>
            <p className="text-neutral-500 font-inter leading-relaxed">
              Nos artisans couvrent l&apos;ensemble des besoins d&apos;un chantier de rénovation,
              de la structure jusqu&apos;aux finitions les plus soignées.
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const meta = SERVICE_META[service.id] ?? SERVICE_META.plombier;
            return (
              <Animated key={service.id} delay={index * 0.1}>
                <article className="artisan-card p-6 flex flex-col gap-4 h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${meta.accentClass}`}>
                    {meta.icon}
                  </div>
                  <div>
                    <span className={`inline-block text-xs font-inter font-semibold px-2.5 py-1 rounded-full mb-3 ${meta.badgeClass}`}>
                      {service.title}
                    </span>
                    <h3 className="font-outfit font-semibold text-ocean-900 text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-500 font-inter leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <a
                      href={`/artisans/${service.id}`}
                      className="btn-ghost text-sm px-0 gap-1 hover:gap-2 transition-all"
                      aria-label={`En savoir plus sur ${service.title}`}
                    >
                      En savoir plus
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Animated>
            );
          })}
        </div>
      </div>
    </section>
  );
}
