// Карточка компонента для Storybook MCP: описание «когда использовать» + пропсы из типов vienna-ui.
// Рендерит настоящий Radio из vienna-ui. Сгенерировано из src/catalog/Radio.stories.tsx.
import type { ComponentProps } from "react";
import { Radio as ViennaRadio } from "vienna-ui";

/**
 * Radio — выбор одного варианта из 2–5, все варианты видны сразу.
 *
 * Группа радиокнопок — `Groups design="vertical"` (или горизонтально, если подписи короткие). У всех кнопок группы общий `name`.
 * Состояние — `checked`, изменение — `onChange`, который получает `{ value }`.
 */
export function Radio(props: ComponentProps<typeof ViennaRadio>) {
  return <ViennaRadio {...props} />;
}
