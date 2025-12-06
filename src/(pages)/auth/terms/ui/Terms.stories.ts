import type { Meta, StoryObj } from "@storybook/nextjs";
import { Terms } from "./Terms";

const meta = {
  title: "Page/Terms",
  component: Terms,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Terms>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};