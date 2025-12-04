import type { Meta, StoryObj } from "@storybook/nextjs";
import { CreateNewPassword } from "./CreateNewPassword";

const meta = {
  title: "Page/CreateNewPassword",
  component: CreateNewPassword,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateNewPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};