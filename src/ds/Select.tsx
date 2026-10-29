// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Select из vienna-ui. Сгенерировано из src/catalog/Select.stories.tsx.
import type { ComponentProps } from "react";
import { Select as ViennaSelect } from "vienna-ui";

/**
 * Select — выбор одного значения из выпадающего списка.
 *
 * Когда использовать: вариантов 4 и больше.
 * Когда не использовать: 2–3 варианта — `Radio` (все варианты видны сразу). Много вариантов с поиском — `MultiselectWithSearch` или `Search`.
 * Значение — проп `value`, изменение — `onSelect`, который получает `{ value }`. Варианты — `Select.Option`.
 */
export function Select(props: ComponentProps<typeof ViennaSelect>) {
  return <ViennaSelect {...props} />;
}
Select.Option = ViennaSelect.Option;
