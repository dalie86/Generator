// Каталог для агента: примеры Select. Описание и пропсы — в src/ds/Select.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Select
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormField } from "vienna-ui";
import { Select } from "../ds/Select";

const meta = {
  title: "Vienna/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <FormField>
        <FormField.Label>Часовой пояс</FormField.Label>
        <FormField.Content>
          <Select placeholder="Выберите часовой пояс" value={value} onSelect={({ value }) => setValue(value as string)}>
            <Select.Option>Москва, UTC+3</Select.Option>
            <Select.Option>Екатеринбург, UTC+5</Select.Option>
            <Select.Option>Новосибирск, UTC+7</Select.Option>
            <Select.Option>Владивосток, UTC+10</Select.Option>
          </Select>
        </FormField.Content>
      </FormField>
    );
  },
};

