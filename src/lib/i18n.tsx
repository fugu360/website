import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type Language = "de" | "en";

type LanguageContextValue = {
  lang: Language;
  isEnglish: boolean;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "de",
  isEnglish: false,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isEnglish = pathname.startsWith("/en");
  const lang: Language = isEnglish ? "en" : "de";
  const value = useMemo(() => ({ lang, isEnglish }), [lang, isEnglish]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

export type LocalizedString = {
  de: string;
  en: string;
};

export const getLocalized = (value: LocalizedString, lang: Language) => value[lang];
