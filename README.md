# Generator

> **Контекст проекта, решения и статус — [`docs/PROJECT.md`](docs/PROJECT.md).** Исследование — [`docs/research/`](docs/research/).

Пилот: может ли агент (Claude Code, Cursor) собирать экраны **из дизайн-системы [ViennaUI](https://github.com/Raiffeisen-DGTL/ViennaUI)** по текстовому описанию — а когда появятся макеты, и по Figma — и насколько ему помогают Storybook MCP, Figma MCP с Code Connect и правила в репозитории.

Ответ — в цифрах: одни и те же задачи прогоняются в разных конфигурациях, а результат меряет не человек на глаз, а анализатор, линтер и axe.

## Конфигурации

| | A — без контекста | B — Figma | C — полная связка |
|---|---|---|---|
| `vienna-ui` в зависимостях | ✓ | ✓ | ✓ |
| Figma MCP + Code Connect | | ✓ | ✓ |
| Storybook MCP с каталогом ViennaUI | | | ✓ |
| AGENTS.md + skill `ds-ui` | | | ✓ |

Переключение: `npm run eval:config -- A|B|C`. Файлы контекста хранятся в `eval/configs/` и копируются в корень только для своей конфигурации.

**Без Figma.** Пока Figma-файла с библиотекой нет, B ничем не отличается от A, а задачи «по макету» идут как текстовые. Сравнивайте **A и C** — это и есть главный вопрос пилота: что даёт агенту подготовленный контекст дизайн-системы.

## Что мерим

| Метрика | Чем |
|---|---|
| Доля компонентов ViennaUI среди элементов экрана | анализатор |
| Сырые значения: hex, rgb, px, `gap="16px"` вместо `gap="s4"` | анализатор, линтер |
| Нативные `button`/`input`/`select`… вместо ViennaUI | анализатор, линтер |
| Чужие UI-библиотеки, свои компоненты в файле экрана | анализатор, линтер |
| Выдуманные компоненты (например, `InputEmail` — такого в ViennaUI нет) | манифест + TypeScript |
| Несуществующие пропсы | TypeScript |
| Нарушения доступности serious/critical | axe по story экрана |
| Время, токены, правки на ревью, оценка ревьюера, загрузил ли агент skill | вручную, `eval/results/manual.csv` |

Сводка и проверка критериев успеха — `npm run eval:report` → `eval/results/REPORT.md`.

## Структура

```
pilot.config.json          ViennaUI, списки запрещённого, шкала отступов
src/app/ViennaRoot.tsx     ThemeProvider ViennaUI для приложения и Storybook
src/catalog/               stories каталога ViennaUI: 19 компонентов
src/ds/                    описания и пропсы компонентов для Storybook MCP (обёртки над vienna-ui)
src/screens/<задача>/      сюда агент пишет экраны
.storybook/                Storybook 10 + addon-mcp (MCP на /mcp)
figma/                     шаблон Code Connect для ViennaUI (ждёт Figma-файл)
eslint/plugin-ds.js        правила дизайн-системы для линтера
eval/
  tasks/tasks.json         10 задач-примеров, 3 из них holdout
  configs/                 MCP и контекст для A/B/C, skill ds-ui
  ds-manifest.json         список компонентов vienna-ui (105)
  tools/                   анализатор и детекторы + тесты
  scripts/                 config, prompt, analyze, manifest, report
  a11y/                    axe-проверка story экрана
  results/                 прогоны, manual.csv, REPORT.md
  RUNBOOK.md               как проводить прогон
```

## Запуск

```bash
npm install
npm run test:tools        # инструменты измерения: 33 теста
npm run storybook         # Storybook с каталогом ViennaUI + MCP на http://localhost:6006/mcp
npm run eval:manifest     # пересобрать список компонентов из установленного vienna-ui
```

Дальше — `eval/RUNBOOK.md`.

## Первый запуск: что проверить

Этот репозиторий собран без доступа к npm, поэтому установка и Storybook ещё не запускались. При первом `npm install`:

- [ ] Версии Storybook 10, `@storybook/addon-mcp` и `@figma/code-connect` в `package.json` поставлены по документации, не проверены установкой.
- [ ] `ThemeProvider` из `vienna.ui-primitives` в `src/app/ViennaRoot.tsx` вызывается без темы — если ViennaUI требует `theme`, передайте пресет.
- [ ] Каталог `src/catalog/` написан по README компонентов ViennaUI 12.82 — прогоните `npm run typecheck`, расхождения с вашей версией поправьте.
- [ ] `npm run eval:manifest` перезапишет `eval/ds-manifest.json` из установленного пакета, вместе с реэкспортами `vienna.ui-primitives`.

## Что подключить позже

- [ ] Figma-файл с библиотекой ViennaUI → `figmaFileUrl` в `pilot.config.json`, маппинги Code Connect по шаблону `figma/Button.figma.tsx`, ссылки на фреймы в `eval/tasks/tasks.json`.
- [ ] Реальные задачи продукта вместо примеров в `eval/tasks/tasks.json`.
