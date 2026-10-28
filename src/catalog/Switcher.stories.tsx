// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Switcher
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switcher } from "vienna-ui";

const meta = {
  title: "Vienna/Switcher",
  component: Switcher,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Switcher** — включение и выключение настройки, которая применяется сразу. Изменение — \`onChange\` с \`{ value }\`. Если настройка применяется только после кнопки «Сохранить» — \`Checkbox\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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

