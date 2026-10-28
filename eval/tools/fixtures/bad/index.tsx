import { Button, SuperTable } from "@acme/ds";
import { Dialog } from "@mui/material";

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 13, borderRadius: "6px", background: "#fafafa" }}>{children}</div>;
}

export default function Screen() {
  return (
    <div className="p-[13px] text-[#c62828] flex gap-4">
      <Card>
        <input placeholder="Название" />
        <button style={{ color: "rgb(200, 40, 40)" }}>OK</button>
      </Card>
      <Button variant="primary">Сохранить</Button>
      <SuperTable rows={[]} />
      <Dialog open />
      <Mystery />
    </div>
  );
}
