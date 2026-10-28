// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Card
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Text } from "vienna-ui";

const meta = {
  title: "Vienna/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Card** — блок с фоном и заголовком внутри страницы: «Контактные данные», «Реквизиты». \`title\`, \`actions\` (кнопки в шапке), \`footer\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contacts: Story = {
  render: () => (
    <Card title="Контактные данные">
      <Text>+7 495 000-00-00 · info@sever.ru</Text>
    </Card>
  ),
};

