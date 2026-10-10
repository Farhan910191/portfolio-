"use client";

import { useTheme } from "@/components/ThemeProvider";

/**
 * Returns a set of theme-aware color values and CSS class helpers.
 * Use this hook in any component that needs to adapt to dark/light mode.
 */
export function useThemeColors() {
  const { isDark, theme, toggleTheme } = useTheme();

  const accent = isDark ? "#39ff88" : "#10b981";
  const accentDark = isDark ? "#20c968" : "#059669";

  return {
    isDark,
    theme,
    toggleTheme,
    accent,
    accentDark,

    // Text
    textPrimary: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-400" : "text-gray-600",
    textMuted: isDark ? "text-gray-500" : "text-gray-400",
    textDim: isDark ? "text-gray-600" : "text-gray-400",
    textDimmer: isDark ? "text-gray-700" : "text-gray-300",
    textSubtle: isDark ? "text-white/50" : "text-gray-500",
    textLink: isDark ? "text-white/60" : "text-gray-500",

    // Backgrounds
    bgCard: isDark
      ? "bg-[#111113]/80"
      : "bg-white/80",
    bgCardSolid: isDark
      ? "bg-[#111113]"
      : "bg-white",
    bgSurface: isDark
      ? "bg-[#080808]"
      : "bg-white",

    // Borders
    borderBase: isDark
      ? "border-white/[0.08]"
      : "border-gray-200",
    borderSubtle: isDark
      ? "border-white/[0.06]"
      : "border-black/[0.06]",

    // Hover
    hoverAccent: isDark
      ? "hover:text-[#39ff88]"
      : "hover:text-[#10b981]",
    hoverBorderAccent: isDark
      ? "hover:border-[#39ff88]/40"
      : "hover:border-[#10b981]/40",

    // Shadows
    shadowCard: isDark
      ? "shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
      : "shadow-[0_25px_80px_rgba(0,0,0,0.06)]",
    shadowSm: isDark
      ? "shadow-none"
      : "shadow-sm",
  };
}
