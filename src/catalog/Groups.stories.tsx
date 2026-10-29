// Каталог для агента: примеры Groups. Описание и пропсы — в src/ds/Groups.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Groups
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "vienna-ui";
import { Groups } from "../ds/Groups";

const meta = {
  title: "Vienna/Groups",
  component: Groups,
  tags: ["autodocs"],
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

