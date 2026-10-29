// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Card из vienna-ui. Сгенерировано из src/catalog/Card.stories.tsx.
import type { ComponentProps } from "react";
import { Card as ViennaCard } from "vienna-ui";

/**
 * Card — блок с фоном и заголовком внутри страницы: «Контактные данные», «Реквизиты». `title`, `actions` (кнопки в шапке), `footer`.
 */
export function Card(props: ComponentProps<typeof ViennaCard>) {
  return <ViennaCard {...props} />;
}
