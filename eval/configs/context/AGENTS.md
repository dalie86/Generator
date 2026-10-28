# AGENTS.md

Репозиторий пилота: экраны на React + TypeScript, собранные **только** из компонентов дизайн-системы (DS).

## Всегда

- **Перед любой работой над UI загрузи skill `ds-ui`** (`.claude/skills/ds-ui/SKILL.md`) и в первом сообщении перечисли, какие источники загрузил: skill, его references, Storybook MCP, Figma MCP.
- Компоненты импортируй только из пакета DS (имя — в `pilot.config.json` → `dsPackage`). Другие UI-библиотеки и `components/ui` запрещены.
- Цвета, отступы, радиусы, тени, шрифты — только токенами DS (`var(--…)` или пропсы компонентов). Никаких hex, rgb, px-значений и произвольных классов вида `p-[13px]`.
- Нативные `<button>`, `<input>`, `<select>`, `<textarea>`, `<dialog>`, `<table>` не используй — у DS есть свои.
- Пропсы проверяй по документации в Storybook MCP. Не угадывай.
- Нужного компонента в DS нет — **остановись и спроси**. Не собирай свой.

## Куда писать

- Экран задачи: `src/screens/<ID задачи>/index.tsx`, `export default function Screen()`.
- Story: `src/screens/<ID>/Screen.stories.tsx`, `title: "Screens/<ID>"`, экспорт `Default`.

## Перед тем как сказать «готово»

```
npm run typecheck
npm run lint
```

Исправь все ошибки. Затем пройди чек-лист из skill `ds-ui`.
