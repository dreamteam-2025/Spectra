import type { Meta, StoryObj } from "@storybook/nextjs";
import { PostCard } from "./PostCard";

import postImage from "../../../../public/images/post-image-mock.png";
import avatarImage from "../../../../public/images/post-image-mock.png";

const meta = {
  title: "UI/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "full",
    userId: 365,
    slides: [{ id: 1, postImage }],
    avatarImage,
    userName: "User Name",
    createdAt: "2026-01-16T10:32:15.123Z",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore optio, consectetur maiores quae, tenetur deleniti, explicabo numquam molestias veniam eaque exercitationem autem modi odio! Earum officiis distinctio magnam repudiandae?",
  },
};
