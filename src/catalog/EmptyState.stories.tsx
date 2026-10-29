// Каталог для агента: примеры EmptyState. Описание и пропсы — в src/ds/EmptyState.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/EmptyState
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "vienna-ui";
import { EmptyState } from "../ds/EmptyState";

const meta = {
  title: "Vienna/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

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

