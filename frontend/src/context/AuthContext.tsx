import { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Couple, User } from "./models";
import { demoUser, isDemoMode } from "../services/demoMode";
import { CouplesService } from "../services/CouplesService";

interface AuthContextType {
  user: User | null;
  couple: Couple | null;
  setCouple: (couple: Couple | null) => void;
  setUser: (user: User | null) => void;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const demoActive = isDemoMode() || location.pathname.startsWith("/demo");
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try {
      const storedToken = localStorage.getItem("token");
      return storedToken;
    } catch (e) {
      console.error("Error parsing token from localStorage:", e);
      return null;
    }
  });
  const [couple, setCouple] = useState<Couple | null>(null);

  useEffect(() => {
    const coupleId = demoActive ? demoUser.couple_id : user?.couple_id;
    if (!coupleId) return;

    CouplesService.getMyCouple()
      .then(({ couple: coupleData }) => setCouple(coupleData))
      .catch(() => setCouple(null));
  }, [demoActive, user?.couple_id]);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setCouple(null);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setCouple(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user: demoActive ? demoUser : user,
        couple,
        setCouple,
        setUser,
        token: demoActive ? "demo-token" : token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
