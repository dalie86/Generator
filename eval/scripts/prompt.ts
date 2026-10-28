// Печатает промпт задачи для текущей конфигурации — его вставляют агенту без изменений.
// Использование: npm run eval:prompt -- T01
import fs from "node:fs";
import path from "node:path";
import { ROOT, currentConfig, getTask, loadConfig } from "../tools/config.ts";

const task = getTask(process.argv[2] ?? "");
const cfg = currentConfig();
if (!cfg) {
  console.error("Сначала выберите конфигурацию: npm run eval:config -- A|B|C");
  process.exit(1);
}
const pc = loadConfig();
const dir = `${pc.screensDir}/${task.id}`;
const lines: string[] = [];

lines.push(`Задача ${task.id}: ${task.title}.`);
lines.push("");
const hasFrame = task.type === "figma" && !!task.figmaNode;
if (task.type === "figma" && !hasFrame) {
  console.error(`⚠ У ${task.id} нет фрейма в Figma — задача идёт как текстовая.`);
}
if (hasFrame) {
  if (cfg === "A") {
    const ref = path.join(ROOT, "eval/tasks", task.id, "reference.png");
    lines.push("Сверстай экран по приложенному скриншоту макета.");
    if (!fs.existsSync(ref)) console.error(`⚠ Нет ${path.relative(ROOT, ref)} — приложите скриншот фрейма вручную.`);
    lines.push("[приложите eval/tasks/" + task.id + "/reference.png]");
  } else {
    lines.push(`Сверстай экран по макету в Figma: ${task.figmaNode}`);
  }
  lines.push("");
  lines.push(`Что на экране: ${task.brief}`);
} else if (task.type === "figma") {
  lines.push(`Сделай экран. ${task.brief}`);
} else {
  lines.push(task.brief);
}
lines.push("");
lines.push(`Используй нашу дизайн-систему ViennaUI — пакет \`${pc.dsPackage}\`.`);
lines.push(`Экран положи в \`${dir}/index.tsx\` (export default function Screen), story — в \`${dir}/Screen.stories.tsx\` с title "Screens/${task.id}" и экспортом Default.`);

console.log(lines.join("\n"));
