"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase, isAdminEmail } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();

    const resolveSession = async (session: { user?: { email?: string | null } } | null) => {
      if (!session) return false;
      const email = session.user?.email ?? null;
      if (!isAdminEmail(email)) {
        await supabase.auth.signOut();
        setError("Adresse non autorisée.");
        setTimeout(() => router.replace("/dashboard"), 1500);
        return true;
      }
      router.replace("/dashboard");
      return true;
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      void resolveSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        void resolveSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-ocean-950 text-white">
      {error ? (
        <p role="alert" className="text-sm text-red-300 font-inter">{error}</p>
      ) : (
        <div
          className="w-6 h-6 border-2 border-terracotta-400 border-t-transparent rounded-full animate-spin"
          aria-label="Connexion en cours…"
          role="status"
        />
      )}
    </section>
  );
}
