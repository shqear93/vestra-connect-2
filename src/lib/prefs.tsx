import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AR } from '../i18n/ar';

export type Lang = 'en' | 'ar';
export type Theme = 'light' | 'dark';

interface Prefs {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
}

const PrefsContext = createContext<Prefs | null>(null);

const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const fromUrl = (key: string): string | null => {
  try {
    return new URLSearchParams(window.location.search).get(key);
  } catch {
    return null;
  }
};

const initialLang = (): Lang => {
  const fromQuery = fromUrl('lang');
  if (fromQuery === 'ar' || fromQuery === 'en') return fromQuery;
  const saved = read('vc-lang');
  if (saved === 'ar' || saved === 'en') return saved;
  return 'en';
};

const initialTheme = (): Theme => {
  const fromQuery = fromUrl('theme');
  if (fromQuery === 'light' || fromQuery === 'dark') return fromQuery;
  const saved = read('vc-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

export const PrefsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('vc-lang', lang);
    } catch {
      /* storage can be unavailable */
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('vc-theme', theme);
    } catch {
      /* storage can be unavailable */
    }
  }, [theme]);

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  const value = useMemo(
    () => ({ lang, theme, setLang, setTheme, toggleLang, toggleTheme }),
    [lang, theme, toggleLang, toggleTheme],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
};

export const usePrefs = (): Prefs => {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs must be used inside PrefsProvider');
  return ctx;
};

/** Translate an English source string. Unknown strings fall back to English. */
export const useT = () => {
  const { lang } = usePrefs();
  return useCallback(
    (en: string): string => (lang === 'ar' ? AR[en] ?? en : en),
    [lang],
  );
};
