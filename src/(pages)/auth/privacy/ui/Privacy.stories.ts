import type { Meta, StoryObj } from "@storybook/nextjs";
import { Privacy } from "./Privacy";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "Page/Privacy",
  component: Privacy,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof Privacy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
