"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSupabase, isAdminEmail } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await getSupabase().auth.signOut();
    setUser(null);
  }

  const isAdmin = isAdminEmail(user?.email);

  return (
    <AuthContext value={{ user, isAdmin, loading, signOut }}>
      {children}
    </AuthContext>
  );
}
