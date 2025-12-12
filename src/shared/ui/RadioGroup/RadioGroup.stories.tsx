import { Meta, StoryObj } from "@storybook/nextjs";
import { Radio, RadioGroup } from "./RadioGroup";
import { useState } from "react";

const meta = {
  title: "UI/Radio",
  component: Radio,
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

// Default поведение
export const Default: Story = {
  args: {
    value: "option1",
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
};

export const DefaultWithLabel: Story = {
  args: {
    value: "option1",
    children: "Radio option",
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
};

// Active поведение (нужно состояние)
export const ActiveWithLabel: Story = {
  args: {
    value: "option1",
    children: "Radio option",
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
};

// Hover поведение
export const HoverWithLabel: Story = {
  args: {
    value: "option1",
    children: "Radio option",
  },
  parameters: {
    pseudo: { hover: true },
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
};

// Focus-visible поведение
export const FocusWithLabel: Story = {
  args: {
    value: "option1",
    children: "Radio option",
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
};

// Disabled поведение
export const DisabledWithLabel: Story = {
  args: {
    value: "option1",
    children: "Radio option",
    disabled: true,
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="option1">
        <Story />
      </RadioGroup>
    ),
  ],
};

// Пример группы Radio
export const RadioGroupExample: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup defaultValue="option2" onChange={(value) => console.log(value)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Radio value="option1">First option</Radio>
        <Radio value="option2">Second option</Radio>
        <Radio value="option3">Third option</Radio>
        <Radio value="option4" disabled>
          Disabled option
        </Radio>
      </div>
    </RadioGroup>
  ),
};

// Пример горизонтальной группы
export const HorizontalRadioGroup: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <Radio value="monthly">Monthly</Radio>
        <Radio value="yearly">Yearly</Radio>
        <Radio value="lifetime">Lifetime</Radio>
      </div>
    </RadioGroup>
  ),
};

// Контролируемый пример с useState
export const ControlledExample: StoryObj<typeof RadioGroup> = {
  render: () => {
    const [value, setValue] = useState("option1");
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <p>Selected: {value}</p>
        <RadioGroup value={value} onValueChange={setValue}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Radio value="option1">Option 1</Radio>
            <Radio value="option2">Option 2</Radio>
            <Radio value="option3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>
    );
  },
};

// Все состояния в одном примере
export const AllStates: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h3>Individual Radio Buttons in separate RadioGroups:</h3>
      </div>
      
      <RadioGroup defaultValue="unchecked1">
        <Radio value="unchecked1">Unchecked</Radio>
      </RadioGroup>
      
      <RadioGroup defaultValue="checked1">
        <Radio value="checked1">Checked</Radio>
      </RadioGroup>
      
      <RadioGroup defaultValue="unchecked2">
        <Radio value="unchecked2" disabled>
          Disabled
        </Radio>
      </RadioGroup>
      
      <RadioGroup defaultValue="checked2">
        <Radio value="checked2" disabled>
          Checked + Disabled
        </Radio>
      </RadioGroup>
    </div>
  ),
};