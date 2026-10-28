import { test } from "node:test";
import assert from "node:assert/strict";
import {
  findArbitraryClasses,
  findRawColors,
  findRawLengths,
  isForeignImport,
  isRawNumericStyle,
} from "./detectors.js";

test("цвета: hex и функции — сырые, var() — нет", () => {
  assert.deepEqual(findRawColors("#fff"), ["#fff"]);
  assert.deepEqual(findRawColors("1px solid #c62828"), ["#c62828"]);
  assert.equal(findRawColors("rgb(1, 2, 3)").length, 1);
  assert.equal(findRawColors("oklch(0.6 0.1 30)").length, 1);
  assert.deepEqual(findRawColors("var(--color-danger, #c62828)"), []);
  assert.deepEqual(findRawColors("var(--color-bg)"), []);
  assert.deepEqual(findRawColors("&#8212;"), []);
});

test("длины: px/rem — сырые, 0 и токены — нет", () => {
  assert.deepEqual(findRawLengths("13px"), ["13px"]);
  assert.deepEqual(findRawLengths("0px"), []);
  assert.deepEqual(findRawLengths("calc(var(--space-2) * 2)"), []);
  assert.deepEqual(findRawLengths("1.5rem 8px"), ["1.5rem", "8px"]);
});

test("произвольные классы Tailwind", () => {
  assert.deepEqual(findArbitraryClasses("flex p-[13px] gap-4 bg-[#fff]"), ["p-[13px]", "bg-[#fff]"]);
  assert.deepEqual(findArbitraryClasses("flex gap-4"), []);
});

test("числа в style", () => {
  assert.equal(isRawNumericStyle("padding", 13), true);
  assert.equal(isRawNumericStyle("padding", 0), false);
  assert.equal(isRawNumericStyle("opacity", 0.5), false);
  assert.equal(isRawNumericStyle("width", 100, ["width"]), false);
});

test("чужие UI-библиотеки", () => {
  const foreign = ["@mui/", "@/components/ui", "components/ui"];
  assert.equal(isForeignImport("@mui/material", foreign, ["@acme/ds"]), true);
  assert.equal(isForeignImport("@/components/ui/button", foreign, ["@acme/ds"]), true);
  assert.equal(isForeignImport("../components/ui/button", foreign, ["@acme/ds"]), true);
  assert.equal(isForeignImport("@acme/ds", foreign, ["@acme/ds"]), false);
  assert.equal(isForeignImport("react", foreign, ["@acme/ds"]), false);
});
