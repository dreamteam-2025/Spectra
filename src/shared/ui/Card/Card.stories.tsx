import { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyCard: Story = {
  args: {
    width: 100,
    height: 100,
    children: "",
    style: { backgroundColor: "var(--dark-500)" },
  },
};

export const CardWithText: Story = {
  args: {
    children: "Some text here",
    style: { width: "fit-content" },
  },
};
