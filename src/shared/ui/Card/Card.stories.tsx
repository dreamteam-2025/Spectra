import { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "./Card";

const meta = {
  title: "Card stories",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof Card>;

// вот такой синтаксис написания историй, Default Card - это будет название
// args = передаваемые пропсы
export const DefaultCard: Story = {
  args: {
    width: 100,
    height: 100,
    children: "",
    style: { backgroundColor: "var(--dark-500)" },
  },
};

export const CardWithText: Story = {
  args: {
    width: 100,
    height: 100,
    children: "Some text",
  },
};
