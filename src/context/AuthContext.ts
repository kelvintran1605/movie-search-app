import { createContext, useContext } from "react";
import type { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  avatarUrl: string;
  setAvatarUrl: (state: string) => void
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  avatarUrl: "",
  setAvatarUrl: () => {}
});

export const useAuth = () => useContext(AuthContext);
