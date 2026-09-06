import { createContext, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import type { User } from "./models";
import { demoUser, isDemoMode } from "../services/demoMode";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
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

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const demoActive = isDemoMode() || location.pathname.startsWith("/demo");

  return (
    <AuthContext.Provider
      value={{
        user: demoActive ? demoUser : user,
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
