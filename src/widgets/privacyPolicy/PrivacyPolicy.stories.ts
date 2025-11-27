import type { Meta, StoryObj } from "@storybook/nextjs";
import { PrivacyPolicy } from "./PrivacyPolicy";

const meta = {
  title: "Widgets/PrivacyPolicy",
  component: PrivacyPolicy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PrivacyPolicy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};