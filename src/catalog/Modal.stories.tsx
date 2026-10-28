// Каталог для агента: Storybook MCP отдаёт эти описания и примеры как документацию компонента.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Modal
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, Groups, Modal } from "vienna-ui";

const meta = {
  title: "Vienna/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**Modal** — окно поверх страницы, блокирует остальной интерфейс. Для подтверждений и коротких форм.

Структура: \`Modal.Layout\` → \`Modal.Head\` с \`Modal.Title\` → \`Modal.Body\` → \`Modal.Footer\` с кнопками в \`Groups\`.
Открытие — \`isOpen\`, закрытие — \`onClose\`.
**Не открывайте модалку поверх модалки.** Длинная форма или много шагов — отдельная страница или \`Drawer\`.
В подтверждении удаления кнопка называет действие: «Удалить проект», а не «OK».`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmDelete: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <Button design="critical" onClick={() => setIsOpen(true)}>
          Удалить проект
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Layout>
            <Modal.Head>
              <Modal.Title>Удалить проект?</Modal.Title>
            </Modal.Head>
            <Modal.Body>Проект и все его документы будут удалены без возможности восстановления.</Modal.Body>
            <Modal.Footer>
              <Groups>
                <Button size="l" design="outline" onClick={() => setIsOpen(false)}>
                  Отмена
                </Button>
                <Button size="l" design="critical" onClick={() => setIsOpen(false)}>
                  Удалить проект
                </Button>
              </Groups>
            </Modal.Footer>
          </Modal.Layout>
        </Modal>
      </>
    );
  },
};

