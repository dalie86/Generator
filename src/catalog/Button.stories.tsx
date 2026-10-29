// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Button
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Groups } from "vienna-ui";

const meta = {
  title: "Vienna/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Кнопка** — для основных действий на экране: «Создать документ», «Сохранить изменения».

**Когда использовать:** действие на этой странице или переход внутри продукта.
**Когда не использовать:** переход на другой сайт или вкладку — используйте \`Link\`.

**Варианты \`design\`:**
- \`accent\` — главное действие. **Не больше одной accent-кнопки на экране.**
- \`primary\` — основное действие, когда accent уже занят или не нужен.
- \`outline\` — второстепенное действие, «Отмена».
- \`critical\` / \`outline-critical\` — удаление и необратимые действия.
- \`ghost\`, \`ghost-accent\` — третичные действия, действия в строках таблиц.
- \`white\`, \`ghost-white\` — на тёмном фоне. \`neutral\` — нейтральное.

**Размеры \`size\`:** xs, s, m (по умолчанию), l, xl, xxl. В формах и модалках — \`l\`.
**Состояния:** \`loading\` на время отправки, \`disabled\` — когда действие недоступно.
Несколько кнопок рядом — оборачивайте в \`Groups\`.`,
      },
    },
  },
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

