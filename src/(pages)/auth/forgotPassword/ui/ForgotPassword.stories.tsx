import type { Meta, StoryObj } from "@storybook/nextjs";
import { ForgotPassword } from "@/(pages)";

const meta: Meta<typeof ForgotPassword> = {
  title: "Page/ForgotPassword",
  component: ForgotPassword,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
