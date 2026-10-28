import { Button, TextField, DataGrid } from "@acme/ds";

export default function Screen() {
  return (
    <div>
      <TextField label="Имя" size="large" />
      <Button variant="ghost">Сохранить</Button>
      <DataGrid />
    </div>
  );
}
