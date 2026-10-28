// Статический анализ сгенерированного экрана: насколько он собран из дизайн-системы.
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import {
  findRawValuesInString,
  isDsImport,
  isForeignImport,
  isRawInteractive,
  isRawNumericStyle,
} from "./detectors.js";

export interface PilotConfig {
  dsPackage: string;
  dsImportPaths: string[];
  foreignUiImports: string[];
  rawInteractiveElements: string[];
  allowedRawProperties: string[];
  /** Пропсы отступов компонентов DS (margin, gap…): строковые px в них — тоже сырые значения. */
  spacingProps?: string[];
}

/** Манифест DS: пакет → список экспортируемых компонентов. */
export type DsManifest = Record<string, string[]>;

export interface Finding {
  file: string;
  line: number;
  kind:
    | "raw-value"
    | "raw-interactive"
    | "foreign-import"
    | "foreign-element"
    | "local-component"
    | "unknown-element"
    | "invented-component"
    | "invalid-prop"
    | "type-error";
  detail: string;
}

export interface ScreenMetrics {
  files: string[];
  dsElements: number;
  dsComponentsUsed: string[];
  htmlElements: number;
  rawInteractive: number;
  foreignImports: number;
  foreignElements: number;
  localComponentDefs: number;
  localComponentUses: number;
  unknownElements: number;
  rawValues: number;
  inventedComponents: number;
  invalidProps: number;
  otherTypeErrors: number;
  typecheck: "ok" | "skipped";
  /** Доля элементов из DS среди всех «компонентных» мест экрана, 0..1. */
  dsShare: number;
  findings: Finding[];
}

// Ошибки, которые говорят о неустановленном окружении, а не о качестве экрана:
// 2307 модуль не найден, 2875 нет react/jsx-runtime, 7026 нет JSX.IntrinsicElements, 2503 нет namespace React.
const ENV_ERRORS = new Set([2307, 2875, 7026, 2503]);

const STYLE_PROPS = new Set(["style", "sx", "css"]);
const DEFAULT_SPACING_PROPS = [
  "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "marginHorizontal", "marginVertical",
  "m", "mt", "mb", "ml", "mr", "mh", "mv",
  "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "p", "pt", "pb", "pl", "pr",
  "gap", "rowGap", "columnGap",
];
const CLASS_PROPS = new Set(["className", "class"]);

export function listScreenFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listScreenFiles(p));
    else if (/\.(tsx|jsx)$/.test(entry.name) && !/\.(stories|test|spec)\./.test(entry.name)) out.push(p);
  }
  return out.sort();
}

function rootName(tag: ts.JsxTagNameExpression): string {
  let node: ts.Node = tag;
  while (ts.isPropertyAccessExpression(node)) node = node.expression;
  return node.getText();
}

function isComponentName(name: string): boolean {
  return /^[A-Z]/.test(name);
}

export function analyzeFiles(
  files: string[],
  cfg: PilotConfig,
  opts: { manifest?: DsManifest; withTypecheck?: boolean; tsconfigPath?: string } = {},
): ScreenMetrics {
  const m: ScreenMetrics = {
    files,
    dsElements: 0,
    dsComponentsUsed: [],
    htmlElements: 0,
    rawInteractive: 0,
    foreignImports: 0,
    foreignElements: 0,
    localComponentDefs: 0,
    localComponentUses: 0,
    unknownElements: 0,
    rawValues: 0,
    inventedComponents: 0,
    invalidProps: 0,
    otherTypeErrors: 0,
    typecheck: "skipped",
    dsShare: 0,
    findings: [],
  };
  const dsUsed = new Set<string>();
  const spacingProps = new Set(cfg.spacingProps ?? DEFAULT_SPACING_PROPS);

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const rel = path.relative(process.cwd(), file);
    const add = (node: ts.Node, kind: Finding["kind"], detail: string) => {
      const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
      m.findings.push({ file: rel, line, kind, detail });
    };

    // 1. Импорты: какое локальное имя откуда пришло.
    const origin = new Map<string, "ds" | "foreign" | "local" | "other">();
    const dsImportedNames = new Map<string, string>(); // локальное имя → экспортируемое имя
    const localDefs = new Set<string>();

    for (const stmt of sf.statements) {
      if (ts.isImportDeclaration(stmt) && ts.isStringLiteral(stmt.moduleSpecifier)) {
        const src = stmt.moduleSpecifier.text;
        const kind = isDsImport(src, cfg.dsImportPaths)
          ? "ds"
          : isForeignImport(src, cfg.foreignUiImports, cfg.dsImportPaths)
            ? "foreign"
            : src.startsWith(".") || src.startsWith("@/") || src.startsWith("~/")
              ? "local"
              : "other";
        if (kind === "foreign") {
          m.foreignImports++;
          add(stmt, "foreign-import", src);
        }
        const clause = stmt.importClause;
        if (!clause) continue;
        if (clause.name) origin.set(clause.name.text, kind);
        const nb = clause.namedBindings;
        if (nb && ts.isNamedImports(nb)) {
          for (const el of nb.elements) {
            origin.set(el.name.text, kind);
            if (kind === "ds") dsImportedNames.set(el.name.text, (el.propertyName ?? el.name).text);
          }
        } else if (nb && ts.isNamespaceImport(nb)) {
          origin.set(nb.name.text, kind);
        }
      }
      // Свои компоненты, объявленные в файле экрана (кроме экспорта по умолчанию).
      const isDefault = (n: ts.Node) =>
        ts.canHaveModifiers(n) &&
        (ts.getModifiers(n) ?? []).some((mod) => mod.kind === ts.SyntaxKind.DefaultKeyword);
      if (ts.isFunctionDeclaration(stmt) && stmt.name && isComponentName(stmt.name.text) && !isDefault(stmt)) {
        localDefs.add(stmt.name.text);
      }
      if (ts.isVariableStatement(stmt)) {
        for (const d of stmt.declarationList.declarations) {
          if (
            ts.isIdentifier(d.name) &&
            isComponentName(d.name.text) &&
            d.initializer &&
            (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))
          ) {
            localDefs.add(d.name.text);
          }
        }
      }
    }
    for (const name of localDefs) {
      m.localComponentDefs++;
      origin.set(name, "local");
    }

    // 2. Манифест DS: импорт несуществующего компонента = выдуманный компонент.
    if (opts.manifest) {
      for (const stmt of sf.statements) {
        if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier)) continue;
        const known = opts.manifest[stmt.moduleSpecifier.text];
        if (!known) continue; // для пакета нет манифеста (например, иконки) — не проверяем
        if (stmt.importClause?.isTypeOnly) continue;
        const nb = stmt.importClause?.namedBindings;
        if (nb && ts.isNamedImports(nb)) {
          for (const el of nb.elements) {
            if (el.isTypeOnly) continue;
            const exported = (el.propertyName ?? el.name).text;
            if (!known.includes(exported) && /^[A-Z]/.test(exported)) {
              m.inventedComponents++;
              add(el, "invented-component", exported);
            }
          }
        }
      }
    }

    // 3. JSX-элементы и стили.
    const checkStyleValue = (node: ts.Node, propName: string) => {
      if (ts.isStringLiteralLike(node)) {
        for (const v of findRawValuesInString(node.text)) {
          m.rawValues++;
          add(node, "raw-value", `${propName}: ${v}`);
        }
      } else if (ts.isNumericLiteral(node)) {
        if (isRawNumericStyle(propName, Number(node.text), cfg.allowedRawProperties)) {
          m.rawValues++;
          add(node, "raw-value", `${propName}: ${node.text}`);
        }
      } else if (ts.isTemplateExpression(node)) {
        for (const part of [node.head, ...node.templateSpans.map((s) => s.literal)]) {
          for (const v of findRawValuesInString(part.text)) {
            m.rawValues++;
            add(node, "raw-value", `${propName}: ${v}`);
          }
        }
      }
    };
    const checkStyleObject = (obj: ts.ObjectLiteralExpression) => {
      for (const p of obj.properties) {
        if (!ts.isPropertyAssignment(p)) continue;
        const name = p.name.getText(sf).replace(/["']/g, "");
        if (ts.isObjectLiteralExpression(p.initializer)) checkStyleObject(p.initializer);
        else checkStyleValue(p.initializer, name);
      }
    };
    const checkClassName = (node: ts.Node) => {
      const strings: string[] = [];
      const collect = (n: ts.Node) => {
        if (ts.isStringLiteralLike(n)) strings.push(n.text);
        else if (ts.isTemplateExpression(n)) {
          strings.push(n.head.text, ...n.templateSpans.map((s) => s.literal.text));
        }
        ts.forEachChild(n, collect);
      };
      collect(node);
      for (const s of strings) {
        for (const v of findRawValuesInString(s, { isClassName: true })) {
          m.rawValues++;
          add(node, "raw-value", `className: ${v}`);
        }
      }
    };

    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = node.tagName.getText(sf);
        if (!isComponentName(tag) && !tag.includes(".")) {
          m.htmlElements++;
          if (isRawInteractive(tag, cfg.rawInteractiveElements)) {
            m.rawInteractive++;
            add(node, "raw-interactive", `<${tag}>`);
          }
        } else {
          const root = rootName(node.tagName);
          const kind = origin.get(root);
          if (kind === "ds") {
            m.dsElements++;
            dsUsed.add(dsImportedNames.get(root) ?? root);
          } else if (kind === "foreign") {
            m.foreignElements++;
            add(node, "foreign-element", `<${tag}>`);
          } else if (kind === "local") {
            m.localComponentUses++;
            add(node, "local-component", `<${tag}>`);
          } else if (root !== "Fragment" && root !== "React") {
            m.unknownElements++;
            add(node, "unknown-element", `<${tag}>`);
          }
        }
        for (const attr of node.attributes.properties) {
          if (!ts.isJsxAttribute(attr) || !attr.initializer) continue;
          const name = attr.name.getText(sf);
          const init = attr.initializer;
          const expr = ts.isJsxExpression(init) ? init.expression : init;
          if (!expr) continue;
          if (STYLE_PROPS.has(name)) {
            if (ts.isObjectLiteralExpression(expr)) checkStyleObject(expr);
            else checkStyleValue(expr, name);
          } else if (CLASS_PROPS.has(name)) {
            checkClassName(expr);
          } else if (spacingProps.has(name) && isComponentName(node.tagName.getText(sf).split(".")[0])) {
            // <Flex gap="13px" /> вместо gap="s4"
            checkStyleValue(expr, name);
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }

  // 4. Проверка типов: выдуманные экспорты и несуществующие пропсы.
  if (opts.withTypecheck && files.length) {
    const tsconfigPath = opts.tsconfigPath ?? path.resolve("tsconfig.json");
    const parsed = fs.existsSync(tsconfigPath)
      ? ts.parseJsonConfigFileContent(
          ts.readConfigFile(tsconfigPath, ts.sys.readFile).config,
          ts.sys,
          path.dirname(tsconfigPath),
        )
      : undefined;
    const options = { jsx: ts.JsxEmit.ReactJSX, ...(parsed?.options ?? {}), noEmit: true };
    const program = ts.createProgram(files, options);
    m.typecheck = "ok";
    for (const file of files) {
      const sf = program.getSourceFile(file);
      if (!sf) continue;
      for (const d of [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)]) {
        const line = d.start !== undefined ? sf.getLineAndCharacterOfPosition(d.start).line + 1 : 0;
        const msg = ts.flattenDiagnosticMessageText(d.messageText, " ");
        const rel = path.relative(process.cwd(), file);
        if (d.code === 2305 || d.code === 2724 || d.code === 2614) {
          m.inventedComponents++;
          m.findings.push({ file: rel, line, kind: "invented-component", detail: msg });
        } else if ([2322, 2353, 2339, 2769, 2741].includes(d.code)) {
          m.invalidProps++;
          m.findings.push({ file: rel, line, kind: "invalid-prop", detail: msg });
        } else if (ENV_ERRORS.has(d.code)) {
          // Окружение не установлено (нет пакета DS или типов React) — экран не штрафуем.
          m.typecheck = "skipped";
        } else {
          m.otherTypeErrors++;
          m.findings.push({ file: rel, line, kind: "type-error", detail: `TS${d.code}: ${msg}` });
        }
      }
    }
  }

  // Без установленного окружения остальные ошибки типов недостоверны (всё становится any) — не считаем их.
  if (m.typecheck === "skipped") {
    m.invalidProps = 0;
    m.otherTypeErrors = 0;
    m.findings = m.findings.filter((f) => f.kind !== "type-error" && f.kind !== "invalid-prop");
  }

  m.dsComponentsUsed = [...dsUsed].sort();
  const denom = m.dsElements + m.rawInteractive + m.foreignElements + m.localComponentUses + m.unknownElements;
  m.dsShare = denom === 0 ? 0 : Math.round((m.dsElements / denom) * 1000) / 1000;
  return m;
}
