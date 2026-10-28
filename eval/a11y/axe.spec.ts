// Проверка доступности экрана через axe по его story в Storybook.
// Использование (Storybook должен быть запущен):
//   TASK=T01 CONFIG=C RUN=1 npm run eval:a11y
// Пишет eval/results/runs/T01-C-1.a11y.json и сохраняет скриншот для визуальной сверки с макетом.
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const task = process.env.TASK;
const config = process.env.CONFIG;
const run = process.env.RUN ?? "1";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test(`a11y ${task} ${config} ${run}`, async ({ page }) => {
  test.skip(!task || !config, "Укажите TASK и CONFIG");
  const storyId = `screens-${task!.toLowerCase()}--default`;
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  await page.locator("#storybook-root").waitFor();
  await page.waitForTimeout(500);

  const results = await new AxeBuilder({ page }).include("#storybook-root").analyze();
  const bySeverity = (s: string) => results.violations.filter((v) => v.impact === s).length;
  const summary = {
    task,
    config,
    run: Number(run),
    storyId,
    critical: bySeverity("critical"),
    serious: bySeverity("serious"),
    moderate: bySeverity("moderate"),
    minor: bySeverity("minor"),
    violations: results.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help })),
  };

  const runs = path.join(root, "eval/results/runs");
  fs.mkdirSync(runs, { recursive: true });
  fs.writeFileSync(path.join(runs, `${task}-${config}-${run}.a11y.json`), JSON.stringify(summary, null, 2));

  const shots = path.join(root, "eval/results/screenshots");
  fs.mkdirSync(shots, { recursive: true });
  await page.locator("#storybook-root").screenshot({ path: path.join(shots, `${task}-${config}-${run}.png`) });

  console.log(`critical ${summary.critical} · serious ${summary.serious} · moderate ${summary.moderate} · minor ${summary.minor}`);
  // Тест не падает: это измерение, а не гейт. Гейт — в CI на main.
  expect(results).toBeTruthy();
});
