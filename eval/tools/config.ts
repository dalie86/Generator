import fs from "node:fs";
import path from "node:path";
import type { PilotConfig } from "./analyze-core.ts";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

export interface FullConfig extends PilotConfig {
  dsProvider: string;
  figmaFileUrl: string | null;
  screensDir: string;
  storybookUrl: string;
}

export function loadConfig(): FullConfig {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "pilot.config.json"), "utf8"));
}

export interface Task {
  id: string;
  type: "figma" | "prompt";
  holdout: boolean;
  title: string;
  brief: string;
  figmaNode?: string | null;
  expect: string[];
}

export function loadTasks(): Task[] {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "eval/tasks/tasks.json"), "utf8")).tasks;
}

export function getTask(id: string): Task {
  const t = loadTasks().find((x) => x.id.toLowerCase() === id.toLowerCase());
  if (!t) throw new Error(`Нет задачи ${id}. Есть: ${loadTasks().map((x) => x.id).join(", ")}`);
  return t;
}

export const CONFIGS = ["A", "B", "C"] as const;
export type ConfigId = (typeof CONFIGS)[number];

export function parseConfig(x: string | undefined): ConfigId {
  const c = (x ?? "").toUpperCase();
  if (!CONFIGS.includes(c as ConfigId)) throw new Error(`Конфигурация должна быть A, B или C, получено: ${x}`);
  return c as ConfigId;
}

export function currentConfig(): ConfigId | undefined {
  const p = path.join(ROOT, ".pilot-config");
  return fs.existsSync(p) ? (fs.readFileSync(p, "utf8").trim() as ConfigId) : undefined;
}
