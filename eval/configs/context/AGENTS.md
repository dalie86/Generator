# AGENTS.md

Репозиторий пилота: экраны на React 18 + TypeScript, собранные **только** из компонентов дизайн-системы **ViennaUI** (пакет `vienna-ui`, иконки — `vienna.icons`).

## Всегда

- **Перед любой работой над UI загрузи skill `ds-ui`** (`.claude/skills/ds-ui/SKILL.md`) и в первом сообщении перечисли, какие источники загрузил: skill, его references, Storybook MCP, Figma MCP.
- Компоненты импортируй только из `vienna-ui`, иконки — из `vienna.icons`. Другие UI-библиотеки и `components/ui` запрещены.
- Цвета, отступы, радиусы, тени, шрифты — только через пропсы компонентов ViennaUI. Отступы — шкала `s1…s16` (`gap="s4"`, `mt="s2"`). Никаких hex, rgb, px и произвольных классов вида `p-[13px]`.
- Нативные `<button>`, `<input>`, `<select>`, `<textarea>`, `<dialog>`, `<table>` не используй — у ViennaUI есть свои.
- `ThemeProvider` уже стоит в корне — внутри экрана его не добавляй.
- Папка `src/ds/` — только документация для Storybook. Из неё не импортируй, импортируй из `vienna-ui`.
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
