// Общие детекторы нарушений. Используются и линтером (eslint/plugin-ds.js), и анализатором
// прогонов (eval/tools/analyze-core.ts), чтобы оба считали одно и то же.

const COLOR_FN = /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(\s*[^)]*\)/gi;
const HEX = /(?<![\w&-])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const LENGTH = /(?<![\w.-])-?\d*\.?\d+(?:px|rem|em|pt)\b/g;
const VAR_CALL = /var\(\s*--[\w-]+(?:\s*,[^)]*)?\)/g;

/** Убирает var(--…) — значения через токены не считаются сырыми. */
function stripVars(value) {
  return value.replace(VAR_CALL, "");
}

/** Сырые цвета в строке: hex и цветовые функции. */
export function findRawColors(value) {
  if (typeof value !== "string") return [];
  const s = stripVars(value);
  return [...(s.match(HEX) ?? []), ...(s.match(COLOR_FN) ?? [])];
}

/** Сырые длины в строке: 13px, 1.5rem. Нули допустимы. */
export function findRawLengths(value) {
  if (typeof value !== "string") return [];
  const s = stripVars(value);
  return (s.match(LENGTH) ?? []).filter((m) => parseFloat(m) !== 0);
}

/** Произвольные Tailwind-классы вида p-[13px], bg-[#fff], w-[calc(...)]. */
export function findArbitraryClasses(className) {
  if (typeof className !== "string") return [];
  return className.split(/\s+/).filter((c) => /\[[^\]]+\]/.test(c));
}

/** Все сырые значения в строке стиля или className. */
export function findRawValuesInString(value, { isClassName = false } = {}) {
  if (typeof value !== "string") return [];
  if (isClassName) {
    // Внутри className hex-цвета и длины встречаются только в произвольных классах.
    return findArbitraryClasses(value);
  }
  return [...findRawColors(value), ...findRawLengths(value)];
}

/** Числовое значение в style={{ padding: 13 }} — сырое, кроме 0 и разрешённых свойств. */
export function isRawNumericStyle(propName, number, allowedProps = []) {
  if (number === 0) return false;
  if (allowedProps.includes(propName)) return false;
  // Безразмерные свойства — не нарушение.
  const unitless = ["flex", "flexGrow", "flexShrink", "opacity", "zIndex", "order", "lineHeight", "fontWeight"];
  return !unitless.includes(propName);
}

/** Импорт из чужой UI-библиотеки. */
export function isForeignImport(source, foreignList = [], dsPaths = []) {
  if (dsPaths.some((p) => source === p || source.startsWith(p + "/"))) return false;
  return foreignList.some((f) => source === f || source.startsWith(f) || source.includes("/" + f));
}

/** Импорт из дизайн-системы. */
export function isDsImport(source, dsPaths = []) {
  return dsPaths.some((p) => source === p || source.startsWith(p + "/"));
}

/** Нативный интерактивный элемент, у которого есть аналог в DS. */
export function isRawInteractive(tagName, list = []) {
  return list.includes(tagName);
}
