"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data.type) {
        if (event.data?.auth) {
          setIsAuth(true);
          setUserEmail(event.data.email);
        } else {
          setIsAuth(false);
          setUserEmail("");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
