// Собирает список компонентов дизайн-системы из её типов: eval/ds-manifest.json.
// По нему анализатор ловит «выдуманные» компоненты даже без полной проверки типов.
// Использование (после npm install): npm run eval:manifest
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { ROOT, loadConfig } from "../tools/config.ts";

const pc = loadConfig();
const require = createRequire(path.join(ROOT, "package.json"));

function exportsOf(pkgName: string) {
  const pkgJsonPath = require.resolve(`${pkgName}/package.json`);
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  const dir = path.dirname(pkgJsonPath);
  const candidates = [
    pkg.types,
    pkg.typings,
    pkg.exports?.["."]?.types,
    pkg.exports?.["."]?.import?.types,
    "index.d.ts",
    "dist/index.d.ts",
    "esm/index.d.ts",
  ].filter(Boolean);
  const entry = candidates.map((c: string) => path.join(dir, c)).find((p: string) => fs.existsSync(p));
  if (!entry) throw new Error(`Не нашёл файл типов у ${pkgName}`);

  const program = ts.createProgram([entry], { jsx: ts.JsxEmit.ReactJSX, skipLibCheck: true, noEmit: true });
  const checker = program.getTypeChecker();
  const symbol = checker.getSymbolAtLocation(program.getSourceFile(entry)!);
  const names = symbol
    ? checker
        .getExportsOfModule(symbol)
        .filter((s) => {
          const r = s.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(s) : s;
          return (r.flags & ts.SymbolFlags.Value) !== 0; // только значения, не типы
        })
        .map((s) => s.getName())
        .filter((n) => /^[A-Z]/.test(n))
    : [];
  return { version: pkg.version as string, names: [...new Set(names)].sort() };
}

// Манифест нужен для пакетов с компонентами. Иконки и токены не проверяем.
const { version, names } = exportsOf(pc.dsPackage);
const out = path.join(ROOT, "eval/ds-manifest.json");
fs.writeFileSync(
  out,
  JSON.stringify(
    {
      $comment: `Собрано из типов ${pc.dsPackage}@${version}.`,
      generatedAt: new Date().toISOString(),
      packages: { [pc.dsPackage]: names },
    },
    null,
    2,
  ) + "\n",
);
console.log(`${names.length} компонентов из ${pc.dsPackage}@${version} → ${path.relative(ROOT, out)}`);
