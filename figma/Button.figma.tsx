/**
 * Шаблон маппинга Code Connect для ViennaUI. Скопируйте его на каждый компонент пилота.
 *
 * Пока Figma-файла с библиотекой нет — этот шаблон не публикуется, а конфигурация B
 * эксперимента не запускается (см. README → «Без Figma»).
 *
 * Когда библиотека появится:
 * 1. Вставьте ссылку на компонент в Figma (ПКМ по компоненту → Copy link to selection).
 * 2. Сверьте названия свойств в Figma (Design, Size, Loading, Disabled) с вашими.
 * 3. Проверьте: npm run figma:connect:parse, опубликуйте: npm run figma:connect:publish
 *    (нужен токен FIGMA_ACCESS_TOKEN со scope Code Connect).
 */
import figma from "@figma/code-connect";
import { Button } from "vienna-ui";

figma.connect(Button, "https://www.figma.com/design/TODO_FILE_KEY/TODO?node-id=TODO", {
  props: {
    label: figma.string("Label"),
    design: figma.enum("Design", {
      Accent: "accent",
      Primary: "primary",
      Outline: "outline",
      Critical: "critical",
      "Outline critical": "outline-critical",
      Ghost: "ghost",
      "Ghost accent": "ghost-accent",
      Neutral: "neutral",
    }),
    size: figma.enum("Size", { XS: "xs", S: "s", M: "m", L: "l", XL: "xl", XXL: "xxl" }),
    loading: figma.boolean("Loading"),
    disabled: figma.boolean("Disabled"),
  },
  example: ({ label, design, size, loading, disabled }) => (
    <Button design={design} size={size} loading={loading} disabled={disabled}>
      {label}
    </Button>
  ),
});
