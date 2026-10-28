// Локальный ESLint-плагин пилота: механические правила дизайн-системы.
// Что проверяется без рендера, с малым числом ложных срабатываний и понятным исправлением — здесь.
// Всё остальное — текстом в skill ds-ui (references/rules.md).
import fs from "node:fs";
import path from "node:path";
import {
  findRawValuesInString,
  isForeignImport,
  isRawInteractive,
  isRawNumericStyle,
} from "../eval/tools/detectors.js";

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(path.resolve("pilot.config.json"), "utf8"));
  } catch {
    return {};
  }
}

const STYLE_PROPS = new Set(["style", "sx", "css"]);
const CLASS_PROPS = new Set(["className", "class"]);

function stringsIn(node) {
  if (!node) return [];
  if (node.type === "Literal" && typeof node.value === "string") return [{ node, value: node.value }];
  if (node.type === "TemplateLiteral") return node.quasis.map((q) => ({ node: q, value: q.value.cooked ?? "" }));
  if (node.type === "JSXExpressionContainer") return stringsIn(node.expression);
  if (node.type === "ConditionalExpression") return [...stringsIn(node.consequent), ...stringsIn(node.alternate)];
  if (node.type === "LogicalExpression") return [...stringsIn(node.left), ...stringsIn(node.right)];
  if (node.type === "CallExpression") return node.arguments.flatMap(stringsIn);
  if (node.type === "ArrayExpression") return node.elements.flatMap(stringsIn);
  return [];
}

const noRawValues = {
  meta: {
    type: "problem",
    docs: { description: "Цвета, отступы и размеры — только токенами DS (ds/only-tokens)" },
    messages: {
      raw: "Сырое значение «{{value}}» в {{prop}}. Используйте токен DS (var(--…)) или проп компонента. Правило ds/only-tokens.",
    },
    schema: [],
  },
  create(context) {
    const allowed = loadConfig().allowedRawProperties ?? [];
    const checkObject = (obj) => {
      for (const p of obj.properties) {
        if (p.type !== "Property") continue;
        const name = p.key.type === "Identifier" ? p.key.name : String(p.key.value);
        if (p.value.type === "ObjectExpression") {
          checkObject(p.value);
          continue;
        }
        if (p.value.type === "Literal" && typeof p.value.value === "number") {
          if (isRawNumericStyle(name, p.value.value, allowed)) {
            context.report({ node: p.value, messageId: "raw", data: { value: String(p.value.value), prop: name } });
          }
          continue;
        }
        for (const s of stringsIn(p.value)) {
          for (const v of findRawValuesInString(s.value)) {
            context.report({ node: s.node, messageId: "raw", data: { value: v, prop: name } });
          }
        }
      }
    };
    return {
      JSXAttribute(node) {
        const name = node.name?.name;
        if (!node.value) return;
        if (STYLE_PROPS.has(name)) {
          const expr = node.value.type === "JSXExpressionContainer" ? node.value.expression : node.value;
          if (expr.type === "ObjectExpression") checkObject(expr);
          else
            for (const s of stringsIn(expr))
              for (const v of findRawValuesInString(s.value))
                context.report({ node: s.node, messageId: "raw", data: { value: v, prop: name } });
        } else if (CLASS_PROPS.has(name)) {
          for (const s of stringsIn(node.value))
            for (const v of findRawValuesInString(s.value, { isClassName: true }))
              context.report({ node: s.node, messageId: "raw", data: { value: v, prop: "className" } });
        }
      },
    };
  },
};

const noRawInteractive = {
  meta: {
    type: "problem",
    docs: { description: "Нативные интерактивные элементы запрещены — у DS есть свои (ds/only-ds-components)" },
    messages: {
      raw: "Нативный <{{tag}}>. Используйте компонент дизайн-системы. Правило ds/only-ds-components.",
    },
    schema: [],
  },
  create(context) {
    const list = loadConfig().rawInteractiveElements ?? ["button", "input", "select", "textarea", "dialog", "table"];
    return {
      JSXOpeningElement(node) {
        if (node.name.type === "JSXIdentifier" && isRawInteractive(node.name.name, list)) {
          context.report({ node, messageId: "raw", data: { tag: node.name.name } });
        }
      },
    };
  },
};

const noForeignUi = {
  meta: {
    type: "problem",
    docs: { description: "Только компоненты DS, никаких других UI-библиотек (ds/no-foreign-ui)" },
    messages: {
      foreign: "Импорт «{{source}}» из чужой UI-библиотеки. Используйте дизайн-систему. Правило ds/no-foreign-ui.",
    },
    schema: [],
  },
  create(context) {
    const cfg = loadConfig();
    return {
      ImportDeclaration(node) {
        const src = node.source.value;
        if (isForeignImport(src, cfg.foreignUiImports ?? [], cfg.dsImportPaths ?? [])) {
          context.report({ node, messageId: "foreign", data: { source: src } });
        }
      },
    };
  },
};

const radioForFew = {
  meta: {
    type: "suggestion",
    docs: { description: "2–3 статичных варианта — радиокнопки, не выпадающий список (form/radio-for-few)" },
    messages: {
      few: "Select с {{count}} статичными вариантами. Для 2–3 вариантов используйте RadioGroup. Правило form/radio-for-few.",
    },
    schema: [],
  },
  create(context) {
    return {
      JSXElement(node) {
        const n = node.openingElement.name;
        const name = n.type === "JSXIdentifier" ? n.name : n.type === "JSXMemberExpression" ? n.object.name : "";
        if (name !== "Select") return;
        // Статичные варианты: дочерние <Option>/<option>/<Select.Option> или проп options=[…] литералом.
        const children = node.children.filter((c) => c.type === "JSXElement");
        let count = children.length;
        const optionsAttr = node.openingElement.attributes.find((a) => a.type === "JSXAttribute" && a.name.name === "options");
        if (optionsAttr?.value?.type === "JSXExpressionContainer" && optionsAttr.value.expression.type === "ArrayExpression") {
          count = optionsAttr.value.expression.elements.length;
        }
        if (count >= 2 && count <= 3) context.report({ node: node.openingElement, messageId: "few", data: { count } });
      },
    };
  },
};

export default {
  meta: { name: "eslint-plugin-ds", version: "0.1.0" },
  rules: {
    "no-raw-values": noRawValues,
    "no-raw-interactive": noRawInteractive,
    "no-foreign-ui": noForeignUi,
    "radio-for-few": radioForFew,
  },
};
