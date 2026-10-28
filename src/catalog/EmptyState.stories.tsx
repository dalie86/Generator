// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/EmptyState
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, EmptyState } from "vienna-ui";

const meta = {
  title: "Vienna/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**EmptyState** — пустой список или раздел. Объясняет, что здесь появится, и даёт действие.
\`EmptyState.Title\`, \`EmptyState.Description\`, \`EmptyState.Actions\` с кнопками.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDocuments: Story = {
  render: () => (
    <EmptyState>
      <EmptyState.Title>Документов пока нет</EmptyState.Title>
      <EmptyState.Description>Загрузите первый документ — он появится в этом списке</EmptyState.Description>
      <EmptyState.Actions direction="row">
        <Button design="primary" size="l">
          Загрузить документ
        </Button>
      </EmptyState.Actions>
    </EmptyState>
  ),
};

