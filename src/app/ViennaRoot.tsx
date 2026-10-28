import type { ReactNode } from "react";
import { ThemeProvider } from "vienna.ui-primitives";

/**
 * Корневая обёртка ViennaUI: тема и шрифты дизайн-системы.
 * Используется и в приложении, и в Storybook, чтобы экраны выглядели одинаково.
 * Кастомная тема — проп theme у ThemeProvider (см. README ViennaUI, раздел «Кастомизация»).
 */
export function ViennaRoot({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
