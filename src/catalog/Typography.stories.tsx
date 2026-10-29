// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Typography
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Groups, Heading, Text } from "vienna-ui";

const meta = {
  title: "Vienna/Typography",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Типографика** — \`Heading\` (и \`H1\`…\`H6\`) для заголовков, \`Text\` / \`P\` / \`Span\` для текста. Никаких \`<h1>\` и \`<p>\` со своими стилями.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Groups design="vertical">
      <Heading>Настройки профиля</Heading>
      <Text>Изменения вступят в силу после сохранения.</Text>
    </Groups>
  ),
};

