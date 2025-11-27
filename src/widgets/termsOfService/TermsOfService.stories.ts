import type { Meta, StoryObj } from "@storybook/nextjs";
import { TermsOfService } from "./TermsOfService";

const meta = {
  title: "Widgets/TermsOfService",
  component: TermsOfService,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TermsOfService>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};