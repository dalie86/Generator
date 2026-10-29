// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Radio
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Groups, Radio } from "vienna-ui";

const meta = {
  title: "Vienna/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Radio** — выбор одного варианта из 2–5, все варианты видны сразу.

Группа радиокнопок — \`Groups design="vertical"\` (или горизонтально, если подписи короткие). У всех кнопок группы общий \`name\`.
Состояние — \`checked\`, изменение — \`onChange\`, который получает \`{ value }\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState("private");
    return (
      <Groups design="vertical">
        <Radio name="visibility" value="private" checked={value === "private"} onChange={({ value }) => setValue(value as string)}>
          Только участники
        </Radio>
        <Radio name="visibility" value="company" checked={value === "company"} onChange={({ value }) => setValue(value as string)}>
          Вся компания
        </Radio>
      </Groups>
    );
  },
};

