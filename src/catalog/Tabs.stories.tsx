// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Tabs
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "vienna-ui";

const meta = {
  title: "Vienna/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Tabs** — переключение между разделами одного уровня на странице. Значение — \`value\`, изменение — \`onChange\` с \`{ value }\`, вкладки — \`Tabs.Tab\`.
Не для шагов процесса — для этого \`Stepper\` или \`Wizard\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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

