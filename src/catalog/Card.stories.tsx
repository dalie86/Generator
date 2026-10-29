// Каталог для агента: примеры Card. Описание и пропсы — в src/ds/Card.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Card
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "vienna-ui";
import { Card } from "../ds/Card";

const meta = {
  title: "Vienna/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Contacts: Story = {
  render: () => (
    <Card title="Контактные данные">
      <Text>+7 495 000-00-00 · info@sever.ru</Text>
    </Card>
  ),
};

