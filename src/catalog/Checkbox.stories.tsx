// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Checkbox
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "vienna-ui";

const meta = {
  title: "Vienna/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Checkbox** — независимые «да/нет» или выбор нескольких вариантов. Для мгновенного включения настройки — \`Switcher\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Checkbox>Согласен с условиями</Checkbox>,
};

