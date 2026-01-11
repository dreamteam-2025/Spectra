import { Meta, StoryObj } from "@storybook/nextjs";
import { LinearProgress } from "./LinearProgress";

const meta = {
  title: "UI/LinearProgress",
  component: LinearProgress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DEFAULT */

export const LinearDefault: Story = {
  args: {
    height: 4,
    width: 200,
  },
};
