# ds-ai-pilot

Пилот: может ли агент собирать экраны **из нашей дизайн-системы** — по макету в Figma и по текстовому описанию — и насколько ему в этом помогают Figma MCP, Code Connect, Storybook MCP и правила в репозитории.

Пилот отвечает на вопрос цифрами: тот же набор задач прогоняется в трёх конфигурациях, а измеряет результат не человек на глаз, а анализатор, линтер и axe.

## Конфигурации

| | A — без контекста | B — Figma | C — полная связка |
|---|---|---|---|
| Пакет DS в зависимостях | ✓ | ✓ | ✓ |
| Figma MCP + Code Connect | | ✓ | ✓ |
| Storybook MCP | | | ✓ |
| AGENTS.md + skill `ds-ui` | | | ✓ |

Переключение: `npm run eval:config -- A|B|C`. Файлы контекста хранятся в `eval/configs/` и копируются в корень только для своей конфигурации.

## Что мерим

| Метрика | Чем |
|---|---|
| Доля компонентов DS среди элементов экрана | анализатор |
| Сырые значения: hex, rgb, px, `p-[13px]` | анализатор, линтер |
| Нативные `button`/`input`/`select`… вместо DS | анализатор, линтер |
| Чужие UI-библиотеки, свои компоненты в файле экрана | анализатор, линтер |
| Выдуманные компоненты и несуществующие пропсы | манифест DS + TypeScript |
| Нарушения доступности serious/critical | axe через story экрана |
| Время, токены, правки на ревью, оценка ревьюера | вручную, `eval/results/manual.csv` |
| Загрузил ли агент skill | вручную |

Критерии успеха и сводная таблица — в `eval/results/REPORT.md` после `npm run eval:report`.

## Структура

```
pilot.config.json          пакет DS, Figma-файл, списки запрещённого
.storybook/                Storybook 10 + addon-mcp (MCP на /mcp)
figma/                     маппинги Code Connect (*.figma.tsx)
tokens/                    DTCG → CSS-переменные (если DS их не публикует)
eslint/plugin-ds.js        правила DS для линтера
src/screens/<задача>/      сюда агент пишет экраны
eval/
  tasks/tasks.json         10 задач: 5 по макету, 5 по описанию, 3 holdout
  configs/                 MCP и контекст для A/B/C, skill ds-ui
  tools/                   анализатор + тесты
  scripts/                 config, prompt, analyze, manifest, report
  a11y/                    axe-проверка story
  results/                 прогоны, manual.csv, REPORT.md
  RUNBOOK.md               как проводить прогон
```

## Запуск

```bash
npm install
npm run test:tools        # инструменты измерения
npm run storybook         # Storybook + MCP
```

## Что осталось подключить

- [ ] Пакет дизайн-системы: `npm install <пакет>`, имя — в `pilot.config.json` (`dsPackage`, `dsImportPaths`, `dsStylesImport`), стили — в `.storybook/preview.ts` и `src/app/main.tsx`.
- [ ] `npm run eval:manifest` — список компонентов DS.
- [ ] Stories компонентов DS для Storybook MCP: либо `refs` на опубликованный Storybook DS в `.storybook/main.ts`, либо stories в этом репозитории.
- [ ] Маппинги Code Connect на 8–12 компонентов в `figma/` по шаблону `Button.figma.tsx`, затем `npm run figma:connect:publish`.
- [ ] `references/components.md` в skill: карта «задача → компонент» под вашу DS.
- [ ] Ссылки на фреймы для задач T01–T05 и скриншоты для конфигурации A.
- [ ] Figma MCP: подключить удалённый сервер в агенте и авторизоваться (`.mcp.json` создаётся конфигурацией).
