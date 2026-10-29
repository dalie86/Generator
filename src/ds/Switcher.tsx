// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Switcher из vienna-ui. Сгенерировано из src/catalog/Switcher.stories.tsx.
import type { ComponentProps } from "react";
import { Switcher as ViennaSwitcher } from "vienna-ui";

/**
 * Switcher — включение и выключение настройки, которая применяется сразу. Изменение — `onChange` с `{ value }`. Если настройка применяется только после кнопки «Сохранить» — `Checkbox`.
 */
export function Switcher(props: ComponentProps<typeof ViennaSwitcher>) {
  return <ViennaSwitcher {...props} />;
}
