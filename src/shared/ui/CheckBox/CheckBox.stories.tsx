import { Meta, StoryObj } from "@storybook/nextjs";
import { CheckBox } from "./CheckBox";

const meta = {
  title: "CheckBox stories",
  component: CheckBox,
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const DefaultCheckBox: Story = {
  args: {},
};
