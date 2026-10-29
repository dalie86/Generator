// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Input
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, Input } from "vienna-ui";

const meta = {
  title: "Vienna/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Input** — короткий текст или число: имя, email, сумма.

**Когда не использовать:** текст длиннее 5 слов — \`Textarea\`. Телефон, счёт, карта, дата — специализированные \`InputPhone\`, \`InputAccount\`, \`InputCard\`, \`InputDate\`. Пароль — \`InputPassword\`.
Всегда внутри \`FormField\` с подписью. Ошибка — проп \`invalid\` плюс \`FormField.Message color="critical"\`.
Размер \`size\`: xs–xxl, по умолчанию m.

**Важно:** \`onChange\` получает объект \`{ value, event, options }\`, а не DOM-событие: \`onChange={({ value }) => setValue(value)}\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <FormField>
      <FormField.Label>Email</FormField.Label>
      <FormField.Content>
        <Input placeholder="name@company.ru" />
      </FormField.Content>
    </FormField>
  ),
};

