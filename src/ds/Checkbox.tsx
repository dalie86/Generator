// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Checkbox из vienna-ui. Сгенерировано из src/catalog/Checkbox.stories.tsx.
import type { ComponentProps } from "react";
import { Checkbox as ViennaCheckbox } from "vienna-ui";

/**
 * Checkbox — независимые «да/нет» или выбор нескольких вариантов. Для мгновенного включения настройки — `Switcher`.
 */
export function Checkbox(props: ComponentProps<typeof ViennaCheckbox>) {
  return <ViennaCheckbox {...props} />;
}
