// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Notifications
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, NotificationService, Notifications } from "vienna-ui";

const meta = {
  title: "Vienna/Notifications",
  component: Notifications,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Notifications** — всплывающие уведомления о результате действия: «Изменения сохранены».
Один \`<Notifications service={service} />\` на приложение, показ — методами \`NotificationService\` (\`plain\` и другие).`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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

