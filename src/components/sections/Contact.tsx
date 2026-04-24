"use client";

import { useState, type FormEvent } from "react";
import Animated from "@/components/ui/Animated";
import { useContent } from "@/components/ContentProvider";

const FEATURE_ICONS = [
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  <svg key="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
    <polyline points="20 6 9 17 4 12" />
  </svg>,
  <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
];

const specialties = [
  { value: "", label: "Sélectionnez un service" },
  { value: "plomberie", label: "Plomberie" },
  { value: "electricite", label: "Électricité" },
  { value: "gros-oeuvre", label: "Gros œuvre" },
  { value: "finition", label: "Finition" },
  { value: "multiple", label: "Plusieurs services" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const c = useContent().contact;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <section id="contact" className="scroll-mt-16 section-padding bg-ocean-950">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Animated direction="left" className="text-white">
            <span className="inline-block text-sm font-inter font-semibold text-terracotta-400 uppercase tracking-wider mb-3">
              {c.sectionLabel}
            </span>
            <h2 className="font-outfit font-bold text-white mb-6" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
              {c.heading}
            </h2>
            <p className="text-white/65 font-inter leading-relaxed mb-10">
              {c.subheading}
            </p>

            <ul className="space-y-5" role="list">
              {c.features.map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 font-inter text-sm">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-terracotta-400">
                    {FEATURE_ICONS[i % FEATURE_ICONS.length]}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Animated>

          <Animated direction="right" delay={0.1} className="bg-white rounded-3xl p-8 shadow-glass">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-tropical-100 text-tropical-600 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-outfit font-bold text-ocean-900 text-xl mb-2">
                  Message envoyé !
                </h3>
                <p className="text-neutral-500 font-inter text-sm">
                  Merci pour votre demande. Nous vous répondrons dans les 48h.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-ghost mt-6 text-sm"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="font-outfit font-bold text-ocean-900 text-xl mb-6">
                  Demande de devis
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Nom complet <span aria-hidden="true" className="text-terracotta-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="form-field"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="form-field"
                      placeholder="+33 6 ..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email <span aria-hidden="true" className="text-terracotta-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="form-field"
                    placeholder="vous@exemple.fr"
                  />
                </div>

                <div>
                  <label htmlFor="specialty" className="form-label">
                    Type de travaux <span aria-hidden="true" className="text-terracotta-600">*</span>
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    required
                    className="form-field bg-white"
                    defaultValue=""
                  >
                    {specialties.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Description du projet <span aria-hidden="true" className="text-terracotta-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="form-field resize-none"
                    placeholder="Décrivez vos travaux, la surface concernée, vos contraintes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </button>

                <p className="text-xs text-neutral-400 font-inter text-center leading-relaxed">
                  Vos données sont utilisées uniquement pour traiter votre demande.
                </p>
              </form>
            )}
          </Animated>
        </div>
      </div>
    </section>
  );
}
