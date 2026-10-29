// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Input из vienna-ui. Сгенерировано из src/catalog/Input.stories.tsx.
import type { ComponentProps } from "react";
import { Input as ViennaInput } from "vienna-ui";

/**
 * Input — короткий текст или число: имя, email, сумма.
 *
 * Когда не использовать: текст длиннее 5 слов — `Textarea`. Телефон, счёт, карта, дата — специализированные `InputPhone`, `InputAccount`, `InputCard`, `InputDate`. Пароль — `InputPassword`.
 * Всегда внутри `FormField` с подписью. Ошибка — проп `invalid` плюс `FormField.Message color="critical"`.
 * Размер `size`: xs–xxl, по умолчанию m.
 *
 * Важно: `onChange` получает объект `{ value, event, options }`, а не DOM-событие: `onChange={({ value }) => setValue(value)}`.
 */
export function Input(props: ComponentProps<typeof ViennaInput>) {
  return <ViennaInput {...props} />;
}
