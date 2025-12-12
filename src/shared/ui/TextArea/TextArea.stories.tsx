import type { Meta, StoryObj } from "@storybook/nextjs";
import { TextArea } from "./TextArea";
import { useState } from "react";

const meta = {
  title: "UI/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Description",
    placeholder: "Type something",
    disabled: false,
    error: "",
    value: "",
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof TextArea>;

/* STATE COMPONENT */
const Stateful = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");

  return <TextArea {...args} value={value} onChange={e => setValue(e.target.value)} />;
};

/* DEFAULT */
export const Default: Story = {
  render: Stateful,
};

/* ACTIVE */
export const Active: Story = {
  render: Stateful,
  parameters: {
    pseudo: { active: true },
  },
  args: {
    value: "Active state",
  },
};

/* FOCUS */
export const Focus: Story = {
  render: Stateful,
  parameters: {
    pseudo: { focus: true },
  },
  args: {
    value: "Focus state",
  },
};

/* ERROR */
export const Error: Story = {
  render: Stateful,
  args: {
    error: "Error message",
    value: "Text with error",
  },
};

/* DISABLED */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
    value: "",
  },
};
