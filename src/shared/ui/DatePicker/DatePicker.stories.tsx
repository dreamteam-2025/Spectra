import type { Meta, StoryObj } from "@storybook/nextjs";
import { DatePicker } from "./DatePicket";
import { useState } from "react";

const meta = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Date of Birth",
    disabled: false,
    error: "",
    value: undefined,
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

/* STATE COMPONENT */
const Stateful = (args: any) => {
  const [value, setValue] = useState<Date | undefined>(args.value);

  return <DatePicker {...args} value={value} onChange={setValue} />;
};

/* DEFAULT */
export const Default: Story = {
  render: Stateful,
};

/* WITH VALUE */
export const WithValue: Story = {
  render: Stateful,
  args: {
    value: new Date(2000, 0, 1),
  },
};

/* ERROR */
export const Error: Story = {
  render: Stateful,
  args: {
    error: "A user under 13 cannot create a profile",
    value: new Date(2020, 0, 1),
  },
};

/* DISABLED */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(2000, 0, 1),
  },
};
