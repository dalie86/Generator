// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Flex из vienna-ui. Сгенерировано из src/catalog/Flex.stories.tsx.
import type { ComponentProps } from "react";
import { Flex as ViennaFlex } from "vienna-ui";

/**
 * Flex — раскладка: строка заголовка с действиями, колонки. Поддерживает свойства flex-контейнера: `justifyContent`, `alignItems`, `direction`, `wrap`.
 * Отступ между элементами — `gap` только из шкалы ViennaUI: s1…s16. Никаких `"16px"`.
 */
export function Flex(props: ComponentProps<typeof ViennaFlex>) {
  return <ViennaFlex {...props} />;
}
