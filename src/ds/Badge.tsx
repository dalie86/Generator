// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Badge из vienna-ui. Сгенерировано из src/catalog/Badge.stories.tsx.
import type { ComponentProps } from "react";
import { Badge as ViennaBadge } from "vienna-ui";

/**
 * Badge — короткий статус или метка: «Оплачен», «Черновик». Цвет — проп `color` из палитры ViennaUI (например, `paris10`, `miami10`). Не используйте свои цвета.
 */
export function Badge(props: ComponentProps<typeof ViennaBadge>) {
  return <ViennaBadge {...props} />;
}
