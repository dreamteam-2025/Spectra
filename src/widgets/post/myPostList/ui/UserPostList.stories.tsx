import type { Meta, StoryObj } from "@storybook/nextjs";
import { UserPostList } from "./UserPostList";

const meta = {
  title: "Widgets/Posts/UserPostList",
  component: UserPostList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UserPostList>;

export default meta;

type Story = StoryObj<typeof UserPostList>;

export const Default: Story = {
  args: {},
};
