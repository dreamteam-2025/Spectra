import type { Meta, StoryObj } from "@storybook/nextjs";
import { SideBar } from "./SideBar";

const meta = {
  title: "/SideBar",
  component: SideBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
