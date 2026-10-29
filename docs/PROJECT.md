# Generator — контекст проекта

> Читать первым в любом новом диалоге. Здесь всё, чтобы продолжить работу без повторных объяснений и без разворачивания проекта заново.
> Обновлено: 29.10.2026 (Storybook MCP проверен вживую).

## 1. Что это и зачем

**Цель.** Понять мировые бест-практис генерации интерфейсов (макетов и фронтенда) ИИ по текстовому промпту и готовой дизайн-системе — и проверить лучшую связку на пилоте с цифрами.

**Дизайн-система** — [ViennaUI](https://github.com/Raiffeisen-DGTL/ViennaUI) (Райффайзенбанк): npm-пакет `vienna-ui` 12.82, React 18 + styled-components, ~100 компонентов, MIT.

**Выбранная связка для пилота** (обоснование — `docs/research/`):
агент в IDE (Claude Code / Cursor) + **Storybook MCP** с каталогом компонентов + **Figma MCP с Code Connect** + короткий **AGENTS.md и skill** с правилами (по образцу Vercel «product-design») + **линтер, TypeScript, axe** как обязательный цикл проверки.

**Пилот** — эксперимент: одни и те же задачи в трёх конфигурациях, результат меряют анализатор, линтер и axe, а не глаз.

| Конфигурация | Что у агента есть |
|---|---|
| **A** — без контекста | только `vienna-ui` в зависимостях |
| **B** — Figma | + Figma MCP с Code Connect |
| **C** — полная связка | + Storybook MCP, AGENTS.md, CLAUDE.md, skill `ds-ui` |

**Figma-файла с библиотекой ViennaUI пока нет**, поэтому B = A, задачи «по макету» идут как текстовые, сравниваем **A и C**.

## 2. Где что лежит

| Что | Где |
|---|---|
| Репозиторий | GitHub **`dalie86/generator`** (приватный), ветка `main` |
| Локальная копия | `~/projects/Generator` на MacBook Air (`/Users/pavel/projects/Generator`) |
| Исследование (отчёт, PDF) | `docs/research/` в репозитории |
| Этот документ | `docs/PROJECT.md` в репозитории и в документах проекта Generator на claude.ai |

Окружение на Mac: Node 22 LTS (установлен .pkg с nodejs.org, **Homebrew нет**), git, SSH-ключи к GitHub настроены под хост `github.com`. Тариф Figma с Code Connect — есть.

## 3. Структура репозитория

```
pilot.config.json          ViennaUI, запрещённые библиотеки, шкала отступов
src/app/ViennaRoot.tsx     ThemeProvider ViennaUI (theme={}) для приложения и Storybook
src/catalog/               stories каталога ViennaUI: 19 компонентов, примеры использования
src/ds/                    «карточки» компонентов для Storybook MCP: JSDoc «когда использовать / когда нет»
                           + пропсы из типов vienna-ui; рендерят настоящий vienna-ui. В экранах НЕ импортировать
src/screens/<задача>/      сюда агент пишет экраны (index.tsx + Screen.stories.tsx)
.storybook/                Storybook 10 + @storybook/addon-mcp (MCP на http://localhost:6006/mcp)
figma/                     шаблон Code Connect (Button) — ждёт Figma-файл
eslint/plugin-ds.js        4 правила DS: no-raw-values, no-raw-interactive, no-foreign-ui, radio-for-few
eval/
  tasks/tasks.json         10 задач-примеров (T01–T10), 3 holdout: T04, T08, T10
  configs/                 MCP-конфиги A/B/C и контекст для C: AGENTS.md, CLAUDE.md, skills/ds-ui
  ds-manifest.json         108 экспортов vienna-ui (npm run eval:manifest)
  tools/                   анализатор + детекторы + тесты
  scripts/                 set-config, prompt, analyze, build-manifest, report
  a11y/                    axe по story экрана (Playwright)
  results/                 runs/*.json, screens/, manual.csv, REPORT.md
  RUNBOOK.md               как проводить прогон — пошагово
docs/                      этот документ и исследование
```

## 4. Команды

```bash
npm install
npm run test:tools               # 33 теста инструментов измерения
npm run typecheck && npm run lint
npm run storybook                # каталог ViennaUI + MCP
npm run eval:manifest            # пересобрать список компонентов из vienna-ui

npm run eval:config -- A|B|C     # переключить конфигурацию эксперимента
npm run eval:prompt -- T01       # промпт задачи для агента
npm run eval:analyze -- T01 C 1  # замер прогона
TASK=T01 CONFIG=C RUN=1 npm run eval:a11y
npm run eval:report              # → eval/results/REPORT.md
```

## 5. Что меряем и критерии успеха

Анализатор: доля компонентов ViennaUI, сырые значения (hex, rgb, px, `gap="16px"`), нативные `button/input/…`, чужие UI-библиотеки, свои компоненты в файле экрана, выдуманные компоненты (сверка с манифестом), несуществующие пропсы (TypeScript). Плюс axe и ручные поля в `eval/results/manual.csv`: время, токены, правки на ревью, оценка 1–4, загрузил ли агент skill.

Критерии для C (предложение, можно менять): доля DS ≥ 90 %, 0 сырых значений, 0 критичных a11y, правок на ревью на 30 % меньше, чем в A, skill загружен в ≥ 90 % задач, на holdout не хуже остальных.

## 6. Факты о ViennaUI, которые уже стоили времени

- `ThemeProvider` из `vienna.ui-primitives` **требует проп `theme`**. Пустой объект `{}` = стандартная тема.
- `onChange` / `onSelect` у `Input`, `Select`, `Radio`, `Switcher`, `Tabs` получают **объект `{ value, event, options }`**, а не DOM-событие. У `Checkbox` — обычный `ChangeEvent`.
- Отступы — шкала `s1…s16` (`gap="s4"`, `mt="s2"`). Строка `"16px"` тоже принимается типами — ловит только наш линтер.
- `Button`: `design` = accent / primary / outline / critical / outline-critical / ghost / ghost-accent / white / ghost-white / neutral; не больше одной `accent` на экране.
- Поля формы — всегда в `FormField` (`Label` / `Content` / `Message color="critical"`).
- В репозитории ViennaUI есть `src/CHANGELOG_LLM.md` — заметки о миграциях специально для ИИ-агентов.
- Официального Storybook или Figma у ViennaUI в открытом доступе нет — каталог в `src/catalog/` написан по README компонентов.
- В `package.json` у `vienna-ui` есть `exports`: `require.resolve("vienna-ui/package.json")` не работает.

**Storybook MCP и ViennaUI (проверено 29.10.2026, Storybook 10.6.5):**
- Манифест компонентов Storybook **не анализирует файлы из `node_modules`** — для `component: Button` из `vienna-ui` агент получал только примеры, без описания и пропсов.
- Решение: `src/ds/<Компонент>.tsx` — тонкая обёртка с JSDoc-описанием, пропсы `ComponentProps<typeof ViennaX>`; в `meta.component` stories стоит обёртка. У составных компонентов обёртка наследует части (`Modal.Body`, `Select.Option`…).
- Пропсы читает `react-docgen-typescript` (`.storybook/main.ts`, `propFilter` оставляет только `vienna*`); `react-docgen` по умолчанию уходит в JS из `node_modules` и пропсов не видит.
- `src/ds/package.json` с `"name": "vienna-ui"` — чтобы в документации агент видел `import … from 'vienna-ui'`, а не имя нашего репозитория. Тег `@import` в JSDoc с `react-docgen-typescript` не работает.
- `docs-show` теперь отдаёт по каждому компоненту: описание, примеры, тип `Props`. Перечисления (`ButtonDesign`) не раскрываются — значения продублированы в описании.
- MCP: `http://localhost:6006/mcp`, инструменты `docs-list`, `docs-show`, `docs-show-story`, `stories-find-by-component`, `get-storybook-story-instructions`, `stories-preview`, `stories-changed`.

## 7. Принятые решения

- **Корневые `AGENTS.md`, `CLAUDE.md`, `.mcp.json`, `.claude/skills/ds-ui` не коммитим** — их создаёт `eval:config` для нужной конфигурации. Иначе контекст протечёт в конфигурацию A и сравнение потеряет смысл. Поэтому контекст проекта — в `docs/`, а не в корневом CLAUDE.md.
- Правила форм и текстов — с ID (`form/destructive-label`, `ds/only-tokens`…) в `eval/configs/context/skills/ds-ui/references/rules.md`. Новое правило добавляет человек; что проверяется без рендера — уходит в линтер.
- Прогоны — в ветке `pilot-runs`; копии экранов — `eval/results/screens/<задача>-<конф>-<номер>/`.

## 8. Как Claude работать в новом диалоге

1. Прочитать этот документ. Не разворачивать проект заново.
2. **Код:** подключить репозиторий `dalie86/generator` (GitHub уже связан с Claude, приложение Claude установлено) и клонировать. Пушить можно напрямую.
3. **Mac пользователя** (если диалог связан с компьютером): папка `~/projects` открывается запросом доступа; для git там нужно разрешение на удаление (git удаляет свои lock-файлы).
4. **Ограничения окружения на Mac (VM):** нет доступа к npm и GitHub (прокси 403). `node_modules` собраны под macOS, поэтому `tsx` и `esbuild` в VM не запускаются. Работает: `node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json`, `node node_modules/eslint/bin/eslint.js src`, `node --experimental-strip-types --no-warnings eval/scripts/<скрипт>.ts`, `node --experimental-strip-types --test eval/tools/*.test.ts`.
5. **Синхронизация Mac ↔ GitHub:** правки, сделанные на Mac, — `git bundle create … origin/main..main` → забрать файл в облако → `git fetch` из bundle → `git push`. У пользователя в Терминале `git push` / `git pull` тоже работают.
6. Пользователь пишет по-русски, работает дизайнером/продактом; командную строку использует, но окружение (brew, gh) не настроено — давать готовые команды целиком.

## 9. Статус и что дальше

Сделано:
- [x] Исследование и выбор связки (`docs/research/`)
- [x] Репозиторий, инструменты измерения (33 теста), каталог ViennaUI, skill, правила, линтер
- [x] `npm install` на Mac, typecheck и lint чистые на установленной `vienna-ui` 12.82

Дальше:
- [x] Storybook: 20 историй рендерятся без ошибок, MCP отвечает и отдаёт описание + пропсы + импорт по всем 19 компонентам
- [ ] Первый прогон: T06 в конфигурациях A и C (по `eval/RUNBOOK.md`)
- [ ] Заменить задачи-примеры на реальные экраны продукта
- [ ] Когда появится Figma-библиотека: `figmaFileUrl`, маппинги Code Connect, фреймы для T01–T05 — и конфигурация B
