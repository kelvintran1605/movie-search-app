import { supabase } from "@/lib/supabase";
import { useEffect, useState, type ReactNode } from "react";
import NotAuthenticated from "./NotAuthenticated";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          setIsAuthenticated(false);

          return;
        }
        setIsAuthenticated(true);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <>{children}</> : <NotAuthenticated />;
};

export default ProtectedRoute;
