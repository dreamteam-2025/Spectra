import type { Meta, StoryObj } from "@storybook/nextjs";
import { Terms } from "./Terms";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "Page/Terms",
  component: Terms,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof Terms>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
