// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Groups из vienna-ui. Сгенерировано из src/catalog/Groups.stories.tsx.
import type { ComponentProps } from "react";
import { Groups as ViennaGroups } from "vienna-ui";

/**
 * Groups — набор элементов с отступами между ними: кнопки, поля формы.
 * `design="horizontal"` (по умолчанию) или `"vertical"`, расстояние — `size`: xs, s, m, l, xl.
 * Для раскладки страницы со сложным выравниванием — `Flex` или `Grid`.
 */
export function Groups(props: ComponentProps<typeof ViennaGroups>) {
  return <ViennaGroups {...props} />;
}
