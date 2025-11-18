import { Meta, StoryObj } from "@storybook/nextjs";
import { Typography } from "./Typography";

const meta = {
  title: "Typography stories",
  component: Typography,
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const DefaultTypography: Story = {
  args: {},
};
