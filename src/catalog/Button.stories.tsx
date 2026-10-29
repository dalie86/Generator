// Каталог для агента: примеры Button. Описание и пропсы — в src/ds/Button.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Button
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Groups } from "vienna-ui";
import { Button } from "../ds/Button";

const meta = {
  title: "Vienna/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Designs: Story = {
  render: () => (
    <Groups>
      <Button design="accent">Создать документ</Button>
      <Button design="outline">Отмена</Button>
      <Button design="critical">Удалить документ</Button>
      <Button design="ghost">Подробнее</Button>
    </Groups>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button design="accent" size="l" loading>
      Сохранить изменения
    </Button>
  ),
};

