import type { Meta, StoryObj } from "@storybook/nextjs";
import { VerificationExpired } from "@/(pages)/auth";

const meta: Meta<typeof VerificationExpired> = {
  title: "Page/VerificationExpired",
  component: VerificationExpired,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const VerificationExpiredPage: Story = {};
