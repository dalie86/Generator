// Каталог для агента: примеры Tabs. Описание и пропсы — в src/ds/Tabs.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Tabs
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "../ds/Tabs";

const meta = {
  title: "Vienna/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("overview");
    return (
      <Tabs value={value} onChange={({ value }) => setValue(value as string)}>
        <Tabs.Tab value="overview">Обзор</Tabs.Tab>
        <Tabs.Tab value="orders">Заказы</Tabs.Tab>
        <Tabs.Tab value="docs">Документы</Tabs.Tab>
      </Tabs>
    );
  },
};

