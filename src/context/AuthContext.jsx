import { createContext, useContext } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { DEMO_ACCOUNT, ADMIN_ACCOUNT } from "../data/users";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("kitvibe_user", null);
  const [isAdmin, setIsAdmin] = useLocalStorage("kitvibe_admin", false);
  const notification = useNotification();

  const login = (email, password) => {
    if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
      setUser({ name: ADMIN_ACCOUNT.name, email });
      setIsAdmin(true);
      notification?.success("Welcome back, admin.", { title: "Signed in" });
      return { ok: true, admin: true };
    }
    // Mock auth: accept the demo account, or any well-formed email/password (frontend-only demo)
    if (password && password.length >= 6) {
      const name = email === DEMO_ACCOUNT.email ? DEMO_ACCOUNT.name : email.split("@")[0];
      setUser({ name, email });
      setIsAdmin(false);
      notification?.success(`Welcome back, ${name}.`, { title: "Signed in" });
      return { ok: true, admin: false };
    }
    notification?.error("Check your email and password and try again.", { title: "Sign in failed" });
    return { ok: false };
  };

  const register = ({ name, email }) => {
    setUser({ name, email });
    setIsAdmin(false);
    notification?.success(`Account created. Welcome, ${name}.`, { title: "Registered" });
    return { ok: true };
  };

  const loginAsGuest = () => {
    setUser({ name: "Guest", email: null, guest: true });
    setIsAdmin(false);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    notification?.info("You've been signed out.", { title: "Signed out" });
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, logout, loginAsGuest, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
