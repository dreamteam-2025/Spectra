import { Meta, StoryObj } from "@storybook/nextjs";
import { Radio, RadioGroup } from "./RadioGroup";

const meta = {
  title: "UI/Radio",
  component: Radio,
  decorators: [
    Story => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    value: "option1",
  },
};

export const WithLabel: Story = {
  args: {
    value: "option1",
    children: "Radio option",
  },
};

export const Disabled: Story = {
  args: {
    value: "option1",
    children: "Radio option",
    disabled: true,
  },
};

export const Hover: Story = {
  args: {
    value: "option1",
    children: "Radio option",
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const FocusVisible: Story = {
  args: {
    value: "option1",
    children: "Radio option",
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};
