import type { Meta, StoryObj } from "@storybook/nextjs";
import { Privacy } from "./Privacy";

const meta = {
  title: "Page/Privacy",
  component: Privacy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Privacy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};