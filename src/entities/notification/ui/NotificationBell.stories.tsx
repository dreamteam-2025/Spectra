import type { Meta, StoryObj } from "@storybook/nextjs";
import { NotificationBell } from "./NotificationBell";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "entities/NotificationBell",
  component: NotificationBell,
  args: {},
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withDarkTheme],
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: NotificationBell,
};
export const WithNotification: Story = {
  render: NotificationBell,
  args: {
    count: 5,
  },
};
