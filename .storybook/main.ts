import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Stories экранов из эксперимента. Stories самой дизайн-системы, если они живут
  // в её репозитории, подключите через refs ниже или добавьте путь сюда.
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    // MCP-сервер Storybook: отдаёт агенту каталог компонентов, пропсы и test-run.
    // Работает на dev-сервере по адресу http://localhost:6006/mcp. Статус — preview.
    "@storybook/addon-mcp",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  typescript: {
    // react-docgen-typescript читает типы через TypeScript, поэтому видит пропсы
    // компонентов vienna-ui из node_modules. Пропсы HTML и styled-components отсекаем.
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        const file = prop.parent?.fileName ?? prop.declarations?.[0]?.fileName ?? "";
        if (!file.includes("node_modules")) return true;
        return /node_modules\/vienna[.-]/.test(file);
      },
    },
  },
  // Если у дизайн-системы уже опубликован свой Storybook, подключите его как ref:
  // refs: { ds: { title: "Design System", url: "https://TODO-ds-storybook-url" } },
};

export default config;
