import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["storybook-addon-pseudo-states", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    defaultName: "Documentation",
  },
  staticDirs: ["../public"],
};
export default config;
