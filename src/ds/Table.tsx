// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Table из vienna-ui. Сгенерировано из src/catalog/Table.stories.tsx.
import type { ComponentProps } from "react";
import { Table as ViennaTable } from "vienna-ui";

/**
 * Table — списки записей с колонками: заказы, участники, платежи.
 *
 * Данные — проп `data` (массив объектов с `id`). Колонки — `Table.Column` с `id` и `title`, содержимое ячейки — функция от записи.
 * Статус в ячейке — `Badge`. Действия в строке — `Button design="ghost"`.
 * Пустая таблица — показывайте `EmptyState` вместо таблицы.
 */
export function Table(props: ComponentProps<typeof ViennaTable>) {
  return <ViennaTable {...props} />;
}
Table.Column = ViennaTable.Column;
