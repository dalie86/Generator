// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Textarea из vienna-ui. Сгенерировано из src/catalog/Textarea.stories.tsx.
import type { ComponentProps } from "react";
import { Textarea as ViennaTextarea } from "vienna-ui";

/**
 * Textarea — многострочный текст: комментарий, описание, сообщение. Всегда внутри `FormField`.
 */
export function Textarea(props: ComponentProps<typeof ViennaTextarea>) {
  return <ViennaTextarea {...props} />;
}
