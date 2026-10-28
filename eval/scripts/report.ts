// Сводный отчёт по всем прогонам: npm run eval:report → eval/results/REPORT.md
// Источники: eval/results/runs/*.json (анализатор), *.a11y.json (axe), eval/results/manual.csv (ручные поля).
import fs from "node:fs";
import path from "node:path";
import { CONFIGS, ROOT } from "../tools/config.ts";

type Row = Record<string, number | string | boolean | undefined>;
const runsDir = path.join(ROOT, "eval/results/runs");
const files = fs.existsSync(runsDir) ? fs.readdirSync(runsDir) : [];

const key = (t: unknown, c: unknown, r: unknown) => `${t}-${c}-${r}`;
const rows = new Map<string, Row>();

for (const f of files.filter((f) => /^[^.]+\.json$/.test(f))) {
  const j = JSON.parse(fs.readFileSync(path.join(runsDir, f), "utf8"));
  rows.set(key(j.task, j.config, j.run), {
    task: j.task, config: j.config, run: j.run, type: j.type, holdout: j.holdout,
    dsShare: j.dsShare, rawValues: j.rawValues, rawInteractive: j.rawInteractive,
    foreign: j.foreignImports + j.foreignElements, local: j.localComponentDefs,
    invented: j.inventedComponents, invalidProps: j.invalidProps, hasStory: j.hasStory,
  });
}
for (const f of files.filter((f) => f.endsWith(".a11y.json"))) {
  const j = JSON.parse(fs.readFileSync(path.join(runsDir, f), "utf8"));
  const r = rows.get(key(j.task, j.config, j.run));
  if (r) r.a11ySerious = j.critical + j.serious;
}

// Ручные поля: время, токены, загрузил ли агент skill, правки на ревью, оценка ревьюера 1–4.
const manualPath = path.join(ROOT, "eval/results/manual.csv");
if (fs.existsSync(manualPath)) {
  const [header, ...lines] = fs.readFileSync(manualPath, "utf8").trim().split(/\r?\n/);
  const cols = header.split(",");
  for (const line of lines) {
    if (!line.trim()) continue;
    const v = line.split(",");
    const rec = Object.fromEntries(cols.map((c, i) => [c, v[i]]));
    const r = rows.get(key(rec.task, rec.config, rec.run));
    if (!r) continue;
    for (const c of ["time_min", "tokens", "lint_errors_first", "review_edits", "reviewer_score"]) {
      if (rec[c] !== undefined && rec[c] !== "") r[c] = Number(rec[c]);
    }
    if (rec.skill_loaded) r.skillLoaded = /^(1|y|yes|да|true)$/i.test(rec.skill_loaded);
  }
}

const all = [...rows.values()];
const nums = (rs: Row[], k: string) => rs.map((r) => r[k]).filter((x): x is number => typeof x === "number");
const avg = (rs: Row[], k: string) => {
  const n = nums(rs, k);
  return n.length ? n.reduce((a, b) => a + b, 0) / n.length : undefined;
};
const fmt = (x: number | undefined, d = 1) => (x === undefined ? "—" : x.toFixed(d));
const pct = (x: number | undefined) => (x === undefined ? "—" : `${Math.round(x * 100)}%`);
const share = (rs: Row[], pred: (r: Row) => boolean) => (rs.length ? rs.filter(pred).length / rs.length : undefined);

const metrics: [string, (rs: Row[]) => string][] = [
  ["Прогонов", (rs) => String(rs.length)],
  ["Доля компонентов DS", (rs) => pct(avg(rs, "dsShare"))],
  ["Сырые значения, среднее", (rs) => fmt(avg(rs, "rawValues"))],
  ["Нативные интерактивные", (rs) => fmt(avg(rs, "rawInteractive"))],
  ["Чужие UI", (rs) => fmt(avg(rs, "foreign"))],
  ["Свои компоненты", (rs) => fmt(avg(rs, "local"))],
  ["Выдуманные компоненты", (rs) => fmt(avg(rs, "invented"))],
  ["Несуществующие пропсы", (rs) => fmt(avg(rs, "invalidProps"))],
  ["a11y serious+critical", (rs) => fmt(avg(rs, "a11ySerious"))],
  ["Ошибки линтера до исправлений", (rs) => fmt(avg(rs, "lint_errors_first"))],
  ["Время, мин", (rs) => fmt(avg(rs, "time_min"))],
  ["Токены", (rs) => fmt(avg(rs, "tokens"), 0)],
  ["Правки на ревью", (rs) => fmt(avg(rs, "review_edits"))],
  ["Оценка ревьюера (1–4)", (rs) => fmt(avg(rs, "reviewer_score"))],
  ["Skill загружен", (rs) => pct(share(rs.filter((r) => r.skillLoaded !== undefined), (r) => r.skillLoaded === true))],
];

const byCfg = Object.fromEntries(CONFIGS.map((c) => [c, all.filter((r) => r.config === c)]));
let md = `# Результаты пилота\n\nСобрано: ${new Date().toISOString().slice(0, 16).replace("T", " ")} · прогонов: ${all.length}\n\n`;
md += `## По конфигурациям\n\n| Метрика | A — без контекста | B — Figma MCP + Code Connect | C — полная связка |\n|---|---|---|---|\n`;
for (const [name, f] of metrics) md += `| ${name} | ${f(byCfg.A)} | ${f(byCfg.B)} | ${f(byCfg.C)} |\n`;

const c = byCfg.C;
const sub = (rs: Row[]) => ({
  figma: rs.filter((r) => r.type === "figma"),
  prompt: rs.filter((r) => r.type === "prompt"),
  holdout: rs.filter((r) => r.holdout),
  seen: rs.filter((r) => !r.holdout),
});
const s = sub(c);
md += `\n## Конфигурация C в разрезе\n\n| Срез | Прогонов | Доля DS | Сырые значения | Правки на ревью |\n|---|---|---|---|---|\n`;
for (const [n, rs] of [["По макету", s.figma], ["По промпту", s.prompt], ["Holdout", s.holdout], ["Не holdout", s.seen]] as const) {
  md += `| ${n} | ${rs.length} | ${pct(avg(rs, "dsShare"))} | ${fmt(avg(rs, "rawValues"))} | ${fmt(avg(rs, "review_edits"))} |\n`;
}

// Критерии успеха из плана пилота.
const check = (ok: boolean | undefined) => (ok === undefined ? "нет данных" : ok ? "✅" : "❌");
const aEdits = avg(byCfg.A, "review_edits");
const cEdits = avg(c, "review_edits");
const holdoutGap = avg(s.holdout, "dsShare") !== undefined && avg(s.seen, "dsShare") !== undefined
  ? avg(s.holdout, "dsShare")! >= avg(s.seen, "dsShare")! - 0.05
  : undefined;
const skillShare = share(c.filter((r) => r.skillLoaded !== undefined), (r) => r.skillLoaded === true);
const criteria: [string, boolean | undefined][] = [
  ["C: доля компонентов DS ≥ 90%", avg(c, "dsShare") !== undefined ? avg(c, "dsShare")! >= 0.9 : undefined],
  ["C: 0 сырых значений", c.length ? nums(c, "rawValues").every((x) => x === 0) : undefined],
  ["C: 0 критичных нарушений a11y", nums(c, "a11ySerious").length ? nums(c, "a11ySerious").every((x) => x === 0) : undefined],
  ["C: правок на ревью минимум на 30% меньше, чем в A", aEdits !== undefined && cEdits !== undefined ? cEdits <= aEdits * 0.7 : undefined],
  ["C: skill загружен в ≥ 90% задач", skillShare !== undefined ? skillShare >= 0.9 : undefined],
  ["C: на holdout доля DS не хуже остальных (±5 п.п.)", holdoutGap],
];
md += `\n## Критерии успеха\n\n| Критерий | Результат |\n|---|---|\n`;
for (const [n, ok] of criteria) md += `| ${n} | ${check(ok)} |\n`;

md += `\n## Все прогоны\n\n| Задача | Конф. | Прогон | Доля DS | Сырые | Выдуманные | Пропсы | a11y | Правки |\n|---|---|---|---|---|---|---|---|---|\n`;
for (const r of all.sort((a, b) => String(a.task).localeCompare(String(b.task)) || String(a.config).localeCompare(String(b.config)))) {
  md += `| ${r.task}${r.holdout ? " (h)" : ""} | ${r.config} | ${r.run} | ${pct(r.dsShare as number)} | ${r.rawValues} | ${r.invented} | ${r.invalidProps} | ${r.a11ySerious ?? "—"} | ${r.review_edits ?? "—"} |\n`;
}

const out = path.join(ROOT, "eval/results/REPORT.md");
fs.writeFileSync(out, md);
console.log(md);
console.log(`→ ${path.relative(ROOT, out)}`);
