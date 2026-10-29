// Каталог для агента: примеры Table. Описание и пропсы — в src/ds/Table.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Table
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "vienna-ui";
import { Table } from "../ds/Table";

const meta = {
  title: "Vienna/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

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

