import { Meta, StoryObj } from "@storybook/nextjs";
import { SelectBox } from "./SelectBox";

const meta = {
  title: "SelectBox stories",
  component: SelectBox,
} satisfies Meta<typeof SelectBox>;

export default meta;

type Story = StoryObj<typeof SelectBox>;

export const DefaultSelectBox: Story = {
  args: {},
};
