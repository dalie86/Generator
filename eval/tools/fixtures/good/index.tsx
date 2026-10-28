import { useState } from "react";
import { Button, TextField, Modal, Stack } from "@acme/ds";

export default function Screen() {
  const [open, setOpen] = useState(false);
  return (
    <Stack gap="4" style={{ padding: "var(--space-4)", display: "flex" }}>
      <TextField label="Название проекта" required />
      <Button variant="danger" onClick={() => setOpen(true)}>
        Удалить проект
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Body>Проект будет удалён без возможности восстановления.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Отмена</Button>
          <Button variant="danger">Удалить проект</Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
}
