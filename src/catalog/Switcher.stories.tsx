// Каталог для агента: примеры Switcher. Описание и пропсы — в src/ds/Switcher.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Switcher
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switcher } from "../ds/Switcher";

const meta = {
  title: "Vienna/Switcher",
  component: Switcher,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Switcher checked={on} onChange={({ value }) => setOn(Boolean(value))}>
        Уведомления по email
      </Switcher>
    );
  },
};

