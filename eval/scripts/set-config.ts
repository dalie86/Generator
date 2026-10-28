// Переключает репозиторий в одну из конфигураций эксперимента.
//   A — агент без контекста DS (только пакет DS в зависимостях)
//   B — + Figma MCP с Code Connect
//   C — полная связка: + Storybook MCP, AGENTS.md, CLAUDE.md, skill ds-ui
// Использование: npm run eval:config -- C
import fs from "node:fs";
import path from "node:path";
import { ROOT, parseConfig } from "../tools/config.ts";

const cfg = parseConfig(process.argv[2]);
const ctx = path.join(ROOT, "eval/configs/context");

const targets = {
  agents: path.join(ROOT, "AGENTS.md"),
  claude: path.join(ROOT, "CLAUDE.md"),
  skill: path.join(ROOT, ".claude/skills/ds-ui"),
  mcp: path.join(ROOT, ".mcp.json"),
};

// Сначала убираем всё, что могло остаться от прошлой конфигурации.
for (const p of Object.values(targets)) fs.rmSync(p, { recursive: true, force: true });

fs.copyFileSync(path.join(ROOT, `eval/configs/mcp.${cfg}.json`), targets.mcp);

if (cfg === "C") {
  fs.copyFileSync(path.join(ctx, "AGENTS.md"), targets.agents);
  fs.copyFileSync(path.join(ctx, "CLAUDE.md"), targets.claude);
  fs.mkdirSync(path.dirname(targets.skill), { recursive: true });
  fs.cpSync(path.join(ctx, "skills/ds-ui"), targets.skill, { recursive: true });
}

fs.writeFileSync(path.join(ROOT, ".pilot-config"), cfg + "\n");

const on = (x: boolean) => (x ? "да " : "нет");
console.log(`Конфигурация ${cfg}:
  Figma MCP + Code Connect   ${on(cfg !== "A")}
  Storybook MCP              ${on(cfg === "C")}
  AGENTS.md / CLAUDE.md      ${on(cfg === "C")}
  skill ds-ui                ${on(cfg === "C")}
${cfg === "C" ? "\nНе забудьте запустить Storybook: npm run storybook (MCP будет на /mcp).\n" : ""}
Перезапустите агента в новой сессии, чтобы он подхватил конфигурацию.`);
