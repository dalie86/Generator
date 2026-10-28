// Тесты правил линтера. Запуск: node --test eslint/plugin-ds.test.js
import { RuleTester } from "eslint";
import { test } from "node:test";
import plugin from "./plugin-ds.js";

RuleTester.describe = (_name, fn) => fn();
RuleTester.it = (name, fn) => test(name, fn);
RuleTester.itOnly = RuleTester.it;

const tester = new RuleTester({
  languageOptions: { ecmaVersion: 2022, sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } } },
});

tester.run("no-raw-values", plugin.rules["no-raw-values"], {
  valid: [
    `<div style={{ padding: "var(--space-4)", display: "flex", opacity: 0.5, margin: 0 }} />`,
    `<div className="flex gap-4" />`,
    `<div style={{ color: "var(--color-text, #000)" }} />`,
  ],
  invalid: [
    { code: `<div style={{ padding: 13 }} />`, errors: 1 },
    { code: `<div style={{ color: "#c62828", margin: "8px" }} />`, errors: 2 },
    { code: `<div className="p-[13px] text-[#fff] flex" />`, errors: 2 },
    { code: "<div className={`p-[3px] ${a}`} />", errors: 1 },
    { code: `<div style={{ "&:hover": { background: "rgb(1,2,3)" } }} />`, errors: 1 },
  ],
});

tester.run("no-raw-interactive", plugin.rules["no-raw-interactive"], {
  valid: [`<Button>OK</Button>`, `<div><span /></div>`],
  invalid: [
    { code: `<button>OK</button>`, errors: 1 },
    { code: `<form><input /><select /></form>`, errors: 2 },
  ],
});

// Список чужих библиотек берётся из pilot.config.json в корне репозитория.
tester.run("no-foreign-ui", plugin.rules["no-foreign-ui"], {
  valid: [`import { useState } from "react";`],
  invalid: [
    { code: `import { Dialog } from "@mui/material";`, errors: 1 },
    { code: `import { Button } from "@/components/ui/button";`, errors: 1 },
  ],
});

tester.run("radio-for-few", plugin.rules["radio-for-few"], {
  valid: [
    `<Select options={[1, 2, 3, 4, 5]} />`,
    `<Select options={items} />`,
    `<Select><Option /></Select>`,
  ],
  invalid: [
    { code: `<Select options={["a", "b"]} />`, errors: 1 },
    { code: `<Select><Option /><Option /><Option /></Select>`, errors: 1 },
  ],
});
