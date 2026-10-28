// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/FormField
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormField, Input } from "vienna-ui";

const meta = {
  title: "Vienna/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**FormField** — обёртка любого поля формы: подпись, само поле, сообщение.

**Всегда** оборачивайте \`Input\`, \`Textarea\`, \`Select\` и другие поля в \`FormField\`:
- \`FormField.Label\` — видимая подпись над полем. Placeholder подпись не заменяет. Обязательное поле — \`required\` у Label.
- \`FormField.Content\` — само поле и сообщение.
- \`FormField.Message\` — подсказка или ошибка под полем. Ошибка: \`color="critical"\`, предупреждение: \`color="warning"\`.

Ошибка пишется текстом: что не так и как исправить. Поле при ошибке получает \`invalid\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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

