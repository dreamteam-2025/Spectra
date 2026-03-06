import type { Meta, StoryObj } from "@storybook/nextjs";
import { NotificationBell } from "./NotificationBell";

const meta = {
  title: "UI/NotificationBell",
  component: NotificationBell,
  args: {},
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof NotificationBell>;

export const Default: Story = {
  render: NotificationBell,
};
export const WithNotification: Story = {
  render: NotificationBell,
  args: {
    count: 5,
  },
};
