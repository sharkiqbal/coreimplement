// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (on page load)
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signin = (email, password) => {
    // Your authentication logic
    if (email === "superadmin@gmail.com" && password === "admin") {
      const userData = { email, role: "admin" };
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value = {
    user,
    signin,
    signout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
