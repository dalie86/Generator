// Каталог для агента: примеры Badge. Описание и пропсы — в src/ds/Badge.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Badge
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Groups } from "vienna-ui";
import { Badge } from "../ds/Badge";

const meta = {
  title: "Vienna/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Statuses: Story = {
  render: () => (
    <Groups>
      <Badge color="miami10">Оплачен</Badge>
      <Badge color="paris10">Ожидает оплаты</Badge>
    </Groups>
  ),
};

