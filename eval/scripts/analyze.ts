// Анализ одного прогона: npm run eval:analyze -- T01 C 1
// Пишет eval/results/runs/T01-C-1.json и печатает сводку.
import fs from "node:fs";
import path from "node:path";
import { analyzeFiles, listScreenFiles } from "../tools/analyze-core.ts";
import { ROOT, getTask, loadConfig, parseConfig } from "../tools/config.ts";

const [taskArg, cfgArg, runArg = "1"] = process.argv.slice(2);
const task = getTask(taskArg ?? "");
const config = parseConfig(cfgArg);
const run = Number(runArg);

const pc = loadConfig();
const dir = path.join(ROOT, pc.screensDir, task.id);
const files = listScreenFiles(dir);
if (!files.length) {
  console.error(`В ${path.relative(ROOT, dir)} нет файлов экрана.`);
  process.exit(1);
}

const manifestPath = path.join(ROOT, "eval/ds-manifest.json");
const manifest = fs.existsSync(manifestPath)
  ? (JSON.parse(fs.readFileSync(manifestPath, "utf8")).packages as Record<string, string[]>)
  : undefined;
if (!manifest) console.error("⚠ Нет eval/ds-manifest.json — выдуманные компоненты считаются только по typecheck. Запустите npm run eval:manifest.");

const m = analyzeFiles(files, pc, { manifest, withTypecheck: true, tsconfigPath: path.join(ROOT, "tsconfig.json") });
const hasStory = fs.existsSync(path.join(dir, "Screen.stories.tsx"));

const result = {
  task: task.id,
  type: task.type,
  holdout: task.holdout,
  config,
  run,
  analyzedAt: new Date().toISOString(),
  hasStory,
  ...m,
};

const outDir = path.join(ROOT, "eval/results/runs");
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `${task.id}-${config}-${run}.json`);
fs.writeFileSync(out, JSON.stringify(result, null, 2));

// Копия экрана прогона — для ревью и истории. Папка в src/screens после этого очищается
// следующим прогоном той же задачи (см. RUNBOOK).
const archive = path.join(ROOT, "eval/results/screens", `${task.id}-${config}-${run}`);
fs.rmSync(archive, { recursive: true, force: true });
fs.cpSync(dir, archive, { recursive: true });

const pct = (x: number) => `${Math.round(x * 100)}%`;
console.log(`${task.id} · конфигурация ${config} · прогон ${run}
  Доля компонентов DS        ${pct(m.dsShare)}   (${m.dsComponentsUsed.join(", ") || "—"})
  Сырые значения             ${m.rawValues}
  Нативные интерактивные     ${m.rawInteractive}
  Чужие UI-импорты           ${m.foreignImports}
  Свои компоненты в файле    ${m.localComponentDefs}
  Выдуманные компоненты      ${m.inventedComponents}
  Несуществующие пропсы      ${m.invalidProps}${m.typecheck === "skipped" ? "   (проверка типов неполная: окружение не установлено — npm install)" : ""}
  Прочие ошибки типов        ${m.otherTypeErrors}
  Story есть                 ${hasStory ? "да" : "нет"}
→ ${path.relative(ROOT, out)}`);

if (m.findings.length) {
  console.log("\nНаходки:");
  for (const f of m.findings) console.log(`  ${f.file}:${f.line}  ${f.kind}  ${f.detail}`);
}
