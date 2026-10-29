import type { ReactNode } from "react";
import { ThemeProvider } from "vienna.ui-primitives";

// Переопределения темы ViennaUI. Пустой объект — стандартная тема:
// компоненты берут стили по умолчанию, ThemeProvider лишь требует проп theme.
// Пример кастомизации: { button: { … } } — ключи совпадают с именами компонентов.
const theme = {};

/**
 * Корневая обёртка ViennaUI. Используется и в приложении, и в Storybook,
 * чтобы экраны выглядели одинаково.
 */
export function ViennaRoot({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
