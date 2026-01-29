import type { Meta, StoryObj } from "@storybook/nextjs";
import { CreateNewPassword } from "./CreateNewPassword";
import { ROUTES, withDarkTheme } from "@/shared";

const meta = {
  title: "Page/CreateNewPassword",
  component: CreateNewPassword,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true, // мы используем app router
      navigation: {
        pathname: ROUTES.AUTH.LOGIN,
        query: {},
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof CreateNewPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
