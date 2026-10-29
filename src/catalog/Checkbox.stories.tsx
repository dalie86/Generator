// Каталог для агента: примеры Checkbox. Описание и пропсы — в src/ds/Checkbox.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Checkbox
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../ds/Checkbox";

const meta = {
  title: "Vienna/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Checkbox>Согласен с условиями</Checkbox>,
};

