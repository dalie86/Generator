# Задача → компонент ViennaUI

Все компоненты импортируются из `vienna-ui`, иконки — из `vienna.icons`.
Подробная документация и примеры каждого компонента — в Storybook (раздел «Vienna/…»), доступна через Storybook MCP.

| Что нужно на экране | Компонент | Как | Не использовать, когда |
|---|---|---|---|
| Главное действие экрана | `Button` | `design="accent"` | на экране уже есть accent — тогда `primary` |
| Второстепенное, «Отмена» | `Button` | `design="outline"` | |
| Удаление, необратимое | `Button` | `design="critical"` | действие обратимо |
| Действие в строке таблицы | `Button` | `design="ghost"`, `size="s"` | |
| Переход на другой сайт | `Link` | | действие внутри продукта — `Button` |
| Несколько кнопок рядом | `Groups` | кнопки внутри | |
| Любое поле формы | `FormField` | `FormField.Label` + `FormField.Content` + `FormField.Message` | — всегда |
| Короткий текст, число | `Input` | внутри `FormField` | > 5 слов — `Textarea` |
| Телефон / счёт / карта / дата | `InputPhone` / `InputAccount` / `InputCard` / `InputDate` | | |
| Пароль | `InputPassword` | | |
| Многострочный текст | `Textarea` | | |
| 2–3 варианта, один выбор | `Radio` в `Groups design="vertical"` | общий `name` | вариантов ≥ 4 — `Select` |
| 4+ вариантов, один выбор | `Select` + `Select.Option` | `onSelect({ value })` | |
| Несколько из списка с поиском | `MultiselectWithSearch` | | |
| Да/нет, применяется после «Сохранить» | `Checkbox` | | |
| Настройка, применяется сразу | `Switcher` | `onChange({ value })` | |
| Дата | `Datepicker` | | |
| Подтверждение, короткая форма | `Modal` | `Modal.Layout` → `Head`/`Title` → `Body` → `Footer` | уже открыта модалка; длинная форма |
| Длинная форма сбоку | `Drawer` | | |
| Список записей | `Table` + `Table.Column` | `data`, колонка — функция от записи | пусто — `EmptyState` |
| Статус | `Badge` | `color` из палитры (`miami10`, `paris10`…) | |
| Разделы страницы | `Tabs` + `Tabs.Tab` | `onChange({ value })` | шаги процесса — `Stepper`/`Wizard` |
| Шаги процесса | `Stepper`, `Wizard` | | |
| Пустой список | `EmptyState` | `Title`, `Description`, `Actions` | |
| Сообщение на странице | `Alert` | `design`: plain/accent/success/warning/error | ошибка поля — `FormField.Message` |
| Уведомление о результате | `Notifications` + `NotificationService` | один `Notifications` на приложение | |
| Загрузка | `Spinner`, `Skeleton` | | |
| Пагинация | `Pagination` | | |
| Поиск | `Search` | | |
| Блок с заголовком | `Card` | `title`, `actions`, `footer` | |
| Раскладка | `Flex` (`gap="s1…s16"`), `Groups`, `Grid` | | |
| Заголовки и текст | `Heading`, `H1…H6`, `Text`, `P` | | — никаких `<h1>`, `<p>` со стилями |
| Отступ вокруг блока | проп `margin`/`mt`/`mb`… у компонента или `Whitespace` | значения `s1…s16` | — никаких `px` |

## Особенности API ViennaUI

- **Обработчики изменения** у `Input`, `Select`, `Radio`, `Switcher`, `Tabs` получают объект `{ value, event, options }`, а не DOM-событие: `onChange={({ value }) => setValue(value)}`. Исключение — `Checkbox`: обычный `ChangeEvent`.
- **Отступы** — только шкала `s1…s16`: `gap="s4"`, `mt="s2"`. Строка `"16px"` пропсом тоже пройдёт, но это нарушение `ds/only-tokens`.
- **Тема** — `ThemeProvider` уже стоит в корне приложения и Storybook. Внутри экрана его не добавляйте.
- **Устаревшие пропсы.** ViennaUI ведёт заметки о миграциях специально для ИИ-агентов: `src/CHANGELOG_LLM.md` в репозитории Raiffeisen-DGTL/ViennaUI. Если документация компонента в Storybook расходится с этим файлом — верь Storybook и сообщи о расхождении.
