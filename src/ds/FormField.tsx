// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий FormField из vienna-ui. Сгенерировано из src/catalog/FormField.stories.tsx.
import type { ComponentProps } from "react";
import { FormField as ViennaFormField } from "vienna-ui";

/**
 * FormField — обёртка любого поля формы: подпись, само поле, сообщение.
 *
 * Всегда оборачивайте `Input`, `Textarea`, `Select` и другие поля в `FormField`:
 * - `FormField.Label` — видимая подпись над полем. Placeholder подпись не заменяет. Обязательное поле — `required` у Label.
 * - `FormField.Content` — само поле и сообщение.
 * - `FormField.Message` — подсказка или ошибка под полем. Ошибка: `color="critical"`, предупреждение: `color="warning"`.
 *
 * Ошибка пишется текстом: что не так и как исправить. Поле при ошибке получает `invalid`.
 */
export function FormField(props: ComponentProps<typeof ViennaFormField>) {
  return <ViennaFormField {...props} />;
}
FormField.Label = ViennaFormField.Label;
FormField.Content = ViennaFormField.Content;
FormField.Message = ViennaFormField.Message;
