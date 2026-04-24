"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type {
  CmsContent,
  HeroStat,
  ServiceItem,
  GalleryItem,
} from "@/lib/cms";

type Tab = "hero" | "services" | "media" | "gallery" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Accueil — Hero" },
  { id: "services", label: "Services" },
  { id: "media", label: "Vidéo" },
  { id: "gallery", label: "Galerie" },
  { id: "contact", label: "Contact" },
];

const GALLERY_CATEGORIES: GalleryItem["category"][] = [
  "plomberie",
  "electricite",
  "gros-oeuvre",
  "finition",
];

const inputCls =
  "w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm text-ocean-900 font-inter focus:outline-none focus:ring-2 focus:ring-ocean-500 bg-white";
const textareaCls = `${inputCls} resize-none`;

function Field({
  label,
  id,
  hint,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
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
      {hint && <p className="mt-1 text-xs font-inter text-neutral-400">{hint}</p>}
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

  function updateMedia(field: keyof CmsContent["media"], value: string) {
    setContent((prev) =>
      prev ? { ...prev, media: { ...prev.media, [field]: value } } : prev
    );
  }

  function updateGalleryItem(
    idx: number,
    field: keyof GalleryItem,
    value: string
  ) {
    setContent((prev) => {
      if (!prev) return prev;
      const gallery = prev.gallery.map((g, i) =>
        i === idx ? { ...g, [field]: value } : g
      );
      return { ...prev, gallery };
    });
  }

  function addGalleryItem() {
    setContent((prev) => {
      if (!prev) return prev;
      const id = `p${Date.now()}`;
      const next: GalleryItem = {
        id,
        title: "Nouveau projet",
        category: "finition",
        location: "",
        description: "",
        imageUrl: "",
      };
      return { ...prev, gallery: [...prev.gallery, next] };
    });
  }

  function removeGalleryItem(idx: number) {
    setContent((prev) => {
      if (!prev) return prev;
      return { ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) };
    });
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

                <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
                  <Field
                    label="Image du Hero (URL)"
                    id="hero-image"
                    hint="Laisser vide pour masquer l'image. URL vers Unsplash, Vercel Blob ou /photos/..."
                  >
                    <input
                      id="hero-image"
                      type="url"
                      className={inputCls}
                      value={content.hero.imageUrl ?? ""}
                      onChange={(e) => updateHero("imageUrl", e.target.value)}
                      placeholder="https://…"
                    />
                  </Field>
                  <Field label="Texte alternatif" id="hero-image-alt">
                    <input
                      id="hero-image-alt"
                      type="text"
                      className={inputCls}
                      value={content.hero.imageAlt ?? ""}
                      onChange={(e) => updateHero("imageAlt", e.target.value)}
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
                  Les icônes sont fixes. Ajoutez une image illustrative si
                  souhaité (URL publique).
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
                      <Field
                        label="Image (URL) — optionnelle"
                        id={`service-img-${idx}`}
                      >
                        <input
                          id={`service-img-${idx}`}
                          type="url"
                          className={inputCls}
                          value={service.imageUrl ?? ""}
                          onChange={(e) =>
                            updateService(idx, "imageUrl", e.target.value)
                          }
                          placeholder="https://…"
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── MEDIA / VIDEO ── */}
            {activeTab === "media" && (
              <>
                <h2 className="font-outfit font-semibold text-ocean-900 text-lg border-b border-neutral-100 pb-3">
                  Section Vidéo
                </h2>
                <p className="text-sm text-neutral-500 font-inter -mt-2">
                  Ajoutez un lien YouTube, Vimeo ou un fichier MP4. Laissez vide
                  pour masquer la section vidéo.
                </p>
                <Field
                  label="URL de la vidéo"
                  id="media-video"
                  hint="Ex : https://www.youtube.com/watch?v=…, https://vimeo.com/… ou https://…/film.mp4"
                >
                  <input
                    id="media-video"
                    type="url"
                    className={inputCls}
                    value={content.media.videoUrl ?? ""}
                    onChange={(e) => updateMedia("videoUrl", e.target.value)}
                    placeholder="https://…"
                  />
                </Field>
                <Field
                  label="Image de prévisualisation (poster) — URL"
                  id="media-poster"
                  hint="Utilisée uniquement pour les vidéos MP4 hébergées."
                >
                  <input
                    id="media-poster"
                    type="url"
                    className={inputCls}
                    value={content.media.posterUrl ?? ""}
                    onChange={(e) => updateMedia("posterUrl", e.target.value)}
                    placeholder="https://…"
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Titre de la section" id="media-title">
                    <input
                      id="media-title"
                      type="text"
                      className={inputCls}
                      value={content.media.title ?? ""}
                      onChange={(e) => updateMedia("title", e.target.value)}
                    />
                  </Field>
                  <Field label="Description" id="media-desc">
                    <input
                      id="media-desc"
                      type="text"
                      className={inputCls}
                      value={content.media.description ?? ""}
                      onChange={(e) =>
                        updateMedia("description", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </>
            )}

            {/* ── GALLERY ── */}
            {activeTab === "gallery" && (
              <>
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h2 className="font-outfit font-semibold text-ocean-900 text-lg">
                    Galerie de réalisations
                  </h2>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="btn-ghost text-sm"
                  >
                    + Ajouter un projet
                  </button>
                </div>
                <p className="text-sm text-neutral-500 font-inter -mt-2">
                  Gérez les projets affichés sur la page{" "}
                  <code className="font-mono text-xs bg-neutral-50 px-1 rounded">
                    /galerie
                  </code>
                  .
                </p>
                <div className="space-y-4">
                  {content.gallery.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 bg-neutral-50 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-inter font-semibold text-neutral-400 uppercase tracking-wider">
                          {item.id}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(idx)}
                          className="text-xs font-inter text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="Titre" id={`g-title-${idx}`}>
                          <input
                            id={`g-title-${idx}`}
                            type="text"
                            className={inputCls}
                            value={item.title}
                            onChange={(e) =>
                              updateGalleryItem(idx, "title", e.target.value)
                            }
                          />
                        </Field>
                        <Field label="Lieu" id={`g-loc-${idx}`}>
                          <input
                            id={`g-loc-${idx}`}
                            type="text"
                            className={inputCls}
                            value={item.location}
                            onChange={(e) =>
                              updateGalleryItem(idx, "location", e.target.value)
                            }
                          />
                        </Field>
                      </div>
                      <Field label="Catégorie" id={`g-cat-${idx}`}>
                        <select
                          id={`g-cat-${idx}`}
                          className={inputCls}
                          value={item.category}
                          onChange={(e) =>
                            updateGalleryItem(idx, "category", e.target.value)
                          }
                        >
                          {GALLERY_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Description" id={`g-desc-${idx}`}>
                        <textarea
                          id={`g-desc-${idx}`}
                          rows={2}
                          className={textareaCls}
                          value={item.description}
                          onChange={(e) =>
                            updateGalleryItem(idx, "description", e.target.value)
                          }
                        />
                      </Field>
                      <Field label="Image (URL)" id={`g-img-${idx}`}>
                        <input
                          id={`g-img-${idx}`}
                          type="url"
                          className={inputCls}
                          value={item.imageUrl ?? ""}
                          onChange={(e) =>
                            updateGalleryItem(idx, "imageUrl", e.target.value)
                          }
                          placeholder="https://…"
                        />
                      </Field>
                    </div>
                  ))}
                  {content.gallery.length === 0 && (
                    <p className="text-sm text-neutral-400 font-inter italic text-center py-6">
                      Aucun projet. Cliquez sur « Ajouter un projet ».
                    </p>
                  )}
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
                  <Field
                    label="Délai de réponse"
                    id="contact-time"
                    hint="Texte libre, ex : « 1 semaine », « 48h », « 3 jours »"
                  >
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
