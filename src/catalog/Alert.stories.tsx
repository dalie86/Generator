// Каталог для агента: примеры Alert. Описание и пропсы — в src/ds/Alert.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Alert
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../ds/Alert";

const meta = {
  title: "Vienna/Alert",
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const LoadError: Story = {
  render: () => (
    <Alert design="error" title="Не удалось загрузить документы">
      Проверьте соединение и попробуйте ещё раз.
    </Alert>
  ),
};

