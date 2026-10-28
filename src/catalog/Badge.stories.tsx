// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Badge
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Groups, Badge } from "vienna-ui";

const meta = {
  title: "Vienna/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Badge** — короткий статус или метка: «Оплачен», «Черновик». Цвет — проп \`color\` из палитры ViennaUI (например, \`paris10\`, \`miami10\`). Не используйте свои цвета.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Statuses: Story = {
  render: () => (
    <Groups>
      <Badge color="miami10">Оплачен</Badge>
      <Badge color="paris10">Ожидает оплаты</Badge>
    </Groups>
  ),
};

