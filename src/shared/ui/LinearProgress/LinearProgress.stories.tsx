import { Meta, StoryObj } from "@storybook/nextjs";
import { LinearProgress } from "./LinearProgress";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "UI/LinearProgress",
  component: LinearProgress,
  parameters: {
    layout: "center",
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DEFAULT */

export const LinearDefault: Story = {
  args: {
    height: 4,
    width: 500,
  },
};
