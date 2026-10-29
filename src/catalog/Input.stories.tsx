// Каталог для агента: примеры Input. Описание и пропсы — в src/ds/Input.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Input
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "vienna-ui";
import { Input } from "../ds/Input";

const meta = {
  title: "Vienna/Input",
  component: Input,
  tags: ["autodocs"],
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

