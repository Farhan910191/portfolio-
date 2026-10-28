"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ======================================================
// TYPES
// ======================================================

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// ======================================================
// CONTEXT
// ======================================================

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isDark: true,
});

// ======================================================
// HOOK
// ======================================================

export function useTheme() {
  return useContext(ThemeContext);
}

// ======================================================
// PROVIDER
// ======================================================

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const docTheme = document.documentElement.getAttribute("data-theme") as Theme | null;
      if (docTheme === "light" || docTheme === "dark") return docTheme;
      const saved = localStorage.getItem("portfolio-theme") as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });
  const [mounted, setMounted] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;

    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    setMounted(true);
  }, []);

  // Sync attribute when theme changes
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.backgroundColor =
      theme === "light" ? "#f2f7f4" : "#060809";
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add("theme-transition");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 450);
  }, []);

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
