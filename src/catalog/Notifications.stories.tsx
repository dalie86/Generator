// Каталог для агента: примеры Notifications. Описание и пропсы — в src/ds/Notifications.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Notifications
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, NotificationService } from "vienna-ui";
import { Notifications } from "../ds/Notifications";

const meta = {
  title: "Vienna/Notifications",
  component: Notifications,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const service = new NotificationService();

export const Saved: Story = {
  render: () => (
    <>
      <Notifications service={service} />
      <Button design="accent" onClick={() => service.plain({ title: "Изменения сохранены", message: "Профиль обновлён" })}>
        Сохранить изменения
      </Button>
    </>
  ),
};

