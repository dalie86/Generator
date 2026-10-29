// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Button из vienna-ui. Сгенерировано из src/catalog/Button.stories.tsx.
import type { ComponentProps } from "react";
import { Button as ViennaButton } from "vienna-ui";

/**
 * Кнопка — для основных действий на экране: «Создать документ», «Сохранить изменения».
 *
 * Когда использовать: действие на этой странице или переход внутри продукта.
 * Когда не использовать: переход на другой сайт или вкладку — используйте `Link`.
 *
 * Варианты `design`:
 * - `accent` — главное действие. Не больше одной accent-кнопки на экране.
 * - `primary` — основное действие, когда accent уже занят или не нужен.
 * - `outline` — второстепенное действие, «Отмена».
 * - `critical` / `outline-critical` — удаление и необратимые действия.
 * - `ghost`, `ghost-accent` — третичные действия, действия в строках таблиц.
 * - `white`, `ghost-white` — на тёмном фоне. `neutral` — нейтральное.
 *
 * Размеры `size`: xs, s, m (по умолчанию), l, xl, xxl. В формах и модалках — `l`.
 * Состояния: `loading` на время отправки, `disabled` — когда действие недоступно.
 * Несколько кнопок рядом — оборачивайте в `Groups`.
 */
export function Button(props: ComponentProps<typeof ViennaButton>) {
  return <ViennaButton {...props} />;
}
