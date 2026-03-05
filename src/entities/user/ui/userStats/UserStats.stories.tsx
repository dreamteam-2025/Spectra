import { Meta, StoryObj } from "@storybook/nextjs";
import { UserStats } from "./UserStats";

const meta = {
  title: "UI/UserStats",
  component: UserStats,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UserStats>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    followers: 1111,
    following: 2222,
    publications: 3333,
  },
};

export const BigNumbers: Story = {
  args: {
    followers: 2250718,
    following: 1234567,
    publications: 189999,
  },
};
