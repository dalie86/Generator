// Каталог для агента: примеры Textarea. Описание и пропсы — в src/ds/Textarea.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Textarea
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "vienna-ui";
import { Textarea } from "../ds/Textarea";

const meta = {
  title: "Vienna/Textarea",
  component: Textarea,
  tags: ["autodocs"],
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

