import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
 
interface User {
  id: string;
  email: string;
  role: string;
}
 
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}
 
export const AuthContext = createContext<AuthContextType | null>(null);
 
interface Props {
  children: ReactNode;
}
 
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
 
  // ✅ Restore auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("auth");
 
    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
 
        const userData: User = {
          id: decoded.id || decoded.sub,
          email: decoded.email,
          role: decoded.role,
        };
 
        setUser(userData);
        setToken(storedToken);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("auth");
      }
    }
 
    setLoading(false);
  }, []);
 
  // ✅ Login
  const login = (jwtToken: string) => {
    try {
      const decoded: any = jwtDecode(jwtToken);
 
      const userData: User = {
        id: decoded.id || decoded.sub,
        email: decoded.email,
        role: decoded.role,
      };
 
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem("auth", jwtToken);
    } catch (err) {
      console.error("Token decoding failed");
    }
  };
 
  // ✅ Logout (fully reset state)
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
 
    // Optional: redirect instantly
    window.location.href = "/";
  };
 
  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};