// Каталог для агента: примеры Heading. Описание и пропсы — в src/ds/Heading.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Typography
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Groups, Text } from "vienna-ui";
import { Heading } from "../ds/Heading";

const meta = {
  title: "Vienna/Typography",
  component: Heading,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Groups design="vertical">
      <Heading>Настройки профиля</Heading>
      <Text>Изменения вступят в силу после сохранения.</Text>
    </Groups>
  ),
};

