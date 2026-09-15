"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export const STORAGE_KEY = "qs-theme";

/**
 * Runs before paint to stamp the theme on <html>, so there is no flash of the
 * wrong palette. Kept as a string so it can be inlined in <head>.
 *
 * The site is dark-first by design, so it opens dark for everyone and only
 * honours an explicit choice the visitor made here before. To follow the OS
 * preference instead, fall back to a `prefers-color-scheme` check below.
 */
export const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    document.documentElement.setAttribute(
      'data-theme',
      stored === 'light' ? 'light' : 'dark'
    );
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Adopt whatever the pre-paint script already decided.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode — the choice simply does not persist */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
