"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CmsContent, HeroStat, ServiceItem } from "@/lib/cms";

type Tab = "hero" | "services" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Accueil — Hero" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const inputCls =
  "w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm text-ocean-900 font-inter focus:outline-none focus:ring-2 focus:ring-ocean-500 bg-white";
const textareaCls = `${inputCls} resize-none`;

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-inter font-medium text-ocean-900 mb-1.5"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [content, setContent] = useState<CmsContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setError("Impossible de charger le contenu."));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logout: true }),
    });
    router.push("/dashboard/login");
    router.refresh();
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setError(null);
    setSavedAt(null);

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setSavedAt(new Date().toLocaleTimeString("fr-FR"));
      } else {
        const data = await res.json();
        setError(data.error ?? "Erreur lors de la sauvegarde.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  function updateHero(
    field: keyof Omit<CmsContent["hero"], "stats">,
    value: string
  ) {
    setContent((prev) =>
      prev ? { ...prev, hero: { ...prev.hero, [field]: value } } : prev
    );
  }

  function updateStat(idx: number, field: keyof HeroStat, value: string) {
    setContent((prev) => {
      if (!prev) return prev;
      const stats = prev.hero.stats.map((s, i) =>
        i === idx ? { ...s, [field]: value } : s
      );
      return { ...prev, hero: { ...prev.hero, stats } };
    });
  }

  function updateService(
    idx: number,
    field: keyof Omit<ServiceItem, "id">,
    value: string
  ) {
    setContent((prev) => {
      if (!prev) return prev;
      const services = prev.services.map((s, i) =>
        i === idx ? { ...s, [field]: value } : s
      );
      return { ...prev, services };
    });
  }

  function updateContact(
    field: keyof CmsContent["contact"],
    value: string
  ) {
    setContent((prev) =>
      prev
        ? { ...prev, contact: { ...prev.contact, [field]: value } }
        : prev
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <p className="text-neutral-500 font-inter">
          {error ?? "Chargement…"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ocean-900 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-outfit font-bold text-ocean-900">
              Administration
            </h1>
            <p className="text-xs font-inter text-neutral-400">
              Artisans Comores — contenu du site
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-inter text-ocean-600 hover:underline hidden sm:block"
          >
            Voir le site →
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-inter text-neutral-500 hover:text-ocean-900 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSave}>
          {/* Tabs */}
          <nav
            className="flex flex-wrap gap-2 mb-6"
            aria-label="Sections du site"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-inter font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-ocean-900 border border-neutral-100"
                    : "text-neutral-500 hover:bg-white/70 hover:text-ocean-900"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 space-y-6">
            {/* ── HERO ── */}
            {activeTab === "hero" && (
              <>
                <h2 className="font-outfit font-semibold text-ocean-900 text-lg border-b border-neutral-100 pb-3">
                  Section Hero
                </h2>

                <Field label="Badge (texte en haut)" id="hero-badge">
                  <input
                    id="hero-badge"
                    type="text"
                    className={inputCls}
                    value={content.hero.badge}
                    onChange={(e) => updateHero("badge", e.target.value)}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Titre (première ligne)" id="hero-title">
                    <input
                      id="hero-title"
                      type="text"
                      className={inputCls}
                      value={content.hero.title}
                      onChange={(e) => updateHero("title", e.target.value)}
                    />
                  </Field>
                  <Field label="Titre mis en valeur (terracotta)" id="hero-highlight">
                    <input
                      id="hero-highlight"
                      type="text"
                      className={inputCls}
                      value={content.hero.titleHighlight}
                      onChange={(e) =>
                        updateHero("titleHighlight", e.target.value)
                      }
                    />
                  </Field>
                </div>

                <Field label="Description" id="hero-desc">
                  <textarea
                    id="hero-desc"
                    rows={4}
                    className={textareaCls}
                    value={content.hero.description}
                    onChange={(e) => updateHero("description", e.target.value)}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Bouton principal" id="hero-cta1">
                    <input
                      id="hero-cta1"
                      type="text"
                      className={inputCls}
                      value={content.hero.ctaPrimary}
                      onChange={(e) =>
                        updateHero("ctaPrimary", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Bouton secondaire" id="hero-cta2">
                    <input
                      id="hero-cta2"
                      type="text"
                      className={inputCls}
                      value={content.hero.ctaSecondary}
                      onChange={(e) =>
                        updateHero("ctaSecondary", e.target.value)
                      }
                    />
                  </Field>
                </div>

                <div>
                  <p className="text-sm font-inter font-medium text-ocean-900 mb-3">
                    Chiffres clés (3 statistiques)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {content.hero.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-neutral-50 rounded-xl space-y-2"
                      >
                        <Field label="Valeur" id={`stat-value-${idx}`}>
                          <input
                            id={`stat-value-${idx}`}
                            type="text"
                            className={inputCls}
                            value={stat.value}
                            onChange={(e) =>
                              updateStat(idx, "value", e.target.value)
                            }
                          />
                        </Field>
                        <Field label="Libellé" id={`stat-label-${idx}`}>
                          <input
                            id={`stat-label-${idx}`}
                            type="text"
                            className={inputCls}
                            value={stat.label}
                            onChange={(e) =>
                              updateStat(idx, "label", e.target.value)
                            }
                          />
                        </Field>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── SERVICES ── */}
            {activeTab === "services" && (
              <>
                <h2 className="font-outfit font-semibold text-ocean-900 text-lg border-b border-neutral-100 pb-3">
                  Nos spécialités
                </h2>
                <p className="text-sm text-neutral-500 font-inter -mt-2">
                  Les icônes sont fixes. Seuls le titre et la description sont
                  éditables.
                </p>
                <div className="space-y-4">
                  {content.services.map((service, idx) => (
                    <div
                      key={service.id}
                      className="p-4 bg-neutral-50 rounded-xl space-y-3"
                    >
                      <p className="text-xs font-inter font-semibold text-neutral-400 uppercase tracking-wider">
                        {service.id}
                      </p>
                      <Field label="Titre" id={`service-title-${idx}`}>
                        <input
                          id={`service-title-${idx}`}
                          type="text"
                          className={inputCls}
                          value={service.title}
                          onChange={(e) =>
                            updateService(idx, "title", e.target.value)
                          }
                        />
                      </Field>
                      <Field label="Description" id={`service-desc-${idx}`}>
                        <textarea
                          id={`service-desc-${idx}`}
                          rows={3}
                          className={textareaCls}
                          value={service.description}
                          onChange={(e) =>
                            updateService(idx, "description", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── CONTACT ── */}
            {activeTab === "contact" && (
              <>
                <h2 className="font-outfit font-semibold text-ocean-900 text-lg border-b border-neutral-100 pb-3">
                  Contact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email de réception des formulaires" id="contact-email">
                    <input
                      id="contact-email"
                      type="email"
                      className={inputCls}
                      value={content.contact.email}
                      onChange={(e) =>
                        updateContact("email", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Délai de réponse (heures)" id="contact-time">
                    <input
                      id="contact-time"
                      type="text"
                      className={inputCls}
                      value={content.contact.responseTime}
                      onChange={(e) =>
                        updateContact("responseTime", e.target.value)
                      }
                    />
                  </Field>
                </div>
                <p className="text-sm font-inter text-neutral-400 bg-neutral-50 rounded-xl px-4 py-3">
                  Les numéros WhatsApp des artisans sont modifiables dans{" "}
                  <code className="font-mono text-xs bg-white px-1 rounded">
                    src/lib/artisans.ts
                  </code>
                  .
                </p>
              </>
            )}
          </div>

          {/* Save bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-8 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Sauvegarde…" : "Enregistrer les modifications"}
            </button>
            {savedAt && !error && (
              <p className="text-sm font-inter text-tropical-600">
                ✓ Sauvegardé à {savedAt}
              </p>
            )}
            {error && (
              <p className="text-sm font-inter text-red-600">⚠ {error}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
