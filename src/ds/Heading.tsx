// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Heading из vienna-ui. Сгенерировано из src/catalog/Typography.stories.tsx.
import type { ComponentProps } from "react";
import { Heading as ViennaHeading } from "vienna-ui";

/**
 * Типографика — `Heading` (и `H1`…`H6`) для заголовков, `Text` / `P` / `Span` для текста. Никаких `<h1>` и `<p>` со своими стилями.
 */
export function Heading(props: ComponentProps<typeof ViennaHeading>) {
  return <ViennaHeading {...props} />;
}
