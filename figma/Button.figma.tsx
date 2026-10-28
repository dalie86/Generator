/**
 * Шаблон маппинга Code Connect. Скопируйте его на каждый из 8–12 компонентов пилота.
 *
 * 1. Замените импорт на реальный компонент из дизайн-системы.
 * 2. Вставьте ссылку на компонент в Figma (ПКМ по компоненту → Copy link to selection).
 * 3. Сопоставьте свойства Figma с пропсами кода.
 * 4. Проверьте: npm run figma:connect:parse, затем опубликуйте: npm run figma:connect:publish
 *    (нужен токен FIGMA_ACCESS_TOKEN со scope Code Connect).
 *
 * Черновики маппингов можно сгенерировать bitovi/superconnect, но вычитывайте их руками.
 */
import figma from "@figma/code-connect";
// import { Button } from "TODO-ds-package";
const Button = (_props: Record<string, unknown>) => null; // TODO: удалить заглушку

figma.connect(Button, "https://www.figma.com/design/TODO_FILE_KEY/TODO?node-id=TODO", {
  props: {
    label: figma.string("Label"),
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
      Danger: "danger",
    }),
    disabled: figma.boolean("Disabled"),
    size: figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
  },
  example: ({ label, variant, disabled, size }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {label}
    </Button>
  ),
});
