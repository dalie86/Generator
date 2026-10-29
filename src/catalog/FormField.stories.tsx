// Каталог для агента: примеры FormField. Описание и пропсы — в src/ds/FormField.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/FormField
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "vienna-ui";
import { FormField } from "../ds/FormField";

const meta = {
  title: "Vienna/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <FormField>
        <FormField.Label required>Название проекта</FormField.Label>
        <FormField.Content>
          <Input value={value} invalid onChange={({ value }) => setValue(value)} />
          <FormField.Message color="critical">Введите название — от 3 до 50 символов</FormField.Message>
        </FormField.Content>
      </FormField>
    );
  },
};

