import { Meta, StoryObj } from "@storybook/nextjs";
import { RadioGroup, Radio } from "./RadioGroup";
import { useState } from "react";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option2">
      <Radio value="option1">First option</Radio>
      <Radio value="option2">Second option</Radio>
      <Radio value="option3">Third option</Radio>
    </RadioGroup>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1">Enabled</Radio>
      <Radio value="option2" disabled>
        Disabled
      </Radio>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <div style={{ display: "flex", gap: 24 }}>
        <Radio value="monthly">Monthly</Radio>
        <Radio value="yearly">Yearly</Radio>
        <Radio value="lifetime">Lifetime</Radio>
      </div>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("option1");

    return (
      <>
        <p>Selected: {value}</p>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </>
    );
  },
};
