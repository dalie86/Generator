import type { Preview } from "@storybook/react-vite";
// TODO: подключите стили дизайн-системы (путь из pilot.config.json → dsStylesImport)
// import "TODO-ds-package/styles.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
};

export default preview;
