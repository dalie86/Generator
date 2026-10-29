// Каталог для агента: примеры Radio. Описание и пропсы — в src/ds/Radio.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Radio
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Groups } from "vienna-ui";
import { Radio } from "../ds/Radio";

const meta = {
  title: "Vienna/Radio",
  component: Radio,
  tags: ["autodocs"],
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

