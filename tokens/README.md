# Токены

**Если ваша дизайн-система уже публикует CSS-переменные в npm-пакете — этот шаг можно пропустить.** Линтер и анализатор работают с любыми `var(--…)`.

Если токены живут только в Figma variables:

1. Экспортируйте variables в формат W3C DTCG (встроенный экспорт Figma или плагин Tokens Studio) в `tokens/src/*.json`.
2. Соберите CSS-переменные: `npm run tokens` → `tokens/build/tokens.css`.
3. Подключите `tokens/build/tokens.css` в `.storybook/preview.ts` и `src/app/main.tsx`.

`tokens/src/example.json` — пример формата, замените своими файлами.
