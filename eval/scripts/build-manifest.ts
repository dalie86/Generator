// Собирает список экспортов дизайн-системы из её типов: eval/ds-manifest.json.
// По нему анализатор ловит «выдуманные» компоненты даже без полной проверки типов.
// Использование: npm run eval:manifest
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { ROOT, loadConfig } from "../tools/config.ts";

const pc = loadConfig();
if (pc.dsPackage.startsWith("TODO")) {
  console.error("Заполните dsPackage в pilot.config.json и установите пакет DS.");
  process.exit(1);
}

const require = createRequire(path.join(ROOT, "package.json"));
const pkgJsonPath = require.resolve(`${pc.dsPackage}/package.json`);
const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
const pkgDir = path.dirname(pkgJsonPath);
const typesRel =
  pkg.types ?? pkg.typings ?? pkg.exports?.["."]?.types ?? pkg.exports?.["."]?.import?.types ?? "index.d.ts";
const entry = path.join(pkgDir, typesRel);
if (!fs.existsSync(entry)) {
  console.error(`Не нашёл файл типов ${entry}. Укажите его вручную в этом скрипте.`);
  process.exit(1);
}

const program = ts.createProgram([entry], { jsx: ts.JsxEmit.ReactJSX, skipLibCheck: true, noEmit: true });
const checker = program.getTypeChecker();
const sf = program.getSourceFile(entry)!;
const symbol = checker.getSymbolAtLocation(sf);
const exports = symbol ? checker.getExportsOfModule(symbol).map((s) => s.getName()) : [];
const components = exports.filter((n) => /^[A-Z]/.test(n) && !/Props$/.test(n)).sort();

const out = path.join(ROOT, "eval/ds-manifest.json");
fs.writeFileSync(
  out,
  JSON.stringify({ package: pc.dsPackage, version: pkg.version, generatedAt: new Date().toISOString(), components }, null, 2),
);
console.log(`${components.length} компонентов из ${pc.dsPackage}@${pkg.version} → ${path.relative(ROOT, out)}`);
