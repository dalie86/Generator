// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Flex
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Flex, Heading } from "vienna-ui";

const meta = {
  title: "Vienna/Flex",
  component: Flex,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Flex** — раскладка: строка заголовка с действиями, колонки. Поддерживает свойства flex-контейнера: \`justifyContent\`, \`alignItems\`, \`direction\`, \`wrap\`.
Отступ между элементами — \`gap\` **только из шкалы ViennaUI**: s1…s16. Никаких \`"16px"\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageHeader: Story = {
  render: () => (
    <Flex justifyContent="space-between" alignItems="center" gap="s4">
      <Heading>ООО «Север»</Heading>
      <Badge color="miami10">Активный</Badge>
    </Flex>
  ),
};

