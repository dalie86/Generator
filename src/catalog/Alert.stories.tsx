// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Alert
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "vienna-ui";

const meta = {
  title: "Vienna/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Alert** — сообщение внутри страницы: важная информация, результат, ошибка уровня экрана.
\`design\`: plain, accent, success, warning, error. Заголовок — \`title\`.
Ошибку конкретного поля показывайте в \`FormField.Message\`, а не в Alert. Временное уведомление о результате — \`Notifications\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadError: Story = {
  render: () => (
    <Alert design="error" title="Не удалось загрузить документы">
      Проверьте соединение и попробуйте ещё раз.
    </Alert>
  ),
};

