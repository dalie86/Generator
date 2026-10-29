// Каталог для агента: примеры Flex. Описание и пропсы — в src/ds/Flex.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Flex
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Heading } from "vienna-ui";
import { Flex } from "../ds/Flex";

const meta = {
  title: "Vienna/Flex",
  component: Flex,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const PageHeader: Story = {
  render: () => (
    <Flex justifyContent="space-between" alignItems="center" gap="s4">
      <Heading>ООО «Север»</Heading>
      <Badge color="miami10">Активный</Badge>
    </Flex>
  ),
};

