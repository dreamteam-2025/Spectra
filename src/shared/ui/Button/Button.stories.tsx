import { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";

const meta = {
  title: "Button Stories",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

/* PRIMARY */

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const PrimaryHover: Story = {
  args: {
    children: "Primary Hover",
    variant: "primary",
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const PrimaryActive: Story = {
  args: {
    children: "Primary Active",
    variant: "primary",
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const PrimaryDisabled: Story = {
  args: {
    children: "Primary Disabled",
    variant: "primary",
    disabled: true,
  },
};

/* SECONDARY */

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const SecondaryHover: Story = {
  args: {
    children: "Secondary Hover",
    variant: "secondary",
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const SecondaryActive: Story = {
  args: {
    children: "Secondary Active",
    variant: "secondary",
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const SecondaryDisabled: Story = {
  args: {
    children: "Secondary Disabled",
    variant: "secondary",
    disabled: true,
  },
};

/* OUTLINED */

export const Outlined: Story = {
  args: {
    children: "Outlined",
    variant: "outlined",
  },
};

export const OutlinedHover: Story = {
  args: {
    children: "Outlined Hover",
    variant: "outlined",
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const OutlinedActive: Story = {
  args: {
    children: "Outlined Active",
    variant: "outlined",
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const OutlinedDisabled: Story = {
  args: {
    children: "Outlined Disabled",
    variant: "outlined",
    disabled: true,
  },
};

/* SMALL */

export const Small: Story = {
  args: {
    children: "Small",
    variant: "small",
  },
};

export const SmallHover: Story = {
  args: {
    children: "Small Hover",
    variant: "small",
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const SmallActive: Story = {
  args: {
    children: "Small Active",
    variant: "small",
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const SmallDisabled: Story = {
  args: {
    children: "Small Disabled",
    variant: "small",
    disabled: true,
  },
};
