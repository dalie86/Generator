// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий EmptyState из vienna-ui. Сгенерировано из src/catalog/EmptyState.stories.tsx.
import type { ComponentProps } from "react";
import { EmptyState as ViennaEmptyState } from "vienna-ui";

/**
 * EmptyState — пустой список или раздел. Объясняет, что здесь появится, и даёт действие.
 * `EmptyState.Title`, `EmptyState.Description`, `EmptyState.Actions` с кнопками.
 */
export function EmptyState(props: ComponentProps<typeof ViennaEmptyState>) {
  return <ViennaEmptyState {...props} />;
}
EmptyState.Title = ViennaEmptyState.Title;
EmptyState.Description = ViennaEmptyState.Description;
EmptyState.Actions = ViennaEmptyState.Actions;
