// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Table
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Table } from "vienna-ui";

const meta = {
  title: "Vienna/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Table** — списки записей с колонками: заказы, участники, платежи.

Данные — проп \`data\` (массив объектов с \`id\`). Колонки — \`Table.Column\` с \`id\` и \`title\`, содержимое ячейки — функция от записи.
Статус в ячейке — \`Badge\`. Действия в строке — \`Button design="ghost"\`.
Пустая таблица — показывайте \`EmptyState\` вместо таблицы.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const orders = [
  { id: "1042", client: "ООО «Север»", amount: "120 000 ₽", status: "Оплачен" },
  { id: "1043", client: "ИП Иванов", amount: "8 400 ₽", status: "Ожидает оплаты" },
];

export const Default: Story = {
  render: () => (
    <Table data={orders}>
      <Table.Column id="id" title="Номер">
        {(o: (typeof orders)[number]) => o.id}
      </Table.Column>
      <Table.Column id="client" title="Клиент">
        {(o: (typeof orders)[number]) => o.client}
      </Table.Column>
      <Table.Column id="amount" title="Сумма">
        {(o: (typeof orders)[number]) => o.amount}
      </Table.Column>
      <Table.Column id="status" title="Статус">
        {(o: (typeof orders)[number]) => <Badge color={o.status === "Оплачен" ? "miami10" : "paris10"}>{o.status}</Badge>}
      </Table.Column>
    </Table>
  ),
};

