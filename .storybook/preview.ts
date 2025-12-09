import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    tags: ["autodocs"],
  },
};

export default preview;
