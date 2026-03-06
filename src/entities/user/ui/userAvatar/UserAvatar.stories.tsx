import { Meta, StoryObj } from "@storybook/nextjs";
import { UserAvatar } from "./UserAvatar";

const meta = {
  title: "UI/UserAvatar",
  component: UserAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithFallbackImage: Story = {
  args: {},
};

export const MockAvatar: Story = {
  args: {
    src: "/images/post-image-mock.png",
  },
};
