// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Modal из vienna-ui. Сгенерировано из src/catalog/Modal.stories.tsx.
import type { ComponentProps } from "react";
import { Modal as ViennaModal } from "vienna-ui";

/**
 * Modal — окно поверх страницы, блокирует остальной интерфейс. Для подтверждений и коротких форм.
 *
 * Структура: `Modal.Layout` → `Modal.Head` с `Modal.Title` → `Modal.Body` → `Modal.Footer` с кнопками в `Groups`.
 * Открытие — `isOpen`, закрытие — `onClose`.
 * Не открывайте модалку поверх модалки. Длинная форма или много шагов — отдельная страница или `Drawer`.
 * В подтверждении удаления кнопка называет действие: «Удалить проект», а не «OK».
 */
export function Modal(props: ComponentProps<typeof ViennaModal>) {
  return <ViennaModal {...props} />;
}
Modal.Layout = ViennaModal.Layout;
Modal.Head = ViennaModal.Head;
Modal.Title = ViennaModal.Title;
Modal.Body = ViennaModal.Body;
Modal.Footer = ViennaModal.Footer;
