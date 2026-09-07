import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";
const CookieConsentContext = createContext(null);

export const CookieConsentProvider = ({ children }) => {
  // null = not yet decided, "accepted" = all cookies ok, "essential" = non-essential declined
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "essential") {
        setConsent(stored);
      }
    } catch (e) {
      // localStorage unavailable (private browsing, blocked storage, etc.)
    }
  }, []);

  const acceptAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch (e) {
      // ignore write failures, still update in-memory state for this session
    }
    setConsent("accepted");
  };

  const essentialOnly = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
    } catch (e) {
      // ignore write failures
    }
    setConsent("essential");
  };

  return (
    <CookieConsentContext.Provider value={{ consent, acceptAll, essentialOnly }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return ctx;
};
