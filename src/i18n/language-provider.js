"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  getTranslation,
} from "@/i18n/translations";

const STORAGE_KEY = "lexer:lang";

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: () => "",
});

const resolveInitialLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
    return urlLang;
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
    return storedLanguage;
  }

  const browserLang = window.navigator.language?.slice(0, 2)?.toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }

  return DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    setLang(resolveInitialLanguage());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = useCallback((nextLanguage) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) return;
    setLang(nextLanguage);
  }, []);

  const t = useCallback(
    (key, fallback = "") => getTranslation(lang, key, fallback),
    [lang],
  );

  const value = useMemo(
    () => ({
      lang,
      setLanguage,
      t,
    }),
    [lang, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
