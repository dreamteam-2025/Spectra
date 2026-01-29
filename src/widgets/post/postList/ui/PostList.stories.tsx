import type { Meta, StoryObj } from "@storybook/nextjs";
import { PostList } from "./PostList";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "Widgets/Posts/PostList",
  component: PostList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [withDarkTheme],
} satisfies Meta<typeof PostList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
