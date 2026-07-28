"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Restore admin session from localStorage
    const savedSession = localStorage.getItem("englog_admin_auth");
    if (savedSession === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("englog_admin_auth", "true");
      return { success: true };
    }
    return { success: false, error: "Tên đăng nhập hoặc mật khẩu không chính xác!" };
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("englog_admin_auth");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
