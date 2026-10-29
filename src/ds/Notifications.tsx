// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Notifications из vienna-ui. Сгенерировано из src/catalog/Notifications.stories.tsx.
import type { ComponentProps } from "react";
import { Notifications as ViennaNotifications } from "vienna-ui";

/**
 * Notifications — всплывающие уведомления о результате действия: «Изменения сохранены».
 * Один `<Notifications service={service} />` на приложение, показ — методами `NotificationService` (`plain` и другие).
 */
export function Notifications(props: ComponentProps<typeof ViennaNotifications>) {
  return <ViennaNotifications {...props} />;
}
