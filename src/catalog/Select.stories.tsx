// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Select
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormField, Select } from "vienna-ui";

const meta = {
  title: "Vienna/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Select** — выбор одного значения из выпадающего списка.

**Когда использовать:** вариантов 4 и больше.
**Когда не использовать:** 2–3 варианта — \`Radio\` (все варианты видны сразу). Много вариантов с поиском — \`MultiselectWithSearch\` или \`Search\`.
Значение — проп \`value\`, изменение — \`onSelect\`, который получает \`{ value }\`. Варианты — \`Select.Option\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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

