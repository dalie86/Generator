import type { Preview } from "@storybook/react-vite";
import { ViennaRoot } from "../src/app/ViennaRoot";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ViennaRoot>
        <Story />
      </ViennaRoot>
    ),
  ],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
};

export default preview;
