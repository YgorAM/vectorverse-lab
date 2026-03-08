import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { en } from "@/locales/en";
import { ptBR } from "@/locales/pt-BR";
import { useDeviceType, type DeviceType } from "@/hooks/useDeviceType";

export type Locale = "en" | "pt-BR";

type Translations = Record<string, string>;

const translationsMap: Record<Locale, Translations> = { en, "pt-BR": ptBR };

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  td: (key: string) => string;
  deviceType: DeviceType;
}

const I18nContext = createContext<I18nContextType | null>(null);

function detectLocale(): Locale {
  const saved = localStorage.getItem("linalg-locale") as Locale | null;
  if (saved && translationsMap[saved]) return saved;
  const browser = navigator.language || "";
  if (browser.startsWith("pt")) return "pt-BR";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);
  const deviceType = useDeviceType();

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("linalg-locale", l);
  };

  useEffect(() => {
    document.documentElement.lang = locale === "pt-BR" ? "pt-BR" : "en";
  }, [locale]);

  const t = (key: string): string => {
    return translationsMap[locale]?.[key] ?? translationsMap.en[key] ?? key;
  };

  /** Device-aware translation: tries key_mobile / key_tablet first, falls back to base key */
  const td = (key: string): string => {
    if (deviceType !== "desktop") {
      const suffixed = `${key}_${deviceType}`;
      const val = translationsMap[locale]?.[suffixed] ?? translationsMap.en[suffixed];
      if (val) return val;
    }
    return t(key);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, td, deviceType }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
