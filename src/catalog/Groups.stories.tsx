// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Groups
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Groups } from "vienna-ui";

const meta = {
  title: "Vienna/Groups",
  component: Groups,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Groups** — набор элементов с отступами между ними: кнопки, поля формы.
\`design="horizontal"\` (по умолчанию) или \`"vertical"\`, расстояние — \`size\`: xs, s, m, l, xl.
Для раскладки страницы со сложным выравниванием — \`Flex\` или \`Grid\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => (
    <Groups design="vertical" size="l">
      <Button design="accent">Первое</Button>
      <Button design="outline">Второе</Button>
    </Groups>
  ),
};

