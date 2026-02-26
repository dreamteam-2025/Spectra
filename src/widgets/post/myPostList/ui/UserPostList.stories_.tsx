import type { Meta, StoryObj } from "@storybook/nextjs";
import { MyPostList } from "./UserPostList";

const meta = {
  title: "Widgets/Posts/PostList",
  component: MyPostList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MyPostList>;

export default meta;

type Story = StoryObj<typeof MyPostList>;

export const Default: Story = {};
