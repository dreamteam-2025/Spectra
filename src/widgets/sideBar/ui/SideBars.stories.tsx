import type { Meta, StoryObj } from "@storybook/nextjs";
import { SideBar } from "./SideBar";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "widgets/SideBar",
  component: SideBar,
  parameters: {
    layout: "center",
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
