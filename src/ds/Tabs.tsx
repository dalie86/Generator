// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Tabs из vienna-ui. Сгенерировано из src/catalog/Tabs.stories.tsx.
import type { ComponentProps } from "react";
import { Tabs as ViennaTabs } from "vienna-ui";

/**
 * Tabs — переключение между разделами одного уровня на странице. Значение — `value`, изменение — `onChange` с `{ value }`, вкладки — `Tabs.Tab`.
 * Не для шагов процесса — для этого `Stepper` или `Wizard`.
 */
export function Tabs(props: ComponentProps<typeof ViennaTabs>) {
  return <ViennaTabs {...props} />;
}
Tabs.Tab = ViennaTabs.Tab;
