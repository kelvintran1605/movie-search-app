import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "./AuthContext";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const getSupabaseAvatar = async (user_id: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("profile_image")
        .eq("id", user_id)
        .single();
      if (data) {
        setAvatarUrl(data.profile_image);
      }
    };
    // Get session and user data
    const getSupabaseSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
      getSupabaseAvatar(data.session?.user.id || "");
    };
    getSupabaseSession();

    // Register auth login logout listener for the website
    const { data: sub } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => sub.subscription.unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ session, user, loading, avatarUrl, setAvatarUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
