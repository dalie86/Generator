// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Alert из vienna-ui. Сгенерировано из src/catalog/Alert.stories.tsx.
import type { ComponentProps } from "react";
import { Alert as ViennaAlert } from "vienna-ui";

/**
 * Alert — сообщение внутри страницы: важная информация, результат, ошибка уровня экрана.
 * `design`: plain, accent, success, warning, error. Заголовок — `title`.
 * Ошибку конкретного поля показывайте в `FormField.Message`, а не в Alert. Временное уведомление о результате — `Notifications`.
 */
export function Alert(props: ComponentProps<typeof ViennaAlert>) {
  return <ViennaAlert {...props} />;
}
