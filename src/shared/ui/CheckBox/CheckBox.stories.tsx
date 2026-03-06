import { Meta, StoryObj } from "@storybook/nextjs";
import { CheckBox } from "./CheckBox";
import { Card } from "@/shared/";

const meta = {
  title: "UI/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default поведение
export const Default: Story = {
  args: {},
};

export const DefaultWithLabel: Story = {
  args: {
    children: "Check-box",
  },
};

// Active поведение
export const Active: Story = {
  args: {
    checked: true,
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const ActiveWithLabel: Story = {
  args: {
    children: "Check-box",
    checked: true,
  },
  parameters: {
    pseudo: { active: true },
  },
};

// Hover поведение
export const Hover: Story = {
  args: {},
  parameters: {
    pseudo: { hover: true },
  },
};

export const HoverWithLabel: Story = {
  args: {
    children: "Check-box",
  },
  parameters: {
    pseudo: { hover: true },
  },
};

// Focus-visible поведение
export const Focus: Story = {
  args: {},
  parameters: {
    pseudo: { focusVisible: true },
  },
};

export const FocusWithLabel: Story = {
  args: {
    children: "Check-box",
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

// Disabled поведение
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledWithLabel: Story = {
  args: {
    children: "Check-box",
    checked: true,
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <CheckBox />
      <CheckBox>Standard</CheckBox>
      <CheckBox checked={false}>Unchecked</CheckBox>
      <CheckBox checked={true}>Checked</CheckBox>
      <CheckBox checked={false} disabled>
        Disabled
      </CheckBox>
      <CheckBox checked={true} disabled>
        Checked + Disabled
      </CheckBox>
    </div>
  ),
};

export const CheckboxInContext: Story = {
  render: () => (
    <Card style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <form>
        <CheckBox>
          I agree to the <a href="">Terms of Service</a> and Privacy Policy
        </CheckBox>
      </form>
    </Card>
  ),
};
