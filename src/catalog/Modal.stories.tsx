// Каталог для агента: примеры Modal. Описание и пропсы — в src/ds/Modal.tsx (JSDoc), их отдаёт Storybook MCP.
// Источник API — README компонента в github.com/Raiffeisen-DGTL/ViennaUI/tree/master/src/Modal
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, Groups } from "vienna-ui";
import { Modal } from "../ds/Modal";

const meta = {
  title: "Vienna/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

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

