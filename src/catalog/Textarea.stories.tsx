// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Textarea
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, Textarea } from "vienna-ui";

const meta = {
  title: "Vienna/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Textarea** — многострочный текст: комментарий, описание, сообщение. Всегда внутри \`FormField\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <FormField>
      <FormField.Label>Описание</FormField.Label>
      <FormField.Content>
        <Textarea placeholder="Коротко опишите проект" />
      </FormField.Content>
    </FormField>
  ),
};

