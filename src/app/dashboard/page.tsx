"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DEFAULT_CONTENT,
  fetchRemoteContent,
  saveRemoteContent,
  type SiteContent,
  type ServiceContent,
} from "@/lib/content";
import { getSupabase, isAdminEmail } from "@/lib/supabase";

type Tab = "hero" | "services" | "contact";

// ─── Auth gate ────────────────────────────────────────────────────────────────

function AuthGate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}${basePath}/auth/callback`
        : undefined;

    const { error: err } = await getSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ocean-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-terracotta-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h1 className="font-outfit font-bold text-ocean-900 text-lg leading-tight">Administration</h1>
            <p className="text-xs text-neutral-500 font-inter">Artisans Comores</p>
          </div>
        </div>

        <p className="text-sm text-neutral-600 font-inter mb-6">
          Connectez-vous avec votre compte Google autorisé pour accéder au CMS.
        </p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-sand-300 rounded-lg px-4 py-2.5 text-sm font-semibold text-ocean-900 hover:bg-sand-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-ocean-400 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          )}
          {loading ? "Redirection…" : "Continuer avec Google"}
        </button>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600 font-inter">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Field components ─────────────────────────────────────────────────────────

function Field({
  label,
  id,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}</label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          className="form-field resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type="text"
          className="form-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

// ─── Hero tab ─────────────────────────────────────────────────────────────────

function HeroTab({
  content,
  onChange,
}: {
  content: SiteContent["hero"];
  onChange: (h: SiteContent["hero"]) => void;
}) {
  function set<K extends keyof SiteContent["hero"]>(key: K, val: SiteContent["hero"][K]) {
    onChange({ ...content, [key]: val });
  }

  function setStat(index: number, field: "value" | "label", val: string) {
    const next = content.stats.map((s, i) => (i === index ? { ...s, [field]: val } : s));
    onChange({ ...content, stats: next });
  }

  return (
    <div className="space-y-5">
      <Field label="Badge" id="hero-badge" value={content.badge} onChange={(v) => set("badge", v)} />
      <Field label="Accroche principale" id="hero-headline" value={content.headline} onChange={(v) => set("headline", v)} />
      <Field label="Accroche (partie colorée)" id="hero-accent" value={content.headlineAccent} onChange={(v) => set("headlineAccent", v)} />
      <Field label="Sous-titre" id="hero-sub" value={content.subheadline} onChange={(v) => set("subheadline", v)} multiline rows={3} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Bouton principal" id="hero-cta1" value={content.cta1Text} onChange={(v) => set("cta1Text", v)} />
        <Field label="Bouton secondaire" id="hero-cta2" value={content.cta2Text} onChange={(v) => set("cta2Text", v)} />
      </div>

      <fieldset className="border border-sand-200 rounded-xl p-4">
        <legend className="form-label px-1">Chiffres clés</legend>
        <div className="space-y-3">
          {content.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label={`Valeur ${i + 1}`} id={`stat-val-${i}`} value={stat.value} onChange={(v) => setStat(i, "value", v)} />
              <Field label={`Libellé ${i + 1}`} id={`stat-lbl-${i}`} value={stat.label} onChange={(v) => setStat(i, "label", v)} />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

// ─── Services tab ─────────────────────────────────────────────────────────────

function ServicesTab({
  services,
  onChange,
}: {
  services: ServiceContent[];
  onChange: (s: ServiceContent[]) => void;
}) {
  function setField(index: number, field: keyof ServiceContent, val: string) {
    const next = services.map((s, i) => (i === index ? { ...s, [field]: val } : s));
    onChange(next);
  }

  return (
    <div className="space-y-6">
      {services.map((svc, i) => (
        <div key={svc.id} className="border border-sand-200 rounded-xl p-5 space-y-4">
          <h3 className="font-outfit font-semibold text-ocean-900 text-sm uppercase tracking-wider">
            Service {i + 1}
          </h3>
          <Field label="Titre" id={`svc-title-${i}`} value={svc.title} onChange={(v) => setField(i, "title", v)} />
          <Field label="Description" id={`svc-desc-${i}`} value={svc.description} onChange={(v) => setField(i, "description", v)} multiline rows={3} />
        </div>
      ))}
    </div>
  );
}

// ─── Contact tab ──────────────────────────────────────────────────────────────

function ContactTab({
  content,
  onChange,
}: {
  content: SiteContent["contact"];
  onChange: (c: SiteContent["contact"]) => void;
}) {
  function set<K extends keyof SiteContent["contact"]>(key: K, val: SiteContent["contact"][K]) {
    onChange({ ...content, [key]: val });
  }

  function setFeature(index: number, val: string) {
    const next = content.features.map((f, i) => (i === index ? val : f));
    onChange({ ...content, features: next });
  }

  return (
    <div className="space-y-5">
      <Field label="Label de section" id="ct-label" value={content.sectionLabel} onChange={(v) => set("sectionLabel", v)} />
      <Field label="Titre" id="ct-heading" value={content.heading} onChange={(v) => set("heading", v)} />
      <Field label="Sous-titre" id="ct-sub" value={content.subheading} onChange={(v) => set("subheading", v)} multiline rows={3} />

      <fieldset className="border border-sand-200 rounded-xl p-4">
        <legend className="form-label px-1">Arguments de confiance</legend>
        <div className="space-y-3">
          {content.features.map((feat, i) => (
            <Field key={i} label={`Argument ${i + 1}`} id={`feat-${i}`} value={feat} onChange={(v) => setFeature(i, v)} />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

// ─── Main CMS dashboard ───────────────────────────────────────────────────────

type SaveState = "idle" | "saving" | "saved" | "error";

function CmsDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("hero");
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    fetchRemoteContent().then((remote) => {
      if (cancelled) return;
      if (remote) setContent(remote);
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const publish = useCallback(async () => {
    setSaveState("saving");
    setSaveError("");
    try {
      await saveRemoteContent(content);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Erreur inconnue");
      setSaveState("error");
    }
  }, [content]);

  async function resetToDefaults() {
    if (!confirm("Réinitialiser au contenu par défaut ? Les changements publiés seront écrasés lors de la prochaine sauvegarde.")) return;
    setContent(DEFAULT_CONTENT);
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "hero", label: "Accueil" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <div
          className="w-6 h-6 border-2 border-ocean-400 border-t-transparent rounded-full animate-spin"
          aria-label="Chargement du contenu…"
          role="status"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 font-inter">
      <header className="bg-ocean-950 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-terracotta-600 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <div>
            <span className="font-outfit font-semibold text-sm">CMS — Artisans Comores</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2"
          >
            Voir le site →
          </a>
          <button
            onClick={onLogout}
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6 bg-ocean-50 border border-ocean-200 rounded-xl p-4 text-sm text-ocean-800 font-inter">
          <strong>Comment ça fonctionne :</strong> Modifiez le contenu ci-dessous,
          puis cliquez <em>Publier</em>. Les modifications sont enregistrées dans la base
          Supabase et visibles immédiatement pour tous les visiteurs du site.
        </div>

        <div className="flex gap-1 bg-white border border-sand-200 rounded-xl p-1 mb-6">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                tab === id
                  ? "bg-ocean-600 text-white"
                  : "text-neutral-600 hover:text-ocean-900 hover:bg-sand-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-sand-200 rounded-2xl p-6">
          {tab === "hero" && (
            <HeroTab
              content={content.hero}
              onChange={(hero) => setContent((prev) => ({ ...prev, hero }))}
            />
          )}
          {tab === "services" && (
            <ServicesTab
              services={content.services}
              onChange={(services) => setContent((prev) => ({ ...prev, services }))}
            />
          )}
          {tab === "contact" && (
            <ContactTab
              content={content.contact}
              onChange={(contact) => setContent((prev) => ({ ...prev, contact }))}
            />
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={publish}
            disabled={saveState === "saving"}
            className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            aria-busy={saveState === "saving"}
          >
            {saveState === "saving" && (
              <>
                <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                Publication…
              </>
            )}
            {saveState === "saved" && (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Publié !
              </>
            )}
            {(saveState === "idle" || saveState === "error") && (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                Publier
              </>
            )}
          </button>

          <button
            onClick={resetToDefaults}
            className="btn-ghost text-sm text-neutral-500 hover:text-red-600"
          >
            Réinitialiser (défaut)
          </button>
        </div>

        {saveState === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-600 font-inter">
            Échec de la publication : {saveError}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Page entry ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      const email = session?.user?.email ?? null;
      setAuthed(isAdminEmail(email));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const email = session?.user?.email ?? null;
      setAuthed(isAdminEmail(email));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await getSupabase().auth.signOut();
    setAuthed(false);
  }

  if (authed === null) return null;
  if (!authed) return <AuthGate />;
  return <CmsDashboard onLogout={logout} />;
}
