import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeFiles, listScreenFiles, type PilotConfig } from "./analyze-core.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const cfg: PilotConfig = {
  dsPackage: "@acme/ds",
  dsImportPaths: ["@acme/ds"],
  foreignUiImports: ["@mui/", "@/components/ui", "components/ui"],
  rawInteractiveElements: ["button", "input", "select", "textarea", "dialog", "table"],
  allowedRawProperties: ["display"],
};
const manifest = ["Button", "TextField", "Modal", "Stack", "Select"];

test("хороший экран: всё из DS, без нарушений", () => {
  const m = analyzeFiles(listScreenFiles(path.join(here, "fixtures/good")), cfg, { manifest });
  assert.equal(m.dsShare, 1);
  assert.equal(m.rawValues, 0);
  assert.equal(m.rawInteractive, 0);
  assert.equal(m.foreignImports, 0);
  assert.equal(m.inventedComponents, 0);
  assert.equal(m.localComponentDefs, 0);
  assert.deepEqual(m.dsComponentsUsed, ["Button", "Modal", "Stack", "TextField"]);
});

test("плохой экран: ловим все типы нарушений", () => {
  const m = analyzeFiles(listScreenFiles(path.join(here, "fixtures/bad")), cfg, { manifest });
  // Сырые значения: padding 13, 6px, #fafafa, rgb(...), p-[13px], text-[#c62828]
  assert.equal(m.rawValues, 6, JSON.stringify(m.findings.filter((f) => f.kind === "raw-value")));
  assert.equal(m.rawInteractive, 2); // <input>, <button>
  assert.equal(m.foreignImports, 1); // @mui/material
  assert.equal(m.foreignElements, 1); // <Dialog>
  assert.equal(m.localComponentDefs, 1); // Card
  assert.equal(m.localComponentUses, 1); // <Card>
  assert.equal(m.unknownElements, 1); // <Mystery>
  assert.equal(m.inventedComponents, 1); // SuperTable нет в манифесте
  // DS: Button, SuperTable (импорт из DS, хоть и выдуманный) = 2 из 2+2+1+1+1 = 7
  assert.equal(m.dsElements, 2);
  assert.equal(m.dsShare, 0.286);
});

test("проверка типов: выдуманный компонент и несуществующие пропсы", () => {
  const dir = path.join(here, "fixtures/typecheck");
  const m = analyzeFiles(listScreenFiles(path.join(dir, "screen")), cfg, {
    withTypecheck: true,
    tsconfigPath: path.join(dir, "tsconfig.json"),
  });
  assert.equal(m.typecheck, "ok");
  assert.equal(m.inventedComponents, 1, JSON.stringify(m.findings)); // DataGrid
  assert.equal(m.invalidProps, 2, JSON.stringify(m.findings)); // size, variant="ghost"
});

test("истории и тесты не считаются экраном", () => {
  const files = listScreenFiles(path.join(here, "fixtures"));
  assert.ok(files.every((f) => !/\.stories\./.test(f)));
});
