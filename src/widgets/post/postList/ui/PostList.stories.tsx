import type { Meta, StoryObj } from "@storybook/nextjs";
import { PostList } from "./PostList";

const meta = {
  title: "Widgets/Posts/PostList",
  component: PostList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PostList>;

export default meta;

type Story = StoryObj<typeof PostList>;

export const Default: Story = {};
